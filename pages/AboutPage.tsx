import React from 'react';
import { About } from '../components/About';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { SEO } from '../components/SEO';
import { PageHero } from '../components/PageHero';
import { useBooking } from '../context/BookingContext';
import { SITE } from '../constants/site';

export const AboutPage = () => {
  const { openBooking } = useBooking();
  return (
    <div className="bg-white pt-20">
      <SEO
        title="About Lux Motion Rides | Denver Luxury Car Service"
        description="Learn about Lux Motion Rides, Colorado trusted luxury black car service. Professional chauffeurs, premium fleet, and commitment to on-time service across Denver, Boulder, and Colorado Springs."
        keywords="about Lux Motion Rides, Denver car service company, Colorado chauffeur service, luxury transportation Denver"
        canonical="/about"
      />
      <PageHero
        image="/gmc.png"
        imageAlt="Luxury black car"
        title="About Lux Motion Rides"
        showDivider
      />

      <About />
      <WhyChooseUs />

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center bg-white rounded-3xl py-16 border border-gray-200">
          <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">Ready to Ride?</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-10">
            Booking your ride is quick and simple. Our team is ready to arrange reliable transportation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={openBooking} className="bg-[#FA0000] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#FF3333] transition-colors">
              Book a Ride
            </button>
            <a href={SITE.phoneHref} className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-colors">
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};