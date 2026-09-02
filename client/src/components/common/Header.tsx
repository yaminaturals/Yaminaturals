import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Send, 
  ArrowRight
} from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdown, setSolutionsDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsDropdown(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled 
          ? 'py-2 xl:py-2.5 shadow-md border-b border-slate-200/90' 
          : 'py-2.5 xl:py-3.5 border-b border-slate-200/70 shadow-sm'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 xl:gap-6">
          {/* Brand Identity / Official Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0 py-0.5">
            <img 
              src="/logo.png" 
              alt="Yami Naturals Logo" 
              className="h-12 sm:h-14 xl:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]" 
            />
          </Link>

          {/* Desktop Navigation Links + Action Button */}
          <div className="hidden lg:flex items-center justify-end flex-1">
            <nav className="flex items-center gap-3.5 xl:gap-5 2xl:gap-7 text-[11px] xl:text-xs font-semibold uppercase tracking-[0.08em] xl:tracking-[0.12em]">
              <Link 
                to="/products" 
                className={`transition-colors py-1 whitespace-nowrap ${
                  location.pathname.startsWith('/products') 
                    ? 'text-[#1d5537] font-bold border-b-2 border-[#1d5537]' 
                    : 'text-slate-700 hover:text-[#1d5537]'
                }`}
              >
                Ingredients Catalog
              </Link>

              {/* Solutions Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setSolutionsDropdown(true)}
                onMouseLeave={() => setSolutionsDropdown(false)}
              >
                <Link 
                  to="/solutions"
                  className={`flex items-center gap-1 transition-colors py-1 whitespace-nowrap ${
                    location.pathname.startsWith('/solutions') 
                      ? 'text-[#1d5537] font-bold border-b-2 border-[#1d5537]' 
                      : 'text-slate-700 hover:text-[#1d5537]'
                  }`}
                >
                  <span>B2B Solutions</span>
                  <ChevronDown size={13} className={`transition-transform duration-200 text-slate-400 ${solutionsDropdown ? 'rotate-180 text-[#1d5537]' : ''}`} />
                </Link>

                {solutionsDropdown && (
                  <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 shadow-2xl p-3 space-y-1 animate-fadeIn z-50">
                    <Link 
                      to="/solutions/contract-manufacturing" 
                      className="p-2.5 block hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200/80 transition"
                    >
                      <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                        <span>Contract Extraction &amp; Spray Drying</span>
                        <ArrowRight size={12} className="text-[#1d5537]" />
                      </div>
                      <p className="text-[11px] text-slate-500 normal-case mt-0.5 leading-snug">
                        SS-316L percolators &amp; Class 100k cleanroom micro-atomization.
                      </p>
                    </Link>

                    <Link 
                      to="/solutions/private-label" 
                      className="p-2.5 block hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200/80 transition"
                    >
                      <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                        <span>Turnkey Private Label Dosage</span>
                        <ArrowRight size={12} className="text-[#1d5537]" />
                      </div>
                      <p className="text-[11px] text-slate-500 normal-case mt-0.5 leading-snug">
                        Vegetarian capsules, tableting &amp; blister packaging.
                      </p>
                    </Link>

                    <Link 
                      to="/solutions/custom-formulation" 
                      className="p-2.5 block hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200/80 transition"
                    >
                      <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                        <span>Proprietary Assay Formulation</span>
                        <ArrowRight size={12} className="text-[#1d5537]" />
                      </div>
                      <p className="text-[11px] text-slate-500 normal-case mt-0.5 leading-snug">
                        Custom active markers, granules, and water-soluble complexes.
                      </p>
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                to="/quality" 
                className={`transition-colors py-1 whitespace-nowrap ${
                  location.pathname === '/quality' 
                    ? 'text-[#1d5537] font-bold border-b-2 border-[#1d5537]' 
                    : 'text-slate-700 hover:text-[#1d5537]'
                }`}
              >
                Quality &amp; Testing
              </Link>

              <Link 
                to="/manufacturing" 
                className={`transition-colors py-1 whitespace-nowrap ${
                  location.pathname === '/manufacturing' 
                    ? 'text-[#1d5537] font-bold border-b-2 border-[#1d5537]' 
                    : 'text-slate-700 hover:text-[#1d5537]'
                }`}
              >
                Manufacturing
              </Link>

              <Link 
                to="/about" 
                className={`transition-colors py-1 whitespace-nowrap ${
                  location.pathname === '/about' 
                    ? 'text-[#1d5537] font-bold border-b-2 border-[#1d5537]' 
                    : 'text-slate-700 hover:text-[#1d5537]'
                }`}
              >
                About
              </Link>

              <Link 
                to="/resources" 
                className={`transition-colors py-1 whitespace-nowrap ${
                  location.pathname.startsWith('/resources') 
                    ? 'text-[#1d5537] font-bold border-b-2 border-[#1d5537]' 
                    : 'text-slate-700 hover:text-[#1d5537]'
                }`}
              >
                Monographs
              </Link>

              <Link 
                to="/contact" 
                className={`transition-colors py-1 whitespace-nowrap ${
                  location.pathname === '/contact' 
                    ? 'text-[#1d5537] font-bold border-b-2 border-[#1d5537]' 
                    : 'text-slate-700 hover:text-[#1d5537]'
                }`}
              >
                Contact HQ
              </Link>
            </nav>

            {/* Action CTA Button */}
            <div className="flex items-center flex-shrink-0 ml-3.5 xl:ml-6 pl-3.5 xl:pl-6 border-l border-slate-200">
              <Link 
                to="/request-quote" 
                className="inline-flex items-center gap-1.5 xl:gap-2 px-3.5 py-2 xl:px-4.5 xl:py-2.5 text-[10px] xl:text-[11px] font-bold tracking-[0.10em] xl:tracking-[0.14em] uppercase bg-[#1d5537] text-white hover:bg-[#133c26] border border-[#1d5537] transition-all shadow-sm active:scale-[0.99] whitespace-nowrap"
              >
                <Send size={12} className="xl:w-3.5 xl:h-3.5 text-[#c5a059]" />
                <span>Request RFQ</span>
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-800 hover:text-[#1d5537] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-6 space-y-5 shadow-2xl animate-fadeIn">
          <div className="flex flex-col space-y-3.5 text-sm font-semibold uppercase tracking-wider text-slate-800">
            <Link to="/products" className="hover:text-[#1d5537] py-1 border-b border-slate-100">
              Ingredients Catalog
            </Link>
            <Link to="/solutions" className="hover:text-[#1d5537] py-1 border-b border-slate-100">
              B2B Solutions
            </Link>
            <Link to="/quality" className="hover:text-[#1d5537] py-1 border-b border-slate-100">
              Quality &amp; Testing
            </Link>
            <Link to="/manufacturing" className="hover:text-[#1d5537] py-1 border-b border-slate-100">
              Manufacturing Infrastructure
            </Link>
            <Link to="/about" className="hover:text-[#1d5537] py-1 border-b border-slate-100">
              About YAMI NATURALS
            </Link>
            <Link to="/resources" className="hover:text-[#1d5537] py-1 border-b border-slate-100">
              Technical Monographs &amp; Dossiers
            </Link>
            <Link to="/contact" className="hover:text-[#1d5537] py-1 border-b border-slate-100">
              Contact Commercial Team
            </Link>
          </div>

          <div className="pt-2">
            <Link to="/request-quote" className="btn bg-[#1d5537] text-white hover:bg-[#133c26] w-full justify-center py-3 text-xs">
              <Send size={14} className="text-[#c5a059]" />
              <span>Request Commercial RFQ</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
