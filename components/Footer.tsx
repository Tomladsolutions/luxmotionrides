import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export const Footer = () => {
  const { openBooking } = useBooking();

  return (
    <footer className="bg-gray-100 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img 
                src="/lux logo.png" 
                alt="Lux Motion Rides" 
                className="h-16 md:h-20 lg:h-24 w-auto"
              />
            </Link>
            <p className="text-gray-500 text-sm mb-6">
              Premium black car service providing executive transportation, airport transfers, and special event Chauffeuring in Colorado.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://web.facebook.com/p/Lux-Motion-Rides-61568214826861/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#FA0000] hover:border-[#FA0000] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/luxmotionrides/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#FA0000] hover:border-[#FA0000] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://g.page/r/CU-hQpiEvC2uEBM/review" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#FA0000] hover:border-[#FA0000] transition-colors">
                <Star className="w-4 h-4" />
              </a>
            </div>
            <a 
              href="https://g.page/r/CU-hQpiEvC2uEBM/review" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FA0000] text-white text-sm font-semibold rounded-full hover:bg-[#FF3333] transition-colors mt-4"
            >
              <Star className="w-4 h-4" />
              Leave a Review
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-500 hover:text-[#FA0000] text-sm">Home</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-[#FA0000] text-sm">About Us</Link></li>
              <li><Link to="/fleet" className="text-gray-500 hover:text-[#FA0000] text-sm">Our Fleet</Link></li>
              <li><Link to="/services" className="text-gray-500 hover:text-[#FA0000] text-sm">Services</Link></li>
              <li><Link to="/faq" className="text-gray-500 hover:text-[#FA0000] text-sm">FAQ</Link></li>
              <li><button onClick={openBooking} className="text-gray-500 hover:text-[#FA0000] text-sm">Book a Ride</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/dia-transportation" className="text-gray-500 hover:text-[#FA0000] text-sm">Airport Transfers</Link></li>
              <li><Link to="/corporate-transportation" className="text-gray-500 hover:text-[#FA0000] text-sm">Corporate Travel</Link></li>
              <li><Link to="/special-event-transportation" className="text-gray-500 hover:text-[#FA0000] text-sm">Special Events</Link></li>
              <li><Link to="/private-rides" className="text-gray-500 hover:text-[#FA0000] text-sm">Private Rides</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-[#FA0000]" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Call Us 24/7</p>
                  <a href="tel:+17209351912" className="text-gray-700 font-medium hover:text-[#FA0000]">+1 720-935-1912</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-[#FA0000]" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Email Us</p>
                  <a href="mailto:booking@luxmotionrides.com" className="text-gray-700 font-medium hover:text-[#FA0000]">booking@luxmotionrides.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FA0000]" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Location</p>
                  <p className="text-gray-700">Denver, Colorado</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Lux Motion Rides. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-[#FA0000] text-xs">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-[#FA0000] text-xs">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};