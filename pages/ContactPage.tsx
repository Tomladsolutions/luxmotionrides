import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { SEO } from '../components/SEO';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const formPayload = new FormData();
      formPayload.append('firstName', formData.firstName);
      formPayload.append('lastName', formData.lastName);
      formPayload.append('email', formData.email);
      formPayload.append('message', formData.message);

      const response = await fetch('/submit-contact.php', {
        method: 'POST',
        body: formPayload
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        alert('Failed to send message. Please email us directly at booking@luxmotionrides.com.');
      }
    } catch {
      alert('Network error. Please email us directly at booking@luxmotionrides.com.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white">
      <SEO
        title="Contact Lux Motion Rides | Denver Luxury Car Service"
        description="Contact Lux Motion Rides for luxury transportation in Colorado. Call +1 720-935-1912, email booking@luxmotionrides.com, or book online for airport transfers, corporate travel, and mountain rides."
        keywords="contact luxury car service Denver, Denver black car phone number, book limo Denver, Colorado transportation booking"
        canonical="/contact"
      />
      {/* Hero */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=2000" 
            alt="Contact" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6">Contact Us</h1>
            <div className="w-24 h-1 bg-[#FA0000] mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </div>

      {/* Contact Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <Phone className="w-8 h-8 text-[#FA0000] mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
              <a href="tel:+17209351912" className="text-gray-600 hover:text-[#FA0000]">+1 (720) 935-1912</a>
            </div>
            <div className="text-center">
              <Mail className="w-8 h-8 text-[#FA0000] mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <a href="mailto:booking@luxmotionrides.com" className="text-gray-600 hover:text-[#FA0000]">booking@luxmotionrides.com</a>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 text-[#FA0000] mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">Denver, Colorado</p>
            </div>
          </div>

          {/* Contact Form */}
          {submitted ? (
            <div className="max-w-2xl mx-auto text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
              <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange('firstName')} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FA0000]" />
                <input type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange('lastName')} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FA0000]" />
              </div>
              <input type="email" placeholder="Email" value={formData.email} onChange={handleChange('email')} required className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-[#FA0000]" />
              <textarea placeholder="Message" rows={5} value={formData.message} onChange={handleChange('message')} required className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-[#FA0000]"></textarea>
              <button type="submit" disabled={sending} className="w-full bg-[#FA0000] text-white py-4 rounded-lg font-semibold hover:bg-[#FF3333] transition-colors disabled:opacity-50">
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};