import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { FAQ } from '../../types';
import { Plus, Trash2, Loader2, X, Check } from 'lucide-react';

export const AdminFaqs: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('sourcing-commercial');

  const loadFaqs = () => {
    setLoading(true);
    api.getFaqs()
      .then(res => setFaqs(res || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createFaq({ question, answer, category, order: faqs.length + 1 });
    setModalOpen(false);
    setQuestion('');
    setAnswer('');
    loadFaqs();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      await api.deleteFaq(id);
      loadFaqs();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">FAQ Manager</h1>
          <p className="text-xs text-slate-600">Manage categorized technical and commercial Q&amp;As.</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary text-xs">
          <Plus size={14} /> <span>Add New FAQ</span>
        </button>
      </div>

      <div className="card-premium bg-white p-6 shadow-sm">
        {loading ? (
          <div className="py-12 text-center">
            <Loader2 size={32} className="animate-spin text-emerald-800 mx-auto" />
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge badge-gold">{faq.category}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{faq.question}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
                <button onClick={() => handleDelete(faq.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 flex-shrink-0">
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
              <h3 className="text-base font-bold text-slate-900">Add FAQ</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4 text-xs">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select">
                  <option value="sourcing-commercial">Sourcing &amp; Commercial</option>
                  <option value="quality-testing">Quality &amp; Testing</option>
                  <option value="regulatory">Regulatory &amp; Compliance</option>
                  <option value="logistics">Logistics &amp; Export</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Question *</label>
                <input 
                  type="text" 
                  value={question} 
                  onChange={(e) => setQuestion(e.target.value)} 
                  required 
                  placeholder="e.g. What is the commercial MOQ and packaging format for export orders?"
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Answer *</label>
                <textarea 
                  value={answer} 
                  onChange={(e) => setAnswer(e.target.value)} 
                  rows={4} 
                  required 
                  placeholder="e.g. Standard MOQ is 25 kg packed in food-grade double poly-lined HDPE drums sealed under nitrogen barrier..." 
                  className="form-textarea" 
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">
                  <Check size={14} /> <span>Save FAQ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
