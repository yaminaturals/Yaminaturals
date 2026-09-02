import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, CheckCircle2, FlaskConical, Shield, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#04130c] text-white pt-36 pb-24 lg:pt-44 lg:pb-32 overflow-hidden border-b border-[#1d5537]/40">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d5537_1px,transparent_1px),linear-gradient(to_bottom,#1d5537_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetrical Editorial Typography */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 border border-[#c5a059]/40 bg-[#072115]">
              <span className="w-1.5 h-1.5 bg-[#c5a059]"></span>
              <span className="text-[11px] font-mono font-medium tracking-[0.22em] text-[#d9c497] uppercase">
                Botanical Ingredients &bull; Nutraceutical Solutions
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#fffefc] leading-[1.08]">
              Nature, <span className="italic font-light text-[#c5a059]">Standardized.</span><br />
              Science, <span className="font-sans font-bold text-white tracking-tight">Delivered.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#ded5c0] max-w-2xl leading-relaxed font-light">
              High-potency standardized herbal extracts, phytochemical active markers, and contract-manufactured nutraceutical ingredients engineered to pharmacopoeial rigor for global dietary supplement, food, and pharmaceutical brands.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/products" className="btn btn-gold text-xs py-4 px-8 shadow-sm">
                <span>Explore Ingredients</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/request-quote" className="btn btn-outline-white text-xs py-4 px-8">
                <FileText size={14} />
                <span>Request B2B Quote</span>
              </Link>
            </div>

            {/* Scientific Verification Strip */}
            <div className="pt-8 border-t border-[#1d5537]/50 grid grid-cols-3 gap-6 text-xs text-[#ded5c0]/80">
              <div className="space-y-1">
                <div className="font-mono text-sm font-bold text-[#c5a059]">25 KG</div>
                <div className="text-[11px] uppercase tracking-wider text-[#ded5c0]/60">Standard Industrial MOQ</div>
              </div>
              <div className="space-y-1">
                <div className="font-mono text-sm font-bold text-white">HPLC / GC-MS</div>
                <div className="text-[11px] uppercase tracking-wider text-[#ded5c0]/60">Batch-Specific COAs</div>
              </div>
              <div className="space-y-1">
                <div className="font-mono text-sm font-bold text-[#c5a059]">40+ MARKETS</div>
                <div className="text-[11px] uppercase tracking-wider text-[#ded5c0]/60">Global Freight Logistics</div>
              </div>
            </div>
          </div>

          {/* Right Column: Asymmetrical Large Architectural Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-[#1d5537] bg-[#072115] p-2 shadow-2xl">
              {/* Primary Large Image Frame */}
              <div className="relative h-96 sm:h-[420px] w-full overflow-hidden bg-[#04130c]">
                <img 
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80" 
                  alt="Standardized Phytochemical Extraction Laboratory" 
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04130c] via-transparent to-transparent opacity-80" />

                {/* Overlaid Scientific Inset Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#072115]/95 border border-[#1d5537] p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-widest">
                      FACILITY SPECIFICATION
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      cGMP &bull; ISO 22000
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white leading-tight">
                    Closed-Loop SS-316L Solvent Extraction &amp; HEPA Class 100k Atomization
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#1d5537]/60 flex items-center justify-between text-[11px] text-[#ded5c0]/70 font-mono">
                    <span>Monthly Output: 150 MT</span>
                    <span>USP &lt;467&gt; Monograph</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Decorative Framing Mark */}
            <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#c5a059]" />
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#c5a059]" />
          </div>
        </div>
      </div>
    </section>
  );
};
