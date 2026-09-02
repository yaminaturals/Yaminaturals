import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

import { xssSanitizer } from './middleware/validator';
import { authRouter } from './routes/auth';
import { uploadRouter } from './routes/upload';
import { productRouter } from './routes/products';
import { categoryRouter } from './routes/categories';
import { applicationRouter } from './routes/applications';
import { quoteRouter } from './routes/quotes';
import { contactRouter } from './routes/contacts';
import { documentRouter } from './routes/documents';
import { resourceRouter } from './routes/resources';
import { faqRouter } from './routes/faqs';
import { settingRouter } from './routes/settings';
import { adminRouter } from './routes/admin';
import { seedRouter } from './routes/seed';

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Security Headers with Helmet
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false // Allows API to serve JSON and uploaded assets
}));

// CORS Configuration
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:5173')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*') || origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy violation: Origin not allowed.'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true
}));

// JSON Body Parser with Size Limits (Prevents DoS through large payloads)
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Global XSS Sanitization Middleware
app.use(xssSanitizer);

// Rate Limiting (Brute force & DDoS prevention)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP address, please try again later.' }
});

const inquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50,
  message: { error: 'Too many inquiries submitted from this IP. Please wait before submitting again.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  message: { error: 'Too many authentication attempts. Please try again in 15 minutes.' }
});

app.use('/api', generalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/quotes', inquiryLimiter);
app.use('/api/contacts', inquiryLimiter);
app.use('/api/documents', inquiryLimiter);

// Serve static upload directory
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// Health & System Info Check (Safe non-sensitive response)
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    platform: 'YAMI NATURALS Enterprise B2B API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Mount Routes
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/quotes', quoteRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/documents', documentRouter);
app.use('/api/resources', resourceRouter);
app.use('/api/faqs', faqRouter);
app.use('/api/settings', settingRouter);
app.use('/api/admin', adminRouter);
app.use('/api/seed', seedRouter);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: `API route not found: ${req.method} ${req.originalUrl}` });
});

// Secure Error Handler (Never leaks stack traces in production)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled server error:', err.message || err);
  const isDev = process.env.NODE_ENV === 'development';
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error occurred.',
    ...(isDev && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`🌿 YAMI NATURALS API Server listening on port ${PORT}`);
});
