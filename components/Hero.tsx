import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { openBooking } = useBooking();

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/lux.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/85"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-[#FA0000] animate-pulse"></span>
            <span className="text-white text-xs font-medium tracking-widest uppercase">Premium Transportation</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
            Luxury Rides.<br />
            <span className="text-[#FA0000]">Professional Service.</span>
          </h1>
          <p className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto">
            Reliable car service for airport transfers, corporate travel, and special occasions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button onClick={openBooking} className="bg-[#FA0000] text-white px-10 py-4 rounded-full font-semibold text-sm hover:bg-[#FF3333] transition-colors">
              Book a Ride
            </button>
            <button onClick={() => openBooking({ bookingType: 'quote' })} className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold text-sm hover:bg-white hover:text-gray-900 transition-colors">
              Get a Quote
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8 border-t border-white/20">
            {[
              { title: '50+ Professional Chauffeurs' },
              { title: 'On Time Service' },
              { title: 'Clean Vehicles' },
              { title: 'Simple Booking' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-sm font-semibold text-white">{item.title}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};