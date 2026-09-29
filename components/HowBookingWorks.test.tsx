import { describe, it, expect } from 'vitest';
import { renderWithProviders, BookingProbe, screen, fireEvent } from '../test/test-utils';
import { HowBookingWorks } from './HowBookingWorks';

const setup = () =>
  renderWithProviders(
    <>
      <HowBookingWorks />
      <BookingProbe />
    </>,
  );

describe('HowBookingWorks', () => {
  it('renders the three steps', () => {
    setup();
    expect(screen.getByText('Choose Pickup')).toBeInTheDocument();
    expect(screen.getByText('Select Vehicle')).toBeInTheDocument();
    expect(screen.getByText('Book & Ride')).toBeInTheDocument();
  });

  it('opens the booking modal from the "Book Now" button', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /book now/i }));
    expect(screen.getByTestId('booking-probe')).toHaveAttribute('data-open', 'true');
  });
});
