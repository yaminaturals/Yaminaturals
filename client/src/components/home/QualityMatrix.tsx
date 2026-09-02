import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileCheck, 
  ShieldCheck, 
  FlaskConical, 
  Microscope, 
  CheckCheck, 
  Scale, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const QualityMatrix: React.FC = () => {
  const qualityPillars = [
    {
      code: 'IDENTITY',
      title: 'Botanical Species Authentication',
      desc: 'Macro/microscopic taxonomy and CAMAG HPTLC chemical fingerprinting confirm authentic botanical species with 100% absence of adulterants or unlisted plant species.',
      standard: 'CAMAG HPTLC & Botanical Voucher Herbarium'
    },
    {
      code: 'POTENCY',
      title: 'HPLC Active Marker Quantification',
      desc: 'Reverse-phase HPLC/UV and GC-MS quantify exact bioactive marker fractions (Withanolides, Curcuminoids, Saponins, Tannins, EGCG, Fulvic Acid) against USP reference standards.',
      standard: 'Reverse-Phase HPLC / Photodiode Array'
    },
    {
      code: 'PURITY',
      title: 'Heavy Metals Clearance via ICP-MS',
      desc: 'Triple-quadrupole ICP-MS screening for Lead (Pb < 3 ppm), Cadmium (Cd < 1 ppm), Arsenic (As < 1 ppm), and Mercury (Hg < 0.1 ppm) compliant with USP <2232> and California Prop 65.',
      standard: 'USP <2232> / California Prop 65 Compliance'
    },
    {
      code: 'SAFETY',
      title: 'Residual Solvents USP <467>',
      desc: 'Headspace GC-MS screening guarantees Class 1 and Class 2 solvent absence, ensuring Class 3 solvents (Ethanol/Water) remain well below pharmacopoeial thresholds (< 2,000 ppm).',
      standard: 'USP <467> & Ph. Eur. 5.4 Monograph'
    },
    {
      code: 'HYGIENE',
      title: 'Automated Microbial Pathogen Screening',
      desc: 'Total aerobic microbial count (TAMC < 1,000 CFU/g), Total yeast and mold count (TYMC < 100 CFU/g), with confirmed absence of Salmonella, E. coli, and S. aureus.',
      standard: 'USP <2021> & USP <2022> Microbial Testing'
    },
    {
      code: 'STABILITY',
      title: 'ICH Q1A Accelerated Stability Validation',
      desc: 'Climatic chamber stress testing (25°C/60% RH & 40°C/75% RH) validating physical integrity, active assay retention, and moisture barrier performance over 36 months.',
      standard: 'ICH Q1A(R2) Climatic Stress Protocol'
    }
  ];

  return (
    <section className="section-py bg-[#f8f4ec] border-b border-[#e5dcce]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="eyebrow-dark">
              <span>06 &bull; Pharmacopoeial Rigor</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111827] tracking-tight">
              Where Nature Meets <br />
              <span className="italic font-light text-[#1d5537]">Analytical Precision</span>
            </h2>
          </div>
          <p className="text-sm text-[#4b5563] max-w-md font-light leading-relaxed">
            Our quality control protocols validate identity, purity, and potency for every batch dispatched to global markets.
          </p>
        </div>

        {/* 6 Scientific Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {qualityPillars.map((p, idx) => (
            <div 
              key={idx} 
              className="card-editorial bg-white p-7 flex flex-col justify-between hover:border-[#1d5537] hover:shadow-md transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f0eade]">
                  <span className="text-[10px] font-mono font-bold text-[#c5a059] uppercase tracking-widest">
                    {p.code}
                  </span>
                  <span className="text-[10px] font-mono text-[#6b7280]">
                    0{idx + 1} / 06
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#111827] group-hover:text-[#1d5537] transition leading-snug mb-3">
                  {p.title}
                </h3>

                <p className="text-xs text-[#6b7280] leading-relaxed font-light mb-6">
                  {p.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#f0eade] text-[11px] font-mono text-[#1d5537]">
                <span className="text-[#9ca3af] block text-[9px] uppercase tracking-wider mb-0.5">Protocol:</span>
                <span className="font-semibold">{p.standard}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="border border-[#1d5537]/40 bg-[#072115] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="text-[10px] font-mono text-[#c5a059] uppercase tracking-widest mb-1">
              REGULATORY AUDIT DOSSIERS
            </div>
            <h3 className="text-xl font-serif text-white font-bold">
              Require Master Batch Records or Analytical Monograph Dossiers?
            </h3>
            <p className="text-xs text-[#ded5c0] font-light mt-1 max-w-xl">
              We provide authenticated Certificate of Analysis packets, heavy metals ICP-MS spectrograms, and USP residual solvent test data.
            </p>
          </div>

          <Link 
            to="/quality" 
            className="btn btn-gold text-xs py-3.5 px-6 flex-shrink-0"
          >
            <span>Request Technical Documentation</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
