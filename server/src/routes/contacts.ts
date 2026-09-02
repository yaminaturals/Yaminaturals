import { Router, Request, Response } from 'express';
import { dbStore } from '../storage/dbStore';
import { requireAdmin } from '../middleware/auth';
import { validateInquiry } from '../middleware/validator';

export const contactRouter = Router();

contactRouter.get('/', requireAdmin, (req: Request, res: Response) => {
  const { status } = req.query;
  let contacts = dbStore.getContacts();

  if (status && status !== 'all') {
    contacts = contacts.filter(c => c.status === status);
  }

  res.json({ contacts, total: contacts.length });
});

contactRouter.post('/', validateInquiry, (req: Request, res: Response) => {
  const data = req.body;
  if (!data.name || !data.email || !data.message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const created = dbStore.createContact(data);
  res.status(201).json({ message: 'Inquiry received', id: created.id, contact: created });
});

contactRouter.patch('/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = dbStore.updateContactStatus(id, status);

  if (!updated) {
    return res.status(404).json({ error: 'Contact inquiry not found' });
  }

  res.json({ message: 'Status updated', contact: updated });
});

contactRouter.delete('/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = dbStore.deleteContact(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Contact inquiry not found' });
  }

  res.json({ message: 'Contact inquiry deleted' });
});
