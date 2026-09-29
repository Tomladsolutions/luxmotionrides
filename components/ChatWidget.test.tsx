import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ChatWidget } from './ChatWidget';

describe('ChatWidget', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const openWidget = () => {
    render(<ChatWidget />);
    // Only the launcher button exists initially.
    fireEvent.click(screen.getByRole('button'));
  };

  it('is collapsed by default and opens on click', () => {
    render(<ChatWidget />);
    expect(screen.queryByPlaceholderText('Type a message...')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
    expect(screen.getByText('Customer Care')).toBeInTheDocument();
  });

  it('shows the initial bot greeting', () => {
    openWidget();
    expect(screen.getByText('Hello! How can we help you today?')).toBeInTheDocument();
  });

  it('sends a user message and receives an automated reply', () => {
    openWidget();
    const input = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(input, { target: { value: 'I need a ride' } });
    fireEvent.submit(input.closest('form')!);

    expect(screen.getByText('I need a ride')).toBeInTheDocument();
    expect(input).toHaveValue('');

    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText("Thank you! We'll get back to you shortly.")).toBeInTheDocument();
  });

  it('ignores empty submissions', () => {
    openWidget();
    const input = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(input.closest('form')!);
    // Still just the initial greeting bubble.
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.queryByText("Thank you! We'll get back to you shortly.")).not.toBeInTheDocument();
  });
});
