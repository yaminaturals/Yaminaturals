import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { ContactInquiry } from '../../types';
import { Search, Trash2, Loader2 } from 'lucide-react';

export const AdminContacts: React.FC = () => {
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadContacts = () => {
    setLoading(true);
    api.getAdminContacts()
      .then(res => setContacts(res || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    await api.updateContactStatus(id, status);
    loadContacts();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this inquiry record?')) {
      await api.deleteContact(id);
      loadContacts();
    }
  };

  const filtered = contacts.filter(c => 
    !search || 
    c.company.toLowerCase().includes(search.toLowerCase()) || 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Corporate Inquiries</h1>
          <p className="text-xs text-slate-600">Review corporate liaison messages and audit requests.</p>
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
          placeholder="e.g. Search by company, contact person, or subject..." 
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
                  <th className="py-3 px-4">SENDER &amp; COMPANY</th>
                  <th className="py-3 px-4">SUBJECT &amp; MESSAGE</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{c.name} ({c.company})</div>
                      <div className="text-tiny text-slate-500">{c.email} | {c.country}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{c.subject}</div>
                      <div className="text-tiny text-slate-600 line-clamp-1">{c.message}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <select 
                        value={c.status} 
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        className="p-1 rounded border border-slate-200 text-tiny bg-white"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600">
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
