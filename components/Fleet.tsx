import React from 'react';
import { Users, Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

const fleet = [
  {
    name: 'GMC Yukon XL Denali',
    model: 'Luxury SUV - Black',
    image: '/gmc2.png',
    passengers: '1-6',
    luggage: '6',
    description: 'Luxury SUV with spacious seating for up to 6 passengers and ample luggage space.'
  },
  {
    name: 'Chevrolet Suburban XL',
    model: 'Premium SUV - Black',
    image: '/Suburban XL Premium SUV.jpg',
    passengers: '1-7',
    luggage: '7',
    description: 'Premium SUV for families or business groups with generous seating and cargo room.'
  },
  {
    name: 'Ford Transit Passenger Van',
    model: '10 Seater Van - Black',
    image: '/New-Ford-Transit-Exc.-Van.jpg',
    passengers: '1-10',
    luggage: '10-12',
    description: 'Comfortable group transportation for up to 10 passengers with dedicated luggage space.'
  },
  {
    name: 'Mercedes-Benz Sprinter Van',
    model: '14 Seater Van - Black',
    image: '/Used-2020-Mercedes-Benz-Sprinter-2500-Passenger-Van-Passenger-144-WB-1672404826.jpg',
    passengers: '1-14',
    luggage: '14+',
    description: 'Executive group travel for up to 14 passengers with luxury seating and high-capacity luggage storage.'
  }
];

export const Fleet = () => {
  const { openBooking } = useBooking();

  return (
    <section id="fleet" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#FA0000] uppercase tracking-[0.2em] font-semibold text-xs mb-4 block">Our Vehicles</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Luxury Fleet</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fleet.map((vehicle, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{vehicle.name}</h3>
                <p className="text-[#FA0000] text-sm font-medium mb-3">{vehicle.model}</p>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {vehicle.description}
                </p>

                <div className="flex items-center gap-6 mb-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">{vehicle.passengers} Passengers</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm font-medium">{vehicle.luggage} Bags</span>
                  </div>
                </div>

                <button onClick={openBooking} className="w-full bg-[#FA0000] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#FF3333] transition-colors">
                  Book This Vehicle 
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};