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

settingRouter.get('/visitors', (req: Request, res: Response) => {
  const count = dbStore.getVisitorCount();
  res.json({ count });
});

settingRouter.post('/visitors/increment', (req: Request, res: Response) => {
  const count = dbStore.incrementVisitorCount();
  res.json({ count });
});
