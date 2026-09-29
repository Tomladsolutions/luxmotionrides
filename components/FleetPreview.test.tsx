import { describe, it, expect } from 'vitest';
import { renderWithProviders, BookingProbe, screen, fireEvent } from '../test/test-utils';
import { FleetPreview } from './FleetPreview';

const setup = () =>
  renderWithProviders(
    <>
      <FleetPreview />
      <BookingProbe />
    </>,
  );

describe('FleetPreview', () => {
  it('renders three preview vehicles', () => {
    setup();
    expect(screen.getByText('GMC Yukon XL Denali')).toBeInTheDocument();
    expect(screen.getByText('Mercedes-Benz Sprinter')).toBeInTheDocument();
    expect(screen.getByText('Chevrolet Suburban XL')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /book this ride/i })).toHaveLength(3);
  });

  it('links to the full fleet page', () => {
    setup();
    expect(screen.getByRole('link', { name: /view full fleet/i })).toHaveAttribute('href', '/fleet');
  });

  it('opens the booking modal when booking a preview vehicle', () => {
    setup();
    fireEvent.click(screen.getAllByRole('button', { name: /book this ride/i })[0]);
    expect(screen.getByTestId('booking-probe')).toHaveAttribute('data-open', 'true');
  });
});
