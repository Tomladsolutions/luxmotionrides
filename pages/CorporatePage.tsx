import React from 'react';
import { ServiceTemplate } from '../components/ServiceTemplate';
import { SEO } from '../components/SEO';

export const CorporatePage = () => {
  return (
    <>
      <SEO
        title="Corporate Transportation Denver | Executive Car Service | Lux Motion Rides"
        description="Premium corporate transportation in Denver with Lux Motion Rides. Professional chauffeurs, executive travel, meeting transfers, and corporate billing accounts. Reliable business car service in Colorado."
        keywords="corporate transportation Denver, executive car service Denver, business travel Colorado, Denver corporate chauffeur, meeting transportation Denver"
        canonical="/corporate-transportation"
      />
      <ServiceTemplate
      title="Corporate Transportation"
      subtitle="Business & Executive Travel"
      description="Professional transportation for meetings, business travel, and executive transportation. We understand the importance of punctuality and professionalism for our corporate clients."
      image="/corporate.jpg"
      features={[
        "Professional chauffeurs in business attire",
        "Quiet, comfortable environment for work",
        "Punctual arrivals for meetings and events",
        "Corporate billing accounts available"
      ]}
      serviceType="corporate"
    />
  </>
  );
};

