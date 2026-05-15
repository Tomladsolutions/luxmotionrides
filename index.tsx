import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { FleetPage } from './pages/FleetPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { DIAPage } from './pages/DIAPage';
import { CorporatePage } from './pages/CorporatePage';
import { SpecialEventPage } from './pages/SpecialEventPage';
import { PrivateRidesPage } from './pages/PrivateRidesPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { MountainPage } from './pages/MountainPage';
import { CollegePage } from './pages/CollegePage';
import { ConcertPage } from './pages/ConcertPage';
import { FAQPage } from './pages/FAQPage';
import { QuotePage } from './pages/QuotePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="fleet" element={<FleetPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="dia-transportation" element={<DIAPage />} />
          <Route path="corporate-transportation" element={<CorporatePage />} />
          <Route path="special-event-transportation" element={<SpecialEventPage />} />
          <Route path="private-rides" element={<PrivateRidesPage />} />
          <Route path="service-areas" element={<ServiceAreasPage />} />
          <Route path="vail-transportation" element={<MountainPage />} />
          <Route path="csu-transportation" element={<CollegePage />} />
          <Route path="coors-field" element={<ConcertPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="quote" element={<QuotePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

