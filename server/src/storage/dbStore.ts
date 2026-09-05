import fs from 'fs';
import path from 'path';
import {
  Product,
  Category,
  Application,
  Quote,
  ContactInquiry,
  DocumentRequest,
  Resource,
  FAQ,
  SiteSettings
} from '../models/types';
import {
  seedProducts,
  seedCategories,
  seedApplications,
  seedResources,
  seedFaqs,
  defaultSettings
} from '../data/seedData';

interface DatabaseSchema {
  products: Product[];
  categories: Category[];
  applications: Application[];
  quotes: Quote[];
  contacts: ContactInquiry[];
  documents: DocumentRequest[];
  resources: Resource[];
  faqs: FAQ[];
  settings: SiteSettings;
  visitorCount?: number;
}

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

class DatabaseStore {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDataDirectory();
    this.data = this.loadDatabase();
  }

  private ensureDataDirectory(): void {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadDatabase(): DatabaseSchema {
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      } catch (err) {
        console.error('Error reading db.json, falling back to initial seed:', err);
      }
    }

    const initial: DatabaseSchema = {
      products: seedProducts,
      categories: seedCategories,
      applications: seedApplications,
      quotes: [],
      contacts: [],
      documents: [],
      resources: seedResources,
      faqs: seedFaqs,
      settings: defaultSettings
    };

    this.save(initial);
    return initial;
  }

  private save(dataToSave?: DatabaseSchema): void {
    const toWrite = dataToSave || this.data;
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(toWrite, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error persisting db.json:', err);
    }
  }

  public resetToSeed(): DatabaseSchema {
    this.data = {
      products: seedProducts,
      categories: seedCategories,
      applications: seedApplications,
      quotes: [],
      contacts: [],
      documents: [],
      resources: seedResources,
      faqs: seedFaqs,
      settings: defaultSettings
    };
    this.save();
    return this.data;
  }

  // Products
  public getProducts(): Product[] {
    return this.data.products;
  }

  public getProductById(id: string): Product | undefined {
    return this.data.products.find(p => p.id === id);
  }

  public getProductBySlug(slug: string): Product | undefined {
    return this.data.products.find(p => p.slug === slug);
  }

  public createProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
    const newProduct: Product = {
      ...product,
      id: 'prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      createdAt: new Date().toISOString(),
      active: product.active !== undefined ? product.active : true,
      featured: product.featured !== undefined ? product.featured : false
    };
    this.data.products.unshift(newProduct);
    this.save();
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.data.products[idx] = {
      ...this.data.products[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.products[idx];
  }

  public deleteProduct(id: string): boolean {
    const initialLen = this.data.products.length;
    this.data.products = this.data.products.filter(p => p.id !== id);
    if (this.data.products.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Categories
  public getCategories(): Category[] {
    return this.data.categories;
  }

  public createCategory(cat: Omit<Category, 'id'>): Category {
    const newCat: Category = {
      ...cat,
      id: 'cat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6)
    };
    this.data.categories.push(newCat);
    this.save();
    return newCat;
  }

  public updateCategory(id: string, updates: Partial<Category>): Category | null {
    const idx = this.data.categories.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.data.categories[idx] = { ...this.data.categories[idx], ...updates };
    this.save();
    return this.data.categories[idx];
  }

  public deleteCategory(id: string): boolean {
    const initialLen = this.data.categories.length;
    this.data.categories = this.data.categories.filter(c => c.id !== id);
    if (this.data.categories.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Applications
  public getApplications(): Application[] {
    return this.data.applications;
  }

  public createApplication(app: Omit<Application, 'id'>): Application {
    const newApp: Application = {
      ...app,
      id: 'app_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6)
    };
    this.data.applications.push(newApp);
    this.save();
    return newApp;
  }

  public updateApplication(id: string, updates: Partial<Application>): Application | null {
    const idx = this.data.applications.findIndex(a => a.id === id);
    if (idx === -1) return null;
    this.data.applications[idx] = { ...this.data.applications[idx], ...updates };
    this.save();
    return this.data.applications[idx];
  }

  public deleteApplication(id: string): boolean {
    const initialLen = this.data.applications.length;
    this.data.applications = this.data.applications.filter(a => a.id !== id);
    if (this.data.applications.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Quotes
  public getQuotes(): Quote[] {
    return this.data.quotes;
  }

  public createQuote(quote: Omit<Quote, 'id' | 'createdAt' | 'status'> & { status?: string }): Quote {
    const newQuote: Quote = {
      ...quote,
      id: 'rfq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      status: quote.status || 'New',
      createdAt: new Date().toISOString()
    };
    this.data.quotes.unshift(newQuote);
    this.save();
    return newQuote;
  }

  public updateQuoteStatus(id: string, status: string, notes?: string): Quote | null {
    const idx = this.data.quotes.findIndex(q => q.id === id);
    if (idx === -1) return null;
    this.data.quotes[idx].status = status;
    this.data.quotes[idx].updatedAt = new Date().toISOString();
    if (notes) this.data.quotes[idx].message = notes;
    this.save();
    return this.data.quotes[idx];
  }

  public deleteQuote(id: string): boolean {
    const initLen = this.data.quotes.length;
    this.data.quotes = this.data.quotes.filter(q => q.id !== id);
    if (this.data.quotes.length !== initLen) {
      this.save();
      return true;
    }
    return false;
  }

  public toggleQuoteStar(id: string, starred?: boolean): Quote | null {
    const idx = this.data.quotes.findIndex(q => q.id === id);
    if (idx === -1) return null;
    this.data.quotes[idx].starred = starred !== undefined ? starred : !this.data.quotes[idx].starred;
    this.data.quotes[idx].updatedAt = new Date().toISOString();
    this.save();
    return this.data.quotes[idx];
  }

  // Contacts
  public getContacts(): ContactInquiry[] {
    return this.data.contacts;
  }

  public createContact(contact: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'> & { status?: string }): ContactInquiry {
    const newContact: ContactInquiry = {
      ...contact,
      id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      status: contact.status || 'New',
      createdAt: new Date().toISOString()
    };
    this.data.contacts.unshift(newContact);
    this.save();
    return newContact;
  }

  public updateContactStatus(id: string, status: string): ContactInquiry | null {
    const idx = this.data.contacts.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.data.contacts[idx].status = status;
    this.save();
    return this.data.contacts[idx];
  }

  public deleteContact(id: string): boolean {
    const initLen = this.data.contacts.length;
    this.data.contacts = this.data.contacts.filter(c => c.id !== id);
    if (this.data.contacts.length !== initLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Documents
  public getDocuments(): DocumentRequest[] {
    return this.data.documents;
  }

  public createDocument(doc: Omit<DocumentRequest, 'id' | 'createdAt'>): DocumentRequest {
    const newDoc: DocumentRequest = {
      ...doc,
      id: 'doc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      createdAt: new Date().toISOString(),
      status: 'Fulfilled'
    };
    this.data.documents.unshift(newDoc);
    this.save();
    return newDoc;
  }

  public deleteDocument(id: string): boolean {
    const initLen = this.data.documents.length;
    this.data.documents = this.data.documents.filter(d => d.id !== id);
    if (this.data.documents.length !== initLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Resources
  public getResources(): Resource[] {
    return this.data.resources;
  }

  public getResourceBySlug(slug: string): Resource | undefined {
    return this.data.resources.find(r => r.slug === slug);
  }

  public createResource(res: Omit<Resource, 'id'>): Resource {
    const newRes: Resource = {
      ...res,
      id: 'res_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6)
    };
    this.data.resources.unshift(newRes);
    this.save();
    return newRes;
  }

  public updateResource(id: string, updates: Partial<Resource>): Resource | null {
    const idx = this.data.resources.findIndex(r => r.id === id);
    if (idx === -1) return null;
    this.data.resources[idx] = { ...this.data.resources[idx], ...updates };
    this.save();
    return this.data.resources[idx];
  }

  public deleteResource(id: string): boolean {
    const initLen = this.data.resources.length;
    this.data.resources = this.data.resources.filter(r => r.id !== id);
    if (this.data.resources.length !== initLen) {
      this.save();
      return true;
    }
    return false;
  }

  // FAQs
  public getFaqs(): FAQ[] {
    return this.data.faqs;
  }

  public createFaq(faq: Omit<FAQ, 'id'>): FAQ {
    const newFaq: FAQ = {
      ...faq,
      id: 'faq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6)
    };
    this.data.faqs.push(newFaq);
    this.save();
    return newFaq;
  }

  public updateFaq(id: string, updates: Partial<FAQ>): FAQ | null {
    const idx = this.data.faqs.findIndex(f => f.id === id);
    if (idx === -1) return null;
    this.data.faqs[idx] = { ...this.data.faqs[idx], ...updates };
    this.save();
    return this.data.faqs[idx];
  }

  public deleteFaq(id: string): boolean {
    const initLen = this.data.faqs.length;
    this.data.faqs = this.data.faqs.filter(f => f.id !== id);
    if (this.data.faqs.length !== initLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Settings
  public getSettings(): SiteSettings {
    return this.data.settings;
  }

  public updateSettings(settings: Partial<SiteSettings>): SiteSettings {
    this.data.settings = {
      ...this.data.settings,
      ...settings
    };
    this.save();
    return this.data.settings;
  }

  // Visitor Counter
  public getVisitorCount(): number {
    return this.data.visitorCount || 14892;
  }

  public incrementVisitorCount(): number {
    this.data.visitorCount = (this.data.visitorCount || 14892) + 1;
    this.save();
    return this.data.visitorCount;
  }

  public reseed(): void {
    this.data = {
      products: seedProducts,
      categories: seedCategories,
      applications: seedApplications,
      quotes: [],
      contacts: [],
      documents: [],
      resources: seedResources,
      faqs: seedFaqs,
      settings: defaultSettings
    };
    this.save();
  }
}

export const dbStore = new DatabaseStore();
