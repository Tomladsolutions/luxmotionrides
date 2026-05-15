import React from 'react';
import { ServiceTemplate } from '../components/ServiceTemplate';
import { SEO } from '../components/SEO';

export const CollegePage = () => {
  return (
    <>
      <SEO
        title="College Transportation | CSU & CU Boulder Student Rides"
        description="Safe and reliable college transportation for CSU, CU Boulder, and Colorado students. Airport transfers, holiday rides home, and group rates. Parents trust Lux Motion Rides for student transportation in Colorado."
        keywords="CSU transportation, CU Boulder car service, Colorado student transportation, college airport transfer Colorado, Denver student rides, campus transportation"
        canonical="/csu-transportation"
      />
      <ServiceTemplate
      title="College Transportation"
      subtitle="CSU, CU Boulder & Surrounding"
      description="Safe, reliable, and comfortable transportation for students. Whether it's a ride home for the holidays, airport transfers at the end of the semester, or special events, we provide parents with peace of mind."
      image="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?q=80&w=2000&auto=format&fit=crop"
      features={[
        "Safe and vetted professional drivers",
        "Group rates available for students",
        "Door-to-door campus service",
        "Flexible scheduling around classes"
      ]}
    />
    </>
  );
};
