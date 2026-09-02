import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Pill, Activity, Coffee, Sparkles, Heart, ArrowRight } from 'lucide-react';

export const ApplicationsPage: React.FC = () => {
  const applications = [
    {
      title: 'Dietary Supplements & Nutraceuticals',
      description: 'Standardized botanical extracts optimized for high-speed tablet compression, hard capsules, and softgel suspensions with verified marker potency.',
      icon: Pill,
      popularIngredients: ['Ashwagandha (5% Withanolides)', 'Turmeric Curcumin (95%)', 'Moringa Oleifera Extract', 'Boswellia Serrata (65% Boswellic Acids)'],
      dosageForms: 'Capsules, Tablets, Bulk Powders'
    },
    {
      title: 'Sports Nutrition & Performance',
      description: 'Clean-label botanical energy, endurance, and recovery compounds standardized to active phytochemical fractions with zero banned substances.',
      icon: Activity,
      popularIngredients: ['Ashwagandha KSM Grade', 'Green Tea Extract (50% EGCG)', 'Tribulus Terrestris Extract', 'Grape Seed Extract (95% OPC)'],
      dosageForms: 'Pre-Workout Powders, Recovery RTDs, Capsules'
    },
    {
      title: 'Functional Foods & Gummies',
      description: 'Micro-granulated, free-flowing botanical extracts designed for heat stability during extrusion, pectin gummy cooking, and functional confectionery.',
      icon: Coffee,
      popularIngredients: ['Amla Extract (40% Tannins)', 'Ginger Root Extract (5% Gingerols)', 'Giloy Guduchi Extract', 'Curcumin Water-Dispersible Granules'],
      dosageForms: 'Pectin Gummies, Functional Bars, Effervescent Powders'
    },
    {
      title: 'Cosmeceuticals & Personal Care',
      description: 'Phyto-active extracts rich in polyphenols and antioxidants for topical anti-aging creams, serums, and dermal formulations.',
      icon: Sparkles,
      popularIngredients: ['Green Tea EGCG', 'Grape Seed OPC 95%', 'Amla Vitamin C Precursors', 'Curcumin Micronized'],
      dosageForms: 'Serum Actives, Creams, Lotions, Tinctures'
    },
    {
      title: 'Ayurvedic & Herbal Formulations',
      description: 'Traditional Ayurvedic botanical ingredients extracted according to classic ratios with modern pharmacopoeial verification (HPTLC).',
      icon: Heart,
      popularIngredients: ['Purified Shilajit (50% Fulvic Acid)', 'Giloy Guduchi', 'Moringa Leaf 10:1', 'Ashwagandha Full-Spectrum Root'],
      dosageForms: 'Traditional Powders, Decoction Concentrates, Syrups'
    }
  ];

  return (
    <>
      <SEO 
        title="Industrial Applications & Formulations | YAMI NATURALS" 
        description="Botanical ingredients engineered for supplements, sports nutrition, RTD beverages, functional foods, and cosmeceuticals." 
      />

      <div className="bg-slate-950 text-white pt-28 pb-16 border-b border-slate-800">
        <div className="container-custom">
          <span className="badge badge-gold mb-3">Industry Solutions</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Applications &amp; Formulations
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-3">
            Phytochemical ingredients custom-engineered for optimal bioavailability, solubility, and stability across global nutraceutical dosage forms.
          </p>
        </div>
      </div>

      <section className="section-py bg-slate-50/80">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, i) => {
              const Icon = app.icon;
              return (
                <div key={i} className="card-premium bg-white p-8 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 mb-6">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{app.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">{app.description}</p>

                    <div className="mb-6">
                      <div className="text-tiny font-bold text-slate-400 mb-2 uppercase tracking-wider">Benchmark Actives</div>
                      <div className="space-y-1.5">
                        {app.popularIngredients.map((ing, j) => (
                          <div key={j} className="text-xs text-emerald-900 font-medium flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                            <span>{ing}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-tiny text-slate-500">{app.dosageForms}</span>
                    <Link to="/products" className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1">
                      Catalog <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
