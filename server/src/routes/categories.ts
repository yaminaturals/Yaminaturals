import { Router, Request, Response } from 'express';
import { dbStore } from '../storage/dbStore';
import { requireAdmin } from '../middleware/auth';

export const categoryRouter = Router();

categoryRouter.get('/', (req: Request, res: Response) => {
  const categories = dbStore.getCategories();
  res.json({ categories, total: categories.length });
});

categoryRouter.post('/', requireAdmin, (req: Request, res: Response) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Category name is required' });
  }

  const slug = req.body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const created = dbStore.createCategory({ name, slug, description: description || '' });
  res.status(201).json({ message: 'Category created', category: created });
});

categoryRouter.put('/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = dbStore.updateCategory(id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json({ message: 'Category updated', category: updated });
});

categoryRouter.delete('/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = dbStore.deleteCategory(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json({ message: 'Category deleted' });
});
