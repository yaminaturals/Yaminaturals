import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Category } from '../../types';
import { Plus, Trash2, Loader2, X, Check } from 'lucide-react';

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const loadCats = () => {
    setLoading(true);
    api.getCategories()
      .then(res => setCategories(res || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCats();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await api.createCategory({ name, slug, description });
    setModalOpen(false);
    setName('');
    setDescription('');
    loadCats();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await api.deleteCategory(id);
      loadCats();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ingredient Categories</h1>
          <p className="text-xs text-slate-600">Manage classification taxonomies for botanical products.</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary text-xs">
          <Plus size={14} /> <span>Create Category</span>
        </button>
      </div>

      <div className="card-premium bg-white p-6 shadow-sm">
        {loading ? (
          <div className="py-12 text-center">
            <Loader2 size={32} className="animate-spin text-emerald-800 mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{cat.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{cat.description}</p>
                </div>
                <button onClick={() => handleDelete(cat.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 flex-shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Add New Category</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4 text-xs">
              <div className="form-group">
                <label className="form-label">Category Name *</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="e.g. Standardized Extracts"
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  rows={3} 
                  placeholder="e.g. Phytochemical botanical extracts standardized to verified HPLC and UV active markers..." 
                  className="form-textarea" 
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">
                  <Check size={14} /> <span>Create Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
