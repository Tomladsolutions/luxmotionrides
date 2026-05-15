/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_AVIATIONSTACK_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  google: {
    maps: {
      places: {
        AutocompleteService: new () => {
          getPlacePredictions: (request: {
            input: string;
            types?: string[];
            componentRestrictions?: { country: string | string[] };
          }) => Promise<{
            predictions: Array<{
              description: string;
              place_id: string;
            }>;
          } | null>;
        };
        PlacesService: new (map: unknown) => {
          getDetails: (
            request: { placeId: string; fields?: string[] },
            callback: (result: unknown, status: string) => void
          ) => void;
        };
        PlacesServiceStatus: {
          OK: string;
        };
      };
      Map: new (element: HTMLElement, options?: unknown) => unknown;
    };
  };
}
