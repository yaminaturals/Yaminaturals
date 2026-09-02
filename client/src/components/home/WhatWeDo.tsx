import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const WhatWeDo: React.FC = () => {
  const capabilities = [
    {
      num: '01',
      title: 'Standardized Botanical Extracts',
      category: 'Pharmacopoeial Actives',
      desc: 'High-purity botanical actives standardized to verified active marker percentages via reverse-phase HPLC and CAMAG HPTLC fingerprinting.',
      link: '/products',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '02',
      title: 'Nutraceutical Ingredients & Granules',
      category: 'Direct Compression Formats',
      desc: 'Micro-granulated botanical powders, high-bulk density fractions, and cold-water-soluble complexes engineered for instant dissolution.',
      link: '/solutions',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '03',
      title: 'Custom Phytochemical Formulation',
      category: 'Proprietary R&D Blends',
      desc: 'Full-spectrum formulation engineering: target marker ratios, bioavailability synergy, taste-masking, and stability testing in our pilot lab.',
      link: '/solutions/custom-formulation',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '04',
      title: 'Private Label & Contract Manufacturing',
      category: 'OEM / Finished Dosage',
      desc: 'Turnkey contract manufacturing in vegetarian capsules, precision tableting, sachet filling, and blister packaging in cGMP cleanrooms.',
      link: '/solutions/private-label',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="section-py bg-[#fdfbf7] border-b border-[#e5dcce]">
      <div className="container-custom">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="eyebrow-dark">
              <span>01 &bull; Core Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111827] tracking-tight">
              Phytochemical Precision. <br />
              <span className="italic font-light text-[#1d5537]">Industrial Scale.</span>
            </h2>
          </div>
          <p className="text-sm text-[#4b5563] max-w-md font-light leading-relaxed">
            We operate fully integrated botanical supply chains — from farm-gate raw material procurement to pharmaceutical-grade extraction and finished dosage forms.
          </p>
        </div>

        {/* 4 Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((cap, idx) => (
            <Link 
              key={idx}
              to={cap.link}
              className="card-editorial bg-white group flex flex-col justify-between overflow-hidden hover:border-[#1d5537] hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* Large Editorial Photography */}
                <div className="relative h-60 w-full overflow-hidden bg-[#072115]">
                  <img 
                    src={cap.image} 
                    alt={cap.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-xs font-bold text-[#c5a059] bg-[#072115] px-2.5 py-1 border border-[#c5a059]/40">
                      {cap.num}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 text-[10px] font-mono text-white/90 uppercase tracking-widest">
                    {cap.category}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#111827] group-hover:text-[#1d5537] transition leading-snug mb-3">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-[#6b7280] leading-relaxed font-light">
                    {cap.desc}
                  </p>
                </div>
              </div>

              {/* Action Bottom Link */}
              <div className="p-6 pt-0 border-t border-[#f0eade] mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-[#1d5537] group-hover:text-[#072115] pt-4">
                <span>View Capability</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
