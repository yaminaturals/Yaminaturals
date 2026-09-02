import { Router, Request, Response } from 'express';
import { dbStore } from '../storage/dbStore';
import { requireAdmin } from '../middleware/auth';

export const seedRouter = Router();

seedRouter.post('/', requireAdmin, (req: Request, res: Response) => {
  dbStore.reseed();
  res.json({
    message: 'Database reseeded successfully with full botanical catalog',
    productsCount: dbStore.getProducts().length,
    categoriesCount: dbStore.getCategories().length
  });
});
