import React from 'react';
import { About } from '../components/About';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

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
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/gmc.png" 
            alt="Luxury black car" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6">About Lux Motion Rides</h1>
            <div className="w-24 h-1 bg-[#FA0000] mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </div>

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
            <a href="tel:+17209351912" className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-colors">
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};