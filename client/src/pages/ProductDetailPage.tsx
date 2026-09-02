import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { SpecificationTable } from '../components/common/SpecificationTable';
import { QuoteModal } from '../components/common/QuoteModal';
import { DocumentRequestModal } from '../components/common/DocumentRequestModal';
import { api } from '../services/api';
import { Product } from '../types';
import { 
  FileText, 
  Send, 
  FlaskConical, 
  Check, 
  ArrowRight, 
  Loader2, 
  ChevronRight, 
  ShieldCheck, 
  Package, 
  Layers, 
  Clock, 
  Thermometer, 
  CheckCheck,
  Download,
  Leaf,
  Globe,
  Sliders,
  Scale
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Image Gallery Active View
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<'specs' | 'botanical' | 'applications' | 'packaging' | 'compliance'>('specs');

  // Modals
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [quoteType, setQuoteType] = useState<'Commercial RFQ' | 'Evaluation Sample (500g)'>('Commercial RFQ');
  const [docType, setDocType] = useState<string>('COA');

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getProductBySlug(slug)
      .then(prod => {
        setProduct(prod);
        setActiveImageIdx(0);
        if (prod) {
          api.getProducts().then(all => {
            const others = all.filter(p => p.slug !== prod.slug && p.category === prod.category).slice(0, 3);
            setRelated(others);
          });
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#fdfbf7]">
        <Loader2 size={40} className="animate-spin text-[#1d5537] mb-4" />
        <p className="text-xs font-mono text-[#6b7280] uppercase tracking-wider">Hydrating Technical Ingredient Dossier...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-36 text-center">
        <div className="w-16 h-16 border border-[#c5a059]/40 bg-[#f8f4ec] flex items-center justify-center text-[#1d5537] mx-auto mb-4">
          <Package size={32} />
        </div>
        <h1 className="text-2xl font-serif font-bold text-[#111827]">Ingredient Specification Not Found</h1>
        <p className="text-xs text-[#6b7280] font-light mt-2 mb-6">The requested botanical extract monograph is not present in our commercial catalog.</p>
        <Link to="/products" className="btn btn-primary text-xs">Return to Ingredient Library</Link>
      </div>
    );
  }

  const primaryImg = product.image || 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=80';
  const galleryImages = [
    { label: 'Standardized Extract Micro-Powder', url: primaryImg },
    { label: 'Raw Botanical Source Biomass', url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Cleanroom Extraction Facility', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80' }
  ];

  // Dynamic JSON-LD Schema.org Structured Data
  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: [primaryImg],
    description: product.description,
    sku: product.id,
    mpn: `YN-${product.slug.toUpperCase()}`,
    brand: {
      '@type': 'Brand',
      name: 'YAMI NATURALS'
    },
    category: product.category,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Standardized Assay',
        value: product.specs.assay
      },
      {
        '@type': 'PropertyValue',
        name: 'Botanical Name',
        value: product.botanicalName || 'Botanical Specimen'
      },
      {
        '@type': 'PropertyValue',
        name: 'Minimum Order Quantity',
        value: product.specs.moq
      }
    ]
  };

  const handleOpenRFQ = (type: 'Commercial RFQ' | 'Evaluation Sample (500g)') => {
    setQuoteType(type);
    setQuoteModalOpen(true);
  };

  const handleOpenDocRequest = (type: string) => {
    setDocType(type);
    setDocModalOpen(true);
  };

  return (
    <>
      <SEO 
        title={`${product.name} Technical Specifications | YAMI NATURALS`} 
        description={`Technical dossier, HPLC assay monograph, and Certificate of Analysis (COA) for ${product.name} (${product.botanicalName || ''}). Standardized to ${product.specs.assay}.`} 
        image={primaryImg}
        schema={productSchema}
      />

      {/* Scientific Breadcrumb */}
      <div className="bg-[#f8f4ec] py-3.5 border-b border-[#e5dcce] text-xs font-mono text-[#6b7280]">
        <div className="container-custom flex items-center gap-2">
          <Link to="/" className="hover:text-[#111827] transition">Home</Link>
          <ChevronRight size={12} className="text-[#9ca3af]" />
          <Link to="/products" className="hover:text-[#111827] transition">Ingredient Library</Link>
          <ChevronRight size={12} className="text-[#9ca3af]" />
          <span className="text-[#85642b] font-medium">{product.category}</span>
          <ChevronRight size={12} className="text-[#9ca3af]" />
          <span className="text-[#111827] font-bold truncate">{product.name}</span>
        </div>
      </div>

      {/* Hero Specification Header */}
      <div className="bg-[#04130c] text-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#1d5537]/40 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Specification Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category & Status Eyebrow */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-[10px] font-bold text-[#072115] bg-[#c5a059] px-2.5 py-1 uppercase tracking-wider">
                  {product.category}
                </span>
                {product.specs.activeMarker && (
                  <span className="font-mono text-[10px] font-medium text-[#d9c497] bg-[#072115] border border-[#1d5537] px-2.5 py-1 uppercase tracking-wider">
                    Marker: {product.specs.activeMarker}
                  </span>
                )}
                <span className="font-mono text-[10px] font-medium text-emerald-400 bg-[#072115] border border-emerald-500/40 px-2.5 py-1">
                  HPLC Verified
                </span>
              </div>

              {/* Title & Latin Binomial */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-normal tracking-tight leading-tight mb-2">
                  {product.name}
                </h1>
                {product.botanicalName && (
                  <p className="text-lg sm:text-xl font-serif italic text-[#c5a059]">
                    {product.botanicalName}
                  </p>
                )}
              </div>

              {/* Monograph Narrative */}
              <p className="text-sm text-[#ded5c0] leading-relaxed font-light max-w-2xl">
                {product.description}
              </p>

              {/* Core Analytical Metric Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 bg-[#072115] border border-[#1d5537] space-y-0.5">
                  <div className="text-[10px] font-mono text-[#ded5c0]/60 uppercase">Standard Assay</div>
                  <div className="font-mono font-bold text-sm text-[#c5a059]">{product.specs.assay}</div>
                </div>
                <div className="p-3.5 bg-[#072115] border border-[#1d5537] space-y-0.5">
                  <div className="text-[10px] font-mono text-[#ded5c0]/60 uppercase">Extraction Solvent</div>
                  <div className="font-mono font-bold text-sm text-white">{product.extractionSolvent || 'Purified Water : Ethanol'}</div>
                </div>
                <div className="p-3.5 bg-[#072115] border border-[#1d5537] space-y-0.5 col-span-2 sm:col-span-1">
                  <div className="text-[10px] font-mono text-[#ded5c0]/60 uppercase">Commercial MOQ</div>
                  <div className="font-mono font-bold text-sm text-emerald-400">{product.specs.moq}</div>
                </div>
              </div>

              {/* Direct B2B Action Triggers */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => handleOpenRFQ('Commercial RFQ')}
                  className="btn btn-gold text-xs py-3.5 px-6 shadow-sm"
                >
                  <Send size={14} />
                  <span>Request Commercial RFQ</span>
                </button>
                <button 
                  onClick={() => handleOpenRFQ('Evaluation Sample (500g)')}
                  className="btn btn-outline-white text-xs py-3.5 px-6"
                >
                  <Scale size={14} />
                  <span>Request 500g Sample</span>
                </button>
                <button 
                  onClick={() => handleOpenDocRequest('COA')}
                  className="btn btn-outline-gold text-xs py-3.5 px-5"
                >
                  <Download size={14} />
                  <span>Request COA / TDS</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Image Gallery */}
            <div className="lg:col-span-5 space-y-3">
              {/* Primary Active Image Display */}
              <div className="border border-[#1d5537] bg-[#072115] p-2 shadow-2xl">
                <div className="relative h-72 sm:h-84 w-full overflow-hidden bg-[#04130c]">
                  <img 
                    src={galleryImages[activeImageIdx].url} 
                    alt={galleryImages[activeImageIdx].label} 
                    className="w-full h-full object-cover transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-tiny font-mono text-[#ded5c0] bg-[#04130c]/90 px-3 py-1.5 border border-[#1d5537]/80">
                    {galleryImages[activeImageIdx].label}
                  </div>
                </div>
              </div>

              {/* Gallery Thumbnails Switcher */}
              <div className="grid grid-cols-3 gap-2">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`border p-1 text-left transition ${
                      activeImageIdx === i 
                        ? 'border-[#c5a059] bg-[#072115]' 
                        : 'border-[#1d5537]/60 bg-[#04130c] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="h-14 w-full overflow-hidden mb-1">
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-[9px] font-mono text-[#ded5c0] truncate">
                      View 0{i + 1}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabbed Specifications & Monograph Dossier */}
      <section className="section-py bg-[#fdfbf7]">
        <div className="container-custom">
          {/* Editorial Navigation Tabs */}
          <div className="flex items-center gap-2 pb-4 mb-10 border-b border-[#e5dcce] overflow-x-auto">
            <button 
              onClick={() => setActiveTab('specs')} 
              className={`p-3 px-6 text-xs font-mono font-bold uppercase tracking-wider transition ${
                activeTab === 'specs' 
                  ? 'bg-[#072115] text-[#c5a059] border border-[#072115]' 
                  : 'bg-white text-[#6b7280] border border-[#e5dcce] hover:text-[#111827] hover:bg-[#f8f4ec]'
              }`}
            >
              Technical Specifications
            </button>
            <button 
              onClick={() => setActiveTab('botanical')} 
              className={`p-3 px-6 text-xs font-mono font-bold uppercase tracking-wider transition ${
                activeTab === 'botanical' 
                  ? 'bg-[#072115] text-[#c5a059] border border-[#072115]' 
                  : 'bg-white text-[#6b7280] border border-[#e5dcce] hover:text-[#111827] hover:bg-[#f8f4ec]'
              }`}
            >
              Botanical &amp; Origin Data
            </button>
            <button 
              onClick={() => setActiveTab('applications')} 
              className={`p-3 px-6 text-xs font-mono font-bold uppercase tracking-wider transition ${
                activeTab === 'applications' 
                  ? 'bg-[#072115] text-[#c5a059] border border-[#072115]' 
                  : 'bg-white text-[#6b7280] border border-[#e5dcce] hover:text-[#111827] hover:bg-[#f8f4ec]'
              }`}
            >
              Formulation Applications
            </button>
            <button 
              onClick={() => setActiveTab('packaging')} 
              className={`p-3 px-6 text-xs font-mono font-bold uppercase tracking-wider transition ${
                activeTab === 'packaging' 
                  ? 'bg-[#072115] text-[#c5a059] border border-[#072115]' 
                  : 'bg-white text-[#6b7280] border border-[#e5dcce] hover:text-[#111827] hover:bg-[#f8f4ec]'
              }`}
            >
              Packaging &amp; Storage
            </button>
            <button 
              onClick={() => setActiveTab('compliance')} 
              className={`p-3 px-6 text-xs font-mono font-bold uppercase tracking-wider transition ${
                activeTab === 'compliance' 
                  ? 'bg-[#072115] text-[#c5a059] border border-[#072115]' 
                  : 'bg-white text-[#6b7280] border border-[#e5dcce] hover:text-[#111827] hover:bg-[#f8f4ec]'
              }`}
            >
              Regulatory Dossiers
            </button>
          </div>

          {/* TAB 1: Technical Specifications */}
          {activeTab === 'specs' && (
            <div className="space-y-8 animate-fadeIn">
              <SpecificationTable 
                specs={product.specs} 
                compliance={product.certifications} 
                partUsed={product.partUsed}
                extractionSolvent={product.extractionSolvent}
              />
            </div>
          )}

          {/* TAB 2: Botanical & Origin Information */}
          {activeTab === 'botanical' && (
            <div className="card-editorial bg-white p-8 space-y-6 animate-fadeIn">
              <div className="pb-4 border-b border-[#e5dcce]">
                <div className="text-[10px] font-mono font-bold text-[#c5a059] uppercase tracking-widest">
                  BOTANICAL AUTHENTICATION
                </div>
                <h3 className="text-xl font-serif font-bold text-[#111827]">
                  Taxonomic &amp; Geographical Provenance
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                <div className="p-4 bg-[#f8f4ec] border border-[#e5dcce] space-y-1">
                  <span className="text-[#6b7280] block text-[10px] uppercase">Scientific Latin Binomial:</span>
                  <span className="font-bold text-[#111827] text-sm font-serif italic">{product.botanicalName || 'Withania somnifera'}</span>
                </div>
                <div className="p-4 bg-[#f8f4ec] border border-[#e5dcce] space-y-1">
                  <span className="text-[#6b7280] block text-[10px] uppercase">Common &amp; Vernacular Synonyms:</span>
                  <span className="font-bold text-[#111827]">{product.commonNames?.join(', ') || 'Botanical extract'}</span>
                </div>
                <div className="p-4 bg-[#f8f4ec] border border-[#e5dcce] space-y-1">
                  <span className="text-[#6b7280] block text-[10px] uppercase">Plant Part Sourced:</span>
                  <span className="font-bold text-[#111827]">{product.partUsed || 'Roots & Aerial Stems'}</span>
                </div>
                <div className="p-4 bg-[#f8f4ec] border border-[#e5dcce] space-y-1">
                  <span className="text-[#6b7280] block text-[10px] uppercase">Species Authentication Standard:</span>
                  <span className="font-bold text-[#1d5537]">CAMAG HPTLC &amp; Herbarium Voucher Specimen</span>
                </div>
              </div>

              <p className="text-xs text-[#4b5563] leading-relaxed font-light pt-2">
                All raw botanical biomass is cultivated through verified contract agriculture networks in India. Sourcing strictly adheres to Good Agricultural and Collection Practices (GACP) with lot-specific pesticide residue clearance (USP &lt;561&gt;).
              </p>
            </div>
          )}

          {/* TAB 3: Formulation Applications */}
          {activeTab === 'applications' && (
            <div className="card-editorial bg-white p-8 space-y-6 animate-fadeIn">
              <div className="pb-4 border-b border-[#e5dcce]">
                <div className="text-[10px] font-mono font-bold text-[#c5a059] uppercase tracking-widest">
                  DOSAGE COMPATIBILITY
                </div>
                <h3 className="text-xl font-serif font-bold text-[#111827]">
                  Recommended Formulation Matrices
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.applications.map((app, i) => (
                  <div key={i} className="p-4 bg-[#f8f4ec] border border-[#e5dcce] flex items-center gap-3">
                    <div className="w-8 h-8 bg-white border border-[#c5a059]/40 flex items-center justify-center text-[#1d5537] flex-shrink-0">
                      <FlaskConical size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#111827]">{app}</div>
                      <div className="text-[10px] font-mono text-[#6b7280]">Direct Compression / Blends</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Packaging & Storage */}
          {activeTab === 'packaging' && (
            <div className="card-editorial bg-white p-8 space-y-6 animate-fadeIn">
              <div className="pb-4 border-b border-[#e5dcce]">
                <div className="text-[10px] font-mono font-bold text-[#c5a059] uppercase tracking-widest">
                  COMMERCIAL SPECIFICATIONS
                </div>
                <h3 className="text-xl font-serif font-bold text-[#111827]">
                  Packaging, Storage &amp; Shelf-Life Assurance
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
                <div className="p-5 bg-[#f8f4ec] border border-[#e5dcce] space-y-2">
                  <div className="flex items-center gap-2 text-[#1d5537] font-bold">
                    <Package size={16} />
                    <span>Industrial Packaging</span>
                  </div>
                  <p className="text-slate-700 font-light text-[11px] leading-relaxed">
                    Standard 25 kg fiber or HDPE drums with double food-grade polyethylene liners, sealed with food-grade desiccant silica and tamper-evident locking ring.
                  </p>
                </div>

                <div className="p-5 bg-[#f8f4ec] border border-[#e5dcce] space-y-2">
                  <div className="flex items-center gap-2 text-[#1d5537] font-bold">
                    <Thermometer size={16} />
                    <span>Storage Condition</span>
                  </div>
                  <p className="text-slate-700 font-light text-[11px] leading-relaxed">
                    {product.specs.storage || 'Store below 25°C in original unopened container, protected from heat, direct sunlight, and excessive relative humidity (< 60% RH).'}
                  </p>
                </div>

                <div className="p-5 bg-[#f8f4ec] border border-[#e5dcce] space-y-2">
                  <div className="flex items-center gap-2 text-[#1d5537] font-bold">
                    <Clock size={16} />
                    <span>Shelf Life &amp; Retest</span>
                  </div>
                  <p className="text-slate-700 font-light text-[11px] leading-relaxed">
                    {product.specs.shelfLife || '36 months from date of manufacture'} under recommended nitrogen-sealed storage conditions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Regulatory Dossiers & Download Triggers */}
          {activeTab === 'compliance' && (
            <div className="card-editorial bg-white p-8 space-y-6 animate-fadeIn">
              <div className="pb-4 border-b border-[#e5dcce]">
                <div className="text-[10px] font-mono font-bold text-[#c5a059] uppercase tracking-widest">
                  AUDIT &amp; QUALITY DOSSIERS
                </div>
                <h3 className="text-xl font-serif font-bold text-[#111827]">
                  Download Batch Documentation &amp; Declarations
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Certificate of Analysis (COA)', type: 'COA', desc: 'Lot-specific HPLC active assay & heavy metals ICP-MS spectrogram' },
                  { name: 'Technical Data Sheet (TDS)', type: 'TDS', desc: 'Complete physical, chemical & particle size distribution parameters' },
                  { name: 'Safety Data Sheet (MSDS)', type: 'MSDS', desc: 'GHS compliant 16-section material safety & toxicological dossier' },
                  { name: 'Allergen & Non-GMO Statement', type: 'Specification', desc: 'Formal declaration of zero food allergens & non-GMO verification' }
                ].map((doc, i) => (
                  <div key={i} className="p-5 bg-[#f8f4ec] border border-[#e5dcce] flex flex-col justify-between space-y-4">
                    <div>
                      <div className="text-xs font-bold text-[#111827] mb-1">{doc.name}</div>
                      <p className="text-[11px] text-[#6b7280] font-light leading-relaxed">{doc.desc}</p>
                    </div>
                    <button 
                      onClick={() => handleOpenDocRequest(doc.type)}
                      className="btn btn-outline text-[10px] py-2 w-full justify-center"
                    >
                      <Download size={12} />
                      <span>Request {doc.type}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Category Ingredients */}
      {related.length > 0 && (
        <section className="section-py bg-[#f8f4ec] border-t border-[#e5dcce]">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#e5dcce]">
              <div>
                <div className="eyebrow-dark mb-1">Related Formulations</div>
                <h2 className="text-2xl font-serif text-[#111827] font-bold">
                  Complementary {product.category}
                </h2>
              </div>
              <Link to="/products" className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1d5537] hover:underline flex items-center gap-1">
                <span>All Ingredients</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((pi) => (
                <div key={pi.id} className="card-editorial bg-white flex flex-col justify-between overflow-hidden hover:border-[#1d5537] hover:shadow-md transition">
                  <div className="relative h-44 w-full overflow-hidden bg-[#072115]">
                    <img 
                      src={pi.image || primaryImg} 
                      alt={pi.name} 
                      className="w-full h-full object-cover" 
                      loading="lazy" 
                    />
                    <div className="absolute bottom-2.5 left-3 text-white text-[11px] font-mono bg-[#072115]/90 px-2 py-0.5 border border-[#1d5537]">
                      {pi.specs.assay}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-bold text-[#111827] mb-0.5">{pi.name}</h3>
                    <p className="text-xs font-serif italic text-[#85642b] mb-3">{pi.botanicalName}</p>
                    <p className="text-xs text-[#6b7280] font-light mb-4 line-clamp-2">{pi.shortDescription || pi.description}</p>
                    <Link to={`/products/${pi.slug}`} className="text-xs font-semibold uppercase tracking-wider text-[#1d5537] hover:underline flex items-center gap-1">
                      View Specification Matrix <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
        initialProductName={`${product.name} (${quoteType})`} 
      />

      {/* Document Request Modal */}
      <DocumentRequestModal 
        isOpen={docModalOpen} 
        onClose={() => setDocModalOpen(false)} 
        productName={product.name} 
      />
    </>
  );
};
