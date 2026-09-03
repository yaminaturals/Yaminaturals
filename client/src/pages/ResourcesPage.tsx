import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { api } from '../services/api';
import { Resource } from '../types';
import { BookOpen, FileText, ArrowRight, Loader2, Calendar, User } from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getResources()
      .then(res => setResources(res || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO 
        title="Technical Resources & Whitepapers | YAMI NATURALS" 
        description="Phytochemical monographs, regulatory dossiers, and extraction science whitepapers." 
      />

      <div className="bg-slate-950 text-white pt-36 pb-16 lg:pt-40 lg:pb-20 border-b border-slate-800">
        <div className="container-custom">
          <span className="badge badge-gold mb-3">Science & Regulatory</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Technical Dossiers & Whitepapers
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-3">
            Peer-reviewed phytochemical data, HPLC analytical validations, and global regulatory guidance documents.
          </p>
        </div>
      </div>

      <section className="section-py bg-slate-50/80">
        <div className="container-custom">
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 size={36} className="animate-spin text-emerald-800 mx-auto mb-4" />
              <p className="text-sm text-slate-600">Loading scientific resources...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((res) => (
                <div key={res.id} className="card-premium bg-white p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="badge badge-gold">{res.type.toUpperCase()}</span>
                      <span className="text-tiny text-slate-400 flex items-center gap-1">
                        <Calendar size={10} />
                        {new Date(res.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-2">
                      {res.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {res.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-tiny text-slate-500 flex items-center gap-1">
                      <User size={11} />
                      <span>{res.author}</span>
                    </div>
                    <Link 
                      to={`/resources/${res.slug}`} 
                      className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
                    >
                      Read <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
