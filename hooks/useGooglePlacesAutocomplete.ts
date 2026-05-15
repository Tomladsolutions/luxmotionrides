import { useState, useRef, useCallback, useEffect } from 'react';

interface PlaceSuggestion {
  display_name: string;
  place_id: string;
  lat?: string;
  lon?: string;
}

interface AutocompleteService {
  getPlacePredictions: (request: {
    input: string;
    types?: string[];
    componentRestrictions?: { country: string | string[] };
  }) => Promise<{
    predictions: Array<{ description: string; place_id: string }>;
  } | null>;
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyCQe3WlF89L5O4gh2Ps-yW_XIlo9dAgNRQ';

export const useGooglePlacesAutocomplete = (
  onAddressSelect?: (address: string) => void
) => {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => setError('Failed to load Google Maps');
    document.head.appendChild(script);
  }, []);

  const fetchSuggestions = useCallback(async (input: string) => {
    if (!input || input.length < 2) {
      setSuggestions([]);
      return;
    }

    if (!window.google) {
      setIsLoading(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const service = new window.google.maps.places.AutocompleteService();
      const response = await service.getPlacePredictions({
        input,
        types: ['address'],
        componentRestrictions: { country: 'us' },
      });

      if (response && response.predictions) {
        setSuggestions(
          response.predictions.map((prediction) => ({
            display_name: prediction.description,
            place_id: prediction.place_id,
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
    onAddressSelect?.(suggestion.display_name);
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

export default useGooglePlacesAutocomplete;
