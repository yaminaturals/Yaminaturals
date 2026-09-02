import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { ShieldCheck, Check, Award, FileText, FlaskConical } from 'lucide-react';

export const QualityPage: React.FC = () => {
  const instruments = [
    { name: 'Reverse-Phase HPLC', spec: 'Active marker quantification & assay purity.' },
    { name: 'CAMAG HPTLC System', spec: 'Botanical fingerprinting & adulteration screening.' },
    { name: 'ICP-MS Heavy Metals', spec: 'Lead (Pb), Cadmium (Cd), Arsenic (As), Mercury (Hg) to ppb sensitivity.' },
    { name: 'GC-MS / Headspace GC', spec: 'Residual solvents verification complying with USP <467> & Ph. Eur.' },
    { name: 'Automated Microbiology', spec: 'Total Plate Count, Yeast/Mold, Salmonella, E. Coli, Staph aureus.' },
    { name: 'LC-MS/MS Pesticide Screen', spec: 'Multi-residue screening across 400+ pesticide classes.' }
  ];

  return (
    <>
      <SEO 
        title="Quality Control & Analytical Testing Matrix | YAMI NATURALS" 
        description="Comprehensive analytical testing matrix including HPLC, HPTLC, ICP-MS, and GC-MS compliance." 
      />

      <div className="bg-slate-950 text-white pt-28 pb-16 border-b border-slate-800">
        <div className="container-custom">
          <span className="badge badge-gold mb-3">Analytical Matrix</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Quality Control &amp; Testing
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-3">
            Every commercial delivery is backed by lot-specific Certificate of Analysis (COA) dossiers verified across state-of-the-art analytical instrumentation.
          </p>
        </div>
      </div>

      <section className="section-py bg-slate-50/80">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {instruments.map((inst, i) => (
              <div key={i} className="card-premium bg-white p-7 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 mb-4">
                  <FlaskConical size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{inst.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{inst.spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
