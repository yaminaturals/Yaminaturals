import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonical?: string;
  schema?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'YAMI NATURALS | Standardized Botanical Ingredients & Contract Manufacturing',
  description = 'Premier B2B manufacturer and global exporter of standardized botanical extracts, phytochemical fractions, and private-label formulations.',
  keywords = 'botanical extracts, standardized herbal extract, nutraceutical ingredients, bulk herbs, contract manufacturing',
  image = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
  canonical,
  schema
}) => {
  useEffect(() => {
    document.title = title;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // OpenGraph Tags
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:image', image);
    setMeta('og:type', 'website');

    // JSON-LD Structured Data
    if (schema) {
      let script = document.getElementById('json-ld-structured-data');
      if (!script) {
        script = document.createElement('script');
        script.id = 'json-ld-structured-data';
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }

    return () => {
      const existingScript = document.getElementById('json-ld-structured-data');
      if (existingScript) existingScript.remove();
    };
  }, [title, description, keywords, image, schema]);

  return null;
};
