/**
 * Shared site-wide constants (contact details, third-party keys, brand info).
 * Centralized here so values are defined once and reused across the app.
 */

export const SITE = {
  name: 'Lux Motion Rides',
  url: 'https://luxmotionrides.com',
  email: 'booking@luxmotionrides.com',
  get emailHref() {
    return `mailto:${this.email}`;
  },
  /** Raw phone number used for `tel:` links. */
  phone: '+17209351912',
  /** Human-readable phone number for display. */
  phoneDisplay: '+1 (720) 935-1912',
  get phoneHref() {
    return `tel:${this.phone}`;
  },
} as const;

/** Google Maps / Places API key used by the maps-backed hooks. */
export const GOOGLE_MAPS_API_KEY = 'AIzaSyCQe3WlF89L5O4gh2Ps-yW_XIlo9dAgNRQ';
