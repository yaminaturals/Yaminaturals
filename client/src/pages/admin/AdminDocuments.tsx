import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { DocumentRequest } from '../../types';
import { Search, Trash2, Loader2 } from 'lucide-react';

export const AdminDocuments: React.FC = () => {
  const [docs, setDocs] = useState<DocumentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadDocs = () => {
    setLoading(true);
    api.getAdminDocuments()
      .then(res => setDocs(res || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this document request?')) {
      await api.deleteDocument(id);
      loadDocs();
    }
  };

  const filtered = docs.filter(d => 
    !search ||
    d.company.toLowerCase().includes(search.toLowerCase()) ||
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Technical Dossier Downloads</h1>
          <p className="text-xs text-slate-600">Logs of COA, TDS, and regulatory dossier requests.</p>
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
          placeholder="e.g. Search by company, requested document, or product name..." 
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
                  <th className="py-3 px-4">PRODUCT NAME</th>
                  <th className="py-3 px-4">DOCUMENT TYPE</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 text-slate-500">{new Date(d.createdAt).toLocaleDateString()}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{d.name}</div>
                      <div className="text-tiny text-slate-500">{d.company} | {d.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-900">{d.productName}</td>
                    <td className="py-3.5 px-4">
                      <span className="badge badge-gold">{d.documentType.toUpperCase()}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => handleDelete(d.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600">
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
