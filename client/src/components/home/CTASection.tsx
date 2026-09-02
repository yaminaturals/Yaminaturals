import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Mail, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="section-py bg-[#04130c] text-white border-b border-[#1d5537]/40 relative overflow-hidden">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d5537_1px,transparent_1px),linear-gradient(to_bottom,#1d5537_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto border border-[#1d5537] bg-[#072115] p-8 sm:p-14 lg:p-16 text-center shadow-2xl relative">
          {/* Corner Framing Marks */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#c5a059]" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#c5a059]" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#c5a059]/40 bg-[#04130c] mb-6">
            <span className="w-1.5 h-1.5 bg-[#c5a059]"></span>
            <span className="text-[11px] font-mono tracking-[0.22em] text-[#d9c497] uppercase">
              B2B Contract Partnerships
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight mb-4">
            Let&apos;s Build Something <br />
            <span className="italic font-light text-[#c5a059]">Better.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#ded5c0] max-w-2xl mx-auto leading-relaxed font-light mb-10">
            Tell us what you&apos;re looking to source, formulate or manufacture. Our technical sales team responds within 24 hours with complete specification dossiers and commercial pricing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/request-quote" 
              className="btn btn-gold text-xs py-4 px-8 shadow-sm"
            >
              <Send size={14} />
              <span>Request a Commercial Quote</span>
            </Link>
            <Link 
              to="/contact" 
              className="btn btn-outline-white text-xs py-4 px-8"
            >
              <Mail size={14} />
              <span>Contact Headquarters</span>
            </Link>
          </div>

          {/* Micro Assurance */}
          <div className="mt-10 pt-8 border-t border-[#1d5537]/60 flex flex-wrap items-center justify-center gap-8 text-[11px] font-mono text-[#ded5c0]/70">
            <span>&bull; Direct Farm-Gate Traceability</span>
            <span>&bull; Batch-Specific HPLC COAs</span>
            <span>&bull; Standard 25 kg B2B MOQ</span>
          </div>
        </div>
      </div>
    </section>
  );
};
