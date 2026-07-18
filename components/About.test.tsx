import { describe, it, expect } from 'vitest';
import { renderWithProviders, BookingProbe, screen, fireEvent } from '../test/test-utils';
import { About } from './About';

const setup = () =>
  renderWithProviders(
    <>
      <About />
      <BookingProbe />
    </>,
  );

describe('About', () => {
  it('renders the story heading and feature list', () => {
    setup();
    expect(screen.getByText('About Lux Motion Rides')).toBeInTheDocument();
    expect(screen.getByText('On-Time Service Guarantee')).toBeInTheDocument();
  });

  it('opens the booking modal from "Book a Ride"', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /book a ride/i }));
    expect(screen.getByTestId('booking-probe')).toHaveAttribute('data-open', 'true');
  });
});
