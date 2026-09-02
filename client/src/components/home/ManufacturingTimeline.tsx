import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCheck, ArrowRight, ShieldCheck, Factory, Sparkles } from 'lucide-react';

export const ManufacturingTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const steps = [
    {
      step: '01',
      code: 'SOURCE',
      title: 'Raw Material Sourcing',
      headline: 'Origin Traceability & CAMAG HPTLC Botanical Identity',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
      desc: 'Direct contract farming and sustainable wildcrafted harvesting across pristine agro-climatic zones in India. Raw botanicals enter climate-controlled quarantine bays for microscopic taxonomic authentication and CAMAG HPTLC chemical fingerprinting before extraction release.',
      specs: [
        'Species botanical authentication (USP monograph standard)',
        'Zero synthetic pesticide residue screen (USP <561> LC-MS/MS)',
        'Moisture content controlled < 8.0% w/w',
        'Physical foreign matter inspection < 1.0%'
      ],
      kpi: '100% Farm-Gate Traceability'
    },
    {
      step: '02',
      code: 'EXTRACT',
      title: 'Botanical Extraction',
      headline: 'Stainless SS-316L Multi-Stage Sanitary Percolation',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      desc: 'Multi-stage counter-current percolation utilizing pharmaceutical-grade SS-316L extraction vessels. We deploy USP-grade demineralized water and distilled ethanol at automated temperature and vacuum cycles to preserve heat-sensitive active fractions.',
      specs: [
        'All-welded SS-316L sanitary sanitary construction',
        'Controlled extraction temperature (< 50°C)',
        'Multi-stage counter-current solvent recycling',
        'Zero harsh chlorinated extraction solvents'
      ],
      kpi: '150 MT Monthly Extraction Capacity'
    },
    {
      step: '03',
      code: 'PROCESS',
      title: 'Concentration & Drying',
      headline: 'Class 100,000 Cleanroom Micro-Atomization',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      desc: 'Falling-film vacuum evaporators concentrate botanical liquor at < 45°C. The concentrate is atomized inside HEPA-filtered Class 100k cleanroom drying towers, producing homogeneous, free-flowing micro-powders with intact phytochemical matrices.',
      specs: [
        'Class 100,000 (ISO Class 8) HEPA cleanroom',
        'Low-temperature vacuum drying (< 45°C)',
        'Positive pressure airlocks & microbial barriers',
        'High-speed rotary atomization (25,000 RPM)'
      ],
      kpi: 'Thermolabile Bioactive Preservation'
    },
    {
      step: '04',
      code: 'STANDARDIZE',
      title: 'Marker Standardization',
      headline: 'Reverse-Phase HPLC Quantification & Granulation',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
      desc: 'Fluid-bed granulation and calibrated sieving standardize particle mesh profiles (40 to 120 mesh) for direct tablet compression or instant cold-water dispersion, with HPLC-verified active marker concentrations.',
      specs: [
        'Calibrated particle sizing (20 to 120 mesh)',
        'Bulk density standardized (0.40 - 0.70 g/ml)',
        'Angle of repose < 30° for rapid hopper flow',
        'Direct compression (DC) grade options'
      ],
      kpi: 'Exact HPLC Active Standardization'
    },
    {
      step: '05',
      code: 'TEST',
      title: 'Quality & Analytical Testing',
      headline: 'Full-Spectrum HPLC, ICP-MS & GC-MS Release',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
      desc: 'Every batch undergoes comprehensive quality assurance: HPLC active quantification, ICP-MS heavy metals testing (< 10 ppm total), Headspace GC-MS residual solvent verification (USP <467>), and automated microbial assays before QA lot release.',
      specs: [
        'Heavy metals (Pb < 3ppm, Cd < 1ppm, As < 1ppm, Hg < 0.1ppm)',
        'Residual solvents compliant with USP <467> & Ph. Eur. 5.4',
        'Automated microbiology (TAMC < 1000 CFU/g, Pathogen free)',
        'Batch-specific authenticated COA generation'
      ],
      kpi: 'USP <467> & Ph. Eur. Release Guarantee'
    },
    {
      step: '06',
      code: 'DELIVER',
      title: 'Packaging & Global Supply',
      headline: 'Tamper-Evident Industrial Drums & Temperature Logistics',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      desc: 'Double food-grade polyethylene liners flushed with inert nitrogen inside tamper-evident fiber or HDPE drums. Dispatched via temperature-monitored air freight or sea freight to 40+ countries with complete customs dossiers.',
      specs: [
        '25 kg standard industrial export packaging',
        'Double food-grade PE liner with food-grade silica',
        'Tamper-evident security lock and barcode tracking',
        'Full container (FCL) & express air freight shipping'
      ],
      kpi: 'Exporting to 40+ Destination Countries'
    }
  ];

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    let rafId: number | null = null;

    const handleScroll = () => {
      if (!containerRef.current) return;
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const totalScrollable = rect.height - window.innerHeight;
          if (totalScrollable > 0) {
            const currentScrolled = -rect.top;
            const progressRatio = Math.min(Math.max(currentScrolled / totalScrollable, 0), 1);
            setProgress(progressRatio);

            const stepIdx = Math.min(
              Math.floor(progressRatio * steps.length),
              steps.length - 1
            );
            setActiveStep(stepIdx);
          }
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      mediaQuery.removeEventListener('change', listener);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [steps.length]);

  const handleJumpToStep = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    const targetScroll = (index / (steps.length - 1)) * totalScrollable;
    const targetY = window.scrollY + rect.top + targetScroll;
    window.scrollTo({
      top: targetY,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#072115] text-white border-b border-[#1d5537]/40 lg:h-[380vh]"
    >
      {/* Desktop Sticky Viewport */}
      <div className="hidden lg:flex sticky top-16 xl:top-20 h-[calc(100vh-4rem)] xl:h-[calc(100vh-5rem)] flex-col justify-center py-4 xl:py-6 overflow-hidden z-20">
        <div className="container-custom max-w-7xl mx-auto w-full">
          {/* Section Header - Fixed in place at the top of the sticky viewport */}
          <div className="flex items-end justify-between mb-4 xl:mb-6 pb-2.5 xl:pb-3 border-b border-[#1d5537]/50 flex-shrink-0">
            <div>
              <div className="eyebrow mb-0.5">
                <span>04 &bull; Process Engineering Architecture</span>
              </div>
              <h2 className="text-2xl xl:text-3xl font-serif text-white tracking-tight">
                6-Stage Manufacturing <span className="italic font-light text-[#c5a059]">Lifecycle</span>
              </h2>
            </div>
            <div className="text-right">
              <div className="font-mono text-[11px] xl:text-xs text-[#c5a059] uppercase tracking-widest font-bold">
                STAGE 0{activeStep + 1} OF 06 &bull; {steps[activeStep].code}
              </div>
              <div className="text-[10px] xl:text-[11px] text-[#ded5c0]/60 font-mono mt-0.5">
                Scroll to explore kinetic workflow
              </div>
            </div>
          </div>

          {/* Main Grid: Left Vertical Progress Line + Right Dynamic Showcase */}
          <div className="grid grid-cols-12 gap-6 xl:gap-10 items-center">
            {/* Left Column: Vertical Progress Line with 6 Circular Nodes */}
            <div className="col-span-4 relative pl-2 xl:pl-4 py-2">
              {/* Background Track Line - spans cleanly between first and last node center */}
              <div className="absolute left-[26px] xl:left-[30px] top-6 bottom-6 w-[1.5px] bg-[#1d5537]/60 z-0" />

              {/* Dynamic Filling Golden Line without harsh blurry halo */}
              <div 
                className="absolute left-[26px] xl:left-[30px] top-6 w-[1.5px] bg-gradient-to-b from-[#c5a059] via-[#ecdcb9] to-[#c5a059] transition-all duration-300 ease-out z-0"
                style={{ 
                  height: `${(activeStep / (steps.length - 1)) * 100}%`
                }}
              />

              {/* 6 Step Nodes */}
              <div className="space-y-3.5 xl:space-y-4 relative z-10">
                {steps.map((s, idx) => {
                  const isCurrent = activeStep === idx;
                  const isPassed = activeStep > idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleJumpToStep(idx)}
                      className={`w-full text-left flex items-center gap-3.5 xl:gap-4 py-1.5 transition-all duration-300 group focus:outline-none ${
                        isCurrent ? 'opacity-100' : 'opacity-60 hover:opacity-90'
                      }`}
                    >
                      {/* Circular Node with solid opaque background sitting on top of the line */}
                      <div className={`w-9 h-9 xl:w-10 xl:h-10 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-300 flex-shrink-0 z-10 ${
                        isCurrent
                          ? 'scale-105 bg-[#c5a059] text-[#072115] font-bold ring-4 ring-[#c5a059]/25 shadow-lg'
                          : isPassed
                          ? 'bg-[#072115] text-[#c5a059] border-2 border-[#c5a059] shadow-sm'
                          : 'bg-[#072115] text-[#ded5c0]/50 border border-[#1d5537] group-hover:border-[#c5a059]/50'
                      }`}>
                        {s.step}
                      </div>

                      {/* Node Text & Code */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[9px] xl:text-[10px] font-mono font-bold uppercase tracking-widest ${
                            isCurrent ? 'text-[#c5a059]' : 'text-[#ded5c0]/60'
                          }`}>
                            {s.code}
                          </span>
                        </div>
                        <div className={`text-xs xl:text-sm truncate transition ${
                          isCurrent ? 'text-white font-bold' : 'text-[#ded5c0]'
                        }`}>
                          {s.title}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Dynamic Architectural Showcase */}
            <div className="col-span-8">
              <div className="border border-[#1d5537] bg-[#04130c] shadow-2xl overflow-hidden">
                {/* Visual Banner */}
                <div className="relative h-44 sm:h-48 xl:h-56 w-full overflow-hidden bg-[#072115]">
                  <img 
                    key={steps[activeStep].image}
                    src={steps[activeStep].image} 
                    alt={steps[activeStep].title} 
                    className="w-full h-full object-cover animate-fadeIn transition duration-700 opacity-90 scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04130c] via-transparent to-transparent" />

                  {/* Stage Pill */}
                  <div className="absolute top-3 left-3 xl:top-4 xl:left-4 flex items-center gap-2">
                    <span className="font-mono text-[10px] xl:text-xs font-bold text-[#072115] bg-[#c5a059] px-2.5 py-0.5 xl:px-3 xl:py-1 uppercase tracking-wider shadow-sm">
                      STAGE 0{activeStep + 1} OF 06 &bull; {steps[activeStep].code}
                    </span>
                    <span className="font-mono text-[10px] xl:text-xs text-white bg-[#072115]/90 border border-[#1d5537] px-2 py-0.5 xl:px-2.5 xl:py-1">
                      {steps[activeStep].kpi}
                    </span>
                  </div>

                  {/* Headline Overlay */}
                  <div className="absolute bottom-3 left-4 right-4 xl:bottom-4 xl:left-5 xl:right-5">
                    <h3 className="text-lg sm:text-xl xl:text-2xl font-serif text-white font-bold leading-tight">
                      {steps[activeStep].headline}
                    </h3>
                  </div>
                </div>

                {/* Description & In-Process Specifications */}
                <div className="p-4 sm:p-5 xl:p-6 space-y-3 xl:space-y-4">
                  <p className="text-xs sm:text-[13px] xl:text-sm text-[#ded5c0] leading-relaxed font-light line-clamp-3 xl:line-clamp-none">
                    {steps[activeStep].desc}
                  </p>

                  {/* Critical Control Bullet Points */}
                  <div className="pt-3 border-t border-[#1d5537]/60">
                    <div className="text-[9px] xl:text-[10px] font-mono text-[#c5a059] uppercase tracking-widest mb-2">
                      IN-PROCESS CRITICAL CONTROL PARAMETERS
                    </div>
                    <div className="grid grid-cols-2 gap-2 xl:gap-2.5">
                      {steps[activeStep].specs.map((spec, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] xl:text-xs text-[#ded5c0]/90 font-light">
                          <CheckCheck size={13} className="text-[#c5a059] flex-shrink-0 mt-0.5" />
                          <span className="truncate sm:whitespace-normal">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Strip */}
                  <div className="pt-3 border-t border-[#1d5537]/60 flex items-center justify-between">
                    <div className="text-[10px] xl:text-[11px] text-[#ded5c0]/60 font-mono">
                      Electronic batch manufacturing record (eBMR) archived under cGMP.
                    </div>
                    <Link to="/manufacturing" className="btn btn-gold text-[11px] xl:text-xs py-1.5 px-3.5 xl:py-2 xl:px-4">
                      <span>Facility Engineering</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Vertical Timeline Layout with Sticky Header */}
      <div className="block lg:hidden section-py container-custom pt-8">
        {/* Mobile Sticky Section Header - Fixed in place while scrolling */}
        <div className="sticky top-16 sm:top-20 z-30 bg-[#072115]/95 backdrop-blur-md py-3 px-4 -mx-4 sm:-mx-6 mb-8 border-b border-[#1d5537]/60 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="eyebrow mb-0 text-[9px]">
                <span>04 &bull; Process Architecture</span>
              </div>
              <h2 className="text-base sm:text-lg font-serif text-white tracking-tight">
                6-Stage Manufacturing <span className="italic font-light text-[#c5a059]">Lifecycle</span>
              </h2>
            </div>
            <div className="text-right">
              <div className="font-mono text-[10px] sm:text-xs text-[#c5a059] uppercase tracking-wider font-bold">
                STAGE 0{activeStep + 1} OF 06
              </div>
              <div className="text-[9px] text-[#ded5c0]/60 font-mono">
                {steps[activeStep].code}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 relative pl-6 border-l-2 border-[#1d5537]">
          {steps.map((s, idx) => (
            <div key={idx} className="relative bg-[#04130c] border border-[#1d5537] p-5 shadow-xl">
              {/* Circular Node on line */}
              <div className="absolute -left-[35px] top-4 w-7 h-7 rounded-full bg-[#c5a059] text-[#072115] font-mono text-[11px] font-bold flex items-center justify-center border-2 border-[#072115] shadow-md">
                {s.step}
              </div>

              <div className="relative h-44 w-full overflow-hidden bg-[#072115] mb-4">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 font-mono text-[10px] font-bold text-[#072115] bg-[#c5a059] px-2 py-0.5">
                  {s.code}
                </div>
              </div>

              <div className="text-[10px] font-mono text-[#c5a059] uppercase tracking-wider mb-1">
                {s.kpi}
              </div>
              <h3 className="text-base font-serif font-bold text-white mb-2">
                {s.headline}
              </h3>
              <p className="text-xs text-[#ded5c0] font-light leading-relaxed mb-4">
                {s.desc}
              </p>

              <div className="space-y-1.5 pt-3 border-t border-[#1d5537]">
                {s.specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-[#ded5c0]/90 font-light">
                    <CheckCheck size={13} className="text-[#c5a059] flex-shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/manufacturing" className="btn btn-gold text-xs py-3 w-full justify-center">
            <span>Explore Complete Facility Infrastructure</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
};
