import React from 'react';
import { SEO } from '../components/common/SEO';

export const PrivacyPage: React.FC = () => {
  return (
    <>
      <SEO title="Privacy Policy | YAMI NATURALS" description="Yami Naturals B2B privacy policy and data protection standards." />
      <div className="bg-slate-950 text-white pt-28 pb-16 border-b border-slate-800">
        <div className="container-custom">
          <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-slate-400 mt-2">Last Updated: January 2026</p>
        </div>
      </div>
      <section className="section-py bg-slate-50/80">
        <div className="container-custom max-w-4xl">
          <div className="card-premium bg-white p-8 md:p-10 prose prose-slate max-w-none text-sm leading-relaxed space-y-6">
            <h3>Introduction</h3>
            <p>Yami Naturals ("Yami", "we", "us") respects your business privacy. This B2B Privacy Policy explains how we collect, use, and protect company, procurement, and commercial contact information.</p>
            <h3>Information We Collect</h3>
            <p>We collect company names, corporate email addresses, direct phone lines, and batch quote/dossier requests solely to execute commercial B2B transactions, supply chain validation, and regulatory dossier fulfillment.</p>
            <h3>Non-Disclosure & Data Security</h3>
            <p>We do not sell, rent, or market your corporate data to third parties. All custom formulation details and proprietary assays shared with Yami Naturals are protected under strict industry NDAs.</p>
          </div>
        </div>
      </section>
    </>
  );
};
