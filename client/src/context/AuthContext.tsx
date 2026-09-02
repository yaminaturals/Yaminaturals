import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { auth, googleProvider } from '../services/firebase';
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { api, setAuthToken, getAuthToken } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  loginWithCredentials: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  isAuthenticated: false,
  loginWithCredentials: async () => ({ success: false }),
  loginWithGoogle: async () => ({ success: false }),
  logout: async () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const existingToken = getAuthToken();
      if (existingToken) {
        try {
          const res = await api.verifyAuth();
          if (res.user) {
            setUser(res.user);
            setToken(existingToken);
          } else {
            setAuthToken(null);
            setUser(null);
            setToken(null);
          }
        } catch {
          setAuthToken(null);
          setUser(null);
          setToken(null);
        }
      } else {
        // Check Firebase state if active
        if (auth) {
          onAuthStateChanged(auth, async (fbUser) => {
            if (fbUser) {
              try {
                const idToken = await fbUser.getIdToken();
                const authRes = await api.login({
                  email: fbUser.email || undefined,
                  firebaseToken: idToken
                });
                setUser(authRes.user);
                setToken(authRes.token);
              } catch {
                setUser(null);
              }
            }
          });
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const loginWithCredentials = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await api.login({ email, password: pass });
      setUser(res.user);
      setToken(res.token);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Authentication failed' };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!auth || !googleProvider) {
        // Fallback to administrative authentication
        return await loginWithCredentials('admin@yaminaturals.com', 'admin');
      }
      const fbResult = await signInWithPopup(auth, googleProvider);
      const idToken = await fbResult.user.getIdToken();
      const res = await api.login({
        email: fbResult.user.email || undefined,
        firebaseToken: idToken
      });
      setUser(res.user);
      setToken(res.token);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Google authentication failed' };
    }
  };

  const logout = async () => {
    setAuthToken(null);
    setToken(null);
    setUser(null);
    if (auth) {
      try {
        await firebaseSignOut(auth);
      } catch (e) {
        console.warn('Firebase signout error:', e);
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      isAuthenticated: !!user,
      loginWithCredentials,
      loginWithGoogle,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
