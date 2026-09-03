import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { api } from '../services/api';
import { Product } from '../types';
import { Send, Check, Loader2, ShieldCheck } from 'lucide-react';

export const RequestQuotePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initProd = searchParams.get('product') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [product, setProduct] = useState(initProd);
  const [quantity, setQuantity] = useState('25 kg');
  const [requiredForm, setRequiredForm] = useState('Standardized Powder');
  const [application, setApplication] = useState('Dietary Supplements');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState('');

  useEffect(() => {
    api.getProducts().then(res => setProducts(res || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.createQuote({
        name,
        company,
        email,
        phone,
        country,
        product,
        quantity,
        requiredForm,
        application,
        message
      });

      setQuoteId(res.id || `YAMI-RFQ-${Math.floor(1000 + Math.random() * 9000)}`);
      setSubmitted(true);
    } catch (err) {
      console.error('Quote error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Request Commercial Quote | YAMI NATURALS" 
        description="Initiate a B2B Request for Quotation (RFQ) for standardized botanical ingredients, private label, or custom formulations." 
      />

      <div className="bg-slate-950 text-white pt-36 pb-16 lg:pt-40 lg:pb-20 border-b border-slate-800">
        <div className="container-custom">
          <span className="badge badge-gold mb-3">B2B Commercial Inquiry</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Request a Commercial Quote
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-3">
            Receive comprehensive pricing breakdowns, MOQ guarantees, and batch-grade dossiers from our commercial liaison team.
          </p>
        </div>
      </div>

      <section className="section-py bg-slate-50/80">
        <div className="container-custom max-w-3xl">
          {submitted ? (
            <div className="card-premium bg-white p-12 text-center shadow-md">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mx-auto mb-6">
                <Check size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">RFQ Submitted Successfully</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                Thank you, {name}. Your commercial inquiry for <strong>{product}</strong> has been logged under RFQ ID <span className="font-mono text-emerald-800">{quoteId}</span>.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs text-slate-600 max-w-md mx-auto mb-8">
                Our phytochemical export officer will review your application and dispatch full specifications within 4 business hours.
              </div>
              <Link to="/products" className="btn btn-primary">
                Explore More Ingredients
              </Link>
            </div>
          ) : (
            <div className="card-premium bg-white p-8 sm:p-10 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                    1. Corporate &amp; Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
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
                      <label className="form-label">Company / Entity Name *</label>
                      <input 
                        type="text" 
                        value={company} 
                        onChange={(e) => setCompany(e.target.value)} 
                        required 
                        placeholder="e.g. NutraGlobal Pharmaceuticals Ltd"
                        className="form-input" 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Business Email *</label>
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder="e.g. m.vance@nutraglobal.com"
                        className="form-input" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="form-group">
                        <label className="form-label">Phone *</label>
                        <input 
                          type="text" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)} 
                          required 
                          placeholder="e.g. +1 (555) 234-5678"
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
                          placeholder="e.g. United States"
                          className="form-input" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                    2. Ingredient Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Ingredient / Extract Name *</label>
                      <input 
                        type="text" 
                        value={product} 
                        onChange={(e) => setProduct(e.target.value)} 
                        required 
                        placeholder="e.g. Ashwagandha Extract 5% Withanolides" 
                        className="form-input" 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Target Quantity (Standard MOQs apply)</label>
                      <select value={quantity} onChange={(e) => setQuantity(e.target.value)} className="form-select">
                        <option value="25 kg (Standard MOQ)">25 kg (Standard MOQ)</option>
                        <option value="100 kg">100 kg</option>
                        <option value="500 kg">500 kg</option>
                        <option value="1 MT (1,000 kg)">1 MT (1,000 kg)</option>
                        <option value="5+ MT">5+ MT</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Required Dosage Form</label>
                      <select value={requiredForm} onChange={(e) => setRequiredForm(e.target.value)} className="form-select">
                        <option value="Standardized Powder">Standardized Powder</option>
                        <option value="Direct Compression Granules">Direct Compression Granules</option>
                        <option value="Water-Soluble Liquid Extract">Water-Soluble Liquid Extract</option>
                        <option value="Finished Capsules / Tablets">Finished Capsules / Tablets</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Intended Application</label>
                      <select value={application} onChange={(e) => setApplication(e.target.value)} className="form-select">
                        <option value="Dietary Supplements">Dietary Supplements</option>
                        <option value="Sports Nutrition">Sports Nutrition</option>
                        <option value="Functional & RTD Beverages">Functional &amp; RTD Beverages</option>
                        <option value="Foods & Gummies">Foods &amp; Gummies</option>
                        <option value="Cosmetics & Skincare">Cosmetics &amp; Skincare</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Target Assay &amp; Custom Requirements (Optional)</label>
                  <textarea 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    rows={4} 
                    placeholder="Include any specific requirements for assay method (HPLC/UV), heavy metal limits (USP <2232>), or desired mesh size..." 
                    className="form-textarea" 
                  />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-tiny text-slate-500">
                    <ShieldCheck size={14} className="text-emerald-800" />
                    <span>All information is protected under our B2B NDA.</span>
                  </div>
                  <button type="submit" disabled={loading} className="btn btn-primary">
                    {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                    <span>Submit Commercial RFQ</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
