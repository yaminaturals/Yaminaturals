import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Plane, Ship, ShieldCheck, ArrowRight } from 'lucide-react';

export const GlobalSupply: React.FC = () => {
  const regions = [
    {
      name: 'North America',
      countries: 'United States & Canada',
      specs: 'US FDA 21 CFR Part 111 cGMP compliance, Prop 65 heavy metals limits, NPN dossier support.',
      hub: 'Air Freight: JFK / ORD / LAX & Sea: Long Beach / NJ'
    },
    {
      name: 'European Union & UK',
      countries: 'Germany, France, UK, Italy, Netherlands',
      specs: 'Ph. Eur. monograph compliance, EU Novel Foods documentation, zero ethylene oxide (ETO).',
      hub: 'Air: FRA / LHR / AMS & Sea: Rotterdam / Hamburg'
    },
    {
      name: 'Asia Pacific',
      countries: 'Japan, Australia, South Korea, Singapore',
      specs: 'TGA Australia export documentation, ASEAN cosmetic directive, Halal certification.',
      hub: 'Air: NRT / ICN / SIN & Sea: Sydney / Singapore'
    },
    {
      name: 'Middle East',
      countries: 'UAE, Saudi Arabia, Qatar, Oman',
      specs: 'GSO & SASO compliance, Halal certified production line, authenticated chamber attestations.',
      hub: 'Air: DXB / DOH & Sea: Jebel Ali'
    }
  ];

  return (
    <section className="section-py bg-[#fdfbf7] border-b border-[#e5dcce]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="eyebrow-dark">
              <span>07 &bull; Export Infrastructure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111827] tracking-tight">
              Global Supply &amp; Export <br />
              <span className="italic font-light text-[#1d5537]">Logistics Security</span>
            </h2>
          </div>
          <p className="text-sm text-[#4b5563] max-w-md font-light leading-relaxed">
            Exporting standardized botanical ingredients and private-label formulations to over 40 countries across North America, Europe, Asia, and the Middle East.
          </p>
        </div>

        {/* 4 Regional Corridor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {regions.map((r, idx) => (
            <div 
              key={idx} 
              className="card-editorial bg-white p-6 flex flex-col justify-between hover:border-[#1d5537] hover:shadow-md transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#f0eade] mb-4">
                  <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    {r.name}
                  </span>
                  <Globe size={15} className="text-[#c5a059]" />
                </div>

                <div className="text-[11px] font-mono text-[#85642b] mb-2 font-medium">
                  {r.countries}
                </div>

                <p className="text-xs text-[#6b7280] leading-relaxed font-light mb-4">
                  {r.specs}
                </p>
              </div>

              <div className="pt-3 border-t border-[#f0eade] text-[10px] font-mono text-[#1d5537]">
                <span className="text-[#9ca3af] block text-[9px] uppercase tracking-wider mb-0.5">Primary Entry Ports:</span>
                <span>{r.hub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Packaging Strip */}
        <div className="p-6 bg-[#f8f4ec] border border-[#e5dcce] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#4b5563]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-[#c5a059]/40 bg-white flex items-center justify-center text-[#1d5537] flex-shrink-0">
              <Ship size={18} />
            </div>
            <div>
              <div className="font-bold text-[#111827] uppercase tracking-wider">
                Industrial Export Packaging
              </div>
              <div className="text-[11px] font-light text-[#6b7280]">
                25 kg HDPE / Fiber Drums with double food-grade polyethylene liners and nitrogen flush.
              </div>
            </div>
          </div>

          <Link to="/contact" className="btn btn-outline text-xs py-2.5 px-5 flex-shrink-0">
            <span>Inquire About Export Shipping</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
};
