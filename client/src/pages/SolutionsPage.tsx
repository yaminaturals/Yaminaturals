import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { ShieldCheck, ArrowRight, Factory, Globe, FlaskConical, Package } from 'lucide-react';

export const SolutionsPage: React.FC = () => {
  const solutions = [
    {
      title: 'Private Label Development',
      slug: 'private-label',
      description: 'Turnkey, market-ready dietary supplements and fitness nutrition labeled under your brand.',
      icon: Package,
      highlights: ['Custom bottle & blister packing', 'Flow-wrapped sachets & sticks', 'Compliant label claims review'],
      moq: '5,000 units'
    },
    {
      title: 'Contract Manufacturing',
      slug: 'contract-manufacturing',
      description: 'High-speed extraction, spray-drying, encapsulation, and tableting in ISO 22000 facilities.',
      icon: Factory,
      highlights: ['Bulk extraction up to 150 MT/month', 'Size 00, 0, 1 veggie & gelatin capsules', 'Enteric-coated tablets'],
      moq: '25 kg extract / 100,000 dosage units'
    },
    {
      title: 'Custom Formulation & R&D',
      slug: 'custom-formulation',
      description: 'Proprietary research-driven botanical blends with targeted synergies and bioavailability enhancers.',
      icon: FlaskConical,
      highlights: ['Taste matching & masking customization', 'Pre-clinical stability studies', 'Exclusive geographic licensing'],
      moq: '50 kg custom blend'
    },
    {
      title: 'Global Export & Regulatory',
      slug: 'export',
      description: 'Assistance with FDA NDI, EFSA Novel Foods, Therapeutic Goods (TGA), and Halal/Kosher registrations.',
      icon: Globe,
      highlights: ['Country-specific regulatory dossiers', 'USP <467> & Ph. Eur. residual testing', 'CIF/FOB/DAP logistics'],
      moq: 'International Container & Air Freight'
    }
  ];

  return (
    <>
      <SEO 
        title="Private Label & Contract Manufacturing Solutions | YAMI NATURALS" 
        description="Custom phytochemical formulations, turnkey private label, and contract manufacturing services." 
      />

      <div className="bg-slate-950 text-white pt-36 pb-16 lg:pt-40 lg:pb-20 border-b border-slate-800">
        <div className="container-custom">
          <span className="badge badge-gold mb-3">B2B Manufacturing Solutions</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Comprehensive B2B Botanical Solutions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-3">
            From farm-gate sourcing to pharmaceutical-grade extraction and custom private-label dosages, YAMI NATURALS is your end-to-end OEM/ODM backing.
          </p>
        </div>
      </div>

      <section className="section-py bg-slate-50/80">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="card-premium bg-white p-8 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 mb-6">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">{s.description}</p>

                    <ul className="space-y-2.5 mb-6">
                      {s.highlights.map((h, jh) => (
                        <li key={jh} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <ShieldCheck size={15} className="text-emerald-800 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-tiny text-slate-400">COMMERCIAL MOQ </span>
                      <span className="text-xs font-semibold text-emerald-900">{s.moq}</span>
                    </div>
                    <Link 
                      to={`/solutions/${s.slug}`} 
                      className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
                    >
                      Explore <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-py bg-white border-t border-slate-200/80">
        <div className="container-custom text-center">
          <span className="badge badge-gold mb-3">Custom Solutions Builder</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Require a Custom Formulation or Bulk Order?
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto mb-8">
            Speak directly with our phytochemistry solutions engineers for file reviews, patent-free blends, and export dossiers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/request-quote" className="btn btn-primary">
              Initiate B2B RFQ
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Solutions Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
