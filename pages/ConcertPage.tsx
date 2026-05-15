import React from 'react';
import { ServiceTemplate } from '../components/ServiceTemplate';
import { SEO } from '../components/SEO';

export const ConcertPage = () => {
  return (
    <>
      <SEO
        title="Concert Transportation Denver | Red Rocks & Ball Arena Rides"
        description="Luxury concert transportation in Denver. VIP drop-off at Red Rocks Amphitheatre, Ball Arena, Coors Field, and Empower Field. Skip traffic and parking with Lux Motion Rides premium event car service."
        keywords="concert transportation Denver, Red Rocks car service, Ball Arena rides, Coors Field transportation, Empower Field limo, Denver event transportation"
        canonical="/coors-field"
      />
      <ServiceTemplate
      title="Concert Transportation"
      subtitle="Red Rocks, Ball Arena, Coors Field"
      description="Elevate your night out with our premium event transportation. Skip the parking nightmares, traffic stress, and long walks. We drop you off at the VIP entrance and wait for you when the encore finishes."
      image="https://plus.unsplash.com/premium_photo-1661759013744-4754d402459d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFydHlpbmd8ZW58MHx8MHx8fDA%3D"
      features={[
        "VIP drop-off and pick-up",
        "Tailgating options available",
        "Luxury group vans for large parties",
        "Post-event waiting service"
      ]}
      serviceType="special"
    />
  </>
  );
};

