import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { api } from '../services/api';
import { Resource } from '../types';
import { Calendar, User, ArrowLeft, Loader2, ChevronRight } from 'lucide-react';

export const ResourceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getResourceBySlug(slug)
      .then(res => setResource(res))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 size={36} className="animate-spin text-emerald-800" />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="container-custom py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Dossier Not Found</h1>
        <p className="text-sm text-slate-600 mt-2 mb-6">The requested technical article is not available.</p>
        <Link to="/resources" className="btn btn-primary">Return to Resources</Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${resource.title} | YAMI NATURALS Dossiers`} 
        description={resource.summary} 
      />

      <div className="bg-slate-100/70 pt-28 sm:pt-32 pb-3.5 border-b border-slate-200/60">
        <div className="container-custom flex items-center gap-2 text-xs text-slate-600">
          <Link to="/" className="hover:text-emerald-800">Home</Link>
          <ChevronRight size={12} />
          <Link to="/resources" className="hover:text-emerald-800">Resources</Link>
          <ChevronRight size={12} />
          <span className="text-slate-900 font-medium line-clamp-1">{resource.title}</span>
        </div>
      </div>

      <article className="section-py bg-slate-50/80">
        <div className="container-custom max-w-3xl">
          <div className="card-premium bg-white p-8 sm:p-12 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="badge badge-gold">{resource.type.toUpperCase()}</span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar size={12} />
                {new Date(resource.publishedAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              {resource.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-slate-600 mb-8 pb-6 border-b border-slate-100">
              <User size={14} className="text-emerald-800" />
              <span>{resource.author}</span>
            </div>

            <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-100 text-sm text-emerald-900 font-medium mb-8 leading-relaxed">
              {resource.summary}
            </div>

            <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {resource.content}
            </div>

            <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link to="/resources" className="btn btn-outline text-xs">
                <ArrowLeft size={14} /> Back to Dossiers
              </Link>
              <Link to="/request-quote" className="btn btn-primary text-xs">
                Initiate Request for Quote
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
