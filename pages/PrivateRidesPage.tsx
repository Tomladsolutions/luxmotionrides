import React from 'react';
import { ServiceTemplate } from '../components/ServiceTemplate';
import { SEO } from '../components/SEO';

export const PrivateRidesPage = () => {
  return (
    <>
      <SEO
        title="Private Car Service Denver | Hourly Luxury Rides | Lux Motion Rides"
        description="Flexible private car service in Denver and Colorado. Hourly luxury transportation, city rides, errands, and personal chauffeur service. Book Lux Motion Rides for your next Denver trip."
        keywords="private car service Denver, hourly car service Denver, personal chauffeur Colorado, Denver luxury rides, dedicated driver Denver"
        canonical="/private-rides"
      />
      <ServiceTemplate
      title="Private Rides"
      subtitle="Flexible & Hourly Service"
      description="Flexible transportation for city travel, errands, or hourly service. Whether you need a ride across town or a dedicated chauffeur for the day, we provide the flexibility you need."
      image="/special.jpg"
      features={[
        "Hourly and daily booking options",
        "Dedicated chauffeur for your entire trip",
        "Flexible routes and multiple stops",
        "Personalized service for errands and city travel"
      ]}
      serviceType="private"
    />
  </>
  );
};

