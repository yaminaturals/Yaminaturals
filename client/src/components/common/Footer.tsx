import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Shield, FileText, ArrowUpRight } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const Footer: React.FC = () => {
  const { settings } = useSettings();

  return (
    <footer className="bg-[#04130c] text-white border-t border-[#1d5537]/40 pt-20 pb-12">
      <div className="container-custom">
        {/* Top Tier: Brand & Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#1d5537]/40">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-6">
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

            <p className="text-xs text-[#ded5c0] leading-relaxed max-w-sm font-light">
              Premier B2B manufacturer and global exporter of standardized botanical extracts, custom phytochemical granules, and private-label formulations engineered for pharmaceutical and nutraceutical brands.
            </p>

            <div className="pt-2 text-xs font-mono text-[#c5a059] space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-[#c5a059] flex-shrink-0" />
                <span>{settings.hqAddress || 'Corporate HQ: Mumbai 400001, India'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-[#c5a059] flex-shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:underline">
                  {settings.contactEmail || 'contact@yaminaturals.com'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-[#c5a059] flex-shrink-0" />
                <a href={`tel:${settings.contactPhone}`} className="hover:underline">
                  {settings.contactPhone || '+91 8780664057'}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Ingredients Portfolio */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#c5a059] uppercase tracking-[0.2em]">
              Ingredients
            </h4>
            <ul className="space-y-2.5 text-xs text-[#ded5c0]/80 font-light">
              <li>
                <Link to="/products/ashwagandha-extract-5-withanolides" className="hover:text-white transition">
                  Ashwagandha Extract 5%
                </Link>
              </li>
              <li>
                <Link to="/products/turmeric-curcumin-95-total-curcuminoids" className="hover:text-white transition">
                  Turmeric Curcumin 95%
                </Link>
              </li>
              <li>
                <Link to="/products/moringa-leaf-extract-saponins-20" className="hover:text-white transition">
                  Moringa Leaf Saponins 20%
                </Link>
              </li>
              <li>
                <Link to="/products/amla-extract-40-tannins-water-soluble" className="hover:text-white transition">
                  Amla Fruit Tannins 40%
                </Link>
              </li>
              <li>
                <Link to="/products/purified-shilajit-extract-50-fulvic-acid" className="hover:text-white transition">
                  Purified Shilajit 50%
                </Link>
              </li>
              <li>
                <Link to="/products/boswellia-serrata-extract-65-boswellic-acids" className="hover:text-white transition">
                  Boswellia Serrata AKBA 65%
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-[#c5a059] hover:underline font-normal flex items-center gap-1 mt-2">
                  <span>View All 12 Ingredients &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions & Manufacturing */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#c5a059] uppercase tracking-[0.2em]">
              B2B Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-[#ded5c0]/80 font-light">
              <li>
                <Link to="/solutions/contract-manufacturing" className="hover:text-white transition">
                  Contract Extraction
                </Link>
              </li>
              <li>
                <Link to="/solutions/private-label" className="hover:text-white transition">
                  Turnkey Private Label
                </Link>
              </li>
              <li>
                <Link to="/solutions/custom-formulation" className="hover:text-white transition">
                  Custom Phytochemistry
                </Link>
              </li>
              <li>
                <Link to="/manufacturing" className="hover:text-white transition">
                  Facility Infrastructure
                </Link>
              </li>
              <li>
                <Link to="/quality" className="hover:text-white transition">
                  HPLC Quality Control
                </Link>
              </li>
              <li>
                <Link to="/applications" className="hover:text-white transition">
                  Formulation Matrices
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Documentation & Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#c5a059] uppercase tracking-[0.2em]">
              Documentation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#ded5c0]/80 font-light">
              <li>
                <Link to="/resources" className="hover:text-white transition">
                  Technical Monographs
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition">
                  USP &lt;467&gt; Solvents Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition">
                  Commercial FAQ
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
              <li>
                <Link to="/admin/login" className="text-[#ded5c0]/40 hover:text-white transition text-[10px] font-mono block mt-3">
                  Enterprise Portal Access
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Regulatory Disclaimer & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-[#ded5c0]/60 font-light">
          <p className="max-w-2xl text-center md:text-left leading-relaxed">
            <strong className="text-[#ded5c0]">B2B Commercial Notice:</strong> YAMI NATURALS supplies raw botanical ingredients, standardized extracts, and contract-manufactured bulk formulations exclusively to qualified commercial manufacturers and institutional buyers. Products are not intended for direct retail sale to individual consumers.
          </p>

          <div className="text-center md:text-right font-mono text-[10px] text-[#ded5c0]/50 flex-shrink-0">
            &copy; {new Date().getFullYear()} YAMI NATURALS. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
