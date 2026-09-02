import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { Send, FileText, ArrowRight, ShieldCheck, CheckCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenQuote: (name: string) => void;
  onOpenDoc: (name: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenQuote, onOpenDoc }) => {
  const fallbackImg = 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80';
  const imgUrl = product.image || fallbackImg;

  return (
    <div className="card-editorial bg-white flex flex-col justify-between overflow-hidden hover:border-[#072115] hover:shadow-xl transition-all duration-300 group">
      <div>
        {/* Architectural Image Frame */}
        <div className="relative h-56 w-full overflow-hidden bg-[#072115]">
          <img 
            src={imgUrl} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="font-mono text-[10px] font-bold text-[#072115] bg-[#fdfbf7] px-2.5 py-1 border border-[#c5a059]/60 uppercase tracking-wider shadow-sm">
              {product.category}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
            <span className="bg-[#072115]/95 border border-[#1d5537] px-2 py-0.5 text-[#d9c497] font-semibold">
              MOQ: {product.specs.moq}
            </span>
            <span className="text-white/90 bg-black/60 px-2 py-0.5 border border-white/20">
              HPLC Monograph
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-bold text-[#111827] group-hover:text-[#1d5537] transition leading-snug">
              <Link to={`/products/${product.slug}`}>
                {product.name}
              </Link>
            </h3>
          </div>
          
          {product.botanicalName && (
            <div className="text-xs font-serif italic text-[#85642b] mb-4">
              {product.botanicalName}
            </div>
          )}

          {/* Technical Specifications Monograph Box */}
          <div className="p-3.5 bg-[#f8f4ec] border border-[#e5dcce] mb-4 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-[#6b7280]">Standard Assay:</span>
              <span className="font-bold text-[#1d5537] text-right">{product.specs.assay}</span>
            </div>
            {product.specs.activeMarker && (
              <div className="flex items-center justify-between">
                <span className="text-[#6b7280]">Target Marker:</span>
                <span className="text-[#111827] truncate max-w-[170px] text-right font-medium" title={product.specs.activeMarker}>
                  {product.specs.activeMarker}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-[#6b7280]">Form / Mesh:</span>
              <span className="text-[#374151] text-right truncate max-w-[170px]">{product.specs.appearance}</span>
            </div>
          </div>

          <p className="text-xs text-[#4b5563] leading-relaxed font-light line-clamp-2">
            {product.shortDescription || product.description}
          </p>

          {/* Key Applications Pills */}
          {product.applications && product.applications.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {product.applications.slice(0, 2).map((app, i) => (
                <span key={i} className="text-[10px] font-mono text-[#6b7280] bg-[#f0eade]/60 px-2 py-0.5 border border-[#e5dcce]">
                  {app}
                </span>
              ))}
              {product.applications.length > 2 && (
                <span className="text-[10px] font-mono text-[#9ca3af] px-1 py-0.5">
                  +{product.applications.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Actions (Strict B2B Inquiries Only) */}
      <div className="p-6 pt-0 border-t border-[#f0eade] mt-2 space-y-3">
        <div className="grid grid-cols-2 gap-2 pt-4">
          <button 
            onClick={() => onOpenQuote(product.name)}
            className="btn btn-primary text-[11px] py-2.5 justify-center shadow-sm"
          >
            <Send size={12} />
            <span>RFQ Quote</span>
          </button>
          <button 
            onClick={() => onOpenDoc(product.name)}
            className="btn btn-outline text-[11px] py-2.5 justify-center"
          >
            <FileText size={12} />
            <span>COA / TDS</span>
          </button>
        </div>
        <Link 
          to={`/products/${product.slug}`}
          className="block text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#1d5537] hover:text-[#072115] pt-1"
        >
          View Full Specification Matrix &rarr;
        </Link>
      </div>
    </div>
  );
};
