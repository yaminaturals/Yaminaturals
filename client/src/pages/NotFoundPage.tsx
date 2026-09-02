import React from 'react';

import { SEO } from '../components/common/SEO';
import { FileText, ArrowLeft, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO title="404 - Page Not Found | YAMI NATURLS" description="The requested page does not exist." />
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center pt-24 pb-20">
        <div className="container-custom text-center max-w-lg">
          <div className="font-mono text-7xl font-bold text-gold-400 mb-4">404</div>
          <h1 className="text-2xl font-bold mb-3">Specification Not Found</h1>
          <p className="text-sm text-slate-300 leading-relaxed mb-8">
            The url or product dossier you are looking for has been moved or does not exist in our catalog.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className="btn btn-gold">
              <ArrowLeft size={16} /> <span>Return to Home</span>
            </Link>
            <Link to="/products" className="btn btn-outline-white">
              <Package size={16} /> <span>Browse Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
