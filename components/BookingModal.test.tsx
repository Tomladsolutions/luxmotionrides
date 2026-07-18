import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderWithProviders, screen, fireEvent } from '../test/test-utils';
import { BookingModal } from './BookingModal';
import { useBooking } from '../context/BookingContext';

const Opener = ({ serviceType }: { serviceType?: 'airport' }) => {
  const { openBooking } = useBooking();
  return (
    <button onClick={() => openBooking(serviceType ? { serviceType } : undefined)}>open-booking</button>
  );
};

const setup = (props: { serviceType?: 'airport' } = {}) =>
  renderWithProviders(
    <>
      <Opener {...props} />
      <BookingModal />
    </>,
  );

describe('BookingModal', () => {
  it('renders nothing while closed', () => {
    setup();
    expect(screen.queryByText('Book Your Ride')).not.toBeInTheDocument();
  });

  it('renders step 1 service options once opened', () => {
    setup();
    fireEvent.click(screen.getByText('open-booking'));
    expect(screen.getByText('Book Your Ride')).toBeInTheDocument();
    expect(screen.getByText('What type of service do you need?')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Airport Transportation' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Private Ride' })).toBeInTheDocument();
  });

  it('advances to booking-type selection after picking a service', () => {
    setup();
    fireEvent.click(screen.getByText('open-booking'));
    fireEvent.click(screen.getByRole('heading', { name: 'Airport Transportation' }));

    expect(screen.getByRole('heading', { name: 'Book a Ride' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Get a Quote' })).toBeInTheDocument();
    // Airport service reveals the flight tracking helper.
    expect(screen.getByRole('button', { name: /track flight/i })).toBeInTheDocument();
  });

  it('lets the user go back to change the selected service', () => {
    setup();
    fireEvent.click(screen.getByText('open-booking'));
    fireEvent.click(screen.getByRole('heading', { name: 'City Ride' }));
    fireEvent.click(screen.getByRole('button', { name: /change service/i }));
    expect(screen.getByText('What type of service do you need?')).toBeInTheDocument();
  });

  it('closes when the close button is clicked', () => {
    setup();
    fireEvent.click(screen.getByText('open-booking'));
    const header = screen.getByText('Book Your Ride').closest('div')!;
    fireEvent.click(header.querySelector('button')!);
    expect(screen.queryByText('Book Your Ride')).not.toBeInTheDocument();
  });

  it('pre-selects the service when opened with a service type', () => {
    setup({ serviceType: 'airport' });
    fireEvent.click(screen.getByText('open-booking'));
    // Skips straight to booking-type selection for the chosen service.
    expect(screen.getByRole('heading', { name: 'Book a Ride' })).toBeInTheDocument();
  });
});
