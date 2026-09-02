import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Resource } from '../../types';
import { Plus, Trash2, Loader2, X, Check, ExternalLink } from 'lucide-react';

export const AdminResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Yami Naturals R&D Team');
  const [type, setType] = useState('whitepaper');

  const loadRes = () => {
    setLoading(true);
    api.getResources()
      .then(res => setResources(res || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRes();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await api.createResource({ title, slug, summary, content, author, type, publishedAt: new Date().toISOString() });
    setModalOpen(false);
    setTitle('');
    setSummary('');
    setContent('');
    loadRes();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this dossier?')) {
      await api.deleteResource(id);
      loadRes();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Technical Resources &amp; Dossiers</h1>
          <p className="text-xs text-slate-600">Manage whitepapers, phytochemical monographs, and regulatory guides.</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary text-xs">
          <Plus size={14} /> <span>Publish Resource</span>
        </button>
      </div>

      <div className="card-premium bg-white p-6 shadow-sm">
        {loading ? (
          <div className="py-12 text-center">
            <Loader2 size={32} className="animate-spin text-emerald-800 mx-auto" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-3 px-4">DATE</th>
                  <th className="py-3 px-4">TITLE</th>
                  <th className="py-3 px-4">TYPE</th>
                  <th className="py-3 px-4">AUTHOR</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {resources.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 text-slate-500">{new Date(res.publishedAt).toLocaleDateString()}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{res.title}</td>
                    <td className="py-3.5 px-4">
                      <span className="badge badge-gold">{res.type.toUpperCase()}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{res.author}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/resources/${res.slug}`} target="_blank" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600">
                          <ExternalLink size={14} />
                        </Link>
                        <button onClick={() => handleDelete(res.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Publish Technical Resource</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="form-group">
                <label className="form-label">Dossier Title *</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                  placeholder="e.g. Phytochemical Standardization & HPLC Fingerprinting of Withanolides"
                  className="form-input" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} className="form-select">
                    <option value="whitepaper">Whitepaper</option>
                    <option value="regulatory-guide">Regulatory Guide</option>
                    <option value="quality-dossier">Quality Dossier</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Author / Team</label>
                  <input 
                    type="text" 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)} 
                    placeholder="e.g. YAMI Phytochemical R&D Cell"
                    className="form-input" 
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Executive Summary *</label>
                <textarea 
                  value={summary} 
                  onChange={(e) => setSummary(e.target.value)} 
                  rows={2} 
                  required 
                  placeholder="e.g. An in-depth technical analysis comparing HPLC-DAD and UV spectroscopic quantification for standardized botanical extracts..."
                  className="form-textarea" 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Dossier Content (Text) *</label>
                <textarea 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  rows={5} 
                  required 
                  placeholder="e.g. Comprehensive monograph documentation, extraction protocols, analytical chromatograms, and stability data..."
                  className="form-textarea" 
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">
                  <Check size={14} /> <span>Publish Dossier</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
