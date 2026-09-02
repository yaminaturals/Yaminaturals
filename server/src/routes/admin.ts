import { Router, Request, Response } from 'express';
import { dbStore } from '../storage/dbStore';
import { requireAdmin } from '../middleware/auth';

export const adminRouter = Router();

adminRouter.get('/stats', requireAdmin, (req: Request, res: Response) => {
  const products = dbStore.getProducts();
  const quotes = dbStore.getQuotes();
  const contacts = dbStore.getContacts();
  const docs = dbStore.getDocuments();

  const pendingQuotes = quotes.filter(q => q.status === 'New' || q.status === 'In Review').length;
  const unreadContacts = contacts.filter(c => c.status === 'New').length;

  res.json({
    totalProducts: products.length,
    pendingQuotes,
    unreadContacts,
    totalDocuments: docs.length,
    categoriesCount: dbStore.getCategories().length
  });
});
