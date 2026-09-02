import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { ShieldCheck, Award, Factory, Users, Leaf, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="About YAMI NATURALS | Standardized Botanical Extract Manufacturer" 
        description="Pioneering scientific extraction, pharmacopoeial standardization, and sustainable botanical supply chains." 
      />

      <div className="bg-slate-950 text-white pt-28 pb-16 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80" alt="About Hero" className="w-full h-full object-cover" />
        </div>
        <div className="container-custom relative z-10">
          <span className="badge badge-gold mb-3">Corporate Heritage</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Scientific Botanical Heritage
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-3">
            Bridging centuries of traditional botanical wisdom with contemporary high-performance liquid chromatography and pharmaceutical-grade extraction.
          </p>
        </div>
      </div>

      <section className="section-py bg-slate-50/80">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="badge badge-emerald mb-3">Who We Are</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Nature Standardized. Science Delivered.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                YAMI NATURALS was founded on a singular premise: botanical ingredients must meet the same analytical rigor, batch consistency, and purity metrics demanded by modern pharmaceutical manufacturing.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                From our dedicated contract farming networks across pristine agricultural belts in India to our state-of-the-art cGMP extraction facility, we control 100% of the phytochemical supply chain.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <div className="text-2xl font-bold text-emerald-800">150+ MT</div>
                  <div className="text-xs text-slate-500">Monthly Extraction Capacity</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold-600">40+</div>
                  <div className="text-xs text-slate-500">Export Destination Countries</div>
                </div>
              </div>
            </div>

            <div className="card-premium bg-white p-8 shadow-sm space-y-6">
              <div className="rounded-xl overflow-hidden h-48 w-full mb-4">
                <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80" alt="Farming & Extraction" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Core Operating Pillars</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <Leaf size={18} className="text-emerald-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Direct Farm-Gate Sourcing</div>
                    <p className="text-slate-600">Traceable contract farming with zero middleman adulteration.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <ShieldCheck size={18} className="text-emerald-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Analytical Verification</div>
                    <p className="text-slate-600">Lot-specific HPLC, HPTLC, and ICP-MS testing for every shipment.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <Factory size={18} className="text-emerald-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Closed-Loop Cleanrooms</div>
                    <p className="text-slate-600">Class 100k cleanroom spray drying with microbial filtration.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
