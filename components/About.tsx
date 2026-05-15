import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

export const About = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const { openBooking } = useBooking();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#FA0000] uppercase text-xs font-semibold tracking-widest">Our Story</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-4">About Lux Motion Rides</h2>
            <p className="text-gray-500 mt-6 leading-relaxed">
              Lux Motion Rides was created to provide transportation that is reliable, professional, and comfortable 
              without feeling out of reach. We believe everyone deserves a premium transportation experience.
            </p>
            
            <div className="mt-8 space-y-4">
              {[
                'Professional &Experienced Chauffeurs',
                'On-Time Service Guarantee',
                'Clean &Well-Maintained Vehicles',
                'Simple &Easy Booking'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FA0000] flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <button onClick={openBooking} className="mt-8 bg-[#FA0000] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#FF3333] transition-colors">
              Book a Ride
            </button>
          </motion.div>

          <motion.div 
            ref={ref}
            style={{ y }}
            className="relative h-[500px] rounded-2xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2000&q=80" 
              alt="Luxury car interior" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};