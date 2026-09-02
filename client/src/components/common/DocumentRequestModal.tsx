import React, { useState } from 'react';
import { api } from '../../services/api';
import { X, FileText, Check, Loader2, ShieldCheck } from 'lucide-react';

interface DocumentRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export const DocumentRequestModal: React.FC<DocumentRequestModalProps> = ({ isOpen, onClose, productName }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [documentType, setDocumentType] = useState('COA');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.createDocumentRequest({
        name,
        company,
        email,
        country,
        documentType,
        productName
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Document request error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Technical Dossier Download</h3>
            <p className="text-tiny text-slate-500">{productName}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mx-auto mb-4">
              <Check size={24} />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Dossier Access Dispatched</h4>
            <p className="text-xs text-slate-600 mb-6">The verified {documentType} dossier for {productName} has been emailed to {email}.</p>
            <button onClick={onClose} className="btn btn-primary text-xs">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-3.5 text-xs">
            <div className="form-group">
              <label className="form-label">Requested Document Type</label>
              <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="form-select">
                <option value="COA">Certificate of Analysis (COA)</option>
                <option value="TDS">Technical Data Sheet (TDS)</option>
                <option value="MSDS">Material Safety Data Sheet (MSDS)</option>
                <option value="Complete Regulatory Dossier">Complete Regulatory Dossier</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="e.g. Sarah Jenkins"
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Company / Brand *</label>
                <input 
                  type="text" 
                  value={company} 
                  onChange={(e) => setCompany(e.target.value)} 
                  required 
                  placeholder="e.g. BioPure Wellness UK"
                  className="form-input" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="form-group">
                <label className="form-label">Corporate Email *</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="e.g. s.jenkins@biopure.co.uk"
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Country *</label>
                <input 
                  type="text" 
                  value={country} 
                  onChange={(e) => setCountry(e.target.value)} 
                  required 
                  placeholder="e.g. United Kingdom" 
                  className="form-input" 
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-tiny text-slate-500">
                <ShieldCheck size={13} className="text-emerald-800" />
                <span>Immediate verified delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={onClose} className="btn btn-outline py-2 text-xs">Cancel</button>
                <button type="submit" disabled={loading} className="btn btn-primary py-2 text-xs">
                  {loading ? <Loader2 size={13} className="animate-spin" /> : <FileText size={13} />}
                  <span>Request Dossier</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
