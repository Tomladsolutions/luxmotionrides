import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SEO } from '../components/SEO';

const faqs = [
  {
    question: "How do I book a ride?",
    answer: "You can book a ride by clicking the \"Book a Ride\" button on our website. Fill out the simple form with your travel details, review your information, and submit. Our team will confirm your ride promptly."
  },
  {
    question: "Can I request a quote before booking?",
    answer: "Yes. You can request a quote through the same booking form. Select \"Get a Quote\" and provide your trip details. We'll get back to you with pricing quickly."
  },
  {
    question: "What areas do you serve?",
    answer: "We provide professional transportation throughout Colorado, including Denver, Boulder, Aurora, Lakewood, Littleton, Centennial, and Colorado Springs."
  },
  {
    question: "What types of rides do you offer?",
    answer: "We offer airport transportation, corporate travel, special event rides, mountain transportation, concert rides, and private hourly or city travel."
  },
  {
    question: "Are your vehicles clean and well maintained?",
    answer: "Absolutely. All our vehicles are regularly serviced and cleaned to ensure a comfortable and safe ride every time."
  },
  {
    question: "Can I make changes to my booking?",
    answer: "Yes. If you need to update your ride details, please contact our team as soon as possible so we can accommodate your changes."
  },
  {
    question: "Do you provide on-demand rides or only pre-booked trips?",
    answer: "We primarily operate with pre-booked rides to ensure a premium, reliable experience. For urgent trips, you can call us directly, and we'll do our best to accommodate."
  },
  {
    question: "How do I pay for my ride?",
    answer: "Payment options are provided during the booking process and can include credit/debit cards or pre-approved corporate billing."
  },
  {
    question: "Can I book rides for multiple passengers or groups?",
    answer: "Yes. Our vehicles can accommodate groups depending on the vehicle type. You can indicate the number of passengers when booking."
  }
];

export const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden pt-20">
      <SEO
        title="FAQ | Denver Luxury Car Service | Lux Motion Rides"
        description="Frequently asked questions about Lux Motion Rides luxury car service in Colorado. Learn about booking, pricing, service areas, fleet, cancellations, and more for Denver, Boulder, and mountain transportation."
        keywords="Denver car service FAQ, Colorado luxury transportation questions, airport transfer Denver FAQ, booking luxury ride Denver"
        canonical="/faq"
      />
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/gmc.png" 
            alt="Luxury car" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#FA0000] uppercase tracking-[0.2em] font-semibold text-xs mb-4 block">Help Center</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-200 text-lg">Everything you need to know about Lux Motion Rides.</p>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-grid-white/[0.02] z-0 pointer-events-none mt-[50vh]"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 py-24">

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-black">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-burgundy transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-600 font-light leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
