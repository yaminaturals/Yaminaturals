import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { QuoteModal } from '../components/common/QuoteModal';
import { ShieldCheck, Check, ChevronRight, Send } from 'lucide-react';

export const SolutionDetailPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const data: Record<string, { 
    title: string; 
    subtitle: string; 
    description: string; 
    capabilities: string[]; 
    process: { title: string; desc: string }[]; 
    moq: string; 
    compliance: string[]; 
  }> = {
    'private-label': {
      title: 'Private Label Development',
      subtitle: 'Turnkey, Compliant White-Label Ingredient & Dosage Forms',
      description: 'Complete private label solutions from botanical extraction to regulatory-compliant finished packaging.',
      capabilities: [
        'Bottled vegetarian & gelatin capsules',
        'Alu-Alu and Blister pack formats',
        'Stick-pack and sachet powders (1-20g)',
        'Dry syrup bottling and tinctures',
        'Custom label design and barcoding assistance'
      ],
      process: [
        { title: 'Formulation Selection', desc: 'Choose from 60+ pre-tested pharmacopoeial-grade botanical blends.' },
        { title: 'Packaging Configuration', desc: 'Select bottle, cap, induction seal, and shine-finish labeling.' },
        { title: 'Stability & Checks', desc: 'Full lot-testing for heavy metals, pesticides, and assay potency.' },
        { title: 'Commercial Delivery', desc: 'Factory-direct dispatch with full COA and transit dossiers.' }
      ],
      moq: '5,000 finished units',
      compliance: ['USDA FDA cGMP', 'ISO 22000:2018', 'Non-GMO Project Standard']
    },
    'contract-manufacturing': {
      title: 'Contract Manufacturing',
      subtitle: 'Industrial-Scale Extraction, Granulation & Compression',
      description: 'State-of-the-art extraction facilities equipped with SS-316L percolators, vacuum evaporators, and spray dryers.',
      capabilities: [
        'Aqueous, Hydro-alcoholic, and Organic Solvent Extraction',
        'Fluidized Bed Drying & Granulation (20-80 mesh)',
        'Rotary Tablet compression up to 1,000,000 tablets/day',
        'High-speed automatic capsule filling (1,200,000/day)',
        'Lead times: 3-4 weeks for standard extracts'
      ],
      process: [
        { title: 'Raw Material Quarantine', desc: 'HPTLC and HPLC batch identification prior to extraction.' },
        { title: 'Extraction & Purification', desc: 'Temperature-controlled vacuum extraction preserving thermolabile actives.' },
        { title: 'Spray Drying & Granulation', desc: 'Class 100k cleanroom spray-drying with microbial barriers.' },
        { title: 'Final Packaging & COA Formalization', desc: 'Alu-formed industrial drums with desiccants and seals.' }
      ],
      moq: '25 kg extract / 100,000 dosage units',
      compliance: ['cGMP 21 CFR Part 111', 'ISO 9001:2015', 'ISO 22000:2018']
    },
    'custom-formulation': {
      title: 'Custom Formulation & R&D',
      subtitle: 'Proprietary Phytochemical Blends & Bioavailability Optimization',
      description: 'Collaborative R&D to develop custom active marker concentrations, taste-masked extracts, and synergistic botanical formulas.',
      capabilities: [
        'Single-marker enrichment (up to 98% purity)',
        'Water-dispersible botanical micro-granules',
        'Liposomal and phytosomal enhancements',
        'Targeted botanical taste masking for gummies and beverages',
        'Dedicated patent filing and IP protection'
      ],
      process: [
        { title: 'Brief & CFA Definition', desc: 'Specify your target marker percentage, solubility, and application.' },
        { title: 'Lab-Scale Extraction R&D', desc: 'Breakthrough separation and assay validation on HPLC.' },
        { title: 'Pilot Batch Sampling', desc: '500g-2kg sample dispatched for your internal R&D validation.' },
        { title: 'Commercial Scale-Up', desc: 'Scaled up to metric ton scale with custom MOQ terms.' }
      ],
      moq: '50 kg custom blend',
      compliance: ['HPLC-analyzed', 'Water-soluble protocols', 'Pharmacopoeial Grade']
    },
    'export': {
      title: 'Global Export & Regulatory',
      subtitle: 'Complete International Compliance, CIF/FOB Logistics & Dossiers',
      description: 'Exporting to 40+ nations across North America, EURO, APAC, and MEA.',
      capabilities: [
        'USP <467> & Ph. Eur. residual solvents dossiers',
        'Facilitation of USDA FDA NDI filings',
        'Chamber of Commerce Apostille documentation',
        'Seafreight and Air Freight (CIF, FOB, DAP, DDP)',
        'Real-time temperature-controlled logistics'
      ],
      process: [
        { title: 'Regulatory Addressal', desc: 'Verify ingredient admissibility in target country.' },
        { title: 'Dossier Preparation', desc: 'COA, TDS, MSDS, Non-GMO, and allergen statements compiled.' },
        { title: 'Customs & Shipping', desc: 'Filing with dedicated bill of lading and phytosanitary certificates.' },
        { title: 'Port-to-Door Delivery', desc: 'Safe transit with end-to-end cargo insurance.' }
      ],
      moq: 'International Container & Air Freight',
      compliance: ['FDA Food Facility Registration', 'Free Sales Certificates', 'Apostille COA']
    }
  };

  const current = type && data[type] ? data[type] : data['private-label'];

  return (
    <>
      <SEO 
        title={`${current.title} | YAMI NATURALS Solutions`} 
        description={`B2B ${current.title} services for global nutraceutical and botanical brands.`} 
      />

      <div className="bg-slate-100/70 py-3.5 border-b border-slate-200/60">
        <div className="container-custom flex items-center gap-2 text-xs text-slate-600">
          <Link to="/" className="hover:text-emerald-800">Home</Link>
          <ChevronRight size={12} />
          <Link to="/solutions" className="hover:text-emerald-800">Solutions</Link>
          <ChevronRight size={12} />
          <span className="text-slate-900 font-medium">{current.title}</span>
        </div>
      </div>

      <div className="bg-slate-950 text-white pt-12 pb-16 border-b border-slate-800">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="badge badge-gold mb-3">B2B Manufacturing Solutions</span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {current.title}
              </h1>
              <p className="text-base sm:text-lg text-emerald-400 mt-1">
                {current.subtitle}
              </p>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                {current.description}
              </p>
            </div>

            <div className="card-premium bg-slate-900/80 border-emerald-500/30 p-6 lg:max-w-sm w-full">
              <div className="text-xs text-slate-400 mb-1">STANDARD MOQ</div>
              <div className="text-2xl font-bold text-gold-400 mb-5">
                {current.moq}
              </div>
              <button 
                onClick={() => setQuoteModalOpen(true)} 
                className="btn btn-primary w-full justify-center"
              >
                <Send size={15} />
                <span>Initiate B2B RFQ</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="section-py bg-slate-50/80">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Capabilities */}
            <div className="card-premium bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Core Capabilities</h3>
              <ul className="space-y-3.5">
                {current.capabilities.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-slate-700">
                    <ShieldCheck size={16} className="text-emerald-800 flex-shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compliance */}
            <div className="card-premium bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Quality &amp; Certification Standards</h3>
              <ul className="space-y-3.5">
                {current.compliance.map((cm, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-slate-700">
                    <Check size={16} className="text-emerald-800 flex-shrink-0 mt-0.5" />
                    <span>{cm}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Process */}
          <div className="card-premium bg-white p-8 shadow-sm mt-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">4-Step Execution Process</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {current.process.map((p, i) => (
                <div key={i} className="p-5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <div className="text-sm font-bold text-gold-600 mb-1">{`0${i + 1}`}</div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{p.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
        initialProductName={`Solution: ${current.title}`} 
      />
    </>
  );
};
