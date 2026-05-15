import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

const fleetPreview = [
  {
    name: 'GMC Yukon XL Denali',
    model: 'Luxury SUV',
    image: '/gmc2.png',
    passengers: '1-6',
    luggage: '6',
    description: 'Luxury SUV with spacious seating for up to 6 passengers.'
  },
  {
    name: 'Mercedes-Benz Sprinter',
    model: '14 Passenger Van',
    image: '/Used-2020-Mercedes-Benz-Sprinter-2500-Passenger-Van-Passenger-144-WB-1672404826.jpg',
    passengers: '1-14',
    luggage: '14+',
    description: 'Executive group travel for up to 14 passengers.'
  },
  {
    name: 'Chevrolet Suburban XL',
    model: 'Premium SUV',
    image: '/Suburban XL Premium SUV.jpg',
    passengers: '1-7',
    luggage: '7',
    description: 'Premium SUV for families or business groups.'
  }
];

export const FleetPreview = () => {
  const { openBooking } = useBooking();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[#FA0000] uppercase text-xs font-semibold tracking-widest">Our Vehicles</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-4">Our Fleet</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Travel comfortably in our luxury vehicles designed for safety, reliability, and style.
          </p>
          <div className="w-24 h-1 bg-[#FA0000] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fleetPreview.map((vehicle, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group rounded-2xl overflow-hidden border border-gray-200 hover:border-[#FA0000] transition-colors"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
                <p className="text-[#FA0000] text-xs font-medium mt-1">{vehicle.model}</p>
                
                <div className="flex items-center gap-2 text-gray-500 mt-3">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{vehicle.passengers} Passengers</span>
                </div>
                <p className="text-gray-500 text-sm mt-3">{vehicle.description}</p>
                
                <button onClick={openBooking} className="w-full border border-gray-300 text-gray-700 hover:bg-[#FA0000] hover:text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mt-4">
                  Book This Ride 
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/fleet" className="inline-flex items-center gap-2 px-8 py-4 bg-[#FA0000] text-white rounded-full font-semibold hover:bg-[#FF3333] transition-colors">
            View Full Fleet
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};