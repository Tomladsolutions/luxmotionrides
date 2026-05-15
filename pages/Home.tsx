import React from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { FleetPreview } from '../components/FleetPreview';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { HowBookingWorks } from '../components/HowBookingWorks';
import { Reviews } from '../components/Reviews';
import { SEO } from '../components/SEO';
import { useBooking } from '../context/BookingContext';
import { motion } from 'framer-motion';

export const Home = () => {
  const { openBooking } = useBooking();

  return (
    <>
      <SEO
        title="Colorado Luxury Car Service | Airport Transfers & Mountain Transportation"
        description="Lux Motion Rides is Colorado premier luxury black car service. Professional airport transfers to DIA, corporate travel in Denver, mountain transportation to Vail and Aspen, and special event rides. Book your luxury ride today."
        keywords="Colorado luxury car service, Denver airport transfer, DIA black car, Denver limo service, mountain transportation Colorado, Vail car service, Aspen transportation"
        canonical="/"
      />
      <Hero />
      <Services />
      <FleetPreview />
      <WhyChooseUs />
      <HowBookingWorks />
      <Reviews />
      
      {/* Our Partners Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] z-0 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[#FA0000] uppercase tracking-widest text-xs font-semibold mb-4 block">Our Partners</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">Trusted Partnerships</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              At Lux Motion Rides, we believe exceptional service is built through strong partnerships. 
              We collaborate with organizations that share our commitment to professionalism, reliability, 
              and outstanding client experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">The360 Creatives</h3>
              <p className="text-gray-500 leading-relaxed">
                The360 Creatives is a creative and marketing agency dedicated to building impactful brand 
                experiences. Through our partnership, we continue to strengthen the Lux Motion Rides brand 
                presence and ensure our services reach the right audience.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Front Range Integrated Services</h3>
              <p className="text-gray-500 leading-relaxed">
                Front Range Integrated Services provides integrated logistics, operational support, and facility 
                management solutions. Our collaboration supports reliable service delivery and operational 
                excellence across various transportation engagements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 rounded-3xl py-16 px-8 border border-gray-200"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ready to Ride?</h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-10">
              Booking your ride is quick and simple. Let us take you where you need to go in style and comfort.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={openBooking} className="bg-[#FA0000] text-white px-10 py-4 rounded-full font-semibold text-sm hover:bg-[#FF3333] transition-colors">
                Book a Ride
              </button>
              <a href="tel:+17209351912" className="border-2 border-gray-900 text-gray-900 px-10 py-4 rounded-full font-semibold text-sm hover:bg-gray-900 hover:text-white transition-colors">
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
