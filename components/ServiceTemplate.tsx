import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { CheckCircle } from 'lucide-react';

interface ServiceTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  serviceType?: 'airport' | 'city' | 'intercity' | 'corporate' | 'special' | 'private';
}

export const ServiceTemplate: React.FC<ServiceTemplateProps> = ({ title, subtitle, description, image, features, serviceType }) => {
  const { openBooking } = useBooking();

  const handleBookClick = () => {
    if (serviceType) {
      openBooking({ serviceType });
    } else {
      openBooking();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] z-0 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <span className="text-burgundy uppercase tracking-[0.2em] font-semibold text-xs mb-4 block">{subtitle}</span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">{title}</h1>
            <p className="text-black text-lg font-semibold mb-10 leading-relaxed">{description}</p>
            
            <div className="space-y-4 mb-12">
              {features.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.4 }}
                  className="flex items-center gap-4 text-black"
                >
                  <div className="w-6 h-6 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-burgundy" />
                  </div>
                  <span className="font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
            
            <button 
              onClick={handleBookClick} 
              className="bg-burgundy text-white px-10 py-4 rounded-full font-semibold hover:bg-burgundy-light transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Book This Service
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-lg border border-gray-200"
          >
            <img src={image} alt={title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
