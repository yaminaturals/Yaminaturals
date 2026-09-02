import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ApplicationsMatrix: React.FC = () => {
  const applications = [
    {
      title: 'Dietary Supplements',
      category: 'Solid Dosage Forms',
      desc: 'High-density micro-granules and standardized botanical powders engineered for high-speed automated capsule filling and direct tableting.',
      popular: 'Ashwagandha 5%, Curcumin 95%, Shilajit 50%',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Sports Nutrition',
      category: 'Bioactive Performance',
      desc: 'Natural ergogenic botanicals, adaptogens, and recovery complexes with verified anti-doping clearance and high-bioavailability profiles.',
      popular: 'Curcumin-Piperine 95:95, Green Tea EGCG 50%',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Functional Foods & Gummies',
      category: 'Nutritive Confectionery',
      desc: 'Thermally stable botanical granules calibrated to withstand pectin cooking temperatures without active marker degradation.',
      popular: 'Moringa Saponins 20%, Amla Tannins 40%',
      image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Functional & RTD Beverages',
      category: 'Liquid Dissolution',
      desc: '100% cold-water-soluble botanical extracts yielding clear, sediment-free solutions for functional teas, sodas, and energy elixirs.',
      popular: 'Amla Tannins 40%, Green Tea Polyphenols 98%',
      image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Classical Ayurvedic Formulations',
      category: 'Traditional Therapeutic Ratios',
      desc: 'Authentic Ayurvedic Rasayana extracts produced via traditional water decoction (Shodhana) and standardized to contemporary pharmacopoeias.',
      popular: 'Giloy Bitters 5%, Boswellia AKBA 65%',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Cosmeceuticals & Personal Care',
      category: 'Topical Dermal Actives',
      desc: 'High-ORAC antioxidant polyphenols and antimicrobial plant fractions optimized for emulsion stability in topical skincare formulations.',
      popular: 'Grape Seed OPC 95%, Green Tea EGCG 50%',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section className="section-py bg-[#f8f4ec] border-b border-[#e5dcce]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="eyebrow-dark">
              <span>08 &bull; Industry Formulation Matrices</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111827] tracking-tight">
              Applications Across Global <br />
              <span className="italic font-light text-[#1d5537]">Wellness Sectors</span>
            </h2>
          </div>
          <p className="text-sm text-[#4b5563] max-w-md font-light leading-relaxed">
            Our extracts are particle-engineered to meet the physical and chemical dissolution demands of diverse finished product categories.
          </p>
        </div>

        {/* 6 Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app, idx) => (
            <div 
              key={idx} 
              className="card-editorial bg-white flex flex-col justify-between overflow-hidden hover:border-[#1d5537] hover:shadow-md transition-all duration-300 group"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-48 w-full overflow-hidden bg-[#072115]">
                  <img 
                    src={app.image} 
                    alt={app.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono font-bold text-[#072115] bg-[#fdfbf7] px-2.5 py-1 border border-[#c5a059]/40 uppercase tracking-wider">
                      {app.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-base font-bold text-[#111827] group-hover:text-[#1d5537] transition mb-2">
                    {app.title}
                  </h3>
                  <p className="text-xs text-[#6b7280] leading-relaxed font-light mb-4">
                    {app.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Specs */}
              <div className="p-6 pt-0 border-t border-[#f0eade]">
                <div className="pt-3 text-[11px] font-mono">
                  <span className="text-[#9ca3af] block text-[9px] uppercase tracking-wider mb-0.5">Benchmark Ingredients:</span>
                  <span className="text-[#1d5537] font-semibold">{app.popular}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
