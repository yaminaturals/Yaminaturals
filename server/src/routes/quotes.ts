import { Router, Request, Response } from 'express';
import { dbStore } from '../storage/dbStore';
import { requireAdmin } from '../middleware/auth';
import { validateInquiry } from '../middleware/validator';

export const quoteRouter = Router();

quoteRouter.get('/', requireAdmin, (req: Request, res: Response) => {
  const { status } = req.query;
  let quotes = dbStore.getQuotes();

  if (status && status !== 'all') {
    quotes = quotes.filter(q => q.status === status);
  }

  res.json({ quotes, total: quotes.length });
});

quoteRouter.post('/', validateInquiry, (req: Request, res: Response) => {
  const data = req.body;
  if (!data.name || !data.email || !data.product) {
    return res.status(400).json({ error: 'Name, email, and product name are required' });
  }

  const created = dbStore.createQuote(data);
  res.status(201).json({ message: 'RFQ quote received successfully', id: created.id, quote: created });
});

quoteRouter.patch('/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const updated = dbStore.updateQuoteStatus(id, status, notes);

  if (!updated) {
    return res.status(404).json({ error: 'Quote not found' });
  }

  res.json({ message: 'Quote status updated', quote: updated });
});

quoteRouter.patch('/:id/star', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { starred } = req.body;
  const updated = dbStore.toggleQuoteStar(id, starred);

  if (!updated) {
    return res.status(404).json({ error: 'Quote not found' });
  }

  res.json({ message: 'Quote star toggled', quote: updated });
});

quoteRouter.delete('/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = dbStore.deleteQuote(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Quote not found' });
  }

  res.json({ message: 'Quote deleted' });
});
