import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useGooglePlacesAutocomplete } from './useGooglePlacesAutocomplete';

const getPlacePredictions = vi.fn();

const installGoogle = () => {
  (window as unknown as { google: unknown }).google = {
    maps: {
      places: {
        AutocompleteService: class {
          getPlacePredictions = getPlacePredictions;
        },
      },
    },
  };
};

const removeGoogle = () => {
  delete (window as unknown as { google?: unknown }).google;
};

describe('useGooglePlacesAutocomplete', () => {
  beforeEach(() => {
    getPlacePredictions.mockReset();
  });

  afterEach(() => {
    removeGoogle();
    document.head.innerHTML = '';
  });

  it('marks itself loaded immediately when window.google already exists', () => {
    installGoogle();
    const { result } = renderHook(() => useGooglePlacesAutocomplete());

    expect(result.current.suggestions).toEqual([]);
    expect(result.current.error).toBeNull();
    // no script appended when google is already present
    expect(document.querySelector('script[src*="maps.googleapis.com"]')).toBeNull();
  });

  it('injects the Google Maps script when window.google is missing', () => {
    renderHook(() => useGooglePlacesAutocomplete());

    const script = document.querySelector<HTMLScriptElement>(
      'script[src*="maps.googleapis.com"]',
    );
    expect(script).not.toBeNull();
    expect(script?.src).toContain('libraries=places');
  });

  it('does not fetch suggestions for input shorter than 2 characters', async () => {
    installGoogle();
    const { result } = renderHook(() => useGooglePlacesAutocomplete());

    await act(async () => {
      await result.current.fetchSuggestions('a');
    });

    expect(getPlacePredictions).not.toHaveBeenCalled();
    expect(result.current.suggestions).toEqual([]);
  });

  it('maps predictions into suggestions on success', async () => {
    installGoogle();
    getPlacePredictions.mockResolvedValue({
      predictions: [
        { description: '123 Main St, Denver, CO', place_id: 'p1' },
        { description: '456 Oak Ave, Denver, CO', place_id: 'p2' },
      ],
    });

    const { result } = renderHook(() => useGooglePlacesAutocomplete());

    await act(async () => {
      await result.current.fetchSuggestions('123 Main');
    });

    expect(getPlacePredictions).toHaveBeenCalledWith({
      input: '123 Main',
      types: ['address'],
      componentRestrictions: { country: 'us' },
    });
    expect(result.current.suggestions).toEqual([
      { display_name: '123 Main St, Denver, CO', place_id: 'p1' },
      { display_name: '456 Oak Ave, Denver, CO', place_id: 'p2' },
    ]);
    expect(result.current.isLoading).toBe(false);
  });

  it('clears suggestions when the service returns null', async () => {
    installGoogle();
    getPlacePredictions.mockResolvedValue(null);
    const { result } = renderHook(() => useGooglePlacesAutocomplete());

    await act(async () => {
      await result.current.fetchSuggestions('nowhere');
    });

    expect(result.current.suggestions).toEqual([]);
  });

  it('sets an error when the service throws', async () => {
    installGoogle();
    getPlacePredictions.mockRejectedValue(new Error('quota'));
    const { result } = renderHook(() => useGooglePlacesAutocomplete());

    await act(async () => {
      await result.current.fetchSuggestions('123 Main');
    });

    expect(result.current.error).toBe('Failed to fetch suggestions');
    expect(result.current.suggestions).toEqual([]);
  });

  it('sets loading and skips fetching while google is not yet available', async () => {
    const { result } = renderHook(() => useGooglePlacesAutocomplete());

    await act(async () => {
      await result.current.fetchSuggestions('123 Main');
    });

    expect(result.current.isLoading).toBe(true);
    expect(getPlacePredictions).not.toHaveBeenCalled();
  });

  it('selectPlace calls the callback and clears suggestions', async () => {
    installGoogle();
    getPlacePredictions.mockResolvedValue({
      predictions: [{ description: '1 A St', place_id: 'p1' }],
    });
    const onSelect = vi.fn();
    const { result } = renderHook(() => useGooglePlacesAutocomplete(onSelect));

    await act(async () => {
      await result.current.fetchSuggestions('1 A St');
    });
    await waitFor(() => expect(result.current.suggestions).toHaveLength(1));

    act(() => result.current.selectPlace(result.current.suggestions[0]));

    expect(onSelect).toHaveBeenCalledWith('1 A St');
    expect(result.current.suggestions).toEqual([]);
  });

  it('clearSuggestions empties the suggestion list', async () => {
    installGoogle();
    getPlacePredictions.mockResolvedValue({
      predictions: [{ description: '1 A St', place_id: 'p1' }],
    });
    const { result } = renderHook(() => useGooglePlacesAutocomplete());

    await act(async () => {
      await result.current.fetchSuggestions('1 A St');
    });
    await waitFor(() => expect(result.current.suggestions).toHaveLength(1));

    act(() => result.current.clearSuggestions());
    expect(result.current.suggestions).toEqual([]);
  });
});
