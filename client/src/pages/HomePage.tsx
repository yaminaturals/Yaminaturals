import React from 'react';
import { SEO } from '../components/common/SEO';
import { Hero } from '../components/home/Hero';
import { TrustBar } from '../components/home/TrustBar';
import { WhatWeDo } from '../components/home/WhatWeDo';
import { BotanicalGrid } from '../components/home/BotanicalGrid';
import { WhyYami } from '../components/home/WhyYami';
import { ManufacturingTimeline } from '../components/home/ManufacturingTimeline';
import { ProductCatalogPreview } from '../components/home/ProductCatalogPreview';
import { CustomFormulationFlow } from '../components/home/CustomFormulationFlow';
import { QualityMatrix } from '../components/home/QualityMatrix';
import { GlobalSupply } from '../components/home/GlobalSupply';
import { ApplicationsMatrix } from '../components/home/ApplicationsMatrix';
import { ProcurementServices } from '../components/home/ProcurementServices';
import { CTASection } from '../components/home/CTASection';
import { FAQAccordion } from '../components/home/FAQAccordion';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEO 
        title="YAMI NATURES | Standardized Botanical Extracts & Nutraceutical Ingredients" 
        description="Premier B2B manufacturer and exporter of standardized botanical extracts, granules, and custom formulations." 
      />
      <Hero />
      <TrustBar />
      <WhatWeDo />
      <BotanicalGrid />
      <WhyYami />
      <ManufacturingTimeline />
      <ProductCatalogPreview />
      <CustomFormulationFlow />
      <QualityMatrix />
      <GlobalSupply />
      <ApplicationsMatrix />
      <ProcurementServices />
      <CTASection />
      <FAQAccordion />
    </>
  );
};
