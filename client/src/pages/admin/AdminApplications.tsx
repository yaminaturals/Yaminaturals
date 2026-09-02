import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Application } from '../../types';
import { Plus, Edit2, Trash2, X, Check, Loader2, Sparkles, FolderPlus } from 'lucide-react';

export const AdminApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    popularIngredients: ''
  });
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchApps = () => {
    setLoading(true);
    api.getApplications()
      .then(res => setApplications(res || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenCreate = () => {
    setEditingApp(null);
    setFormData({ name: '', slug: '', description: '', popularIngredients: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (app: Application) => {
    setEditingApp(app);
    setFormData({
      name: app.name,
      slug: app.slug,
      description: app.description,
      popularIngredients: (app.popularIngredients || []).join(', ')
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: formData.description,
        popularIngredients: formData.popularIngredients ? formData.popularIngredients.split(',').map(s => s.trim()).filter(Boolean) : []
      };

      if (editingApp) {
        await api.updateApplication(editingApp.id, payload);
        showNotification('Application updated successfully');
      } else {
        await api.createApplication(payload);
        showNotification('Application created successfully');
      }
      setModalOpen(false);
      fetchApps();
    } catch (err: any) {
      showNotification(err.message || 'Error saving application', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteApplication(id);
      showNotification('Application deleted successfully');
      setDeleteConfirmId(null);
      fetchApps();
    } catch (err: any) {
      showNotification(err.message || 'Error deleting application', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className={`p-4 rounded-lg text-xs font-mono font-semibold flex items-center justify-between shadow-lg ${
          notification.type === 'success' ? 'bg-emerald-900 text-emerald-100 border border-emerald-700' : 'bg-red-900 text-red-100 border border-red-700'
        }`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="text-white hover:opacity-80">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Formulation Applications</h1>
          <p className="text-xs text-slate-500 mt-1">Manage target dosage categories and formulation matrices</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="btn btn-primary text-xs py-2.5 px-4 flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Plus size={14} />
          <span>Add New Application</span>
        </button>
      </div>

      {/* Applications Table */}
      {loading ? (
        <div className="py-20 text-center bg-white rounded-xl border border-slate-200">
          <Loader2 size={32} className="animate-spin text-emerald-800 mx-auto mb-2" />
          <p className="text-xs text-slate-500">Loading applications...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
          <FolderPlus size={36} className="text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">No Applications Defined</h3>
          <p className="text-xs text-slate-500 mb-4">Create your first formulation application sector.</p>
          <button onClick={handleOpenCreate} className="btn btn-primary text-xs">Create Application</button>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Application Sector</th>
                <th className="py-3.5 px-4">URL Slug</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4">Popular Ingredients</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {app.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {app.slug}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                    {app.description}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                    {(app.popularIngredients || []).join(', ') || '-'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(app)}
                        className="p-1.5 text-slate-600 hover:text-emerald-800 hover:bg-slate-100 rounded transition"
                        title="Edit Application"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(app.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                        title="Delete Application"
                      >
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Confirm Delete Application</h3>
            <p className="text-xs text-slate-600 mb-6">Are you sure you want to delete this application? This action cannot be undone.</p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setDeleteConfirmId(null)} className="btn btn-outline text-xs py-2">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirmId)} className="btn btn-primary bg-red-700 hover:bg-red-800 border-red-800 text-xs py-2">Delete Permanently</button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {editingApp ? 'Edit Application' : 'Create New Application'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono font-bold text-slate-700 mb-1">Application Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dietary Supplements"
                  className="form-input text-xs py-2"
                />
              </div>

              <div>
                <label className="block font-mono font-bold text-slate-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. dietary-supplements"
                  className="form-input text-xs py-2"
                />
              </div>

              <div>
                <label className="block font-mono font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Application specifications and dissolution details..."
                  className="form-input text-xs py-2"
                />
              </div>

              <div>
                <label className="block font-mono font-bold text-slate-700 mb-1">Popular Benchmark Ingredients (comma separated)</label>
                <input
                  type="text"
                  value={formData.popularIngredients}
                  onChange={(e) => setFormData({ ...formData, popularIngredients: e.target.value })}
                  placeholder="e.g. Ashwagandha 5%, Curcumin 95%"
                  className="form-input text-xs py-2"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline text-xs py-2">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-xs py-2">
                  <span>{editingApp ? 'Update Application' : 'Save Application'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
