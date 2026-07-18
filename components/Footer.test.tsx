import { describe, it, expect } from 'vitest';
import { renderWithProviders, BookingProbe, screen, fireEvent } from '../test/test-utils';
import { Footer } from './Footer';

const setup = () =>
  renderWithProviders(
    <>
      <Footer />
      <BookingProbe />
    </>,
  );

describe('Footer', () => {
  it('renders contact details', () => {
    setup();
    expect(screen.getByRole('link', { name: '+1 720-935-1912' })).toHaveAttribute(
      'href',
      'tel:+17209351912',
    );
    expect(screen.getByRole('link', { name: 'booking@luxmotionrides.com' })).toHaveAttribute(
      'href',
      'mailto:booking@luxmotionrides.com',
    );
  });

  it('renders the current year in the copyright line', () => {
    setup();
    expect(
      screen.getByText(new RegExp(`${new Date().getFullYear()} Lux Motion Rides`)),
    ).toBeInTheDocument();
  });

  it('opens the booking modal from the "Book a Ride" link', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /book a ride/i }));
    expect(screen.getByTestId('booking-probe')).toHaveAttribute('data-open', 'true');
  });
});
