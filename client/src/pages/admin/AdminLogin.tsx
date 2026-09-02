import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2, KeyRound } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@yaminaturals.com');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginWithCredentials, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await loginWithCredentials(email, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Invalid administrator email or password');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const res = await loginWithGoogle();
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Google authentication failed');
    }
    setLoading(false);
  };

  return (
    <>
      <SEO title="Admin Login | YAMI NATURALS" description="Internal B2B catalog administration portal." />
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="card-premium bg-slate-900 border-slate-800 text-white max-w-md w-full p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-900/80 border border-emerald-700/50 flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-lg">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">YAMI NATURALS</h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">B2B Management Console &amp; Monograph Editor</p>
          </div>

          {error && (
            <div className="p-3 bg-red-950/80 border border-red-800 rounded-lg text-xs text-red-200 mb-6 text-center font-mono animate-fadeIn">
              {error}
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleCredentialsLogin} className="space-y-4 mb-6 text-xs">
            <div>
              <label className="block font-mono text-slate-300 font-bold mb-1.5">Admin Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. admin@yaminaturals.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-none pl-10 pr-4 py-3 text-white font-mono text-xs placeholder:text-slate-500 placeholder:italic focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none shadow-sm transition"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-slate-300 font-bold mb-1.5">Admin Password</label>
              <div className="relative">
                <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="e.g. Enter master access key"
                  className="w-full bg-slate-950 border border-slate-700 rounded-none pl-10 pr-4 py-3 text-white font-mono text-xs placeholder:text-slate-500 placeholder:italic focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none shadow-sm transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full justify-center py-2.5 text-xs mt-2 bg-emerald-800 hover:bg-emerald-700 border-emerald-700"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
              <span>Sign In with Administrator Credentials</span>
            </button>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <span className="relative bg-slate-900 px-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              Or Firebase SSO
            </span>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="btn btn-outline w-full justify-center py-2.5 text-xs text-white border-slate-700 hover:bg-slate-800"
          >
            <Lock size={13} />
            <span>Sign in via Google Auth</span>
          </button>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-tiny text-slate-500 font-mono">
            Protected internal interface. Authorized staff and auditors only.
          </div>
        </div>
      </div>
    </>
  );
};
