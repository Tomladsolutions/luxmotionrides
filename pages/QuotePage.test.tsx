import { describe, it, expect } from 'vitest';
import { renderWithProviders, BookingProbe, screen, fireEvent } from '../test/test-utils';
import { QuotePage } from './QuotePage';

const setup = () =>
  renderWithProviders(
    <>
      <QuotePage />
      <BookingProbe />
    </>,
  );

describe('QuotePage', () => {
  it('renders the quote hero and CTA', () => {
    setup();
    expect(screen.getByRole('heading', { name: 'Get a Quote' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get instant quote/i })).toBeInTheDocument();
  });

  it('opens booking in quote mode from "Get Instant Quote"', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /get instant quote/i }));
    const probe = screen.getByTestId('booking-probe');
    expect(probe).toHaveAttribute('data-open', 'true');
    expect(probe).toHaveAttribute('data-booking-type', 'quote');
  });
});
