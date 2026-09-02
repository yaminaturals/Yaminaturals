import { Router, Request, Response } from 'express';
import { dbStore } from '../storage/dbStore';
import { requireAdmin } from '../middleware/auth';
import { validateInquiry } from '../middleware/validator';

export const documentRouter = Router();

documentRouter.get('/', requireAdmin, (req: Request, res: Response) => {
  const requests = dbStore.getDocuments();
  res.json({ requests, total: requests.length });
});

documentRouter.post('/', validateInquiry, (req: Request, res: Response) => {
  const data = req.body;
  if (!data.name || !data.email || !data.productName) {
    return res.status(400).json({ error: 'Name, email, and product name are required' });
  }

  const created = dbStore.createDocument(data);
  res.status(201).json({ message: 'Document request logged', id: created.id, document: created });
});

documentRouter.delete('/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = dbStore.deleteDocument(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Document request not found' });
  }

  res.json({ message: 'Document request deleted' });
});
