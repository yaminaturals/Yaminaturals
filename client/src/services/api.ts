import {
  Product,
  Category,
  Application,
  Quote,
  ContactInquiry,
  DocumentRequest,
  Resource,
  FAQ,
  SiteSettings,
  AdminStats
} from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Retrieve secure session token
export const getAuthToken = (): string | null => {
  return sessionStorage.getItem('yn_auth_token') || localStorage.getItem('yn_auth_token');
};

export const setAuthToken = (token: string | null): void => {
  if (token) {
    sessionStorage.setItem('yn_auth_token', token);
  } else {
    sessionStorage.removeItem('yn_auth_token');
    localStorage.removeItem('yn_auth_token');
  }
};

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const token = getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers as Record<string, string> || {}),
    };

    const res = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `HTTP error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`API Fetch error on ${url}:`, err);
    throw err;
  }
}

export const api = {
  // Authentication
  login: async (credentials: { email?: string; password?: string; firebaseToken?: string }) => {
    const res = await fetchJson<{ message: string; token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (res.token) {
      setAuthToken(res.token);
    }
    return res;
  },

  verifyAuth: async () => {
    return fetchJson<{ user: any; status: string }>('/auth/me');
  },

  // File Upload
  uploadFile: async (file: File): Promise<{ url: string; filename: string }> => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'File upload failed');
    }
    return await res.json();
  },

  // Products
  getProducts: async (query?: { category?: string; application?: string; form?: string; q?: string; featured?: boolean; all?: boolean }): Promise<Product[]> => {
    try {
      const params = new URLSearchParams();
      if (query) {
        Object.entries(query).forEach(([k, v]) => {
          if (v !== undefined) params.append(k, String(v));
        });
      }
      const qStr = params.toString() ? `?${params.toString()}` : '';
      const res = await fetchJson<{ products: Product[] }>(`/products${qStr}`);
      return res.products || [];
    } catch {
      return [];
    }
  },

  getProductBySlug: async (slug: string): Promise<Product | null> => {
    try {
      const res = await fetchJson<{ product: Product }>(`/products/${slug}`);
      return res.product || null;
    } catch {
      return null;
    }
  },

  createProduct: async (productData: Partial<Product>): Promise<{ message: string; id: string }> => {
    return fetchJson<{ message: string; id: string }>('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  updateProduct: async (id: string, productData: Partial<Product>): Promise<{ message: string; product: Product }> => {
    return fetchJson<{ message: string; product: Product }>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  deleteProduct: async (id: string): Promise<{ message: string }> => {
    return fetchJson<{ message: string }>(`/products/${id}`, {
      method: 'DELETE',
    });
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const res = await fetchJson<{ categories: Category[] }>('/categories');
      return res.categories || [];
    } catch {
      return [];
    }
  },

  createCategory: async (data: Partial<Category>): Promise<{ message: string; category: Category }> => {
    return fetchJson<{ message: string; category: Category }>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateCategory: async (id: string, data: Partial<Category>): Promise<{ message: string; category: Category }> => {
    return fetchJson<{ message: string; category: Category }>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteCategory: async (id: string): Promise<{ message: string }> => {
    return fetchJson<{ message: string }>(`/categories/${id}`, {
      method: 'DELETE',
    });
  },

  // Applications
  getApplications: async (): Promise<Application[]> => {
    try {
      const res = await fetchJson<{ applications: Application[] }>('/applications');
      return res.applications || [];
    } catch {
      return [];
    }
  },

  createApplication: async (data: Partial<Application>): Promise<{ message: string; application: Application }> => {
    return fetchJson<{ message: string; application: Application }>('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateApplication: async (id: string, data: Partial<Application>): Promise<{ message: string; application: Application }> => {
    return fetchJson<{ message: string; application: Application }>(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteApplication: async (id: string): Promise<{ message: string }> => {
    return fetchJson<{ message: string }>(`/applications/${id}`, {
      method: 'DELETE',
    });
  },

  // Quotes / RFQ
  createQuote: async (data: Partial<Quote>): Promise<{ message: string; id: string }> => {
    return fetchJson<{ message: string; id: string }>('/quotes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getAdminQuotes: async (status?: string): Promise<Quote[]> => {
    try {
      const qStr = status ? `?status=${status}` : '';
      const res = await fetchJson<{ quotes: Quote[] }>(`/quotes${qStr}`);
      return res.quotes || [];
    } catch {
      return [];
    }
  },

  updateQuoteStatus: async (id: string, status: string, notes?: string): Promise<{ message: string }> => {
    return fetchJson<{ message: string }>(`/quotes/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
  },

  toggleQuoteStar: async (id: string, starred?: boolean): Promise<{ message: string; quote: Quote }> => {
    return fetchJson<{ message: string; quote: Quote }>(`/quotes/${id}/star`, {
      method: 'PATCH',
      body: JSON.stringify({ starred }),
    });
  },

  deleteQuote: async (id: string): Promise<{ message: string }> => {
    return fetchJson<{ message: string }>(`/quotes/${id}`, {
      method: 'DELETE',
    });
  },

  // Contacts
  createContact: async (data: Partial<ContactInquiry>): Promise<{ message: string; id: string }> => {
    return fetchJson<{ message: string; id: string }>('/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getAdminContacts: async (status?: string): Promise<ContactInquiry[]> => {
    try {
      const qStr = status ? `?status=${status}` : '';
      const res = await fetchJson<{ contacts: ContactInquiry[] }>(`/contacts${qStr}`);
      return res.contacts || [];
    } catch {
      return [];
    }
  },

  updateContactStatus: async (id: string, status: string): Promise<{ message: string }> => {
    return fetchJson<{ message: string }>(`/contacts/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  deleteContact: async (id: string): Promise<{ message: string }> => {
    return fetchJson<{ message: string }>(`/contacts/${id}`, {
      method: 'DELETE',
    });
  },

  // Documents (COA/TDS)
  createDocumentRequest: async (data: Partial<DocumentRequest>): Promise<{ message: string; id: string }> => {
    return fetchJson<{ message: string; id: string }>('/documents', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getAdminDocuments: async (): Promise<DocumentRequest[]> => {
    try {
      const res = await fetchJson<{ requests: DocumentRequest[] }>('/documents');
      return res.requests || [];
    } catch {
      return [];
    }
  },

  deleteDocument: async (id: string): Promise<{ message: string }> => {
    return fetchJson<{ message: string }>(`/documents/${id}`, {
      method: 'DELETE',
    });
  },

  // Resources
  getResources: async (type?: string): Promise<Resource[]> => {
    try {
      const qStr = type ? `?type=${type}` : '';
      const res = await fetchJson<{ resources: Resource[] }>(`/resources${qStr}`);
      return res.resources || [];
    } catch {
      return [];
    }
  },

  getResourceBySlug: async (slug: string): Promise<Resource | null> => {
    try {
      const res = await fetchJson<{ resource: Resource }>(`/resources/${slug}`);
      return res.resource || null;
    } catch {
      return null;
    }
  },

  createResource: async (data: Partial<Resource>): Promise<{ message: string; resource: Resource }> => {
    return fetchJson<{ message: string; resource: Resource }>('/resources', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateResource: async (id: string, data: Partial<Resource>): Promise<{ message: string; resource: Resource }> => {
    return fetchJson<{ message: string; resource: Resource }>(`/resources/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteResource: async (id: string): Promise<{ message: string }> => {
    return fetchJson<{ message: string }>(`/resources/${id}`, {
      method: 'DELETE',
    });
  },

  // FAQs
  getFaqs: async (category?: string): Promise<FAQ[]> => {
    try {
      const qStr = category ? `?category=${category}` : '';
      const res = await fetchJson<{ faqs: FAQ[] }>(`/faqs${qStr}`);
      return res.faqs || [];
    } catch {
      return [];
    }
  },

  createFaq: async (data: Partial<FAQ>): Promise<{ message: string; faq: FAQ }> => {
    return fetchJson<{ message: string; faq: FAQ }>('/faqs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateFaq: async (id: string, data: Partial<FAQ>): Promise<{ message: string; faq: FAQ }> => {
    return fetchJson<{ message: string; faq: FAQ }>(`/faqs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteFaq: async (id: string): Promise<{ message: string }> => {
    return fetchJson<{ message: string }>(`/faqs/${id}`, {
      method: 'DELETE',
    });
  },

  // Settings
  getSettings: async (): Promise<{ settings: SiteSettings }> => {
    return fetchJson<{ settings: SiteSettings }>('/settings');
  },

  updateSettings: async (settings: Partial<SiteSettings>): Promise<{ message: string; settings: SiteSettings }> => {
    return fetchJson<{ message: string; settings: SiteSettings }>('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },

  // Visitors
  getVisitorCount: async (): Promise<{ count: number }> => {
    return fetchJson<{ count: number }>('/settings/visitors');
  },

  incrementVisitorCount: async (): Promise<{ count: number }> => {
    return fetchJson<{ count: number }>('/settings/visitors/increment', {
      method: 'POST'
    });
  },

  // Admin Stats
  getAdminStats: async (): Promise<AdminStats> => {
    return fetchJson<AdminStats>('/admin/stats');
  },

  adminReseed: async (): Promise<{ message: string }> => {
    return fetchJson<{ message: string }>('/seed', {
      method: 'POST',
    });
  }
};
