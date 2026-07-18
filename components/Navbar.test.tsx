import { describe, it, expect } from 'vitest';
import { renderWithProviders, BookingProbe, screen, fireEvent } from '../test/test-utils';
import { Navbar } from './Navbar';

const setup = (route = '/') =>
  renderWithProviders(
    <>
      <Navbar />
      <BookingProbe />
    </>,
    { route },
  );

describe('Navbar', () => {
  it('renders the primary navigation links', () => {
    setup();
    expect(screen.getAllByRole('link', { name: 'Home' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Fleet' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'FAQ' }).length).toBeGreaterThan(0);
  });

  it('opens the booking modal when "Book Now" is clicked', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /book now/i }));
    expect(screen.getByTestId('booking-probe')).toHaveAttribute('data-open', 'true');
  });

  it('toggles the mobile menu open and closed', () => {
    setup();
    // Only the desktop "Book Now" button exists before the menu is opened.
    expect(screen.getAllByRole('button', { name: /book now/i })).toHaveLength(1);
    // The mobile toggle is the button with no accessible text (icon only).
    const toggle = screen.getAllByRole('button').find((b) => b.textContent?.trim() === '')!;
    fireEvent.click(toggle);
    // Book Now now appears in both desktop and mobile menus.
    expect(screen.getAllByRole('button', { name: /book now/i })).toHaveLength(2);
  });

  it('exposes the services dropdown links on hover', () => {
    const { container } = setup();
    const servicesGroup = container.querySelector('.group')!;
    fireEvent.mouseEnter(servicesGroup);
    expect(screen.getByRole('link', { name: 'Airport Transportation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Mountain Transportation' })).toBeInTheDocument();
  });
});
