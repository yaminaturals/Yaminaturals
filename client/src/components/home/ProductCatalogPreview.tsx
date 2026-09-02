import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Product } from '../../types';
import { ProductCard } from '../common/ProductCard';
import { QuoteModal } from '../common/QuoteModal';
import { DocumentRequestModal } from '../common/DocumentRequestModal';
import { ArrowRight, Loader2 } from 'lucide-react';

export const ProductCatalogPreview: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState('');

  useEffect(() => {
    api.getProducts()
      .then(res => setProducts((res || []).slice(0, 6)))
      .finally(() => setLoading(false));
  }, []);

  const handleOpenQuote = (name: string) => {
    setSelectedProductName(name);
    setQuoteModalOpen(true);
  };

  const handleOpenDoc = (name: string) => {
    setSelectedProductName(name);
    setDocModalOpen(true);
  };

  return (
    <section className="section-py bg-[#fdfbf7] border-b border-[#e5dcce]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="eyebrow-dark">
              <span>05 &bull; Commercial Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111827] tracking-tight">
              Standardized Ingredient <br />
              <span className="italic font-light text-[#1d5537]">Portfolio</span>
            </h2>
          </div>
          <Link 
            to="/products" 
            className="btn btn-outline text-xs font-semibold uppercase tracking-[0.14em] self-start md:self-end"
          >
            <span>Explore Complete Catalog</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <Loader2 size={36} className="animate-spin text-[#1d5537] mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOpenQuote={handleOpenQuote}
                onOpenDoc={handleOpenDoc}
              />
            ))}
          </div>
        )}
      </div>

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
    </section>
  );
};
