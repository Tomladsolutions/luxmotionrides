import { useState, useEffect } from 'react';

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
}

interface PlaceSearchResult {
  place_id?: string;
  reviews?: GoogleReview[];
  status?: string;
  error_message?: string;
}

interface TextSearchResult {
  results?: Array<{ place_id: string }>;
  status?: string;
  error_message?: string;
}

const BUSINESS_NAME = 'Lux Motion Rides';
const GOOGLE_MAPS_API_KEY = 'AIzaSyCQe3WlF89L5O4gh2Ps-yW_XIlo9dAgNRQ';

export const useGoogleReviews = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        // First, search for the business
        const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(BUSINESS_NAME)}&key=${GOOGLE_MAPS_API_KEY}`;
        const searchResponse = await fetch(searchUrl);

        if (!searchResponse.ok) {
          throw new Error(`Place search failed with status ${searchResponse.status}`);
        }

        const searchData: TextSearchResult = await searchResponse.json();

        // Google returns HTTP 200 with an error status in the body (e.g. REQUEST_DENIED)
        if (searchData.status && searchData.status !== 'OK' && searchData.status !== 'ZERO_RESULTS') {
          throw new Error(searchData.error_message || `Place search returned ${searchData.status}`);
        }

        if (!searchData.results || searchData.results.length === 0) {
          setError('Business not found');
          setLoading(false);
          return;
        }

        const placeId = searchData.results[0].place_id;

        // Then get reviews using Place Details
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${GOOGLE_MAPS_API_KEY}`;
        const detailsResponse = await fetch(detailsUrl);

        if (!detailsResponse.ok) {
          throw new Error(`Place details failed with status ${detailsResponse.status}`);
        }

        const detailsData: PlaceSearchResult = await detailsResponse.json();

        if (detailsData.status && detailsData.status !== 'OK' && detailsData.status !== 'ZERO_RESULTS') {
          throw new Error(detailsData.error_message || `Place details returned ${detailsData.status}`);
        }

        if (detailsData.reviews && detailsData.reviews.length > 0) {
          setReviews(detailsData.reviews);
        } else {
          setError('No reviews yet');
        }
      } catch (err) {
        console.error('Failed to load Google reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return {
    reviews,
    loading,
    error,
  };
};

export default useGoogleReviews;
