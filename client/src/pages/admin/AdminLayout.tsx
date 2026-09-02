import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Package, MessageSquare, Mail, FileText, FolderTree, Layers, HelpCircle, BookOpen, Settings, LogOut } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Quotes / RFQ', path: '/admin/quotes', icon: MessageSquare },
    { label: 'Contact Inquiries', path: '/admin/contacts', icon: Mail },
    { label: 'COA / TDS Requests', path: '/admin/documents', icon: FileText },
    { label: 'Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Applications', path: '/admin/applications', icon: Layers },
    { label: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
    { label: 'Resources & Dossiers', path: '/admin/resources', icon: BookOpen },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col justify-between p-4 border-r border-slate-800">
        <div>
          <div className="flex items-center gap-3 px-3 py-4 mb-4 border-b border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center font-bold text-white text-sm">
              YN
            </div>
            <div>
              <div className="font-bold text-sm text-white">YAMI NATURALS</div>
              <div className="text-tiny text-gold-400 font-medium">B2B Admin Portal</div>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.path === '/admin' 
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${active ? 'bg-emerald-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 mt-6">
          <div className="px-3 py-2 text-tiny text-slate-400">
            Logged in as: <span className="text-white font-medium">{user?.email || 'admin@yaminaturals.com'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-950/40 hover:text-red-300 transition mt-1"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
