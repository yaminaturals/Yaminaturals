import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Check, ArrowRight } from 'lucide-react';

export const WhyYami: React.FC = () => {
  const pillars = [
    {
      title: 'Controlled Farm-Gate Sourcing',
      desc: 'Direct contract farming and sustainable wildcrafted harvesting across verified agro-climatic zones, ensuring 100% botanical authenticity and zero pesticide adulteration.'
    },
    {
      title: 'Pharmaceutical-Grade Extraction',
      desc: 'Sanitary SS-316L percolators and low-temperature vacuum evaporators operating below 45°C to preserve thermolabile active phytomolecules.'
    },
    {
      title: 'Exact Phytochemical Standardization',
      desc: 'Every extract is calibrated to verified active marker percentages via reverse-phase HPLC, ensuring batch-to-batch therapeutic uniformity.'
    },
    {
      title: 'Comprehensive Analytical Screening',
      desc: 'Full-spectrum testing for heavy metals (< 10 ppm via ICP-MS), residual solvents (USP <467> via GC-MS), and automated microbiology.'
    },
    {
      title: 'Regulatory & Technical Dossiers',
      desc: 'Complete compliance packets including lot-specific COAs, Technical Data Sheets (TDS), MSDS, and US FDA NDI / EU Novel Foods documentation support.'
    },
    {
      title: 'Global Export Supply Security',
      desc: 'Dedicated commercial logistics supporting temperature-controlled air freight and containerized ocean shipping to major international ports.'
    }
  ];

  return (
    <section className="section-py bg-[#fdfbf7] border-b border-[#e5dcce]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Editorial Photography */}
          <div className="lg:col-span-5 relative">
            <div className="border border-[#1d5537]/30 bg-white p-2 shadow-xl">
              <div className="relative h-[440px] w-full overflow-hidden bg-[#072115]">
                <img 
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80" 
                  alt="Sustainable Botanical Sourcing & Agriculture" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04130c]/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 bg-[#072115]/95 border border-[#1d5537] p-4 text-white">
                  <div className="text-[10px] font-mono text-[#c5a059] uppercase tracking-widest mb-1">
                    SUPPLY CHAIN INTEGRITY
                  </div>
                  <div className="text-xs font-bold leading-snug">
                    Unbroken Chain of Custody from Cultivation to Export
                  </div>
                </div>
              </div>
            </div>
            {/* Corner Decorative Frame */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#c5a059]" />
          </div>

          {/* Right Column: Editorial Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="eyebrow-dark">
                <span>03 &bull; Enterprise Assurance</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111827] tracking-tight">
                Why Global Formulators Choose <br />
                <span className="italic font-light text-[#1d5537]">YAMI NATURALS</span>
              </h2>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {pillars.map((p, idx) => (
                <div key={idx} className="border-l-2 border-[#1d5537] pl-4 space-y-1">
                  <h4 className="text-sm font-bold text-[#111827]">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[#6b7280] leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link to="/quality" className="btn btn-primary text-xs py-3 px-6">
                <span>Explore Quality Architecture</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
