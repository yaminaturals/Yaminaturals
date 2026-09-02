import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { FAQ } from '../../types';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FAQAccordion: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    api.getFaqs()
      .then(res => setFaqs(res || []));
  }, []);

  const defaultFaqs: FAQ[] = [
    {
      id: 'faq_moq',
      question: 'What is the standard commercial Minimum Order Quantity (MOQ)?',
      answer: 'Our standard commercial MOQ for catalog botanical extracts is 25 kg (supplied in 1 x 25 kg HDPE drum with double food-grade polyethylene liner). For custom R&D and proprietary formulation blends, the MOQ starts at 50 kg.',
      category: 'sourcing-commercial'
    },
    {
      id: 'faq_coa',
      question: 'Do you provide batch-specific Certificate of Analysis (COA) dossiers?',
      answer: 'Yes. Every delivery is accompanied by an authenticated, lot-specific COA documenting HPLC/HPTLC active marker assay, USP <2232> heavy metals via ICP-MS, USP <467> residual solvents via GC-MS, and automated microbiological pathogen plating.',
      category: 'quality-testing'
    },
    {
      id: 'faq_audit',
      question: 'Can our Quality Assurance team audit your extraction and spray drying facility?',
      answer: 'We welcome scheduled on-site audits at our manufacturing facilities in India as well as comprehensive virtual audits. We supply complete vendor qualification packets including Master Batch Records (eBMR), validation dossiers, and facility schematics.',
      category: 'regulatory'
    },
    {
      id: 'faq_shipping',
      question: 'What Incoterms and shipping methods do you support for international export?',
      answer: 'We regularly export under FOB, CIF, DAP, and DDP terms via temperature-controlled air freight (IATA approved) and Full Container Load (FCL) / LCL ocean shipping to major commercial ports worldwide.',
      category: 'logistics'
    }
  ];

  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section className="section-py bg-[#fdfbf7] border-b border-[#e5dcce]">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="eyebrow-dark">
                <span>09 &bull; Technical Knowledge Base</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111827] tracking-tight">
                Frequently Asked <br />
                <span className="italic font-light text-[#1d5537]">Commercial Questions</span>
              </h2>
            </div>
            <Link 
              to="/faq" 
              className="btn btn-outline text-xs font-semibold uppercase tracking-[0.14em] self-start md:self-end"
            >
              <span>View Full FAQ Matrix</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Accordion Items */}
          <div className="space-y-4">
            {displayFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div 
                  key={faq.id || idx}
                  className={`border transition duration-200 ${
                    isOpen ? 'border-[#1d5537] bg-white shadow-sm' : 'border-[#e5dcce] bg-white hover:border-[#ded5c0]'
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-xs font-mono font-bold text-[#c5a059]">
                        0{idx + 1}
                      </span>
                      <span className="text-base font-bold text-[#111827]">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown 
                      size={18} 
                      className={`text-[#1d5537] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#c5a059]' : ''
                      }`} 
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-[#4b5563] leading-relaxed font-light border-t border-[#f0eade] mt-2">
                      <div className="pt-4">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
