import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Globe, Shield, FileText, ArrowUpRight, 
  CheckCircle2, Award, Download, Clock, ShieldCheck, ChevronRight
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { QuoteModal } from './QuoteModal';

export const Footer: React.FC = () => {
  const { settings } = useSettings();
  const [rfqModalOpen, setRfqModalOpen] = useState(false);

  const certifications = [
    { label: 'cGMP Certified', sub: '21 CFR Part 111' },
    { label: 'ISO 22000:2018', sub: 'Food Safety FSMS' },
    { label: 'HACCP System', sub: 'Hazard Analysis' },
    { label: 'USP Standards', sub: '<467> & <2232>' },
    { label: 'Halal Certified', sub: 'Global Compliance' },
    { label: 'Kosher Certified', sub: 'Rabbinical Council' },
    { label: 'Non-GMO Verified', sub: 'Botanical Purity' }
  ];

  return (
    <>
      <footer className="bg-[#03100a] text-white border-t border-[#1d5537]/50 pt-16 lg:pt-20 pb-12 overflow-hidden">
        <div className="container-custom">
          
          {/* Top Tier: Trust & Global Accreditation Strip */}
          <div className="pb-12 mb-12 border-b border-[#1d5537]/30">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <span className="eyebrow text-[10px] tracking-[0.25em] text-[#c5a059] mb-1">
                  Global Manufacturing Compliance
                </span>
                <h3 className="text-base sm:text-lg font-serif text-white font-normal">
                  Pharmacopoeial Standards &amp; Verified Quality Accreditations
                </h3>
              </div>
              
              {/* Accreditations Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
                {certifications.map((c, i) => (
                  <div 
                    key={i} 
                    className="bg-[#072115]/80 border border-[#1d5537]/60 px-3 py-2 text-center rounded-none shadow-sm hover:border-[#c5a059]/60 transition"
                  >
                    <div className="text-[10px] sm:text-[11px] font-mono font-bold text-[#c5a059] truncate">
                      {c.label}
                    </div>
                    <div className="text-[8px] sm:text-[9px] font-mono text-[#ded5c0]/60 truncate">
                      {c.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Tier: 5 Structured Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-[#1d5537]/30">
            
            {/* Column 1: Brand & Corporate Liaison (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <Link to="/" className="inline-block group">
                <img 
                  src="/logo-white.png" 
                  alt="Yami Naturals Logo" 
                  className="h-14 sm:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]" 
                />
                <div className="text-[10px] font-mono tracking-[0.24em] text-[#c5a059] uppercase mt-3">
                  {settings.tagline || 'Nature, Standardized. Science, Delivered.'}
                </div>
              </Link>

              <p className="text-xs text-[#ded5c0]/90 leading-relaxed font-light pr-4">
                Premier B2B manufacturer and global exporter of standardized botanical extracts, custom phytochemical granules, and private-label formulations engineered for pharmaceutical and nutraceutical brands.
              </p>

              {/* Corporate Contact Liaison Card */}
              <div className="bg-[#072115]/90 border border-[#1d5537]/70 p-4 space-y-2.5 text-xs font-mono text-[#ded5c0] shadow-sm">
                <div className="flex items-start gap-2.5">
                  <MapPin size={14} className="text-[#c5a059] flex-shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-snug">
                    {settings.hqAddress || 'Corporate HQ: Mumbai 400001, India'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail size={14} className="text-[#c5a059] flex-shrink-0" />
                  <a href={`mailto:${settings.contactEmail}`} className="text-[11px] text-[#c5a059] hover:underline">
                    {settings.contactEmail || 'contact@yaminaturals.com'}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={14} className="text-[#c5a059] flex-shrink-0" />
                  <a href={`tel:${settings.contactPhone}`} className="text-[11px] text-white hover:text-[#c5a059] transition">
                    {settings.contactPhone || '+91 8780664057'}
                  </a>
                  <span className="text-[9px] text-[#ded5c0]/50 ml-auto font-sans uppercase">Export Desk</span>
                </div>
              </div>
            </div>

            {/* Column 2: Ingredients Portfolio (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-mono font-bold text-[#c5a059] uppercase tracking-[0.2em] flex items-center gap-1.5">
                <span>Botanicals</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-[#ded5c0]/80 font-light">
                <li>
                  <Link to="/products/ashwagandha-extract-5-withanolides" className="hover:text-white transition flex items-center justify-between group">
                    <span className="group-hover:translate-x-0.5 transition">Ashwagandha 5%</span>
                    <span className="text-[9px] font-mono text-[#c5a059]/70">HPLC</span>
                  </Link>
                </li>
                <li>
                  <Link to="/products/turmeric-curcumin-95-total-curcuminoids" className="hover:text-white transition flex items-center justify-between group">
                    <span className="group-hover:translate-x-0.5 transition">Curcumin 95%</span>
                    <span className="text-[9px] font-mono text-[#c5a059]/70">UV</span>
                  </Link>
                </li>
                <li>
                  <Link to="/products/boswellia-serrata-extract-65-boswellic-acids" className="hover:text-white transition flex items-center justify-between group">
                    <span className="group-hover:translate-x-0.5 transition">Boswellia AKBA 65%</span>
                    <span className="text-[9px] font-mono text-[#c5a059]/70">Titration</span>
                  </Link>
                </li>
                <li>
                  <Link to="/products/purified-shilajit-extract-50-fulvic-acid" className="hover:text-white transition flex items-center justify-between group">
                    <span className="group-hover:translate-x-0.5 transition">Shilajit 50%</span>
                    <span className="text-[9px] font-mono text-[#c5a059]/70">Fulvic</span>
                  </Link>
                </li>
                <li>
                  <Link to="/products/moringa-leaf-extract-saponins-20" className="hover:text-white transition flex items-center justify-between group">
                    <span className="group-hover:translate-x-0.5 transition">Moringa Saponins 20%</span>
                    <span className="text-[9px] font-mono text-[#c5a059]/70">Bioactive</span>
                  </Link>
                </li>
                <li>
                  <Link to="/products/amla-extract-40-tannins-water-soluble" className="hover:text-white transition flex items-center justify-between group">
                    <span className="group-hover:translate-x-0.5 transition">Amla Tannins 40%</span>
                    <span className="text-[9px] font-mono text-[#c5a059]/70">Soluble</span>
                  </Link>
                </li>
                <li className="pt-1.5">
                  <Link to="/products" className="text-[#c5a059] hover:underline font-mono text-[11px] inline-flex items-center gap-1">
                    <span>View All 12 Monographs &rarr;</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Processing & Solutions (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-mono font-bold text-[#c5a059] uppercase tracking-[0.2em]">
                Capabilities
              </h4>
              <ul className="space-y-2.5 text-xs text-[#ded5c0]/80 font-light">
                <li>
                  <Link to="/solutions/contract-manufacturing" className="hover:text-white transition flex items-center gap-1.5">
                    <ChevronRight size={11} className="text-[#c5a059]" />
                    <span>Contract Extraction</span>
                  </Link>
                </li>
                <li>
                  <Link to="/solutions/private-label" className="hover:text-white transition flex items-center gap-1.5">
                    <ChevronRight size={11} className="text-[#c5a059]" />
                    <span>Turnkey Private Label</span>
                  </Link>
                </li>
                <li>
                  <Link to="/solutions/custom-formulation" className="hover:text-white transition flex items-center gap-1.5">
                    <ChevronRight size={11} className="text-[#c5a059]" />
                    <span>Custom Granulation</span>
                  </Link>
                </li>
                <li>
                  <Link to="/manufacturing" className="hover:text-white transition flex items-center gap-1.5">
                    <ChevronRight size={11} className="text-[#c5a059]" />
                    <span>SS-316L Cleanrooms</span>
                  </Link>
                </li>
                <li>
                  <Link to="/quality" className="hover:text-white transition flex items-center gap-1.5">
                    <ChevronRight size={11} className="text-[#c5a059]" />
                    <span>HPLC Testing Lab</span>
                  </Link>
                </li>
                <li>
                  <Link to="/applications" className="hover:text-white transition flex items-center gap-1.5">
                    <ChevronRight size={11} className="text-[#c5a059]" />
                    <span>Dosage Matrices</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Compliance & Documentation (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-mono font-bold text-[#c5a059] uppercase tracking-[0.2em]">
                Compliance
              </h4>
              <ul className="space-y-2.5 text-xs text-[#ded5c0]/80 font-light">
                <li>
                  <Link to="/resources" className="hover:text-white transition">
                    Technical Whitepapers
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="hover:text-white transition">
                    USP &lt;467&gt; Solvents Dossier
                  </Link>
                </li>
                <li>
                  <Link to="/quality" className="hover:text-white transition">
                    Heavy Metals USP &lt;2232&gt;
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-white transition">
                    Commercial FAQ &amp; MOQs
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition">
                    Terms of Supply
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Direct Commercial RFQ & Export Hubs (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-mono font-bold text-[#c5a059] uppercase tracking-[0.2em]">
                Direct RFQ
              </h4>

              <div className="bg-[#072115] border border-[#1d5537] p-4 space-y-3">
                <div className="text-[11px] text-[#ded5c0] font-light leading-relaxed">
                  Need volume pricing, custom assay specifications, or lot-authenticated COA?
                </div>

                <Link
                  to="/request-quote"
                  className="btn btn-gold text-[11px] py-2 px-3 w-full justify-center text-center"
                >
                  <span>Request RFQ</span>
                  <ArrowUpRight size={13} />
                </Link>

                <div className="pt-2 border-t border-[#1d5537]/60 text-[10px] font-mono text-[#c5a059] flex items-center gap-1.5">
                  <Clock size={11} className="flex-shrink-0" />
                  <span>4-Hour Technical Dispatch</span>
                </div>
              </div>

              {/* Global Freight Lanes */}
              <div className="text-[10px] font-mono text-[#ded5c0]/60 space-y-1">
                <div className="text-[#c5a059] font-bold uppercase text-[9px] tracking-wider">Active Export Lanes</div>
                <div>&bull; North America: NY/NJ &bull; LAX</div>
                <div>&bull; Europe: Rotterdam &bull; Hamburg</div>
                <div>&bull; APAC: Singapore &bull; Tokyo</div>
              </div>
            </div>

          </div>

          {/* Bottom Tier: Regulatory Disclaimer & Legal */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-[#ded5c0]/60 font-light">
            <p className="max-w-2xl text-center md:text-left leading-relaxed">
              <strong className="text-[#ded5c0]">B2B Commercial Notice:</strong> YAMI NATURALS supplies raw botanical ingredients, standardized extracts, and contract-manufactured bulk formulations exclusively to qualified commercial manufacturers and institutional buyers. Products are not intended for direct retail sale to individual consumers.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-center md:text-right font-mono text-[10px] text-[#ded5c0]/50 flex-shrink-0">
              <Link to="/admin/login" className="text-[#ded5c0]/40 hover:text-[#c5a059] transition">
                Enterprise Portal Access
              </Link>
              <span className="hidden sm:inline">&bull;</span>
              <span>&copy; {new Date().getFullYear()} {settings.companyName || 'YAMI NATURALS'}. All Rights Reserved.</span>
            </div>
          </div>

        </div>
      </footer>

      <QuoteModal isOpen={rfqModalOpen} onClose={() => setRfqModalOpen(false)} />
    </>
  );
};
