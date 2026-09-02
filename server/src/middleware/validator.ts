import { Request, Response, NextFunction } from 'express';

// HTML/XSS Sanitizer: strips malicious script tags and dangerous HTML attributes
export const sanitizeString = (input: any): string => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:[^"']*/gi, '')
    .replace(/onerror\s*=\s*[^"'\s]+/gi, '')
    .replace(/onload\s*=\s*[^"'\s]+/gi, '')
    .replace(/onclick\s*=\s*[^"'\s]+/gi, '')
    .trim();
};

export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Middleware to sanitize all body strings recursively and prevent XSS
export const xssSanitizer = (req: Request, res: Response, next: NextFunction) => {
  if (req.body && typeof req.body === 'object') {
    const sanitizeObject = (obj: any) => {
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          obj[key] = sanitizeString(obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitizeObject(obj[key]);
        }
      }
    };
    sanitizeObject(req.body);
  }
  next();
};

// Anti-Spam validator for public forms
export const validateInquiry = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, hp_field } = req.body;

  // Honeypot detection (hidden field that bots fill)
  if (hp_field) {
    return res.status(400).json({ error: 'Spam submission detected.' });
  }

  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.length > 100) {
    return res.status(400).json({ error: 'A valid name between 2 and 100 characters is required.' });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'A valid corporate or personal email address is required.' });
  }

  next();
};
