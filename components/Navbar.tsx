import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const { openBooking } = useBooking();
  
  // Only be transparent on home page with hero video
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', 
      href: '/services',
      dropdown: [
        { name: 'Airport Transportation', href: '/dia-transportation' },
        { name: 'Corporate Transportation', href: '/corporate-transportation' },
        { name: 'Special Event Transportation', href: '/special-event-transportation' },
        { name: 'Private Rides', href: '/private-rides' },
        { name: 'Mountain Transportation', href: '/vail-transportation' },
        { name: 'Concert & Event Rides', href: '/coors-field' },
      ]
    },
    { name: 'Fleet', href: '/fleet' },
    { name: 'Service Areas', href: '/service-areas' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
  ];

  const showTransparent = isHomePage && !isScrolled;
  
  const textColor = showTransparent ? 'text-white' : 'text-gray-700';
  const hoverColor = showTransparent ? 'hover:text-white' : 'hover:text-[#FA0000]';
  const bgClass = showTransparent ? 'bg-transparent' : 'bg-white';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${bgClass} ${isScrolled ? 'shadow-sm py-2' : 'py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 z-50 relative">
          <img 
            src="/lux logo.png" 
            alt="Lux Motion Rides" 
            className="h-16 md:h-20 lg:h-24 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center justify-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href || link.dropdown?.some(d => location.pathname === d.href);
            
            if (link.dropdown) {
              return (
                <div 
                  key={link.name} 
                  className="relative group"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <Link 
                    to={link.href} 
                    className={`flex items-center gap-1 text-xs uppercase tracking-widest font-medium ${textColor} ${hoverColor} transition-colors`}
                  >
                    {link.name}
                    <ChevronDown className={`w-3 h-3 ${textColor}`} />
                  </Link>
                  
                  <AnimatePresence>
                    {servicesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden"
                      >
                        {link.dropdown.map((dropLink) => (
                          <Link
                            key={dropLink.name}
                            to={dropLink.href}
                            className={`block px-4 py-2.5 text-xs transition-colors ${location.pathname === dropLink.href ? 'bg-[#FA0000] text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-[#FA0000]'}`}
                          >
                            {dropLink.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`text-xs uppercase tracking-widest font-medium ${textColor} ${hoverColor} transition-colors ${isActive ? 'text-[#FA0000]' : ''}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden xl:flex items-center gap-3">
          <Link to="/quote" className={`font-medium text-xs uppercase tracking-widest transition-colors ${textColor} ${hoverColor}`}>
            Get Quote
          </Link>
          <button onClick={openBooking} className="bg-[#FA0000] text-white px-5 py-2 rounded-full font-semibold text-xs uppercase tracking-widest hover:bg-[#FF3333] transition-colors">
            Book Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className={`xl:hidden z-50 relative p-2 ${isHomePage && !isScrolled ? 'text-white' : 'text-gray-700'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="xl:hidden absolute top-0 left-0 w-full h-screen bg-white pt-20 px-6 flex flex-col gap-6 overflow-y-auto pb-24"
          >
            {navLinks.map((link, i) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={link.name}
              >
                {link.dropdown ? (
                  <div className="flex flex-col gap-3">
                    <Link 
                      to={link.href} 
                      className={`text-lg font-medium ${location.pathname === link.href ? 'text-[#FA0000]' : 'text-gray-700'}`}
                    >
                      {link.name}
                    </Link>
                    <div className="pl-4 flex flex-col gap-2 border-l border-gray-200 ml-1">
                      {link.dropdown.map((dropLink) => (
                        <Link
                          key={dropLink.name}
                          to={dropLink.href}
                          className={`text-sm ${location.pathname === dropLink.href ? 'text-[#FA0000] font-medium' : 'text-gray-500'}`}
                        >
                          {dropLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    to={link.href} 
                    className={`text-lg font-medium block ${location.pathname === link.href ? 'text-[#FA0000]' : 'text-gray-700'}`}
                  >
                    {link.name}
                  </Link>
                )}
              </motion.div>
            ))}
            <button onClick={openBooking} className="bg-[#FA0000] text-white py-3 rounded-full font-semibold text-sm mt-4">
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};