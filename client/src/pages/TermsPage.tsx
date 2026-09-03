import React from 'react';
import { SEO } from '../components/common/SEO';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEO title="Terms & Conditions | YAMI NATURLS" description="Batch-specific COA warranties, Incoterms, and bulk supply terms." />
      <div className="bg-slate-950 text-white pt-36 pb-16 lg:pt-40 lg:pb-20 border-b border-slate-800">
        <div className="container-custom">
          <h1 className="text-3xl sm:text-4xl font-bold">Terms of B2B Supply</h1>
          <p className="text-sm text-slate-400 mt-2">Last Updated: January 2026</p>
        </div>
      </div>
      <section className="section-py bg-slate-50/80">
        <div className="container-custom max-w-4xl">
          <div className="card-premium bg-white p-8 md:p-10 prose prose-slate max-w-none text-sm leading-relaxed space-y-6">
            <h3>1. Commercial Applicability</h3>
            <p>YAMI NATURALS provides industrial botanical extracts, granules, and private label formulations exclusively for commercial manufacturers, dietary supplement brands, and qualified distributors.</p>
            <h3>2. Specifications &amp; Batch COA</h3>
            <p>Every commercial delivery is accompanied by a lot-specific Certificate of Analysis (COA) guaranteeing active assay markers, USP &lt;2232&gt; heavy metal fingerprinting, USP &lt;467&gt; solvent clearance, and pathogen-free microbial specs.</p>
            <h3>3. Incoterms & Export Logistics</h3>
            <p>Standard commercial exports are quoted FOB, CIF, or DDP according to Incoterms 2020. Documents include Phitosanitary Certificates, Certificates of Origin, and UNIPOT/ESA compliance dossiers.</p>
          </div>
        </div>
      </section>
    </>
  );
};
