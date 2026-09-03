import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { api } from '../services/api';
import { FAQ } from '../types';
import { Search, ChevronDown, MessageSquare, Loader2 } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    api.getFaqs()
      .then(res => {
        setFaqs(res || []);
        if (res && res.length > 0) {
          setOpenIds({ [res[0].id]: true });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleFaq = (id: string) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'sourcing-commercial', name: 'Sourcing & Commercial' },
    { id: 'quality-testing', name: 'Quality & Testing' },
    { id: 'regulatory', name: 'Regulatory & Compliance' },
    { id: 'logistics', name: 'Logistics & Export' }
  ];

  const filtered = faqs.filter(f => {
    const matchCat = selectedCat === 'all' || f.category === selectedCat;
    const matchSearch = !search || 
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <SEO 
        title="FAQ | B2B Botanical Ingredients & Contract Manufacturing | YAMI NATURALS" 
        description="Commonly asked questions regarding botanical extracts, testing, pharmacopoeial COA, and exports." 
      />

      <div className="bg-slate-950 text-white pt-36 pb-16 lg:pt-40 lg:pb-20 border-b border-slate-800">
        <div className="container-custom">
          <span className="badge badge-gold mb-3">Knowledge Base</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-3">
            Detailed answers regarding phytochemical extraction, HPLC/HPTLC testing, sampling, MOQs, and global regulatory dossiers.
          </p>
        </div>
      </div>

      <section className="section-py bg-slate-50/80">
        <div className="container-custom max-w-3xl">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-10">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search size={16} />
              </div>
              <input 
                type="text" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="e.g. What is the standard commercial Minimum Order Quantity (MOQ)? COA, shipping terms..." 
                className="form-input pl-10 py-3 text-xs" 
              />
            </div>

            <div className="flex wrap items-center gap-2">
              {categories.map((c) => (
                <button 
                  key={c.id} 
                  onClick={() => setSelectedCat(c.id)} 
                  className={`px-3.5 py-1.5 rounded-full text-tiny font-semibold transition ${selectedCat === c.id ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center">
              <Loader2 size={36} className="animate-spin text-emerald-800 mx-auto" />
            </div>
          ) : (
            <div className="space-y-3.5">
              {filtered.map((faq) => {
                const isOpen = !!openIds[faq.id];
                return (
                  <div key={faq.id} className="card-premium bg-white overflow-hidden">
                    <button 
                      onClick={() => toggleFaq(faq.id)} 
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50/60"
                    >
                      <span className="text-sm font-bold text-slate-900">{faq.question}</span>
                      <ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-emerald-800' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-12 card-premium bg-white p-8 text-center">
            <MessageSquare size={32} className="text-emerald-800 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">Have a Technical Query Not Listed?</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
              Speak with our quality assurance and export documentation team.
            </p>
            <Link to="/contact" className="btn btn-primary text-xs">
              Contact Scientific Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
