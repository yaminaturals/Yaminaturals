import { Router, Request, Response } from 'express';
import { dbStore } from '../storage/dbStore';
import { requireAdmin } from '../middleware/auth';

export const resourceRouter = Router();

resourceRouter.get('/', (req: Request, res: Response) => {
  const { type, q } = req.query;
  let resources = dbStore.getResources();

  if (type && type !== 'all') {
    resources = resources.filter(r => r.type === type);
  }

  if (q) {
    const search = String(q).toLowerCase();
    resources = resources.filter(r => 
      r.title.toLowerCase().includes(search) || 
      (r.summary && r.summary.toLowerCase().includes(search)) ||
      (r.content && r.content.toLowerCase().includes(search))
    );
  }

  res.json({ resources, total: resources.length });
});

resourceRouter.post('/', requireAdmin, (req: Request, res: Response) => {
  const data = req.body;
  if (!data.title || !data.type) {
    return res.status(400).json({ error: 'Title and type are required' });
  }

  const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const created = dbStore.createResource({
    ...data,
    slug,
    publishedAt: data.publishedAt || new Date().toISOString()
  });
  res.status(201).json({ message: 'Resource created', resource: created });
});

resourceRouter.put('/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = dbStore.updateResource(id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  res.json({ message: 'Resource updated', resource: updated });
});

resourceRouter.delete('/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = dbStore.deleteResource(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  res.json({ message: 'Resource deleted' });
});
