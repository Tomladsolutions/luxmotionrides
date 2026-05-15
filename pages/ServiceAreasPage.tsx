import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useBooking } from '../context/BookingContext';

const locations = [
  {
    name: 'Denver',
    description: 'Airport transportation, business travel, and special events throughout the metro area.',
    areas: ['Downtown', 'Capitol Hill', 'Cherry Creek', 'LoDo', 'Highlands']
  },
  {
    name: 'Boulder',
    description: 'Professional transportation for students, professionals, and visitors.',
    areas: ['University Hill', 'Pearl Street', 'Boulder Canyon', 'Flatirons']
  },
  {
    name: 'Aurora',
    description: 'Dependable car service for residents and businesses.',
    areas: ['Aurora Town Center', ' Fitzsimons', 'Gateway Park', 'Southlands']
  },
  {
    name: 'Lakewood',
    description: 'Luxury rides for meetings, events, and personal travel.',
    areas: ['Belmar', 'Lakewood Center', 'Red Rocks', 'Green Mountain']
  },
  {
    name: 'Littleton',
    description: 'Premium transportation with on-time guarantees.',
    areas: ['Southwest Plaza', 'Columbine', 'Ken Caryl', 'Chatfield']
  },
  {
    name: 'Centennial',
    description: 'Executive transportation for corporate and residential areas.',
    areas: ['Park Meadows', 'Dry Creek', 'Arapahoe', 'Willow Creek']
  },
  {
    name: 'Colorado Springs',
    description: 'Long-distance luxury transfers with professional chauffeurs.',
    areas: ['Downtown', 'Air Force Academy', 'Fort Carson', 'Manitou Springs']
  }
];

export const ServiceAreasPage = () => {
  const { openBooking } = useBooking();
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <SEO
        title="Service Areas | Denver, Boulder, Colorado Springs & Mountain Resorts"
        description="Lux Motion Rides serves the entire Colorado region: Denver Metro, Boulder, Colorado Springs, Vail, Aspen, Keystone, Breckenridge, and more. Professional luxury transportation wherever you need to go in Colorado."
        keywords="Denver car service area, Boulder transportation, Colorado Springs luxury rides, Vail car service, Aspen transportation, Colorado luxury travel"
        canonical="/service-areas"
      />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#FA0000] uppercase tracking-[0.2em] font-semibold text-xs mb-4 block">Where We Operate</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Service Areas</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            We provide professional luxury transportation throughout the Colorado region, including Denver Metro, Boulder, Colorado Springs, and surrounding areas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#FA0000]/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-[#FA0000]/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#FA0000]" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#FA0000] transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{location.name}</h3>
              <p className="text-gray-500 text-sm mb-4">
                {location.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {location.areas.map((area, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gray-50 rounded-3xl p-10 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Don't see your location?</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8">
            We often accommodate requests outside our primary service areas. Contact us to check availability for your specific route.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={openBooking}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FA0000] text-white rounded-full font-semibold hover:bg-[#FF3333] transition-colors"
            >
              Book a Ride
            </button>
            <a 
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-[#FA0000] hover:text-[#FA0000] transition-colors"
            >
              <Phone className="w-4 h-4" />
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};