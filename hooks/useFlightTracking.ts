import { useState, useCallback } from 'react';

export interface FlightData {
  flight_iata: string;
  airline_name: string;
  airline_iata: string;
  flight_number: string;
  dep_iata: string;
  dep_airport: string;
  arr_iata: string;
  arr_airport: string;
  dep_delay: number | null;
  arr_delay: number | null;
  status: string;
  dep_estimated: string;
  dep_actual: string | null;
  arr_estimated: string;
  arr_actual: string | null;
  dep_gate: string | null;
  dep_terminal: string | null;
  arr_gate: string | null;
  arr_terminal: string | null;
  dep_scheduled: string;
  arr_scheduled: string;
  aircraft: string | null;
}

interface UseFlightTrackingReturn {
  flightData: FlightData | null;
  isLoading: boolean;
  error: string | null;
  searchFlight: (flightNumber: string) => Promise<void>;
  clearFlight: () => void;
}

export const useFlightTracking = (): UseFlightTrackingReturn => {
  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchFlight = useCallback(async (flightNumber: string) => {
    if (!flightNumber || flightNumber.length < 3) {
      setError('Please enter a valid flight number (e.g., UA1234, DL567)');
      return;
    }

    const apiKey = import.meta.env.VITE_AVIATIONSTACK_API_KEY;
    if (!apiKey) {
      setError('Flight API key not configured');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${encodeURIComponent(flightNumber.toUpperCase())}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch flight data');
      }

      const data = await response.json();

      if (data.data && data.data.length > 0) {
        const flight = data.data[0];
        setFlightData({
          flight_iata: flight.flight?.iata || '',
          airline_name: flight.airline?.name || '',
          airline_iata: flight.airline?.iata || '',
          flight_number: flight.flight?.number || '',
          dep_iata: flight.departure?.iata || '',
          dep_airport: flight.departure?.airport || '',
          arr_iata: flight.arrival?.iata || '',
          arr_airport: flight.arrival?.airport || '',
          dep_delay: flight.departure?.delay || null,
          arr_delay: flight.arrival?.delay || null,
          status: flight.flight_status || 'unknown',
          dep_estimated: flight.departure?.estimated || '',
          dep_actual: flight.departure?.actual || null,
          arr_estimated: flight.arrival?.estimated || '',
          arr_actual: flight.arrival?.actual || null,
          dep_gate: flight.departure?.gate || null,
          dep_terminal: flight.departure?.terminal || null,
          arr_gate: flight.arrival?.gate || null,
          arr_terminal: flight.arrival?.terminal || null,
          dep_scheduled: flight.departure?.scheduled || '',
          arr_scheduled: flight.arrival?.scheduled || '',
          aircraft: flight.aircraft?.registration || null,
        });
      } else {
        setError('Flight not found. Please check the flight number and try again.');
        setFlightData(null);
      }
    } catch (err) {
      setError('Failed to track flight. Please try again.');
      setFlightData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearFlight = useCallback(() => {
    setFlightData(null);
    setError(null);
  }, []);

  return {
    flightData,
    isLoading,
    error,
    searchFlight,
    clearFlight,
  };
};

export default useFlightTracking;
