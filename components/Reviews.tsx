import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGoogleReviews } from '../hooks/useGoogleReviews';
import { useBooking } from '../context/BookingContext';

const fallbackReviews = [
  { quote: "Excellent service! The driver was punctual, professional, and the vehicle was immaculate.", name: "Sarah M.", designation: "⭐⭐⭐⭐⭐" },
  { quote: "Lux Motion Rides made our group trip so much easier. Great communication and fantastic drivers.", name: "Michael R.", designation: "⭐⭐⭐⭐⭐" },
  { quote: "Best luxury car service in Denver. Professional, reliable, and the prices are very competitive.", name: "Jennifer L.", designation: "⭐⭐⭐⭐⭐" },
];

export const Reviews = () => {
  const { openBooking } = useBooking();
  const reviews = fallbackReviews;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[#FA0000] uppercase text-xs font-semibold tracking-widest">Client Testimonials</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-4">What Our Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FA0000] text-[#FA0000]" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"{review.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FA0000] flex items-center justify-center text-white font-semibold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.designation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://g.page/r/CU-hQpiEvC2uEBM/review" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FA0000] text-white font-semibold rounded-full hover:bg-[#FF3333] transition-colors"
          >
            <Star className="w-5 h-5" />
            Leave a Review on Google
          </a>
        </div>
      </div>
    </section>
  );
};