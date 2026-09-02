import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { ProductCard } from '../components/common/ProductCard';
import { QuoteModal } from '../components/common/QuoteModal';
import { DocumentRequestModal } from '../components/common/DocumentRequestModal';
import { api } from '../services/api';
import { Product, Category } from '../types';
import { 
  Search, 
  Package, 
  Loader2, 
  SlidersHorizontal, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown, 
  Check, 
  Sparkles,
  Send,
  Filter
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initCat = searchParams.get('category') || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState(initCat);
  const [selectedApplication, setSelectedApplication] = useState('all');
  const [selectedForm, setSelectedForm] = useState('all');
  const [selectedPotency, setSelectedPotency] = useState('all');
  const [sortBy, setSortBy] = useState<'name_asc' | 'name_desc' | 'potency_high' | 'category'>('name_asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Mobile Filter Drawer
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Modals
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.getProducts(),
      api.getCategories()
    ])
      .then(([prodRes, catRes]) => {
        setProducts(prodRes || []);
        setCategories(catRes || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const applications = [
    'all',
    'Dietary Supplements',
    'Sports Nutrition',
    'Functional & RTD Beverages',
    'Foods & Gummies',
    'Cosmeceuticals & Skincare',
    'Ayurvedic Formulations'
  ];

  const forms = [
    'all',
    'Powder',
    'Granules',
    'Water Soluble',
    'Crystalline'
  ];

  const potencyRanges = [
    { label: 'All Potencies', value: 'all' },
    { label: 'Ultra High Purity (>= 90%)', value: 'high' },
    { label: 'Medium Potency (20% - 80%)', value: 'medium' },
    { label: 'Standardized Fraction (5% - 20%)', value: 'fraction' }
  ];

  // Active filter count calculation
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (search) count++;
    if (selectedCat !== 'all') count++;
    if (selectedApplication !== 'all') count++;
    if (selectedForm !== 'all') count++;
    if (selectedPotency !== 'all') count++;
    return count;
  }, [search, selectedCat, selectedApplication, selectedForm, selectedPotency]);

  // Filtering & Sorting Pipeline
  const filteredAndSorted = useMemo(() => {
    let list = products.filter(p => {
      // Search across name, botanical name, active marker, description, and applications
      const term = search.toLowerCase().trim();
      const matchSearch = !term || 
        p.name.toLowerCase().includes(term) ||
        (p.botanicalName || '').toLowerCase().includes(term) ||
        (p.specs.activeMarker || '').toLowerCase().includes(term) ||
        (p.specs.assay || '').toLowerCase().includes(term) ||
        p.applications.some(a => a.toLowerCase().includes(term));

      // Category match
      const matchCat = selectedCat === 'all' || 
        p.category.toLowerCase() === selectedCat.toLowerCase() ||
        p.category.toLowerCase().replace(/\s+/g, '-') === selectedCat.toLowerCase();

      // Application match
      const matchApp = selectedApplication === 'all' || 
        p.applications.some(a => a.toLowerCase() === selectedApplication.toLowerCase());

      // Physical form match
      const matchForm = selectedForm === 'all' || 
        (p.specs.appearance || '').toLowerCase().includes(selectedForm.toLowerCase());

      // Potency match
      let matchPotency = true;
      const assayText = p.specs.assay || '';
      if (selectedPotency === 'high') {
        matchPotency = assayText.includes('90%') || assayText.includes('95%') || assayText.includes('98%');
      } else if (selectedPotency === 'medium') {
        matchPotency = assayText.includes('40%') || assayText.includes('50%') || assayText.includes('65%') || assayText.includes('80%');
      } else if (selectedPotency === 'fraction') {
        matchPotency = assayText.includes('5%') || assayText.includes('10%') || assayText.includes('20%');
      }

      return matchSearch && matchCat && matchApp && matchForm && matchPotency;
    });

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name_desc') return b.name.localeCompare(a.name);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      if (sortBy === 'potency_high') {
        const getPct = (str: string) => {
          const m = str.match(/(\d+(\.\d+)?)%/);
          return m ? parseFloat(m[1]) : 0;
        };
        return getPct(b.specs.assay) - getPct(a.specs.assay);
      }
      return 0;
    });

    return list;
  }, [products, search, selectedCat, selectedApplication, selectedForm, selectedPotency, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCat, selectedApplication, selectedForm, selectedPotency, sortBy]);

  // Pagination slice
  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSorted.slice(start, start + itemsPerPage);
  }, [filteredAndSorted, currentPage, itemsPerPage]);

  const resetAllFilters = () => {
    setSearch('');
    setSelectedCat('all');
    setSelectedApplication('all');
    setSelectedForm('all');
    setSelectedPotency('all');
    setSortBy('name_asc');
  };

  const handleOpenQuote = (productName: string) => {
    setSelectedProductName(productName);
    setQuoteModalOpen(true);
  };

  const handleOpenDoc = (productName: string) => {
    setSelectedProductName(productName);
    setDocModalOpen(true);
  };

  return (
    <>
      <SEO 
        title="B2B Botanical Ingredient Library | YAMI NATURALS" 
        description="Explore our pharmacopoeial-grade botanical extract catalog. Standardized assays, HPLC active markers, and batch-specific COAs for global manufacturers." 
      />

      {/* Library Header */}
      <div className="bg-[#04130c] text-white pt-36 pb-20 border-b border-[#1d5537]/40 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="eyebrow mb-3">
              <span>Scientific Ingredient Library</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-normal tracking-tight">
              Standardized Botanical <br />
              <span className="italic font-light text-[#c5a059]">Extract Portfolio</span>
            </h1>
            <p className="text-sm sm:text-base text-[#ded5c0] mt-3 leading-relaxed font-light">
              Explore pharmacopoeial botanical ingredients with verified HPLC active assays, low heavy metals, and guaranteed 25 kg commercial packaging for dietary supplement and wellness manufacturers.
            </p>
          </div>
        </div>
      </div>

      <section className="section-py bg-[#fdfbf7] min-h-screen">
        <div className="container-custom">
          {/* Main Filter & Search Control Panel */}
          <div className="bg-white border border-[#e5dcce] p-6 lg:p-8 mb-10 shadow-sm">
            {/* Search and Top Bar */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between pb-6 border-b border-[#f0eade]">
              {/* Instant Search Bar */}
              <div className="relative w-full lg:max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9ca3af]">
                  <Search size={16} />
                </div>
                <input 
                  type="text" 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                  placeholder="e.g. Ashwagandha, Curcumin 95%, Withania somnifera, HPLC active marker..." 
                  className="w-full bg-white border border-slate-300 text-xs text-slate-900 pl-10 pr-10 py-3 shadow-sm placeholder:text-slate-400 placeholder:italic focus:outline-none focus:border-[#1d5537] focus:ring-2 focus:ring-[#1d5537]/20 transition" 
                />
                {search && (
                  <button 
                    onClick={() => setSearch('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9ca3af] hover:text-[#111827]"
                    title="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Sorting & Mobile Filter Toggle */}
              <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden btn btn-outline text-xs py-2.5 px-4 flex items-center gap-2"
                >
                  <Filter size={14} />
                  <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 text-xs font-mono text-[#6b7280]">
                  <span className="hidden sm:inline">SORT BY:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#f8f4ec] border border-[#e5dcce] text-xs font-sans text-[#111827] py-2.5 px-3 focus:outline-none focus:border-[#1d5537] cursor-pointer"
                  >
                    <option value="name_asc">Name (A &rarr; Z)</option>
                    <option value="name_desc">Name (Z &rarr; A)</option>
                    <option value="potency_high">Assay Potency (High &rarr; Low)</option>
                    <option value="category">Category</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Desktop Multi-Dimensional Filters Strip */}
            <div className="hidden lg:grid grid-cols-4 gap-4 pt-6">
              {/* Category Filter */}
              <div>
                <label className="block text-[10px] font-mono font-bold text-[#6b7280] uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select 
                  value={selectedCat} 
                  onChange={(e) => setSelectedCat(e.target.value)} 
                  className="w-full bg-[#f8f4ec] border border-[#e5dcce] text-xs text-[#111827] py-2.5 px-3 focus:outline-none focus:border-[#1d5537]"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Application Filter */}
              <div>
                <label className="block text-[10px] font-mono font-bold text-[#6b7280] uppercase tracking-wider mb-1.5">
                  Formulation Application
                </label>
                <select 
                  value={selectedApplication} 
                  onChange={(e) => setSelectedApplication(e.target.value)} 
                  className="w-full bg-[#f8f4ec] border border-[#e5dcce] text-xs text-[#111827] py-2.5 px-3 focus:outline-none focus:border-[#1d5537]"
                >
                  {applications.map((a) => (
                    <option key={a} value={a}>{a === 'all' ? 'All Applications' : a}</option>
                  ))}
                </select>
              </div>

              {/* Product Form Filter */}
              <div>
                <label className="block text-[10px] font-mono font-bold text-[#6b7280] uppercase tracking-wider mb-1.5">
                  Physical Form
                </label>
                <select 
                  value={selectedForm} 
                  onChange={(e) => setSelectedForm(e.target.value)} 
                  className="w-full bg-[#f8f4ec] border border-[#e5dcce] text-xs text-[#111827] py-2.5 px-3 focus:outline-none focus:border-[#1d5537]"
                >
                  <option value="all">All Physical Forms</option>
                  {forms.filter(f => f !== 'all').map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              {/* Standardization / Potency Filter */}
              <div>
                <label className="block text-[10px] font-mono font-bold text-[#6b7280] uppercase tracking-wider mb-1.5">
                  Standardization Assay
                </label>
                <select 
                  value={selectedPotency} 
                  onChange={(e) => setSelectedPotency(e.target.value)} 
                  className="w-full bg-[#f8f4ec] border border-[#e5dcce] text-xs text-[#111827] py-2.5 px-3 focus:outline-none focus:border-[#1d5537]"
                >
                  {potencyRanges.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count & Reset Filter Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-[#6b7280] pt-6 border-t border-[#f0eade] mt-6">
              <div>
                Showing <span className="font-bold text-[#111827]">{filteredAndSorted.length}</span> standardized botanical ingredients in library
              </div>
              {activeFilterCount > 0 && (
                <button 
                  onClick={resetAllFilters} 
                  className="text-[#1d5537] hover:text-[#072115] underline flex items-center gap-1 font-semibold"
                >
                  <X size={13} />
                  <span>Reset All ({activeFilterCount}) Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Catalog Grid / Loading / Empty States */}
          {loading ? (
            /* Scientific Skeleton Loader */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="card-editorial bg-white p-6 space-y-4 animate-pulse">
                  <div className="h-48 bg-[#f0eade]" />
                  <div className="h-5 bg-[#f0eade] w-3/4" />
                  <div className="h-3 bg-[#f0eade] w-1/2" />
                  <div className="h-16 bg-[#f8f4ec] border border-[#e5dcce]" />
                  <div className="h-10 bg-[#f0eade]" />
                </div>
              ))}
            </div>
          ) : filteredAndSorted.length === 0 ? (
            /* Editorial Empty State */
            <div className="border border-[#e5dcce] bg-white p-12 lg:p-16 text-center max-w-lg mx-auto shadow-sm">
              <div className="w-14 h-14 border border-[#c5a059]/50 bg-[#f8f4ec] flex items-center justify-center text-[#1d5537] mx-auto mb-4">
                <Package size={28} />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#111827] mb-2">
                No Ingredients Match Your Criteria
              </h3>
              <p className="text-xs text-[#6b7280] font-light mb-6 leading-relaxed">
                We did not find standardized catalog ingredients matching your current search or filter combination. You can reset filters or request a custom formulation brief.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button 
                  onClick={resetAllFilters} 
                  className="btn btn-outline text-xs"
                >
                  Reset All Filters
                </button>
                <button 
                  onClick={() => handleOpenQuote('Custom Phytochemical Formulation')} 
                  className="btn btn-primary text-xs"
                >
                  <Send size={13} />
                  <span>Request Custom Formulation</span>
                </button>
              </div>
            </div>
          ) : (
            /* Product Grid */
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onOpenQuote={handleOpenQuote} 
                    onOpenDoc={handleOpenDoc} 
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="border-t border-[#e5dcce] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs font-mono text-[#6b7280]">
                    Showing Page <span className="font-bold text-[#111827]">{currentPage}</span> of <span className="font-bold text-[#111827]">{totalPages}</span> ({filteredAndSorted.length} items)
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-9 h-9 border border-[#e5dcce] bg-white flex items-center justify-center text-[#111827] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#f8f4ec] transition"
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                      <button
                        key={pg}
                        onClick={() => setCurrentPage(pg)}
                        className={`w-9 h-9 border text-xs font-mono font-bold transition ${
                          currentPage === pg
                            ? 'bg-[#072115] text-[#c5a059] border-[#072115]'
                            : 'bg-white text-[#111827] border-[#e5dcce] hover:bg-[#f8f4ec]'
                        }`}
                      >
                        {pg}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="w-9 h-9 border border-[#e5dcce] bg-white flex items-center justify-center text-[#111827] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#f8f4ec] transition"
                      aria-label="Next page"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Bottom R&D Action Banner */}
          <div className="mt-16 border border-[#1d5537]/40 bg-[#072115] p-8 lg:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center lg:text-left">
              <div className="eyebrow mb-1">
                <span>Proprietary Phytochemical Engineering</span>
              </div>
              <h3 className="text-xl font-serif text-white font-bold">
                Do Not See Your Target Active Assay in Catalog?
              </h3>
              <p className="text-xs text-[#ded5c0] font-light max-w-xl">
                Our R&amp;D facility formulates custom marker concentrations, water-soluble complexes, and direct compression granules to your exact target monograph.
              </p>
            </div>

            <button
              onClick={() => handleOpenQuote('Custom Assay Development')}
              className="btn btn-gold text-xs py-3 px-6 flex-shrink-0"
            >
              <Send size={13} />
              <span>Submit Custom Formulation Brief</span>
            </button>
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xs bg-white h-full ml-auto p-6 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#e5dcce] mb-6">
                <span className="text-sm font-bold uppercase tracking-wider text-[#111827]">
                  Filter Library
                </span>
                <button onClick={() => setMobileFiltersOpen(false)} className="text-[#6b7280] p-1">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5 text-xs">
                {/* Category */}
                <div>
                  <label className="block font-mono font-bold text-[#6b7280] uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select 
                    value={selectedCat} 
                    onChange={(e) => setSelectedCat(e.target.value)} 
                    className="w-full bg-[#f8f4ec] border border-[#e5dcce] text-xs text-[#111827] py-2.5 px-3"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Application */}
                <div>
                  <label className="block font-mono font-bold text-[#6b7280] uppercase tracking-wider mb-1.5">
                    Application
                  </label>
                  <select 
                    value={selectedApplication} 
                    onChange={(e) => setSelectedApplication(e.target.value)} 
                    className="w-full bg-[#f8f4ec] border border-[#e5dcce] text-xs text-[#111827] py-2.5 px-3"
                  >
                    {applications.map((a) => (
                      <option key={a} value={a}>{a === 'all' ? 'All Applications' : a}</option>
                    ))}
                  </select>
                </div>

                {/* Form */}
                <div>
                  <label className="block font-mono font-bold text-[#6b7280] uppercase tracking-wider mb-1.5">
                    Physical Form
                  </label>
                  <select 
                    value={selectedForm} 
                    onChange={(e) => setSelectedForm(e.target.value)} 
                    className="w-full bg-[#f8f4ec] border border-[#e5dcce] text-xs text-[#111827] py-2.5 px-3"
                  >
                    <option value="all">All Physical Forms</option>
                    {forms.filter(f => f !== 'all').map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                {/* Potency */}
                <div>
                  <label className="block font-mono font-bold text-[#6b7280] uppercase tracking-wider mb-1.5">
                    Standardization Assay
                  </label>
                  <select 
                    value={selectedPotency} 
                    onChange={(e) => setSelectedPotency(e.target.value)} 
                    className="w-full bg-[#f8f4ec] border border-[#e5dcce] text-xs text-[#111827] py-2.5 px-3"
                  >
                    {potencyRanges.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#e5dcce] space-y-2">
              <button 
                onClick={() => setMobileFiltersOpen(false)} 
                className="btn btn-primary w-full py-3 justify-center text-xs"
              >
                Apply Filters ({filteredAndSorted.length} Results)
              </button>
              <button 
                onClick={resetAllFilters} 
                className="btn btn-outline w-full py-2.5 justify-center text-xs"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quote & Document Modals */}
      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
        initialProductName={selectedProductName} 
      />

      <DocumentRequestModal 
        isOpen={docModalOpen} 
        onClose={() => setDocModalOpen(false)} 
        productName={selectedProductName} 
      />
    </>
  );
};
