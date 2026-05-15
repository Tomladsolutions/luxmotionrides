import React from 'react';
import { MapPin, Calendar, Car, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

const steps = [
  { number: '01', title: 'Choose Pickup', description: 'Enter your pickup location and destination.' },
  { number: '02', title: 'Select Vehicle', description: 'Choose from our selection of luxury vehicles.' },
  { number: '03', title: 'Book & Ride', description: 'Confirm your booking and enjoy your ride.' },
];

export const HowBookingWorks = () => {
  const { openBooking } = useBooking();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[#FA0000] uppercase text-xs font-semibold tracking-widest">Simple Process</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-4">How Booking Works</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Three simple steps to book your luxury ride.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center"
            >
              <span className="text-5xl font-bold text-gray-200">{step.number}</span>
              <h3 className="text-xl font-semibold text-gray-900 mt-4">{step.title}</h3>
              <p className="text-gray-500 mt-2">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button onClick={openBooking} className="inline-flex items-center gap-2 px-10 py-4 bg-[#FA0000] text-white rounded-full font-semibold hover:bg-[#FF3333] transition-colors">
            Book Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};