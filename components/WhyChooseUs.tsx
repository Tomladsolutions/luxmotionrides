import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

const reasons = [
  { title: 'Professional Chauffeurs', stat: '50+', description: 'Our team of experienced professionals ensures safe and reliable transportation.' },
  { title: 'On-Time Service', stat: '98%', description: 'We value your time with reliable pickups and dependable scheduling.' },
  { title: 'Clean Vehicles', stat: '100%', description: 'Every vehicle is meticulously maintained for your comfort and safety.' },
];

export const WhyChooseUs = () => {
  const { openBooking } = useBooking();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[#FA0000] uppercase text-xs font-semibold tracking-widest">Our Promise</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-4">Why Choose Lux Motion</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            We are committed to providing exceptional transportation services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#FA0000] transition-colors"
            >
              <div className="w-14 h-14 bg-[#FA0000]/10 rounded-2xl flex items-center justify-center text-[#FA0000] mb-6">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="text-4xl font-bold text-gray-200">{reason.stat}</span>
              <h3 className="text-xl font-semibold text-gray-900 mt-2 group-hover:text-[#FA0000] transition-colors">{reason.title}</h3>
              <p className="text-gray-500 mt-3">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12 bg-white rounded-2xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience Luxury?</h3>
          <button onClick={openBooking} className="bg-[#FA0000] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#FF3333] transition-colors">
            Book Your Ride
          </button>
        </div>
      </div>
    </section>
  );
};