import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useFlightTracking } from './useFlightTracking';

const mockFetch = vi.fn();

const apiFlight = {
  flight: { iata: 'UA123', number: '123' },
  airline: { name: 'United', iata: 'UA' },
  departure: {
    iata: 'DEN',
    airport: 'Denver Intl',
    delay: 5,
    estimated: '2024-01-01T10:00:00+00:00',
    actual: null,
    gate: 'B12',
    terminal: 'B',
    scheduled: '2024-01-01T09:55:00+00:00',
  },
  arrival: {
    iata: 'SFO',
    airport: 'San Francisco Intl',
    delay: null,
    estimated: '2024-01-01T12:00:00+00:00',
    actual: null,
    gate: null,
    terminal: '2',
    scheduled: '2024-01-01T12:00:00+00:00',
  },
  flight_status: 'active',
  aircraft: { registration: 'N12345' },
};

const okResponse = (body: unknown) => ({
  ok: true,
  json: async () => body,
});

describe('useFlightTracking', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    vi.stubGlobal('fetch', mockFetch);
    vi.stubEnv('VITE_AVIATIONSTACK_API_KEY', 'test-key');
  });

  it('has empty initial state', () => {
    const { result } = renderHook(() => useFlightTracking());
    expect(result.current.flightData).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('rejects a flight number shorter than 3 characters without fetching', async () => {
    const { result } = renderHook(() => useFlightTracking());

    await act(async () => {
      await result.current.searchFlight('UA');
    });

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.error).toMatch(/valid flight number/i);
    expect(result.current.flightData).toBeNull();
  });

  it('errors when the API key is not configured', async () => {
    vi.stubEnv('VITE_AVIATIONSTACK_API_KEY', '');
    const { result } = renderHook(() => useFlightTracking());

    await act(async () => {
      await result.current.searchFlight('UA123');
    });

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.error).toBe('Flight API key not configured');
  });

  it('maps a successful response into normalized flight data and uppercases the query', async () => {
    mockFetch.mockResolvedValue(okResponse({ data: [apiFlight] }));
    const { result } = renderHook(() => useFlightTracking());

    await act(async () => {
      await result.current.searchFlight('ua123');
    });

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('access_key=test-key');
    expect(url).toContain('flight_iata=UA123');

    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.flightData).toMatchObject({
      flight_iata: 'UA123',
      airline_name: 'United',
      dep_iata: 'DEN',
      arr_iata: 'SFO',
      dep_delay: 5,
      arr_delay: null,
      status: 'active',
      aircraft: 'N12345',
    });
  });

  it('falls back to defaults for missing nested fields', async () => {
    mockFetch.mockResolvedValue(okResponse({ data: [{}] }));
    const { result } = renderHook(() => useFlightTracking());

    await act(async () => {
      await result.current.searchFlight('UA123');
    });

    expect(result.current.flightData).toMatchObject({
      flight_iata: '',
      airline_name: '',
      status: 'unknown',
      dep_delay: null,
      aircraft: null,
    });
  });

  it('sets a not-found error when the response contains no flights', async () => {
    mockFetch.mockResolvedValue(okResponse({ data: [] }));
    const { result } = renderHook(() => useFlightTracking());

    await act(async () => {
      await result.current.searchFlight('UA123');
    });

    expect(result.current.error).toMatch(/not found/i);
    expect(result.current.flightData).toBeNull();
  });

  it('handles a non-ok HTTP response', async () => {
    mockFetch.mockResolvedValue({ ok: false, json: async () => ({}) });
    const { result } = renderHook(() => useFlightTracking());

    await act(async () => {
      await result.current.searchFlight('UA123');
    });

    expect(result.current.error).toMatch(/failed to track flight/i);
    expect(result.current.flightData).toBeNull();
  });

  it('handles a network rejection', async () => {
    mockFetch.mockRejectedValue(new Error('network down'));
    const { result } = renderHook(() => useFlightTracking());

    await act(async () => {
      await result.current.searchFlight('UA123');
    });

    expect(result.current.error).toMatch(/failed to track flight/i);
    expect(result.current.isLoading).toBe(false);
  });

  it('clearFlight resets flight data and error', async () => {
    mockFetch.mockResolvedValue(okResponse({ data: [apiFlight] }));
    const { result } = renderHook(() => useFlightTracking());

    await act(async () => {
      await result.current.searchFlight('UA123');
    });
    await waitFor(() => expect(result.current.flightData).not.toBeNull());

    act(() => result.current.clearFlight());

    expect(result.current.flightData).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
