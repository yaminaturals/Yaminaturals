import { Router, Request, Response } from 'express';
import { dbStore } from '../storage/dbStore';
import { requireAdmin } from '../middleware/auth';

export const productRouter = Router();

productRouter.get('/', (req: Request, res: Response) => {
  const { category, application, q, featured, all } = req.query;
  let products = dbStore.getProducts();

  if (!all) {
    products = products.filter(p => p.active !== false);
  }

  if (category && category !== 'all') {
    const catStr = String(category).toLowerCase();
    products = products.filter(p => 
      p.category.toLowerCase().includes(catStr) || 
      p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === catStr
    );
  }

  if (application && application !== 'all') {
    const appStr = String(application).toLowerCase();
    products = products.filter(p => p.applications.some(a => a.toLowerCase().includes(appStr)));
  }

  if (featured === 'true') {
    products = products.filter(p => p.featured === true);
  }

  if (q) {
    const search = String(q).toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(search) ||
      (p.botanicalName || '').toLowerCase().includes(search) ||
      (p.specs?.activeMarker || '').toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search)
    );
  }

  res.json({ products, total: products.length });
});

productRouter.get('/:slugOrId', (req: Request, res: Response) => {
  const { slugOrId } = req.params;
  const s = String(slugOrId).toLowerCase();
  
  let product = dbStore.getProductBySlug(s) || dbStore.getProductById(s);

  if (!product) {
    const all = dbStore.getProducts();
    product = all.find(p => p.slug.toLowerCase() === s) ||
              all.find(p => p.slug.toLowerCase().startsWith(s) || s.startsWith(p.slug.toLowerCase())) ||
              all.find(p => p.id.toLowerCase() === s) ||
              all.find(p => p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(s));
  }

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ product });
});

productRouter.post('/', requireAdmin, (req: Request, res: Response) => {
  const data = req.body;
  if (!data.name || !data.category) {
    return res.status(400).json({ error: 'Product name and category are required' });
  }

  const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const created = dbStore.createProduct({
    ...data,
    slug
  });

  res.status(201).json({ message: 'Product created successfully', product: created, id: created.id });
});

productRouter.put('/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = dbStore.updateProduct(id, req.body);

  if (!updated) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ message: 'Product updated successfully', product: updated });
});

productRouter.delete('/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = dbStore.deleteProduct(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ message: 'Product deleted successfully' });
});
