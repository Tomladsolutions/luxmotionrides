import { describe, it, expect } from 'vitest';
import { renderWithProviders, BookingProbe, screen, fireEvent } from '../test/test-utils';
import { Fleet } from './Fleet';

const setup = () =>
  renderWithProviders(
    <>
      <Fleet />
      <BookingProbe />
    </>,
  );

describe('Fleet', () => {
  it('renders all four vehicles', () => {
    setup();
    expect(screen.getByText('GMC Yukon XL Denali')).toBeInTheDocument();
    expect(screen.getByText('Chevrolet Suburban XL')).toBeInTheDocument();
    expect(screen.getByText('Ford Transit Passenger Van')).toBeInTheDocument();
    expect(screen.getByText('Mercedes-Benz Sprinter Van')).toBeInTheDocument();
  });

  it('renders a booking button per vehicle', () => {
    setup();
    expect(screen.getAllByRole('button', { name: /book this vehicle/i })).toHaveLength(4);
  });

  it('opens the booking modal when a vehicle is booked', () => {
    setup();
    fireEvent.click(screen.getAllByRole('button', { name: /book this vehicle/i })[0]);
    expect(screen.getByTestId('booking-probe')).toHaveAttribute('data-open', 'true');
  });
});
