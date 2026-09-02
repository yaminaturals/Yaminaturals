import { Router, Request, Response } from 'express';
import { dbStore } from '../storage/dbStore';
import { requireAdmin } from '../middleware/auth';

export const settingRouter = Router();

settingRouter.get('/', (req: Request, res: Response) => {
  const settings = dbStore.getSettings();
  res.json({ settings });
});

settingRouter.put('/', requireAdmin, (req: Request, res: Response) => {
  const updated = dbStore.updateSettings(req.body);
  res.json({ message: 'Site configuration updated', settings: updated });
});
