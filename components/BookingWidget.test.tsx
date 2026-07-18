import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BookingWidget } from './BookingWidget';

describe('BookingWidget', () => {
  it('renders the location, passenger, date and time inputs', () => {
    render(<BookingWidget />);
    expect(screen.getByPlaceholderText('Airport, Hotel, Address...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Destination...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /book/i })).toBeInTheDocument();
  });

  it('offers passenger options 1 through 4+', () => {
    render(<BookingWidget />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);
    expect(options[3]).toHaveTextContent('4+ Pass');
  });
});
