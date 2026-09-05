import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Quote } from '../../types';
import { 
  Search, Trash2, Loader2, Star, Download, FileSpreadsheet, 
  Filter, Calendar, RotateCcw, X, ChevronDown 
} from 'lucide-react';

export const AdminQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [onlyStarred, setOnlyStarred] = useState(false);
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

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setDateFilter('all');
    setStartDate('');
    setEndDate('');
    setOnlyStarred(false);
  };

  const isWithinDateRange = (dateStr?: string) => {
    if (!dateStr || dateFilter === 'all') return true;
    const itemDate = new Date(dateStr);
    const now = new Date();

    if (dateFilter === 'today') {
      return itemDate.toDateString() === now.toDateString();
    }
    if (dateFilter === '7days') {
      const past7 = new Date();
      past7.setDate(now.getDate() - 7);
      return itemDate >= past7;
    }
    if (dateFilter === '30days') {
      const past30 = new Date();
      past30.setDate(now.getDate() - 30);
      return itemDate >= past30;
    }
    if (dateFilter === 'thisMonth') {
      return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
    }
    if (dateFilter === 'custom') {
      if (startDate && endDate) {
        const s = new Date(startDate);
        s.setHours(0, 0, 0, 0);
        const e = new Date(endDate);
        e.setHours(23, 59, 59, 999);
        return itemDate >= s && itemDate <= e;
      } else if (startDate) {
        const s = new Date(startDate);
        s.setHours(0, 0, 0, 0);
        return itemDate >= s;
      } else if (endDate) {
        const e = new Date(endDate);
        e.setHours(23, 59, 59, 999);
        return itemDate <= e;
      }
    }
    return true;
  };

  const filtered = quotes.filter(q => {
    // Search filter
    const matchesSearch = !search || 
      q.company?.toLowerCase().includes(search.toLowerCase()) || 
      q.name?.toLowerCase().includes(search.toLowerCase()) || 
      q.email?.toLowerCase().includes(search.toLowerCase()) ||
      q.phone?.toLowerCase().includes(search.toLowerCase()) ||
      q.product?.toLowerCase().includes(search.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;

    // Date filter
    const matchesDate = isWithinDateRange(q.createdAt);

    // Starred filter
    const matchesStar = !onlyStarred || Boolean(q.starred);

    return matchesSearch && matchesStatus && matchesDate && matchesStar;
  });

  // Sorting: Starred inquiries always remain pinned at top, then newest first
  const sortedQuotes = [...filtered].sort((a, b) => {
    if (a.starred && !b.starred) return -1;
    if (!a.starred && b.starred) return 1;
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });

  // Export to Excel / CSV function (exports the currently filtered results)
  const handleExportExcel = () => {
    setExporting(true);
    try {
      const headers = ['Date', 'Company', 'Contact Email', 'Phone Number', 'Product & Qty', 'Status'];
      
      const rows = sortedQuotes.map(q => {
        const dateStr = q.createdAt ? new Date(q.createdAt).toLocaleDateString() : 'N/A';
        const companyStr = `"${(q.company || q.name || '').replace(/"/g, '""')}"`;
        const emailStr = `"${(q.email || '').replace(/"/g, '""')}"`;
        const phoneStr = `"${(q.phone || 'N/A').replace(/"/g, '""')}"`;
        const productQty = `${(q.product || '')} - ${(q.quantity || '')} ${q.requiredForm ? `(${q.requiredForm})` : ''}`.trim();
        const productQtyStr = `"${productQty.replace(/"/g, '""')}"`;
        const statusStr = `"${(q.status || 'New').replace(/"/g, '""')}"`;

        return [dateStr, companyStr, emailStr, phoneStr, productQtyStr, statusStr].join(',');
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

  const hasActiveFilters = search || statusFilter !== 'all' || dateFilter !== 'all' || startDate || endDate || onlyStarred;

  return (
    <div className="space-y-6">
      {/* Title & Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Commercial RFQ Pipeline</h1>
          <p className="text-xs text-slate-600">Review incoming B2B quotation requests, apply filters, and update statuses.</p>
        </div>

        {/* Export to Excel Action with Filter Count */}
        <button
          onClick={handleExportExcel}
          disabled={exporting || sortedQuotes.length === 0}
          className="btn btn-primary text-xs py-2.5 px-4 flex items-center gap-2 bg-[#072115] hover:bg-[#04130c] text-white border border-[#1d5537] shadow-sm self-start md:self-auto"
        >
          {exporting ? <Loader2 size={15} className="animate-spin text-[#c5a059]" /> : <FileSpreadsheet size={15} className="text-[#c5a059]" />}
          <span>Export to Excel {sortedQuotes.length > 0 ? `(${sortedQuotes.length})` : ''}</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="card-premium bg-white p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          
          {/* Search Input (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search size={15} />
            </div>
            <input 
              type="text" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="e.g. Search company, email, phone, product..." 
              className="form-input pl-10 py-2.5 text-xs bg-white w-full" 
            />
          </div>

          {/* Status Filter (2 cols) */}
          <div className="lg:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select py-2.5 text-xs bg-white text-slate-800"
            >
              <option value="all">All Statuses</option>
              <option value="New">Status: New</option>
              <option value="In Review">Status: In Review</option>
              <option value="Quoted">Status: Quoted</option>
              <option value="Closed">Status: Closed</option>
            </select>
          </div>

          {/* Date Filter (3 cols) */}
          <div className="lg:col-span-3">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="form-select py-2.5 text-xs bg-white text-slate-800"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="custom">Custom Date Range...</option>
            </select>
          </div>

          {/* Star Filter & Reset (2 cols) */}
          <div className="lg:col-span-2 flex items-center gap-2">
            <button
              onClick={() => setOnlyStarred(!onlyStarred)}
              title={onlyStarred ? "Showing Starred Only" : "Show Starred Only"}
              className={`flex-1 py-2.5 px-3 rounded text-xs font-mono flex items-center justify-center gap-1.5 border transition ${
                onlyStarred 
                  ? 'bg-amber-50 border-amber-300 text-amber-800 font-bold' 
                  : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Star size={13} className={onlyStarred ? 'fill-amber-400 text-amber-500' : 'text-slate-400'} />
              <span>{onlyStarred ? 'Starred' : 'All'}</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                title="Reset all filters"
                className="p-2.5 rounded border border-slate-300 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Custom Date Range Pickers (Visible only when 'custom' is selected) */}
        {dateFilter === 'custom' && (
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-500 text-[11px]">From:</span>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
                className="p-1.5 border border-slate-300 text-xs bg-white rounded outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-500 text-[11px]">To:</span>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
                className="p-1.5 border border-slate-300 text-xs bg-white rounded outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Table */}
      <div className="card-premium bg-white p-6 shadow-sm">
        {loading ? (
          <div className="py-12 text-center">
            <Loader2 size={32} className="animate-spin text-emerald-800 mx-auto" />
          </div>
        ) : sortedQuotes.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500 font-mono space-y-2">
            <div>No RFQ inquiries found matching your filter criteria.</div>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-emerald-800 font-bold hover:underline">
                Clear Filters
              </button>
            )}
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
