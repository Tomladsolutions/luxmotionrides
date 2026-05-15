import React from 'react';
import { ServiceTemplate } from '../components/ServiceTemplate';
import { SEO } from '../components/SEO';

export const MountainPage = () => {
  return (
    <>
      <SEO
        title="Mountain Transportation Colorado | Vail & Aspen Car Service"
        description="Luxury mountain transportation from Denver to Vail, Aspen, Breckenridge, Keystone, and Winter Park. Winter-equipped SUVs, experienced mountain drivers, and direct resort service with Lux Motion Rides."
        keywords="mountain transportation Colorado, Denver to Vail car service, Denver to Aspen transportation, Breckenridge luxury ride, Keystone car service, Winter Park transportation, Colorado mountain shuttle"
        canonical="/vail-transportation"
      />
      <ServiceTemplate
      title="Mountain Transportation"
      subtitle="Vail, Aspen, Breckenridge"
      description="Experience the breathtaking Colorado mountains in ultimate comfort and safety. Our winter-equipped luxury SUVs and experienced drivers ensure a smooth ride through challenging mountain passes."
      image="/mountain.jpg"
      features={[
        "Winter-ready luxury SUVs (4WD/AWD)",
        "Ski and snowboard racks available",
        "Experienced mountain drivers",
        "Direct service to your resort or cabin"
      ]}
      serviceType="intercity"
    />
  </>
  );
};

