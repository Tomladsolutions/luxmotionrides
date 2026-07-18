import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderWithProviders, BookingProbe, screen, fireEvent, act } from '../test/test-utils';
import { AIChat } from './AIChat';

const setup = () => {
  renderWithProviders(
    <>
      <AIChat />
      <BookingProbe />
    </>,
  );
  // Launcher is the first (and only) button when closed.
  fireEvent.click(screen.getAllByRole('button')[0]);
};

describe('AIChat', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('opens the chat window with the welcome message and quick replies', () => {
    setup();
    expect(screen.getByText('Lux Motion AI')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ask me anything...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Our Fleet' })).toBeInTheDocument();
  });

  it('replies with fleet info based on message keywords', () => {
    setup();
    const input = screen.getByPlaceholderText('Ask me anything...');
    fireEvent.change(input, { target: { value: 'Show me your vehicles' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText(/Our Luxury Fleet/)).toBeInTheDocument();
  });

  it('replies with pricing info for a pricing question', () => {
    setup();
    const input = screen.getByPlaceholderText('Ask me anything...');
    fireEvent.change(input, { target: { value: 'How much does it cost?' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText(/Pricing Information/)).toBeInTheDocument();
  });

  it('opens the booking modal from the "Book a Ride" quick reply', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Book a Ride' }));
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByTestId('booking-probe')).toHaveAttribute('data-open', 'true');
  });

  it('opens a quote booking from the "Get Quote" quick reply', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Get Quote' }));
    act(() => vi.advanceTimersByTime(500));
    const probe = screen.getByTestId('booking-probe');
    expect(probe).toHaveAttribute('data-open', 'true');
    expect(probe).toHaveAttribute('data-booking-type', 'quote');
  });

  it('shows service info from the "Our Services" quick reply', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Our Services' }));
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByText(/Our Transportation Services/)).toBeInTheDocument();
  });
});
