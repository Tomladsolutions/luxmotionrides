import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BookingProvider, useBooking } from '../context/BookingContext';

/**
 * Renders the current booking context state as data-* attributes so tests can
 * assert that a component opened the booking modal / seeded booking data.
 */
export const BookingProbe = () => {
  const { isOpen, bookingData } = useBooking();
  return (
    <div
      data-testid="booking-probe"
      data-open={String(isOpen)}
      data-booking-type={bookingData.bookingType}
      data-service-type={bookingData.serviceType ?? ''}
    />
  );
};

interface Options extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
}

/**
 * Renders a component inside the providers the app relies on:
 * router, Helmet (SEO), and the booking context.
 */
export const renderWithProviders = (ui: React.ReactElement, options: Options = {}) => {
  const { route = '/', ...rest } = options;
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        <BookingProvider>{children}</BookingProvider>
      </MemoryRouter>
    </HelmetProvider>
  );
  return render(ui, { wrapper: Wrapper, ...rest });
};

export * from '@testing-library/react';
