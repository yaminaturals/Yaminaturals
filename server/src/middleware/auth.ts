import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'yn_sec_7f9c2d8a1e4b3f605a9c2d8e7b1a4f3c8e2d1a0f9b8c7d6e5a4b3c2d1e0f9a8b';

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email: string;
    role: string;
  };
}

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized: Authentication token is missing or malformed. Please log in.'
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Bearer token is empty.' });
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET) as {
      uid: string;
      email: string;
      role: string;
      exp?: number;
    };

    if (decoded.role !== 'admin' && !decoded.email.endsWith('@yaminaturals.com')) {
      return res.status(403).json({
        error: 'Forbidden: Insufficient privileges. Administrator access required.'
      });
    }

    req.user = decoded;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Authentication session has expired. Please sign in again.' });
    }
    return res.status(401).json({ error: 'Unauthorized: Invalid authentication credentials.' });
  }
};
