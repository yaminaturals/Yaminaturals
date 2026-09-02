import { Router, Request, Response } from 'express';
import { dbStore } from '../storage/dbStore';
import { requireAdmin } from '../middleware/auth';

export const faqRouter = Router();

faqRouter.get('/', (req: Request, res: Response) => {
  const { category } = req.query;
  let faqs = dbStore.getFaqs();

  if (category && category !== 'all') {
    faqs = faqs.filter(f => f.category === category);
  }

  res.json({ faqs, total: faqs.length });
});

faqRouter.post('/', requireAdmin, (req: Request, res: Response) => {
  const { question, answer, category } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required' });
  }

  const created = dbStore.createFaq({ question, answer, category: category || 'General' });
  res.status(201).json({ message: 'FAQ created', faq: created });
});

faqRouter.put('/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = dbStore.updateFaq(id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'FAQ not found' });
  }
  res.json({ message: 'FAQ updated', faq: updated });
});

faqRouter.delete('/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = dbStore.deleteFaq(id);
  if (!deleted) {
    return res.status(404).json({ error: 'FAQ not found' });
  }
  res.json({ message: 'FAQ deleted' });
});
