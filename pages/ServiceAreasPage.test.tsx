import { describe, it, expect } from 'vitest';
import { renderWithProviders, BookingProbe, screen, fireEvent } from '../test/test-utils';
import { ServiceAreasPage } from './ServiceAreasPage';

const setup = () =>
  renderWithProviders(
    <>
      <ServiceAreasPage />
      <BookingProbe />
    </>,
  );

describe('ServiceAreasPage', () => {
  it('renders every service location', () => {
    setup();
    ['Denver', 'Boulder', 'Aurora', 'Lakewood', 'Littleton', 'Centennial', 'Colorado Springs'].forEach(
      (name) => expect(screen.getByRole('heading', { name })).toBeInTheDocument(),
    );
  });

  it('opens the booking modal from "Book a Ride"', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /book a ride/i }));
    expect(screen.getByTestId('booking-probe')).toHaveAttribute('data-open', 'true');
  });
});
