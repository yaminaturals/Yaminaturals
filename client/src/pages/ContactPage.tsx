import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { api } from '../services/api';
import { useSettings } from '../context/SettingsContext';
import { Mail, Phone, MapPin, Send, Check, Loader2, Clock, Globe } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings } = useSettings();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [inquiryType, setInquiryType] = useState('Bulk Commercial Supply');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.createContact({
        name,
        company,
        email,
        phone,
        country,
        inquiryType,
        subject,
        message
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Contact submit error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Commercial Team | YAMI NATURALS B2B Botanical Supply" 
        description="Connect with YAMI NATURALS commercial sales, regulatory affairs, and facility audit officers." 
      />

      <div className="bg-slate-950 text-white pt-28 pb-16 border-b border-slate-800">
        <div className="container-custom">
          <span className="badge badge-gold mb-3">Global B2B Liaison</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Connect with Commercial Affairs
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-3">
            Schedule an on-site facility audit, request vendor qualification documentation, or discuss volume contract supply.
          </p>
        </div>
      </div>

      <section className="section-py bg-slate-50/80">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="card-premium bg-white p-8 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Commercial Headquarters</h3>
                
                <div className="flex items-start gap-3.5 text-xs text-slate-700">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 mb-0.5">Corporate HQ &amp; Export Office</div>
                    <p className="text-slate-600 leading-relaxed">
                      {settings.hqAddress || 'YAMI NATURALS Tower, Plot 42-A, Industrial Gateway, Mumbai, Maharashtra 400001, India'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-xs text-slate-700">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 mb-0.5">Commercial Email</div>
                    <p className="text-slate-600">
                      <a href={`mailto:${settings.contactEmail}`} className="hover:underline">
                        {settings.contactEmail || 'contact@yaminaturals.com'}
                      </a>
                    </p>
                    <p className="text-slate-500 text-tiny">Export Desk: export@yaminaturals.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-xs text-slate-700">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 mb-0.5">Direct Commercial Phone</div>
                    <p className="text-slate-600">
                      <a href={`tel:${settings.contactPhone}`} className="hover:underline">
                        {settings.contactPhone || '+91 8780664057'}
                      </a>
                    </p>
                    <p className="text-slate-500 text-tiny">Direct Liaison Desk: 24/7 Response via Commercial Portal</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-xs text-slate-700">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 mb-0.5">Operating Hours</div>
                    <p className="text-slate-600">Monday - Friday: 08:30 - 18:30 IST</p>
                    <p className="text-slate-500 text-tiny">Export Desk: 24/7 Response via Commercial Portal</p>
                  </div>
                </div>
              </div>

              <div className="card-premium bg-slate-900 text-white p-7">
                <div className="flex items-center gap-2 text-gold-400 mb-2">
                  <Globe size={18} />
                  <span className="font-bold text-sm">International Export Desks</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Active freight lanes serving North America (New Jersey / Los Angeles), Europe (Rotterdam / Hamburg), and APAC (Singapore / Tokyo).
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="card-premium bg-white p-8 sm:p-10 shadow-sm">
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mx-auto mb-6">
                      <Check size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Inquiry Dispatched</h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                      Thank you for contacting YAMI NATURALS. Our commercial liaison team will review your specifications and respond shortly.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn btn-primary">
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                      Corporate Inquiry Liaison Form
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input 
                          type="text" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          required 
                          placeholder="e.g. Elena Rostova"
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
                          placeholder="e.g. PharmaNordic ApS"
                          className="form-input" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Corporate Email *</label>
                        <input 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          required 
                          placeholder="e.g. e.rostova@pharmanordic.dk"
                          className="form-input" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone *</label>
                        <input 
                          type="text" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)} 
                          required 
                          placeholder="e.g. +45 33 12 34 56"
                          className="form-input" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Country / Destination *</label>
                        <input 
                          type="text" 
                          value={country} 
                          onChange={(e) => setCountry(e.target.value)} 
                          required 
                          placeholder="e.g. Denmark, European Union"
                          className="form-input" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Inquiry Scope</label>
                        <select value={inquiryType} onChange={(e) => setInquiryType(e.target.value)} className="form-select">
                          <option value="Bulk Commercial Supply">Bulk Commercial Supply</option>
                          <option value="Private Label Project">Private Label Project</option>
                          <option value="Contract Manufacturing RFP">Contract Manufacturing RFP</option>
                          <option value="Facility Audit & Verification">Facility Audit &amp; Verification</option>
                          <option value="Custom R&D Formulation">Custom R&amp;D Formulation</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Subject *</label>
                      <input 
                        type="text" 
                        value={subject} 
                        onChange={(e) => setSubject(e.target.value)} 
                        required 
                        placeholder="e.g. Contract Extraction Partnership Inquiry" 
                        className="form-input" 
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Commercial / Technical Details *</label>
                      <textarea 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        rows={4} 
                        required 
                        placeholder="e.g. Inquiring regarding custom solvent percolation capabilities, monthly production capacity of 5 MT, and scheduled on-site facility audit..." 
                        className="form-textarea" 
                      />
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center">
                      {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                      <span>Submit Corporate Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
