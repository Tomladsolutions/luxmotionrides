import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen, fireEvent } from '../test/test-utils';
import { FAQPage } from './FAQPage';

describe('FAQPage', () => {
  it('renders all questions with the first answer open by default', () => {
    renderWithProviders(<FAQPage />);
    expect(screen.getByRole('button', { name: /how do i book a ride/i })).toBeInTheDocument();
    expect(screen.getByText(/clicking the "Book a Ride" button on our website/i)).toBeInTheDocument();
  });

  it('marks the first question closed when its question is clicked again', () => {
    renderWithProviders(<FAQPage />);
    const firstQuestion = screen.getByRole('button', { name: /how do i book a ride/i });
    // Open by default -> chevron rotated.
    expect(firstQuestion.querySelector('svg')).toHaveClass('rotate-180');
    fireEvent.click(firstQuestion);
    // Collapsed -> chevron no longer rotated.
    expect(firstQuestion.querySelector('svg')).not.toHaveClass('rotate-180');
  });

  it('opens another answer when its question is clicked', () => {
    renderWithProviders(<FAQPage />);
    expect(screen.queryByText(/professional transportation throughout Colorado/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /what areas do you serve/i }));
    expect(screen.getByText(/professional transportation throughout Colorado/i)).toBeInTheDocument();
  });
});
