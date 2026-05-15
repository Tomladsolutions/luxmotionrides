import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
}

export const SEO = ({ title, description, keywords, ogTitle, ogDescription, canonical }: SEOProps) => {
  const siteName = 'Lux Motion Rides';
  const fullTitle = `${title} | Lux Motion Rides`;
  const defaultDescription = 'Colorado premier luxury black car service for airport transfers, corporate travel, mountain transportation, and special events.';
  const siteUrl = 'https://luxmotionride.com';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}
      
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description || defaultDescription} />
      {canonical && <meta property="og:url" content={`${siteUrl}${canonical}`} />}
      
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description || defaultDescription} />
    </Helmet>
  );
};
