import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Factory, Cpu, ShieldCheck, Gauge, CheckCircle2, ArrowRight } from 'lucide-react';

export const ManufacturingPage: React.FC = () => {
  const steps = [
    {
      title: 'Botanical Quarantine & HPTLC Profiling',
      desc: 'Herbal raw materials enter temperature-controlled quarantine bays for macro/microscopic identification and active marker assays before processing.',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Percolation & Solvent Extraction',
      desc: 'All-stainless SS-316L multi-stage percolators extract active phytomolecules using purified demineralized water and USP-grade ethanol.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Low-Temperature Vacuum Evaporation',
      desc: 'Falling-film and thin-film vacuum evaporators concentrate botanical liquors under 45 deg C to prevent thermal degradation of active markers.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Class 100,000 Cleanroom Spray Drying',
      desc: 'Atomized into fine, homogeneous micro-particles inside HEPA-filtered positive pressure drying towers.',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Fluid Bed Granulation & Particle Sizing',
      desc: 'Direct-compression granules and water-soluble micro-powders processed to custom mesh profiles (20 to 120 mesh).',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Nitrogen-Flushed Industrial Packaging',
      desc: 'Double polyethylene food-grade liners inside sealed aluminum/fiber drums with tamper-evident security tags.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <>
      <SEO 
        title="Manufacturing Infrastructure & Facilities | YAMI NATURALS" 
        description="Pharmaceutical-grade SS-316L extraction, vacuum evaporation, and Class 100k cleanroom spray drying." 
      />

      <div className="bg-slate-950 text-white pt-36 pb-16 lg:pt-40 lg:pb-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80" alt="Mfg Hero" className="w-full h-full object-cover" />
        </div>
        <div className="container-custom relative z-10">
          <span className="badge badge-gold mb-3">Facility Infrastructure</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Advanced Botanical Manufacturing
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-3">
            Engineered to cGMP, ISO 22000:2018, and US FDA 21 CFR Part 111 standards for large-scale nutraceutical and pharmaceutical grade extraction.
          </p>
        </div>
      </div>

      <section className="section-py bg-slate-50/80">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {steps.map((s, i) => (
              <div key={i} className="card-premium bg-white overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-44 w-full overflow-hidden bg-slate-900">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <div className="text-tiny font-bold text-gold-600 mb-1">{`STAGE 0${i + 1}`}</div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card-premium bg-white p-8 sm:p-10 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Schedule an On-Site or Virtual Facility Audit</h3>
                <p className="text-xs text-slate-600">We welcome QA/QC auditor visits and provide complete master batch records.</p>
              </div>
              <Link to="/contact" className="btn btn-primary flex-shrink-0 text-xs">
                Request Facility Audit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
