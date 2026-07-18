import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../test/test-utils';
import { Reviews } from './Reviews';

describe('Reviews', () => {
  it('renders the section heading and fallback testimonials', () => {
    renderWithProviders(<Reviews />);
    expect(screen.getByText('What Our Clients Say')).toBeInTheDocument();
    expect(screen.getByText(/Sarah M\./)).toBeInTheDocument();
    expect(screen.getByText(/Michael R\./)).toBeInTheDocument();
    expect(screen.getByText(/Jennifer L\./)).toBeInTheDocument();
  });

  it('links to the Google review page', () => {
    renderWithProviders(<Reviews />);
    expect(screen.getByRole('link', { name: /leave a review on google/i })).toHaveAttribute(
      'href',
      'https://g.page/r/CU-hQpiEvC2uEBM/review',
    );
  });
});
