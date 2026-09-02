import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Product, Category, Application } from '../../types';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  X, 
  Check, 
  Eye, 
  EyeOff, 
  Star, 
  Loader2, 
  FileText, 
  Layers, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [applicationsList, setApplicationsList] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  // Notification
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Modals & Delete Confirm
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const initialForm = {
    name: '',
    slug: '',
    botanicalName: '',
    category: 'Standardized Extracts',
    partUsed: 'Roots & Rhizomes',
    extractionSolvent: 'Purified Water : Ethanol (80:20)',
    description: '',
    shortDescription: '',
    active: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    applications: ['Dietary Supplements', 'Capsules & Tablets'],
    certifications: ['cGMP Certified', 'ISO 22000', 'Halal Certified', 'Kosher Certified', 'Non-GMO'],
    specs: {
      assay: '5.0% by HPLC',
      activeMarker: 'Withanolides',
      extractionRatio: '10:1',
      appearance: 'Fine Light Brown Free-Flowing Powder',
      meshSize: '100% through 80 mesh',
      solubility: 'Partially soluble in water & ethanol',
      lossOnDrying: '< 5.0% w/w (USP <731>)',
      heavyMetals: '< 10 ppm total by ICP-MS (USP <2232>)',
      residualSolvents: 'Complies with USP <467> Class 3',
      moq: '25 kg (1 HDPE Drum)',
      leadTime: 'Immediate dispatch / In Stock',
      shelfLife: '36 months from date of manufacture',
      storage: 'Store below 25°C in sealed nitrogen barrier'
    },
    documents: {
      coaUrl: '',
      tdsUrl: '',
      msdsUrl: ''
    },
    seo: {
      title: '',
      description: '',
      keywords: ''
    }
  };

  const [formData, setFormData] = useState(initialForm);
  const [editorTab, setEditorTab] = useState<'basic' | 'specs' | 'applications' | 'packaging' | 'docs' | 'seo'>('basic');

  const fetchAll = () => {
    setLoading(true);
    Promise.all([
      api.getProducts({ all: true }),
      api.getCategories(),
      api.getApplications()
    ])
      .then(([prodRes, catRes, appRes]) => {
        setProducts(prodRes || []);
        setCategories(catRes || []);
        setApplicationsList(appRes || []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setEditorTab('basic');
    setEditorOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name || '',
      slug: p.slug || '',
      botanicalName: p.botanicalName || '',
      category: p.category || 'Standardized Extracts',
      partUsed: p.partUsed || '',
      extractionSolvent: p.extractionSolvent || '',
      description: p.description || '',
      shortDescription: p.shortDescription || '',
      active: p.active !== undefined ? p.active : true,
      featured: p.featured !== undefined ? p.featured : false,
      image: p.image || '',
      applications: p.applications || [],
      certifications: p.certifications || [],
      specs: {
        assay: p.specs?.assay || '',
        activeMarker: p.specs?.activeMarker || '',
        extractionRatio: p.specs?.extractionRatio || '',
        appearance: p.specs?.appearance || '',
        meshSize: p.specs?.meshSize || '',
        solubility: p.specs?.solubility || '',
        lossOnDrying: p.specs?.lossOnDrying || '',
        heavyMetals: p.specs?.heavyMetals || '',
        residualSolvents: p.specs?.residualSolvents || '',
        moq: p.specs?.moq || '',
        leadTime: p.specs?.leadTime || '',
        shelfLife: p.specs?.shelfLife || '',
        storage: p.specs?.storage || ''
      },
      documents: {
        coaUrl: (p as any).documents?.coaUrl || '',
        tdsUrl: (p as any).documents?.tdsUrl || '',
        msdsUrl: (p as any).documents?.msdsUrl || ''
      },
      seo: {
        title: (p as any).seo?.title || '',
        description: (p as any).seo?.description || '',
        keywords: (p as any).seo?.keywords || ''
      }
    });
    setEditorTab('basic');
    setEditorOpen(true);
  };

  const handleGenerateSlug = () => {
    if (formData.name) {
      const generated = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData({ ...formData, slug: generated });
    }
  };

  const handleTogglePublish = async (p: Product) => {
    try {
      const nextState = !p.active;
      await api.updateProduct(p.id, { active: nextState });
      showNotification(`Product ${nextState ? 'published' : 'unpublished'} successfully`);
      fetchAll();
    } catch (err: any) {
      showNotification(err.message || 'Error updating publish state', 'error');
    }
  };

  const handleToggleFeatured = async (p: Product) => {
    try {
      const nextState = !p.featured;
      await api.updateProduct(p.id, { featured: nextState });
      showNotification(`Product ${nextState ? 'marked as featured' : 'unfeatured'} successfully`);
      fetchAll();
    } catch (err: any) {
      showNotification(err.message || 'Error updating featured state', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteProduct(id);
      showNotification('Product deleted permanently from database');
      setDeleteConfirmId(null);
      fetchAll();
    } catch (err: any) {
      showNotification(err.message || 'Error deleting product', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: Partial<Product> = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        botanicalName: formData.botanicalName,
        category: formData.category,
        partUsed: formData.partUsed,
        extractionSolvent: formData.extractionSolvent,
        description: formData.description,
        shortDescription: formData.shortDescription || formData.description.slice(0, 150),
        active: formData.active,
        featured: formData.featured,
        image: formData.image,
        applications: formData.applications,
        certifications: formData.certifications,
        specs: formData.specs,
        ...(formData.documents ? { documents: formData.documents } as any : {}),
        ...(formData.seo ? { seo: formData.seo } as any : {})
      };

      if (editingProduct) {
        await api.updateProduct(editingProduct.id, payload);
        showNotification(`Product "${formData.name}" updated successfully`);
      } else {
        await api.createProduct(payload);
        showNotification(`Product "${formData.name}" created successfully`);
      }
      setEditorOpen(false);
      fetchAll();
    } catch (err: any) {
      showNotification(err.message || 'Error saving product', 'error');
    }
  };

  const filtered = products.filter(p => {
    const term = search.toLowerCase();
    const matchSearch = !term || 
      p.name.toLowerCase().includes(term) || 
      (p.botanicalName || '').toLowerCase().includes(term) ||
      (p.specs?.activeMarker || '').toLowerCase().includes(term);

    const matchCat = selectedCat === 'all' || p.category === selectedCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {notification && (
        <div className={`p-4 rounded-xl text-xs font-mono font-semibold flex items-center justify-between shadow-lg ${
          notification.type === 'success' ? 'bg-emerald-950 text-emerald-200 border border-emerald-700' : 'bg-red-950 text-red-200 border border-red-700'
        }`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="text-white hover:opacity-80">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Botanical Product Catalog</h1>
          <p className="text-xs text-slate-500 mt-1">Manage standardized extract monographs, HPLC assays, and technical dossiers</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="btn btn-primary text-xs py-2.5 px-4 flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Plus size={14} />
          <span>Add New Ingredient</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, Latin binomial, assay..."
            className="form-input pl-9 text-xs py-2 w-full"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="form-select text-xs py-2 px-3 bg-slate-50 border-slate-200"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>

          <div className="text-slate-500 font-mono text-[11px]">
            Total: <span className="font-bold text-slate-900">{filtered.length}</span>
          </div>
        </div>
      </div>

      {/* Product Table */}
      {loading ? (
        <div className="py-24 text-center bg-white rounded-xl border border-slate-200">
          <Loader2 size={36} className="animate-spin text-emerald-800 mx-auto mb-2" />
          <p className="text-xs text-slate-500 font-mono">Loading product library...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
          <p className="text-sm text-slate-600 mb-4">No products found matching query.</p>
          <button onClick={() => { setSearch(''); setSelectedCat('all'); }} className="btn btn-outline text-xs">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Ingredient Name &amp; Latin Binomial</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Standardized Assay</th>
                  <th className="py-3.5 px-4">MOQ</th>
                  <th className="py-3.5 px-4 text-center">Featured</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={p.image || 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=100&q=80'} 
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900 hover:text-emerald-800 transition">
                            <Link to={`/products/${p.slug}`} target="_blank" className="flex items-center gap-1">
                              <span>{p.name}</span>
                              <ExternalLink size={11} className="text-slate-400" />
                            </Link>
                          </div>
                          {p.botanicalName && (
                            <div className="text-[11px] font-serif italic text-gold-700">
                              {p.botanicalName}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono font-medium">
                        {p.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-emerald-900 font-bold">
                      {p.specs?.assay || '-'}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 text-[11px]">
                      {p.specs?.moq || '25 kg'}
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(p)}
                        className={`p-1.5 rounded transition ${
                          p.featured ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title={p.featured ? 'Featured (Click to unfeature)' : 'Not featured (Click to feature)'}
                      >
                        <Star size={15} className={p.featured ? 'fill-amber-500' : ''} />
                      </button>
                    </td>

                    {/* Published / Unpublished Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleTogglePublish(p)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold transition ${
                          p.active !== false
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {p.active !== false ? <Eye size={12} /> : <EyeOff size={12} />}
                        <span>{p.active !== false ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-slate-600 hover:text-emerald-800 hover:bg-slate-100 rounded transition"
                          title="Edit Technical Monograph"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                          title="Delete Ingredient"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Confirm Delete Product</h3>
            <p className="text-xs text-slate-600 mb-6">Are you sure you want to delete this ingredient monograph from the database? All linked specifications will be permanently removed.</p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setDeleteConfirmId(null)} className="btn btn-outline text-xs py-2">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirmId)} className="btn btn-primary bg-red-700 hover:bg-red-800 border-red-800 text-xs py-2">Delete Permanently</button>
            </div>
          </div>
        </div>
      )}

      {/* Full Complete Product Editor Modal */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingProduct ? `Edit Monograph: ${editingProduct.name}` : 'Create New Botanical Ingredient'}
                </h3>
                <p className="text-xs text-slate-500 font-mono">B2B Pharmacopoeial Specification Builder</p>
              </div>
              <button onClick={() => setEditorOpen(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X size={20} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-100 bg-white overflow-x-auto">
              {[
                { id: 'basic', label: '1. Basic Information' },
                { id: 'specs', label: '2. Specifications & Assay' },
                { id: 'applications', label: '3. Applications & Certs' },
                { id: 'packaging', label: '4. Packaging & Storage' },
                { id: 'docs', label: '5. Documents (COA/TDS)' },
                { id: 'seo', label: '6. SEO & Meta' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setEditorTab(tab.id as any)}
                  className={`pb-3 text-xs font-mono font-bold uppercase tracking-wider transition border-b-2 ${
                    editorTab === tab.id
                      ? 'border-emerald-800 text-emerald-900'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              {/* TAB 1: Basic Information */}
              {editorTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Product / Ingredient Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ashwagandha Extract 5% Withanolides"
                        className="form-input text-xs py-2"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-mono font-bold text-slate-700">URL Slug *</label>
                        <button 
                          type="button" 
                          onClick={handleGenerateSlug}
                          className="text-[10px] text-emerald-800 hover:underline font-mono"
                        >
                          Auto-generate from Name
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="e.g. ashwagandha-extract-5-withanolides"
                        className="form-input text-xs py-2 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Botanical Latin Binomial</label>
                      <input
                        type="text"
                        value={formData.botanicalName}
                        onChange={(e) => setFormData({ ...formData, botanicalName: e.target.value })}
                        placeholder="e.g. Withania somnifera"
                        className="form-input text-xs py-2 italic font-serif"
                      />
                    </div>

                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="form-select text-xs py-2"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Plant Part Used</label>
                      <input
                        type="text"
                        value={formData.partUsed}
                        onChange={(e) => setFormData({ ...formData, partUsed: e.target.value })}
                        placeholder="e.g. Roots & Rhizomes"
                        className="form-input text-xs py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-1">Extraction Solvent &amp; Ratio</label>
                    <input
                      type="text"
                      value={formData.extractionSolvent}
                      onChange={(e) => setFormData({ ...formData, extractionSolvent: e.target.value })}
                      placeholder="e.g. Purified Water : Ethanol (80:20)"
                      className="form-input text-xs py-2"
                    />
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-1">Short Description (for Catalog Cards)</label>
                    <textarea
                      rows={2}
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      placeholder="Brief 1-2 sentence pharmacopoeial summary..."
                      className="form-input text-xs py-2"
                    />
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-1">Full Monograph Description</label>
                    <textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Comprehensive technical and extraction overview..."
                      className="form-input text-xs py-2"
                    />
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-1">Primary Image URL</label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="form-input text-xs py-2 font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                        className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-800"
                      />
                      <span className="font-bold text-slate-900">Publish Immediately (Visible in Catalog)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="font-bold text-slate-900">Feature on Homepage</span>
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2: Specifications & Assay */}
              {editorTab === 'specs' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Standardized Assay *</label>
                      <input
                        type="text"
                        required
                        value={formData.specs.assay}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, assay: e.target.value } })}
                        placeholder="e.g. >= 5.0% by HPLC"
                        className="form-input text-xs py-2 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Target Active Marker(s)</label>
                      <input
                        type="text"
                        value={formData.specs.activeMarker}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, activeMarker: e.target.value } })}
                        placeholder="e.g. Withanolide A, Withaferin A"
                        className="form-input text-xs py-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Extraction Native Ratio</label>
                      <input
                        type="text"
                        value={formData.specs.extractionRatio}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, extractionRatio: e.target.value } })}
                        placeholder="e.g. 10:1"
                        className="form-input text-xs py-2 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Appearance &amp; Color</label>
                      <input
                        type="text"
                        value={formData.specs.appearance}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, appearance: e.target.value } })}
                        placeholder="e.g. Fine Light Brown Powder"
                        className="form-input text-xs py-2"
                      />
                    </div>

                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Particle Mesh Sizing</label>
                      <input
                        type="text"
                        value={formData.specs.meshSize}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, meshSize: e.target.value } })}
                        placeholder="e.g. 100% through 80 mesh"
                        className="form-input text-xs py-2 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Solubility Protocol</label>
                      <input
                        type="text"
                        value={formData.specs.solubility}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, solubility: e.target.value } })}
                        placeholder="e.g. 100% Cold Water Soluble"
                        className="form-input text-xs py-2"
                      />
                    </div>

                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Loss on Drying (Moisture)</label>
                      <input
                        type="text"
                        value={formData.specs.lossOnDrying}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, lossOnDrying: e.target.value } })}
                        placeholder="e.g. < 5.0% w/w (USP <731>)"
                        className="form-input text-xs py-2 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Heavy Metals (ICP-MS)</label>
                      <input
                        type="text"
                        value={formData.specs.heavyMetals}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, heavyMetals: e.target.value } })}
                        placeholder="e.g. < 10 ppm total by ICP-MS (USP <2232>)"
                        className="form-input text-xs py-2 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Residual Solvents (GC-MS)</label>
                      <input
                        type="text"
                        value={formData.specs.residualSolvents}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, residualSolvents: e.target.value } })}
                        placeholder="e.g. Complies with USP <467> Class 3"
                        className="form-input text-xs py-2 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Applications & Certifications */}
              {editorTab === 'applications' && (
                <div className="space-y-6">
                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-2">Formulation Applications (Comma-separated)</label>
                    <input
                      type="text"
                      value={formData.applications.join(', ')}
                      onChange={(e) => setFormData({ ...formData, applications: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      placeholder="e.g. Dietary Supplements, Sports Nutrition, Functional Beverages"
                      className="form-input text-xs py-2 mb-2"
                    />
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {['Dietary Supplements', 'Sports Nutrition', 'Functional Beverages', 'Foods & Gummies', 'Cosmeceuticals', 'Ayurvedic Formulations'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            if (!formData.applications.includes(tag)) {
                              setFormData({ ...formData, applications: [...formData.applications, tag] });
                            }
                          }}
                          className="text-[10px] font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-2">Certifications &amp; Accreditations (Comma-separated)</label>
                    <input
                      type="text"
                      value={formData.certifications.join(', ')}
                      onChange={(e) => setFormData({ ...formData, certifications: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      placeholder="e.g. cGMP Certified, ISO 22000, Halal Certified, Kosher Certified, Non-GMO"
                      className="form-input text-xs py-2 mb-2"
                    />
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {['cGMP Certified', 'ISO 22000', 'Halal Certified', 'Kosher Certified', 'Non-GMO', 'Prop 65 Compliant', 'USDA Organic'].map((cert) => (
                        <button
                          key={cert}
                          type="button"
                          onClick={() => {
                            if (!formData.certifications.includes(cert)) {
                              setFormData({ ...formData, certifications: [...formData.certifications, cert] });
                            }
                          }}
                          className="text-[10px] font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded"
                        >
                          + {cert}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Packaging & Storage */}
              {editorTab === 'packaging' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Commercial MOQ</label>
                      <input
                        type="text"
                        value={formData.specs.moq}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, moq: e.target.value } })}
                        placeholder="e.g. 25 kg (1 HDPE Drum)"
                        className="form-input text-xs py-2 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Lead Time</label>
                      <input
                        type="text"
                        value={formData.specs.leadTime}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, leadTime: e.target.value } })}
                        placeholder="e.g. Immediate dispatch / In Stock"
                        className="form-input text-xs py-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Shelf Life Assurance</label>
                      <input
                        type="text"
                        value={formData.specs.shelfLife}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, shelfLife: e.target.value } })}
                        placeholder="e.g. 36 months from date of manufacture"
                        className="form-input text-xs py-2 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">Storage &amp; Humidity Barrier</label>
                      <input
                        type="text"
                        value={formData.specs.storage}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, storage: e.target.value } })}
                        placeholder="e.g. Store below 25°C in sealed nitrogen barrier"
                        className="form-input text-xs py-2"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: Documents (COA/TDS/MSDS) */}
              {editorTab === 'docs' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-1">COA Document URL / Path</label>
                    <input
                      type="text"
                      value={formData.documents.coaUrl}
                      onChange={(e) => setFormData({ ...formData, documents: { ...formData.documents, coaUrl: e.target.value } })}
                      placeholder="e.g. /docs/coa-ashwagandha-lot2026.pdf"
                      className="form-input text-xs py-2 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-1">TDS Document URL / Path</label>
                    <input
                      type="text"
                      value={formData.documents.tdsUrl}
                      onChange={(e) => setFormData({ ...formData, documents: { ...formData.documents, tdsUrl: e.target.value } })}
                      placeholder="e.g. /docs/tds-ashwagandha.pdf"
                      className="form-input text-xs py-2 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-1">MSDS / Safety Data Sheet URL</label>
                    <input
                      type="text"
                      value={formData.documents.msdsUrl}
                      onChange={(e) => setFormData({ ...formData, documents: { ...formData.documents, msdsUrl: e.target.value } })}
                      placeholder="e.g. /docs/msds-ashwagandha.pdf"
                      className="form-input text-xs py-2 font-mono"
                    />
                  </div>
                </div>
              )}

              {/* TAB 6: SEO & Meta */}
              {editorTab === 'seo' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-1">Custom SEO Title</label>
                    <input
                      type="text"
                      value={formData.seo.title}
                      onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, title: e.target.value } })}
                      placeholder="e.g. Ashwagandha Extract 5% Withanolides | YAMI NATURALS"
                      className="form-input text-xs py-2"
                    />
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-1">Meta Description</label>
                    <textarea
                      rows={3}
                      value={formData.seo.description}
                      onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, description: e.target.value } })}
                      placeholder="High potency botanical extract standardized to 5% withanolides for dietary supplement manufacturing..."
                      className="form-input text-xs py-2"
                    />
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-1">Meta Keywords (Comma-separated)</label>
                    <input
                      type="text"
                      value={formData.seo.keywords}
                      onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, keywords: e.target.value } })}
                      placeholder="ashwagandha extract, withanolides 5%, withania somnifera bulk, B2B botanical extract"
                      className="form-input text-xs py-2"
                    />
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] font-mono text-slate-400">
                  All updates immediately synchronize with Firestore database.
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setEditorOpen(false)} className="btn btn-outline text-xs py-2">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary text-xs py-2.5 px-5">
                    <span>{editingProduct ? 'Update Monograph' : 'Save & Publish Product'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
