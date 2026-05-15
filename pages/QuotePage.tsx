import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { useBooking } from '../context/BookingContext';
import { MapPin, Phone, Mail, Calculator, Clock, Car, Users } from 'lucide-react';

export const QuotePage = () => {
  const { openBooking } = useBooking();

  return (
    <div className="min-h-screen bg-white relative overflow-hidden pt-20">
      <SEO
        title="Get a Quote | Denver Luxury Car Service Pricing | Lux Motion Rides"
        description="Request a quote for Lux Motion Rides luxury transportation in Colorado. Get pricing for airport transfers to DIA, corporate travel, mountain transportation, and special events across Denver and beyond."
        keywords="Denver car service quote, Colorado luxury transportation pricing, airport transfer cost Denver, DIA car service rates, mountain transportation price Colorado"
        canonical="/quote"
      />
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" 
            alt="Get a Quote" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">Get a Quote</h1>
            <p className="text-xl text-white max-w-2xl mx-auto font-light">
              Request pricing information for your upcoming ride. We'll provide you with a detailed quote tailored to your needs.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-grid-white/[0.02] z-0 pointer-events-none mt-[50vh]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Quote Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute -inset-4 bg-burgundy/5 blur-3xl rounded-full opacity-50"></div>
            <h2 className="text-3xl font-semibold text-white mb-8 relative z-10">Request Pricing</h2>
            
            <div className="relative z-10 flex flex-col gap-6">
              <p className="text-gray-400 mb-4">
                Fill out the form below or click the button to get an instant quote for your ride.
              </p>
              
              <button 
                onClick={handleGetQuote}
                className="bg-white text-black px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 hover:bg-gray-100 flex items-center justify-center gap-3"
              >
                <Calculator className="w-5 h-5" />
                Get Instant Quote
              </button>

              <div className="border-t border-white/10 pt-6 mt-6">
                <h3 className="text-lg font-semibold text-black mb-4">What we need to know:</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-burgundy" />
                    Pickup and drop-off locations
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-burgundy" />
                    Date and time of travel
                  </li>
                  <li className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-burgundy" />
                    Number of passengers
                  </li>
                  <li className="flex items-center gap-3">
                    <Car className="w-4 h-4 text-burgundy" />
                    Vehicle preference (if any)
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Pricing Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center gap-12"
          >
            <div className="flex items-start gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-gold/50 group-hover:bg-burgundy/10 transition-all duration-300">
                <Phone className="w-8 h-8 text-burgundy" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">Phone Quote</h3>
                <p className="text-gray-400 mb-1">Speak with our team</p>
                <a href="tel:+17209351912" className="text-2xl font-light text-black hover:text-burgundy transition-colors">+1 (720) 935-1912</a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-gold/50 group-hover:bg-burgundy/10 transition-all duration-300">
                <Mail className="w-8 h-8 text-burgundy" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">Email Quote</h3>
                <p className="text-gray-400 mb-1">Request via email</p>
                <a href="mailto:booking@luxmotionrides.com" className="text-2xl font-light text-black hover:text-burgundy transition-colors">booking@luxmotionrides.com</a>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute -inset-4 bg-burgundy/5 blur-3xl rounded-full opacity-50"></div>
              <h3 className="text-lg font-semibold text-black mb-4 relative z-10">Pricing Information</h3>
              <div className="space-y-3 text-gray-400 relative z-10">
                <p>All quotes include:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Professional chauffeur service</li>
                  <li>Luxury vehicle of your choice</li>
                  <li>Complimentary water and amenities</li>
                  <li>Flight tracking for airport transfers</li>
                  <li>All taxes and fees</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Quotes are typically provided within 1-2 hours during business hours.
                For urgent requests, please call us directly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
