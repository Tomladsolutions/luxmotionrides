import React from 'react';
import { Plane, Briefcase, CalendarCheck, Users, Mountain, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Airport Transportation',
    description: 'Stress free airport pickups and drop offs with reliable scheduling and comfortable vehicles.',
    icon: <Plane className="w-8 h-8 text-[#FA0000]" />,
    link: '/dia-transportation',
    image: '/airport.jpg'
  },
  {
    title: 'Corporate Transportation',
    description: 'Professional transportation for meetings, business travel, and executive transportation.',
    icon: <Briefcase className="w-8 h-8 text-[#FA0000]" />,
    link: '/corporate-transportation',
    image: '/corporate.jpg'
  },
  {
    title: 'Special Event Transportation',
    description: 'Arrive in style for weddings, concerts, and special occasions.',
    icon: <CalendarCheck className="w-8 h-8 text-[#FA0000]" />,
    link: '/special-event-transportation',
    image: 'https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    title: 'Private Rides',
    description: 'Flexible transportation for city travel, errands, or hourly service.',
    icon: <Users className="w-8 h-8 text-[#FA0000]" />,
    link: '/private-rides',
    image: '/special.jpg'
  },
  {
    title: 'Mountain Transportation',
    description: 'Safe and reliable rides to Vail, Aspen, Keystone, and other mountain destinations.',
    icon: <Mountain className="w-8 h-8 text-[#FA0000]" />,
    link: '/vail-transportation',
    image: '/mountain.jpg'
  },
  {
    title: 'Concert Rides',
    description: 'Arrive to your favorite concerts and events in luxury.',
    icon: <Music className="w-8 h-8 text-[#FA0000]" />,
    link: '/coors-field',
    image: 'https://plus.unsplash.com/premium_photo-1661759013744-4754d402459d?w=900&auto=format&fit=crop&q=60'
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#FA0000] uppercase text-xs font-semibold tracking-widest">Our Services</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-4">Reliable Transportation Services</h2>
          <p className="text-black mt-4 max-w-2xl mx-auto">
            Reliable transportation for airport travel, business trips, special events, and private rides.
          </p>
          <div className="w-24 h-1 bg-[#FA0000] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl overflow-hidden border border-gray-200 hover:border-[#FA0000] transition-colors"
            >
              <Link to={service.link} className="block">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                    {service.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#FA0000] transition-colors">{service.title}</h3>
                  <p className="text-black font-semibold text-sm mt-2">{service.description}</p>
                  <span className="text-[#FA0000] text-sm font-medium mt-4 block">Learn more →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};