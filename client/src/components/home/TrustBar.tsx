import React from 'react';
import { ShieldCheck, Leaf, FileCheck, Globe, Sliders } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const items = [
    {
      title: 'Standardized Quality',
      subtitle: 'HPLC Verified Active Markers',
      icon: ShieldCheck
    },
    {
      title: 'Origin Traceability',
      subtitle: 'Direct Farm-Gate Procurement',
      icon: Leaf
    },
    {
      title: 'Complete Documentation',
      subtitle: 'Lot-Specific COA, TDS & MSDS',
      icon: FileCheck
    },
    {
      title: 'Global Logistics',
      subtitle: 'Exports to 40+ Destination Markets',
      icon: Globe
    },
    {
      title: 'Custom Formulation',
      subtitle: 'Target Assays & Micro-Granules',
      icon: Sliders
    }
  ];

  return (
    <section className="bg-[#f8f4ec] border-b border-[#e5dcce] py-8">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#ded5c0]/80">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className={`flex items-center gap-3.5 pt-4 md:pt-0 ${idx !== 0 ? 'md:pl-6' : ''}`}
              >
                <div className="w-10 h-10 border border-[#c5a059]/50 bg-white flex items-center justify-center text-[#1d5537] flex-shrink-0 shadow-sm">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-[#6b7280] font-light mt-0.5">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
