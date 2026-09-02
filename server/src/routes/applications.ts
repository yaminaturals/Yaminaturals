import { Router, Request, Response } from 'express';
import { dbStore } from '../storage/dbStore';
import { requireAdmin } from '../middleware/auth';

export const applicationRouter = Router();

applicationRouter.get('/', (req: Request, res: Response) => {
  const applications = dbStore.getApplications();
  res.json({ applications, total: applications.length });
});

applicationRouter.post('/', requireAdmin, (req: Request, res: Response) => {
  const { name, description, popularIngredients } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Application name is required' });
  }

  const slug = req.body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const created = dbStore.createApplication({ 
    name, 
    slug,
    description: description || '', 
    popularIngredients: popularIngredients || [] 
  });
  res.status(201).json({ message: 'Application created', application: created });
});

applicationRouter.put('/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = dbStore.updateApplication(id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Application not found' });
  }
  res.json({ message: 'Application updated', application: updated });
});

applicationRouter.delete('/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = dbStore.deleteApplication(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Application not found' });
  }
  res.json({ message: 'Application deleted' });
});
