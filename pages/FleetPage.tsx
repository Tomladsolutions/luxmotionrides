import React from 'react';
import { Fleet } from '../components/Fleet';
import { SEO } from '../components/SEO';
import { PageHero } from '../components/PageHero';

export const FleetPage = () => {
  return (
    <div className="bg-white pt-20">
      <SEO
        title="Luxury Fleet | Denver Black Car Service | Lux Motion Rides"
        description="Browse Lux Motion Rides premium fleet of luxury black SUVs and vans. GMC Yukon Denali, Chevrolet Suburban, Ford Transit, and Mercedes Sprinter available for Denver airport transfers and Colorado travel."
        keywords="luxury fleet Denver, black SUV Denver, GMC Yukon Denali rental, Mercedes Sprinter Colorado, Denver airport limo, luxury van rental Denver"
        canonical="/fleet"
      />
      <PageHero
        image="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Luxury fleet"
        title="Our Fleet"
        showDivider
      />

      <Fleet />
    </div>
  );
};