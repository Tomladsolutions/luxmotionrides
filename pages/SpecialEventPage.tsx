import React from 'react';
import { ServiceTemplate } from '../components/ServiceTemplate';
import { SEO } from '../components/SEO';

export const SpecialEventPage = () => {
  return (
    <>
      <SEO
        title="Special Event Transportation Denver | Wedding & Concert Rides"
        description="Arrive in style with Lux Motion Rides special event transportation in Colorado. Wedding car service, concert rides to Red Rocks and Ball Arena, and gala transportation across Denver and beyond."
        keywords="special event transportation Denver, wedding car service Colorado, concert transportation Denver, Red Rocks car service, Ball Arena rides, prom limo Denver"
        canonical="/special-event-transportation"
      />
      <ServiceTemplate
      title="Special Event Transportation"
      subtitle="Weddings, Concerts & More"
      description="Arrive in style for weddings, concerts, and special occasions. Elevate your event experience with our premium transportation services, skipping the parking stress and arriving in luxury."
      image="https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=2000&auto=format&fit=crop"
      features={[
        "VIP drop-off and pick-up at event venues",
        "Luxury group vans for large parties",
        "Tailored service for weddings and galas",
        "Post-event waiting service available"
      ]}
      serviceType="special"
    />
  </>
  );
};

