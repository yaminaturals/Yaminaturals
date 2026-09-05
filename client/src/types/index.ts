export interface ProductSpecs {
  assay: string;
  activeMarker?: string;
  appearance: string;
  meshSize?: string;
  extractionRatio?: string;
  lossOnDrying?: string;
  heavyMetals?: string;
  residualSolvents?: string;
  solubility?: string;
  moq: string;
  leadTime?: string;
  shelfLife?: string;
  storage?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  botanicalName?: string;
  commonNames?: string[];
  category: string;
  partUsed?: string;
  extractionSolvent?: string;
  image?: string;
  specs: ProductSpecs;
  description: string;
  shortDescription?: string;
  applications: string[];
  certifications: string[];
  featured?: boolean;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount?: number;
}

export interface Application {
  id: string;
  name: string;
  slug: string;
  description: string;
  popularIngredients?: string[];
}

export interface Quote {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  country?: string;
  product: string;
  quantity: string;
  requiredForm?: string;
  application?: string;
  targetAssay?: string;
  destinationPort?: string;
  incoterm?: string;
  message?: string;
  status: 'New' | 'In Review' | 'Quoted' | 'Closed' | string;
  starred?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type QuoteRequest = Quote;

export interface ContactInquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  country?: string;
  inquiryType?: string;
  subject: string;
  message: string;
  status: 'New' | 'Contacted' | 'Resolved' | string;
  createdAt: string;
}

export type ContactSubmission = ContactInquiry;

export interface DocumentRequest {
  id: string;
  name: string;
  company: string;
  email: string;
  country?: string;
  documentType: 'COA' | 'TDS' | 'MSDS' | 'Specification' | string;
  productName: string;
  productId?: string;
  status?: string;
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  type: 'whitepaper' | 'regulatory-guide' | 'quality-dossier' | string;
  publishedAt: string;
  image?: string;
  tags?: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'sourcing-commercial' | 'quality-testing' | 'regulatory' | 'logistics' | string;
  order?: number;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  hqAddress: string;
  facilityAddress: string;
  defaultMoq: string;
  [key: string]: any;
}

export interface AdminStats {
  totalProducts: number;
  pendingQuotes: number;
  unreadContacts: number;
  totalDocuments: number;
  categoriesCount?: number;
}

export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  role: 'admin' | 'user';
}
