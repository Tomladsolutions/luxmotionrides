import { useState, useCallback } from 'react';

interface PlaceSuggestion {
  display_name: string;
  place_id: number;
  lat: string;
  lon: string;
}

export const useNominatimAutocomplete = (
  onAddressSelect?: (address: string, lat?: string, lon?: string) => void
) => {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = useCallback(async (input: string) => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&addressdetails=1&limit=5`,
        {
          headers: {
            'User-Agent': 'LuxMotionRides/1.0',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();
      
      if (data && data.length > 0) {
        setSuggestions(
          data.map((item: Record<string, unknown>) => ({
            display_name: item.display_name as string,
            place_id: item.place_id as number,
            lat: item.lat as string,
            lon: item.lon as string,
          }))
        );
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      setError('Failed to fetch suggestions');
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectPlace = useCallback((suggestion: PlaceSuggestion) => {
    onAddressSelect?.(suggestion.display_name, suggestion.lat, suggestion.lon);
    setSuggestions([]);
  }, [onAddressSelect]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    isLoading,
    error,
    fetchSuggestions,
    selectPlace,
    clearSuggestions,
  };
};

export default useNominatimAutocomplete;
