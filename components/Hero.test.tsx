import { describe, it, expect } from 'vitest';
import { renderWithProviders, BookingProbe, screen, fireEvent } from '../test/test-utils';
import { Hero } from './Hero';

const setup = () =>
  renderWithProviders(
    <>
      <Hero />
      <BookingProbe />
    </>,
  );

describe('Hero', () => {
  it('renders the headline and CTAs', () => {
    setup();
    expect(screen.getByText(/Luxury Rides\./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /book a ride/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get a quote/i })).toBeInTheDocument();
  });

  it('opens a standard booking from "Book a Ride"', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /book a ride/i }));
    const probe = screen.getByTestId('booking-probe');
    expect(probe).toHaveAttribute('data-open', 'true');
    expect(probe).toHaveAttribute('data-booking-type', 'book');
  });

  it('opens a quote booking from "Get a Quote"', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /get a quote/i }));
    expect(screen.getByTestId('booking-probe')).toHaveAttribute('data-booking-type', 'quote');
  });
});
