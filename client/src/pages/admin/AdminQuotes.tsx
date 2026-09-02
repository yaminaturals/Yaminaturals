import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Quote } from '../../types';
import { Search, Trash2, Loader2 } from 'lucide-react';

export const AdminQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadQuotes = () => {
    setLoading(true);
    api.getAdminQuotes()
      .then(res => setQuotes(res || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    await api.updateQuoteStatus(id, status);
    loadQuotes();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this RFQ request record?')) {
      await api.deleteQuote(id);
      loadQuotes();
    }
  };

  const filtered = quotes.filter(q => 
    !search || 
    q.company.toLowerCase().includes(search.toLowerCase()) || 
    q.name.toLowerCase().includes(search.toLowerCase()) || 
    q.product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Commercial RFQ Pipeline</h1>
          <p className="text-xs text-slate-600">Review incoming B2B quotation requests and update liaison statuses.</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search size={16} />
        </div>
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="e.g. Search by company, product name, or RFQ contact..." 
          className="form-input pl-10 py-3 text-xs bg-white" 
        />
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
                  <th className="py-3 px-4">CONTACT / COMPANY</th>
                  <th className="py-3 px-4">PRODUCT &amp; VOLUME</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 text-slate-500">{new Date(q.createdAt).toLocaleDateString()}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{q.company || q.name}</div>
                      <div className="text-tiny text-slate-500">{q.email} | {q.phone || 'N/A'}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-emerald-900">{q.product}</div>
                      <div className="text-tiny text-slate-500">{q.quantity} &bull; {q.requiredForm}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <select 
                        value={q.status} 
                        onChange={(e) => handleStatusChange(q.id, e.target.value)}
                        className="p-1 rounded border border-slate-200 text-tiny bg-white"
                      >
                        <option value="New">New</option>
                        <option value="In Review">In Review</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => handleDelete(q.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
