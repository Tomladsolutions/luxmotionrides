import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGoogleReviews } from './useGoogleReviews';

const mockFetch = vi.fn();

const jsonResponse = (body: unknown) => ({ json: async () => body });

const reviews = [
  {
    author_name: 'Jane Doe',
    rating: 5,
    text: 'Great ride!',
    relative_time_description: 'a week ago',
  },
];

describe('useGoogleReviews', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    vi.stubGlobal('fetch', mockFetch);
    vi.stubEnv('VITE_GOOGLE_MAPS_API_KEY', 'test-key');
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('sets an error when the API key is not configured', async () => {
    vi.stubEnv('VITE_GOOGLE_MAPS_API_KEY', '');

    const { result } = renderHook(() => useGoogleReviews());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Google API key not configured');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('fetches the place and then its reviews on mount', async () => {
    mockFetch
      .mockResolvedValueOnce(jsonResponse({ results: [{ place_id: 'abc' }] }))
      .mockResolvedValueOnce(jsonResponse({ reviews }));

    const { result } = renderHook(() => useGoogleReviews());
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch.mock.calls[0][0]).toContain('textsearch');
    expect(mockFetch.mock.calls[1][0]).toContain('place_id=abc');
    expect(result.current.reviews).toEqual(reviews);
    expect(result.current.error).toBeNull();
  });

  it('sets an error when the business is not found', async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ results: [] }));

    const { result } = renderHook(() => useGoogleReviews());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Business not found');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result.current.reviews).toEqual([]);
  });

  it('sets an error when the place has no reviews', async () => {
    mockFetch
      .mockResolvedValueOnce(jsonResponse({ results: [{ place_id: 'abc' }] }))
      .mockResolvedValueOnce(jsonResponse({ reviews: [] }));

    const { result } = renderHook(() => useGoogleReviews());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('No reviews yet');
    expect(result.current.reviews).toEqual([]);
  });

  it('handles a fetch rejection gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('boom'));

    const { result } = renderHook(() => useGoogleReviews());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Failed to load reviews');
    expect(result.current.reviews).toEqual([]);
  });
});
