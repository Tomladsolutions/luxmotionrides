import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, waitFor } from '../test/test-utils';
import { Reviews } from './Reviews';

describe('Reviews', () => {
  it('renders the section heading and fallback testimonials when no Google reviews load', () => {
    renderWithProviders(<Reviews />);
    expect(screen.getByText('What Our Clients Say')).toBeInTheDocument();
    expect(screen.getByText(/Sarah M\./)).toBeInTheDocument();
    expect(screen.getByText(/Michael R\./)).toBeInTheDocument();
    expect(screen.getByText(/Jennifer L\./)).toBeInTheDocument();
  });

  it('renders live Google reviews when they are available', async () => {
    vi.stubEnv('VITE_GOOGLE_MAPS_API_KEY', 'test-key');
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ json: async () => ({ results: [{ place_id: 'abc' }] }) })
      .mockResolvedValueOnce({
        json: async () => ({
          reviews: [
            { author_name: 'Alex P.', rating: 5, text: 'Flawless airport pickup.', relative_time_description: '2 days ago' },
          ],
        }),
      });
    vi.stubGlobal('fetch', fetchMock);

    renderWithProviders(<Reviews />);

    expect(await screen.findByText(/Flawless airport pickup\./)).toBeInTheDocument();
    expect(screen.getByText(/Alex P\./)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/Sarah M\./)).not.toBeInTheDocument());
  });

  it('links to the Google review page', () => {
    renderWithProviders(<Reviews />);
    expect(screen.getByRole('link', { name: /leave a review on google/i })).toHaveAttribute(
      'href',
      'https://g.page/r/CU-hQpiEvC2uEBM/review',
    );
  });
});
