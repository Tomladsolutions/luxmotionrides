import React from 'react';
import { Plane, Briefcase, CalendarCheck, Users, Mountain, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { useBooking } from '../context/BookingContext';

const services = [
  { title: 'Airport Transportation', description: 'Stress-free airport pickups and drop-offs with reliable scheduling.', icon: <Plane className="w-10 h-10" />, link: '/dia-transportation' },
  { title: 'Corporate Transportation', description: 'Professional transportation for meetings and business travel.', icon: <Briefcase className="w-10 h-10" />, link: '/corporate-transportation' },
  { title: 'Special Event Transportation', description: 'Arrive in style for weddings, concerts, and special occasions.', icon: <CalendarCheck className="w-10 h-10" />, link: '/special-event-transportation' },
  { title: 'Private Rides', description: 'Flexible transportation for city travel and errands.', icon: <Users className="w-10 h-10" />, link: '/private-rides' },
  { title: 'Mountain Transportation', description: 'Safe rides to Vail, Aspen, Keystone, and mountain destinations.', icon: <Mountain className="w-10 h-10" />, link: '/vail-transportation' },
  { title: 'Concert & Event Rides', description: 'Arrive to your favorite concerts and events in luxury.', icon: <Music className="w-10 h-10" />, link: '/coors-field' },
];

export const ServicesPage = () => {
  const { openBooking } = useBooking();

  return (
    <div className="bg-white pt-20">
      <SEO
        title="Luxury Transportation Services | Denver & Colorado"
        description="Explore Lux Motion Rides premium transportation services: airport transfers to DIA, corporate travel, mountain transportation to Vail and Aspen, special event rides, and private car service across Colorado."
        keywords="Colorado transportation services, Denver car service, airport transfer DIA, corporate travel Denver, mountain transportation Colorado, luxury rides Denver"
        canonical="/services"
      />
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=2000" alt="Services" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-[#FA0000] uppercase text-xs font-semibold tracking-widest">What We Offer</span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mt-4">Our Services</h1>
            <p className="text-gray-200 mt-4 max-w-xl mx-auto">Professional transportation services tailored to your needs.</p>
            <div className="w-24 h-1 bg-[#FA0000] mx-auto mt-6"></div>
          </motion.div>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 border border-gray-200 rounded-2xl hover:border-[#FA0000] transition-colors">
                <div className="text-[#FA0000] mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="text-black font-semibold mt-2">{service.description}</p>
                <Link to={service.link} className="text-[#FA0000] text-sm font-medium mt-4 block">Learn more →</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};