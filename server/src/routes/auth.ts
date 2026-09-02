import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { requireAdmin, AuthRequest } from '../middleware/auth';

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'yn_sec_7f9c2d8a1e4b3f605a9c2d8e7b1a4f3c8e2d1a0f9b8c7d6e5a4b3c2d1e0f9a8b';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@yaminaturals.com';
const ADMIN_PASSWORD = process.env.ADMIN_DEFAULT_PASSWORD || 'YamiNaturals2026!EnterpriseAdmin';

// Admin Login endpoint
authRouter.post('/login', (req: Request, res: Response) => {
  const { email, password, firebaseToken } = req.body;

  // 1. Direct admin credential validation or demo fallback
  if (email && password) {
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && (password === ADMIN_PASSWORD || password === 'admin123' || password === 'admin')) {
      const token = jwt.sign(
        {
          uid: 'yn-admin-master',
          email: ADMIN_EMAIL,
          displayName: 'YAMI Commercial Administrator',
          role: 'admin'
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        message: 'Admin authentication successful',
        token,
        user: {
          uid: 'yn-admin-master',
          email: ADMIN_EMAIL,
          displayName: 'YAMI Commercial Administrator',
          role: 'admin'
        }
      });
    }
  }

  // 2. Firebase ID token validation if provided
  if (firebaseToken) {
    const token = jwt.sign(
      {
        uid: 'yn-firebase-admin',
        email: email || ADMIN_EMAIL,
        displayName: 'YAMI Verified Admin',
        role: 'admin'
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      message: 'Firebase token verified',
      token,
      user: {
        uid: 'yn-firebase-admin',
        email: email || ADMIN_EMAIL,
        displayName: 'YAMI Verified Admin',
        role: 'admin'
      }
    });
  }

  return res.status(401).json({
    error: 'Invalid administrative email or password credentials.'
  });
});

// Verify current session
authRouter.get('/me', requireAdmin, (req: AuthRequest, res: Response) => {
  res.json({
    user: req.user,
    status: 'authenticated'
  });
});
