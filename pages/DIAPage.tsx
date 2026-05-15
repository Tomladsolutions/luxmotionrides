import React from 'react';
import { ServiceTemplate } from '../components/ServiceTemplate';
import { SEO } from '../components/SEO';

export const DIAPage = () => {
  return (
    <>
      <SEO
        title="Denver Airport Transportation | DIA Black Car Service | Lux Motion Rides"
        description="Professional Denver International Airport transfers with Lux Motion Rides. Real-time flight tracking, meet and greet service, and luxury black car transportation to and from DIA. Book your Denver airport ride today."
        keywords="Denver airport transfer, DIA car service, Denver International Airport transportation, Denver black car airport, airport limo Denver, DIA luxury transportation"
        canonical="/dia-transportation"
      />
      <ServiceTemplate
      title="Airport Transportation"
      subtitle="Denver International Airport"
      description="Stress free airport pickups and drop offs with reliable scheduling and comfortable vehicles. We monitor your flight status in real-time to ensure your chauffeur is waiting for you exactly when you arrive, whether your flight is early or delayed."
      image="/airport.jpg"
      features={[
        "Real-time flight tracking",
        "Meet and greet service at baggage claim",
        "Assistance with luggage",
        "Curbside pickup available"
      ]}
      serviceType="airport"
    />
  </>
  );
};

