import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BotanicalGrid: React.FC = () => {
  const botanicals = [
    { 
      name: 'Ashwagandha Extract', 
      botanical: 'Withania somnifera', 
      marker: 'Withanolides >= 5.0% by HPLC', 
      form: 'Fine Tan Powder', 
      slug: 'ashwagandha-extract-5-withanolides',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Turmeric Curcumin 95%', 
      botanical: 'Curcuma longa', 
      marker: 'Total Curcuminoids >= 95.0%', 
      form: 'Crystalline Micro-Powder', 
      slug: 'turmeric-curcumin-95-total-curcuminoids',
      image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Moringa Leaf Extract', 
      botanical: 'Moringa oleifera', 
      marker: 'Total Saponins >= 20.0%', 
      form: 'Dark Olive Powder', 
      slug: 'moringa-leaf-extract-saponins-20',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Amla Fruit Extract', 
      botanical: 'Phyllanthus emblica', 
      marker: 'Hydrolyzable Tannins >= 40.0%', 
      form: '100% Cold-Water Soluble', 
      slug: 'amla-extract-40-tannins-water-soluble',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Purified Shilajit Extract', 
      botanical: 'Asphaltum punjabianum', 
      marker: 'Fulvic Acid >= 50.0% + DBPs', 
      form: 'Purified Mineral Pitch', 
      slug: 'purified-shilajit-extract-50-fulvic-acid',
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Boswellia Serrata Extract', 
      botanical: 'Boswellia serrata', 
      marker: 'Boswellic Acids >= 65.0%', 
      form: 'DC Direct Compression Granules', 
      slug: 'boswellia-serrata-extract-65-boswellic-acids',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Green Tea Extract (EGCG)', 
      botanical: 'Camellia sinensis', 
      marker: 'EGCG >= 50.0% / 98% Polyphenols', 
      form: 'Decaffeinated Fine Powder', 
      slug: 'green-tea-extract-50-egcg-98-polyphenols',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Curcumin-Piperine Complex', 
      botanical: 'Curcuma longa + Piper nigrum', 
      marker: 'Curcumin 95% + Piperine 95%', 
      form: 'Synergistic DC Granules', 
      slug: 'curcumin-piperine-synergistic-complex',
      image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="section-py bg-[#f8f4ec] border-b border-[#e5dcce]">
      <div className="container-custom">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="eyebrow-dark">
              <span>02 &bull; Botanical Benchmark Ingredients</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111827] tracking-tight">
              Nature&apos;s Ingredients. <br />
              <span className="italic font-light text-[#1d5537]">Precisely Prepared.</span>
            </h2>
          </div>
          <Link 
            to="/products" 
            className="btn btn-outline text-xs font-semibold uppercase tracking-[0.14em] self-start md:self-end"
          >
            <span>View Complete Portfolio (12 Ingredients)</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 8 Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {botanicals.map((b, idx) => (
            <div 
              key={idx} 
              className="card-editorial bg-white flex flex-col justify-between overflow-hidden hover:border-[#1d5537] hover:shadow-md transition duration-300 group"
            >
              <div>
                {/* Photo Thumbnail */}
                <div className="relative h-44 w-full overflow-hidden bg-[#072115]">
                  <img 
                    src={b.image} 
                    alt={b.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-2.5 left-3">
                    <span className="font-mono text-[11px] font-bold text-[#f4ede0] bg-[#072115]/90 border border-[#1d5537] px-2 py-0.5">
                      {b.marker}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-[#111827] group-hover:text-[#1d5537] transition mb-0.5">
                    {b.name}
                  </h3>
                  <div className="text-xs font-serif italic text-[#85642b] mb-3">
                    {b.botanical}
                  </div>
                  <div className="text-[11px] text-[#6b7280] font-light">
                    Format: <span className="text-[#111827] font-medium">{b.form}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-5 pt-0">
                <Link 
                  to={`/products/${b.slug}`}
                  className="pt-3 border-t border-[#f0eade] text-xs font-semibold uppercase tracking-[0.14em] text-[#1d5537] hover:text-[#072115] flex items-center justify-between transition"
                >
                  <span>Specification Matrix</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
