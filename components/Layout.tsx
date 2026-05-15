import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BookingProvider } from '../context/BookingContext';
import { BookingModal } from './BookingModal';
import { ScrollToTop } from './ScrollToTop';
import { AIChat } from './AIChat';

export const Layout = () => {
  return (
    <HelmetProvider>
      <BookingProvider>
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#FA0000] selection:text-white flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
          <BookingModal />
          <ScrollToTop />
          <AIChat />
        </div>
      </BookingProvider>
    </HelmetProvider>
  );
};
