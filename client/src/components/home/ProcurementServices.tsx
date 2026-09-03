import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe2, ShieldCheck, Truck, Sparkles, Building2, CheckCircle, 
  ArrowRight, Search, FileCheck, Layers, Award, ShieldAlert, Cpu
} from 'lucide-react';
import { QuoteModal } from '../common/QuoteModal';

export const ProcurementServices: React.FC = () => {
  const [rfqOpen, setRfqOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  const procurementCategories = [
    {
      title: 'Rare & Standardized Herbal Extracts',
      desc: 'Specialized phytochemical active markers, supercritical CO2 extracts, and standardized botanical powders sourced through direct cultivation partnerships across India, Madagascar, and East Asia.',
      items: ['Supercritical CO2 Oleoresins', 'High-Purity Bioactive Markers (HPLC >98%)', 'Wildcrafted Himalayan Botanicals', 'Ayurvedic & Pharmacopoeial Monograph Grades']
    },
    {
      title: 'Nutraceutical APIs & Specialty Actives',
      desc: 'Tier-1 domestic and international alliances for synthesized and fermented nutraceutical actives, amino acids, vitamins, and specialized co-factors.',
      items: ['Fermented Amino Acids & Peptides', 'Hydrolyzed Marine & Bovine Collagen', 'Enzyme Complexes & Probiotic Strains', 'CoQ10, Resveratrol & Antioxidant Isomers']
    },
    {
      title: 'Certified Organic & Clean-Label Crops',
      desc: 'Direct-from-grower certified agricultural sourcing with farm-gate traceability, non-GMO verification, and USDA/EU organic credentials.',
      items: ['USDA & NPOP Certified Organic Herbs', 'Pesticide-Free Whole Plant Powders', 'Non-GMO Project Verified Botanical Biomass', 'Fair-Trade Certified Botanical Inflorescence']
    },
    {
      title: 'Custom Excipients, Binders & Minerals',
      desc: 'High-functionality direct compression excipients, microcrystalline cellulose, mineral chelates, and natural flavor/color systems.',
      items: ['Direct Compression (DC) Granules', 'Bisglycinate & Chelate Minerals (USP)', 'Natural Botanical Colors & Flavoring Oils', 'Enteric Coating Polymers & Flow Agents']
    }
  ];

  const valueProps = [
    {
      icon: Globe2,
      title: 'Global & Pan-India Sourcing Alliances',
      desc: 'Long-standing supply agreements with certified cultivators, primary processors, and ISO/cGMP manufacturers across 25+ countries.'
    },
    {
      icon: ShieldCheck,
      title: 'Mandatory In-House QA Re-Testing',
      desc: 'Zero blind shipments. Every third-party sourced batch is quarantined and analytically validated in our HPLC/GC-MS laboratory before release.'
    },
    {
      icon: FileCheck,
      title: 'Full Regulatory Vendor Dossiers',
      desc: 'Turnkey technical packages provided with every order: lot COAs, USP <467> residual solvent reports, heavy metal assays, TSE/BSE, and Halal/Kosher files.'
    },
    {
      icon: Truck,
      title: 'Price Stability & Guaranteed Buffer Stocks',
      desc: 'Shield your supply chain from market volatility through forward pricing contracts, dedicated warehouse reserves, and expedited global freight.'
    }
  ];

  return (
    <>
      <section className="section-py bg-[#f8f5ee] border-b border-[#e2d8c5] relative overflow-hidden">
        <div className="container-custom">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#072115] text-[#d9c497] border border-[#1d5537] text-[11px] font-mono font-semibold uppercase tracking-[0.2em] mb-4">
              <Sparkles size={13} className="text-[#c5a059]" />
              <span>Turnkey Strategic Sourcing</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-slate-900 tracking-tight leading-tight">
              One-Window Procurement for <br className="hidden sm:inline" />
              <span className="italic font-light text-[#1d5537]">All Your Ingredient Requirements.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-700 mt-4 leading-relaxed font-light">
              Beyond our proprietary extraction plants, YAMI NATURALS maintains verified supply agreements with premier national cultivators and leading international manufacturers. We source, analytically qualify, and deliver virtually any botanical raw material, API, or specialty excipient your formulations demand.
            </p>
          </div>

          {/* 4 Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {valueProps.map((prop, idx) => {
              const Icon = prop.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-[#e2d8c5] p-6 shadow-sm flex flex-col justify-between hover:border-[#1d5537] transition-colors duration-200"
                >
                  <div>
                    <div className="w-10 h-10 bg-[#072115] text-[#c5a059] flex items-center justify-center mb-5 border border-[#1d5537]/50">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2.5 leading-snug">
                      {prop.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {prop.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-[#1d5537] font-semibold">
                    <CheckCircle size={12} className="text-[#c5a059]" />
                    <span>Audit Qualified</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Procurement Scope Showcase */}
          <div className="bg-[#04130c] border border-[#1d5537] text-white p-6 sm:p-10 lg:p-12 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#1d5537]/60">
              <div>
                <span className="text-[10px] font-mono tracking-[0.24em] text-[#c5a059] uppercase block mb-1">
                  Strategic Scope &amp; Alliances
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-white">
                  What We Procure &amp; Supply For Your Pipeline
                </h3>
              </div>

              {/* Category Selection Tabs */}
              <div className="flex flex-wrap gap-2">
                {procurementCategories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(i)}
                    className={`px-3.5 py-2 text-xs font-mono transition-all duration-200 border ${
                      activeCategory === i
                        ? 'bg-[#c5a059] text-[#072115] border-[#c5a059] font-bold shadow-sm'
                        : 'bg-[#072115] text-[#ded5c0] border-[#1d5537] hover:border-[#c5a059]/60'
                    }`}
                  >
                    {cat.title.split(' ')[0]} {cat.title.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Category Display */}
            <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-block px-2.5 py-1 bg-[#072115] border border-[#c5a059]/40 text-[#c5a059] font-mono text-[10px] uppercase tracking-wider">
                  Category {String(activeCategory + 1).padStart(2, '0')} Scope
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {procurementCategories[activeCategory].title}
                </h4>
                <p className="text-xs text-[#ded5c0] leading-relaxed font-light">
                  {procurementCategories[activeCategory].desc}
                </p>

                <div className="pt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => setRfqOpen(true)}
                    className="btn btn-gold text-xs py-3 px-6"
                  >
                    <span>Request Sourcing Quote</span>
                    <ArrowRight size={13} />
                  </button>
                  <Link
                    to="/contact"
                    className="btn btn-outline-white text-xs py-3 px-6"
                  >
                    <span>Consult Sourcing Desk</span>
                  </Link>
                </div>
              </div>

              {/* Items List */}
              <div className="lg:col-span-6 bg-[#072115]/90 border border-[#1d5537] p-6 space-y-3">
                <div className="text-[10px] font-mono uppercase text-[#c5a059] tracking-wider mb-2 font-bold">
                  Representative Materials Under Active Sourcing
                </div>
                {procurementCategories[activeCategory].items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 p-3 bg-[#04130c]/80 border border-[#1d5537]/50 text-xs text-[#f4ede0]"
                  >
                    <span className="w-1.5 h-1.5 bg-[#c5a059] flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                    <span className="ml-auto text-[9px] font-mono text-[#ded5c0]/50 uppercase">COA Guaranteed</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <QuoteModal 
        isOpen={rfqOpen} 
        onClose={() => setRfqOpen(false)} 
        initialProductName="Custom Strategic Sourcing & Procurement" 
      />
    </>
  );
};
