import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  FlaskConical, 
  Microscope, 
  ShieldCheck, 
  Scale, 
  CheckCircle2, 
  Factory, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Layers,
  Send,
  Sliders,
  CheckCheck
} from 'lucide-react';

export const CustomFormulationFlow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const steps = [
    {
      step: '01',
      title: 'Requirement & Specification Brief',
      phase: 'Client Brief & Target Assay',
      icon: FileText,
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
      desc: 'Define targeted active marker percentage (e.g. Withanolides 5% to 10%, Curcuminoids 95%), desired solubility profile (100% cold-water soluble vs hydro-ethanolic), intended dosage format (capsules, gummies, RTD beverages), and target geographic compliance (US FDA, EFSA, TGA).',
      deliverable: 'Formulation Design Brief & NDA Agreement',
      highlight: 'Target Assay: 5% - 98% purity specification',
      points: [
        'Active marker % specification & reference standard',
        'Physical format: fine powder, granules, or oleoresin',
        'Regulatory alignment (USP / Ph. Eur. / JP monograph)'
      ]
    },
    {
      step: '02',
      title: 'Botanical Sourcing & Authentication',
      phase: 'Raw Material Verification',
      icon: Search,
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
      desc: 'Direct farm-gate sourcing of raw botanical biomass from audited agricultural partners. Macro/microscopic identification and CAMAG HPTLC chemical fingerprinting confirm true botanical species and 100% absence of synthetic spiking.',
      deliverable: 'Species Authentication & Traceability Certificate',
      highlight: 'CAMAG HPTLC Fingerprint Profile',
      points: [
        'Taxonomic verification against herbarium vouchers',
        'Zero pesticide residue screen (400+ compounds)',
        'Farm-gate GPS traceability and harvest sustainability'
      ]
    },
    {
      step: '03',
      title: 'Phytochemical Solvent Engineering',
      phase: 'Extraction Kinetic Design',
      icon: FlaskConical,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      desc: 'Our extraction chemists configure optimized solvent extraction ratios (purified demineralized water, USP ethanol, or supercritical CO2) and low-temperature vacuum evaporation (< 45°C) to isolate targeted bioactive fractions without thermal degradation.',
      deliverable: 'Extraction Kinetic SOP & Yield Protocol',
      highlight: 'Vacuum falling-film concentration (< 45°C)',
      points: [
        'Solvent-to-feed ratio and multi-stage percolation',
        'Low-temperature evaporation preserving thermolabile actives',
        'Zero Class 1 toxic solvents (USP <467> compliant)'
      ]
    },
    {
      step: '04',
      title: 'Laboratory Bench R&D Formulations',
      phase: 'Bench Prototypes & Matrix Tuning',
      icon: Microscope,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      desc: 'Synthesis of initial 100g to 500g bench prototypes. Particle sizing, density calibration, and natural taste-masking or micro-encapsulation techniques are tested for organoleptic suitability in your target matrix.',
      deliverable: 'Bench Prototype & Organoleptic Report',
      highlight: 'Micro-granulation & density tuning',
      points: [
        'Bulk density calibration (0.40 - 0.70 g/ml) for tableting',
        'Particle sizing from 20 to 120 mesh for rapid dispersion',
        'Organoleptic flavor profiling and taste-masking'
      ]
    },
    {
      step: '05',
      title: 'Analytical Potency & Safety Testing',
      phase: 'Analytical QC & Pharmacopoeial Release',
      icon: ShieldCheck,
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80',
      desc: 'Reverse-phase HPLC assay quantification of active marker fractions, ICP-MS heavy metals screening (< 10 ppm total), USP <467> residual solvents, and automated microbiological pathogen screening ensuring complete pharmacopoeial compliance.',
      deliverable: 'Comprehensive Draft Certificate of Analysis (COA)',
      highlight: 'HPLC quantification & ICP-MS metal clearance',
      points: [
        'Reverse-phase HPLC/UV active assay confirmation',
        'USP <2232> heavy metals: Lead < 3ppm, Cadmium < 1ppm',
        'Microbial clearance: Total plate count < 1,000 CFU/g'
      ]
    },
    {
      step: '06',
      title: 'Pilot Batch Trial Run (500g - 2kg)',
      phase: 'Client Evaluation & Factory Trial',
      icon: Scale,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
      desc: 'Scaled-up pilot run under cleanroom conditions. A 500g to 2kg evaluation batch is dispatched directly to your R&D facility for pilot formulation, encapsulation, tableting, and filling trials.',
      deliverable: 'Evaluation Sample & Validation Dossier',
      highlight: 'Direct pilot sample factory dispatch',
      points: [
        '500g to 2kg physical pilot sample with authentic COA',
        'Machinability & hopper flow validation on filling lines',
        'Technical formulation adjustment feedback loop'
      ]
    },
    {
      step: '07',
      title: 'Accelerated Stability & Shelf-Life Validation',
      phase: 'Stability & Shelf-Life Assurance',
      icon: CheckCircle2,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      desc: 'Formulation samples undergo accelerated climatic chamber testing (40°C / 75% RH) to validate 24 to 36 months active marker potency retention, moisture barrier protection, and color/aroma stability.',
      deliverable: 'Accelerated Stability & Shelf-Life Report',
      highlight: '24-36 month potency assurance',
      points: [
        'ICH Q1A(R2) climatic chamber testing (40°C/75% RH)',
        'Active marker degradation curve modeling over 36 months',
        'Packaging barrier optimization (Nitrogen + Silica)'
      ]
    },
    {
      step: '08',
      title: 'Commercial Scale-Up & cGMP Production',
      phase: 'Full Commercial Scale-Up',
      icon: Factory,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      desc: 'Seamless transition into commercial production inside our ISO 22000 & cGMP certified cleanroom suites. Full electronic batch manufacturing records (eBMR), lot tracking, and international export container logistics.',
      deliverable: 'Commercial Production Lot with Lot-Specific COA',
      highlight: '25kg to Metric-Ton monthly scale',
      points: [
        'Commercial scale-up from 25 kg drums to 20ft containers',
        'Full electronic Batch Manufacturing Record (eBMR)',
        'Global export under FOB, CIF, DAP, or DDP incoterms'
      ]
    }
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current || !trackRef.current) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const totalScrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
          
          if (totalScrollableHeight <= 0) {
            ticking = false;
            return;
          }

          const currentScroll = -rect.top;
          const progress = Math.min(Math.max(currentScroll / totalScrollableHeight, 0), 1);
          
          setScrollProgress(progress);

          const trackWidth = trackRef.current.scrollWidth;
          const viewportWidth = window.innerWidth;
          const maxTranslate = Math.max(0, trackWidth - viewportWidth + 120);
          
          trackRef.current.style.transform = `translate3d(-${progress * maxTranslate}px, 0px, 0px)`;

          const stepIndex = Math.min(7, Math.max(0, Math.floor(progress * 8)));
          setActiveStep(stepIndex);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const scrollToStepIndex = (index: number) => {
    if (!containerRef.current) return;
    const totalScrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = (index / 7) * totalScrollableHeight;
    const containerTop = containerRef.current.offsetTop;
    
    window.scrollTo({
      top: containerTop + targetScroll,
      behavior: 'smooth'
    });
    setActiveStep(index);
  };

  const nextStep = () => {
    const next = Math.min(7, activeStep + 1);
    scrollToStepIndex(next);
  };

  const prevStep = () => {
    const prev = Math.max(0, activeStep - 1);
    scrollToStepIndex(prev);
  };

  return (
    <div 
      ref={containerRef}
      className="relative bg-slate-950 text-white border-b border-slate-800"
      style={{ height: isMobile ? 'auto' : '400vh' }}
    >
      {/* Sticky Screen Viewport for Desktop Horizontal Scroll */}
      <div className={isMobile ? 'py-16' : 'sticky top-0 h-screen flex flex-col justify-between py-8 overflow-hidden'}>
        {/* Background glow & accents */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[550px] h-[550px] bg-emerald-900/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[550px] h-[550px] bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10 w-full">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-4 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-950/80 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles size={13} />
                <span>Horizontal Formulation Pipeline</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                8-Step Custom Formulation Pipeline
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                {!isMobile ? 'Scroll down to continuously glide through all 8 stages of our custom phytochemical formulation workflow.' : 'Swipe through our 8-step phytochemical formulation pipeline from initial brief to metric-ton scale.'}
              </p>
            </div>

            {/* Desktop Stage & Navigation Controls */}
            <div className="flex items-center gap-3">
              <div className="text-xs font-mono text-slate-300 bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl hidden sm:block">
                Active Phase: <span className="font-bold text-gold-400">{`0${activeStep + 1}`}</span> / <span className="text-slate-400">08 &bull; {steps[activeStep].phase}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevStep}
                  disabled={activeStep === 0}
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  aria-label="Previous step"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextStep}
                  disabled={activeStep === 7}
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  aria-label="Next step"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Jump Stage Pills (Desktop) */}
          <div className="hidden lg:grid grid-cols-8 gap-2 mb-3">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => scrollToStepIndex(i)}
                className={`p-2 rounded-xl text-left border transition duration-200 cursor-pointer ${
                  activeStep === i
                    ? 'bg-emerald-950/90 border-emerald-500/70 text-white shadow-emerald ring-1 ring-emerald-500/40'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className={`text-tiny font-mono font-bold ${activeStep === i ? 'text-gold-400' : 'text-slate-500'}`}>
                  {s.step}
                </div>
                <div className="text-tiny font-semibold truncate">
                  {s.phase}
                </div>
              </button>
            ))}
          </div>

          {/* Continuous Scroll Progress Bar */}
          <div className="w-full bg-slate-900 h-1.5 rounded-full mb-4 overflow-hidden border border-slate-800/80">
            <div 
              className="bg-gradient-to-r from-emerald-500 via-gold-400 to-emerald-400 h-full transition-all duration-150 rounded-full"
              style={{ width: `${Math.max(12, isMobile ? ((activeStep + 1) / 8) * 100 : scrollProgress * 100)}%` }}
            />
          </div>
        </div>

        {/* Horizontal Track Area */}
        <div className="w-full overflow-hidden relative">
          <div
            ref={trackRef}
            className={
              isMobile 
                ? 'flex gap-5 overflow-x-auto px-4 pb-6 scrollbar-none snap-x snap-mandatory' 
                : 'flex gap-6 px-8 transition-transform duration-75 will-change-transform'
            }
          >
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isCurrent = activeStep === idx;

              return (
                <div
                  key={idx}
                  onClick={() => !isMobile && scrollToStepIndex(idx)}
                  className={`flex-shrink-0 w-[310px] sm:w-[350px] lg:w-[380px] snap-start rounded-2xl overflow-hidden flex flex-col justify-between border transition duration-300 cursor-pointer select-none ${
                    isCurrent
                      ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-emerald-500/70 shadow-2xl ring-2 ring-emerald-500/40'
                      : 'bg-slate-900/70 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    {/* Visual Card Image Header */}
                    <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                      <img 
                        src={s.image} 
                        alt={s.title} 
                        className="w-full h-full object-cover opacity-85 hover:scale-105 transition duration-500"
                        loading="lazy" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="badge badge-gold bg-gold-400 text-slate-950 font-mono font-bold shadow">
                          STAGE {s.step}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                          <Icon size={15} />
                        </div>
                        <span className="text-xs font-semibold text-white font-mono">
                          {s.phase}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-base font-bold text-white mb-2 leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal mb-3">
                        {s.desc}
                      </p>

                      {/* Technical bullets */}
                      <div className="space-y-1 pt-2 border-t border-slate-800/80">
                        {s.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-1.5 text-tiny text-slate-300">
                            <CheckCheck size={13} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Deliverable Footer */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-tiny">
                      <div className="flex items-start gap-1.5">
                        <span className="font-bold text-slate-400 uppercase">Deliverable:</span>
                        <span className="text-emerald-400 font-medium">{s.deliverable}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-950/80 border border-slate-800 text-gold-300 font-mono flex items-center justify-between">
                        <span>Metric:</span>
                        <span className="font-semibold">{s.highlight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Action Strip */}
        <div className="container-custom relative z-10 w-full mt-3">
          <div className="card-premium bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/30 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center text-emerald-300 flex-shrink-0">
                <Sliders size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Require a Custom Assay or Proprietary Ratio?</h4>
                <p className="text-tiny text-slate-300">Our R&amp;D facility formulates custom HPLC marker concentrations and water-soluble micro-granules.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <Link to="/request-quote" className="btn btn-primary text-xs py-2 px-5 shadow-emerald">
                <Send size={14} />
                <span>Discuss Your Product</span>
              </Link>
              <Link to="/contact" className="btn btn-outline-white text-xs py-2 px-4">
                <span>Book Consultation</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
