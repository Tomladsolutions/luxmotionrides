import React from 'react';
import { Fleet } from '../components/Fleet';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';

export const FleetPage = () => {
  return (
    <div className="bg-white">
      <SEO
        title="Luxury Fleet | Denver Black Car Service | Lux Motion Rides"
        description="Browse Lux Motion Rides premium fleet of luxury black SUVs and vans. GMC Yukon Denali, Chevrolet Suburban, Ford Transit, and Mercedes Sprinter available for Denver airport transfers and Colorado travel."
        keywords="luxury fleet Denver, black SUV Denver, GMC Yukon Denali rental, Mercedes Sprinter Colorado, Denver airport limo, luxury van rental Denver"
        canonical="/fleet"
      />
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury fleet" 
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
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6">Our Fleet</h1>
            <div className="w-24 h-1 bg-[#FA0000] mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </div>

      <Fleet />
    </div>
  );
};