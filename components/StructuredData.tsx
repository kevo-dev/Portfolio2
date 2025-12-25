
'use client';

import React, { useEffect } from 'react';
import { BIO, SKILLS } from '../data';

const StructuredData: React.FC = () => {
  useEffect(() => {
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": BIO.name,
      "jobTitle": BIO.role,
      "url": "https://kevowino.dev",
      "sameAs": Object.values(BIO.socials),
      "description": BIO.about,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nairobi",
        "addressCountry": "Kenya"
      },
      "knowsAbout": SKILLS.map(skill => skill.name)
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(personSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default StructuredData;
