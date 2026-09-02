import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { AdminStats, Quote, ContactInquiry } from '../../types';
import { Package, MessageSquare, Mail, FileText, ArrowRight, Loader2 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentQuotes, setRecentQuotes] = useState<Quote[]>([]);
  const [recentContacts, setRecentContacts] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getAdminStats(),
      api.getAdminQuotes(),
      api.getAdminContacts()
    ])
      .then(([s, q, c]) => {
        setStats(s);
        setRecentQuotes((q || []).slice(0, 5));
        setRecentContacts((c || []).slice(0, 5));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader2 size={36} className="animate-spin text-emerald-800 mx-auto" />
      </div>
    );
  }

  const statCards = [
    { label: 'Active Catalog Products', value: stats?.totalProducts || 0, icon: Package, link: '/admin/products' },
    { label: 'Pending RFQs / Quotes', value: stats?.pendingQuotes || 0, icon: MessageSquare, link: '/admin/quotes' },
    { label: 'Unread Inquiries', value: stats?.unreadContacts || 0, icon: Mail, link: '/admin/contacts' },
    { label: 'COA / TDS Requests', value: stats?.totalDocuments || 0, icon: FileText, link: '/admin/documents' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Commercial Dashboard</h1>
        <p className="text-xs text-slate-500 mt-1">Real-time overview of RFQ pipeline, batch requests, and catalog inventory.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link key={i} to={c.link} className="card-premium bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">{c.label}</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-800">
                  <Icon size={16} />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900">{c.value}</div>
            </Link>
          );
        })}
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Quotes */}
        <div className="card-premium bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Recent Commercial RFQs</h3>
            <Link to="/admin/quotes" className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          {recentQuotes.length === 0 ? (
            <p className="text-xs text-slate-500 py-4">No recent RFQs found.</p>
          ) : (
            <div className="space-y-3">
              {recentQuotes.map((q) => (
                <div key={q.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{q.company || q.name}</div>
                    <div className="text-tiny text-slate-500">{q.product} &bull; {q.quantity}</div>
                  </div>
                  <span className="badge badge-emerald">{q.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Contacts */}
        <div className="card-premium bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Recent Inquiries</h3>
            <Link to="/admin/contacts" className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          {recentContacts.length === 0 ? (
            <p className="text-xs text-slate-500 py-4">No inquiries logged yet.</p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map((c) => (
                <div key={c.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{c.name} ({c.company})</div>
                    <div className="text-tiny text-slate-500">{c.subject}</div>
                  </div>
                  <span className="badge badge-gold">{c.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
