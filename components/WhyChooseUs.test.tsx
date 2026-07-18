import { describe, it, expect } from 'vitest';
import { renderWithProviders, BookingProbe, screen, fireEvent } from '../test/test-utils';
import { WhyChooseUs } from './WhyChooseUs';

const setup = () =>
  renderWithProviders(
    <>
      <WhyChooseUs />
      <BookingProbe />
    </>,
  );

describe('WhyChooseUs', () => {
  it('renders the reasons with their stats', () => {
    setup();
    expect(screen.getByText('Professional Chauffeurs')).toBeInTheDocument();
    expect(screen.getByText('On-Time Service')).toBeInTheDocument();
    expect(screen.getByText('Clean Vehicles')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
  });

  it('opens the booking modal from "Book Your Ride"', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /book your ride/i }));
    expect(screen.getByTestId('booking-probe')).toHaveAttribute('data-open', 'true');
  });
});
