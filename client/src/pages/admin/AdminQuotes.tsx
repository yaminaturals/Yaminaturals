import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Quote } from '../../types';
import { Search, Trash2, Loader2, Star, Download, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

export const AdminQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [exporting, setExporting] = useState(false);

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
    // Optimistic local update
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    await api.updateQuoteStatus(id, status);
  };

  const handleToggleStar = async (id: string, currentStarred?: boolean) => {
    const nextStarred = !currentStarred;
    // Optimistic local update so it pins to top immediately
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, starred: nextStarred } : q));
    try {
      await api.toggleQuoteStar(id, nextStarred);
    } catch (err) {
      console.error('Failed to toggle star', err);
      loadQuotes(); // Revert on failure
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this commercial RFQ record?')) {
      setQuotes(prev => prev.filter(q => q.id !== id));
      await api.deleteQuote(id);
    }
  };

  // Export to Excel / CSV function
  const handleExportExcel = () => {
    setExporting(true);
    try {
      const headers = ['Date', 'Company', 'Contact Email', 'Phone Number', 'Product & Qty', 'Status'];
      
      const rows = sortedQuotes.map(q => {
        const dateStr = q.createdAt ? new Date(q.createdAt).toLocaleDateString() : 'N/A';
        const companyStr = `"${(q.company || q.name || '').replace(/"/g, '""')}"`;
        const emailStr = `"${(q.email || '').replace(/"/g, '""')}"`;
        const phoneStr = `"${(q.phone || 'N/A').replace(/"/g, '""')}"`;
        const productQtyStr = `"${(q.product || '')} - ${(q.quantity || '')} ${q.requiredForm ? `(${q.requiredForm})` : ''}".trim()`.replace(/"/g, '""');
        const statusStr = `"${(q.status || 'New').replace(/"/g, '""')}"`;

        return [dateStr, companyStr, emailStr, phoneStr, `"${(q.product || '')} - ${(q.quantity || '')} ${q.requiredForm ? `(${q.requiredForm})` : ''}"`, statusStr].join(',');
      });

      const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\r\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `YAMI_NATURALS_RFQ_Pipeline_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Export failed', err);
    } finally {
      setTimeout(() => setExporting(false), 800);
    }
  };

  const filtered = quotes.filter(q => 
    !search || 
    q.company?.toLowerCase().includes(search.toLowerCase()) || 
    q.name?.toLowerCase().includes(search.toLowerCase()) || 
    q.email?.toLowerCase().includes(search.toLowerCase()) ||
    q.phone?.toLowerCase().includes(search.toLowerCase()) ||
    q.product?.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting: Starred inquiries always remain pinned at top, then newest first
  const sortedQuotes = [...filtered].sort((a, b) => {
    if (a.starred && !b.starred) return -1;
    if (!a.starred && b.starred) return 1;
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Commercial RFQ Pipeline</h1>
          <p className="text-xs text-slate-600">Review incoming B2B quotation requests and update liaison statuses.</p>
        </div>

        {/* Export to Excel Action */}
        <button
          onClick={handleExportExcel}
          disabled={exporting || sortedQuotes.length === 0}
          className="btn btn-primary text-xs py-2.5 px-4 flex items-center gap-2 bg-[#072115] hover:bg-[#04130c] text-white border border-[#1d5537] shadow-sm self-start sm:self-auto"
        >
          {exporting ? <Loader2 size={15} className="animate-spin text-[#c5a059]" /> : <FileSpreadsheet size={15} className="text-[#c5a059]" />}
          <span>Export to Excel</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search size={16} />
        </div>
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="e.g. Search by company, email, phone, or product..." 
          className="form-input pl-10 py-3 text-xs bg-white" 
        />
      </div>

      <div className="card-premium bg-white p-6 shadow-sm">
        {loading ? (
          <div className="py-12 text-center">
            <Loader2 size={32} className="animate-spin text-emerald-800 mx-auto" />
          </div>
        ) : sortedQuotes.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500 font-mono">
            No RFQ inquiries found matching your filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Contact Email</th>
                  <th className="py-3 px-4">Phone Number</th>
                  <th className="py-3 px-4">Product &amp; Qty</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedQuotes.map((q) => (
                  <tr 
                    key={q.id} 
                    className={`transition-colors duration-150 ${
                      q.starred ? 'bg-amber-50/50 hover:bg-amber-50/80 border-l-2 border-l-amber-500' : 'hover:bg-slate-50/60'
                    }`}
                  >
                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-600 font-mono whitespace-nowrap">
                      {q.createdAt ? new Date(q.createdAt).toLocaleDateString() : 'N/A'}
                    </td>

                    {/* Company */}
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {q.company || q.name}
                    </td>

                    {/* Contact Email */}
                    <td className="py-3.5 px-4 text-slate-600 font-mono">
                      <a href={`mailto:${q.email}`} className="hover:text-emerald-800 hover:underline">
                        {q.email}
                      </a>
                    </td>

                    {/* Phone Number */}
                    <td className="py-3.5 px-4 text-slate-600 font-mono whitespace-nowrap">
                      {q.phone ? (
                        <a href={`tel:${q.phone}`} className="hover:text-emerald-800 hover:underline">
                          {q.phone}
                        </a>
                      ) : (
                        <span className="text-slate-400 italic">N/A</span>
                      )}
                    </td>

                    {/* Product & Qty */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-emerald-950">{q.product}</div>
                      <div className="text-tiny text-slate-500 font-mono">
                        {q.quantity} {q.requiredForm && <span>&bull; {q.requiredForm}</span>}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <select 
                        value={q.status || 'New'} 
                        onChange={(e) => handleStatusChange(q.id, e.target.value)}
                        className={`p-1.5 rounded border text-tiny font-mono font-medium outline-none transition ${
                          q.status === 'Closed'
                            ? 'bg-slate-100 text-slate-600 border-slate-300'
                            : q.status === 'Quoted'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                            : q.status === 'In Review'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300 font-bold'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="In Review">In Review</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    {/* Action button: Star & Delete */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Star / Priority Pin Button */}
                        <button 
                          onClick={() => handleToggleStar(q.id, q.starred)} 
                          title={q.starred ? "Unpin from top" : "Pin inquiry to top"}
                          className={`p-1.5 rounded-lg transition-all ${
                            q.starred 
                              ? 'text-amber-500 hover:bg-amber-100/80 bg-amber-50' 
                              : 'text-slate-300 hover:text-amber-500 hover:bg-slate-100'
                          }`}
                        >
                          <Star 
                            size={16} 
                            className={q.starred ? 'fill-amber-400 text-amber-500' : ''} 
                          />
                        </button>

                        {/* Delete Button */}
                        <button 
                          onClick={() => handleDelete(q.id)} 
                          title="Delete inquiry record"
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 size={15} />
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
    </div>
  );
};
