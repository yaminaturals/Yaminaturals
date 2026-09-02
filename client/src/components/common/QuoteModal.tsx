import React, { useState } from 'react';
import { api } from '../../services/api';
import { X, Send, Check, Loader2, ShieldCheck } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductName?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, initialProductName = '' }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [product, setProduct] = useState(initialProductName);
  const [quantity, setQuantity] = useState('25 kg (Standard MOQ)');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.createQuote({
        name,
        company,
        email,
        phone,
        country,
        product: product || initialProductName,
        quantity,
        message
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Quote error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-fadeIn">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Request Commercial RFQ</h3>
            <p className="text-tiny text-slate-500">Commercial quotation with lot-specific COA</p>
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
            <h4 className="text-base font-bold text-slate-900 mb-1">Commercial RFQ Received</h4>
            <p className="text-xs text-slate-600 mb-6">Our export desk will review your specifications and dispatch an official B2B quote within 4 hours.</p>
            <button onClick={onClose} className="btn btn-primary text-xs">
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3.5">
              <div className="form-group">
                <label className="form-label">Contact Name *</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="e.g. Dr. Michael Vance"
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Company Name *</label>
                <input 
                  type="text" 
                  value={company} 
                  onChange={(e) => setCompany(e.target.value)} 
                  required 
                  placeholder="e.g. NutraGlobal Ltd"
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
                  placeholder="e.g. m.vance@nutraglobal.com"
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone / Country *</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                  placeholder="e.g. +1 (555) 234-5678 (USA)" 
                  className="form-input" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="form-group">
                <label className="form-label">Ingredient / Extract</label>
                <input 
                  type="text" 
                  value={product || initialProductName} 
                  onChange={(e) => setProduct(e.target.value)} 
                  required 
                  placeholder="e.g. Ashwagandha Extract 5%"
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <select value={quantity} onChange={(e) => setQuantity(e.target.value)} className="form-select">
                  <option value="25 kg (Standard MOQ)">25 kg (Standard MOQ)</option>
                  <option value="100 kg">100 kg</option>
                  <option value="500 kg">500 kg</option>
                  <option value="1 MT (1,000 kg)">1 MT (1,000 kg)</option>
                  <option value="5+ MT">5+ MT</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Technical Notes / Assay Request</label>
              <textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                rows={3} 
                placeholder="e.g. Please quote FOB Mumbai with lot-specific COA testing for USP <2232> heavy metals and HPLC assay..." 
                className="form-textarea" 
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-tiny text-slate-500">
                <ShieldCheck size={13} className="text-emerald-800" />
                <span>Protected under B2B NDA</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={onClose} className="btn btn-outline py-2 text-xs">Cancel</button>
                <button type="submit" disabled={loading} className="btn btn-primary py-2 text-xs">
                  {loading ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                  <span>Submit RFQ</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
