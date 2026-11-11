import axios from 'axios';

// Photon (https://photon.komoot.io) — free, keyless OpenStreetMap geocoder with
// type-ahead search and CORS enabled. Replaces the discontinued Algolia Places.
// Fair-use public instance: debounce requests and keep result limits small.
export const placesClient = axios.create({
  baseURL: 'https://photon.komoot.io'
});

export const toCityOption = ({ properties: p }) => {
  const countryCode = (p.countrycode || '').toUpperCase();
  return {
    name: p.name,
    countryCode,
    // shown in the dropdown
    label: [p.name, p.state, p.country].filter(Boolean).join(', '),
    // stored on the reminder and sent to OpenWeatherMap ("City, CC")
    value: countryCode ? `${p.name}, ${countryCode}` : p.name
  };
};

const searchCities = (query, { signal } = {}) =>
  placesClient
    .get('/api/', {
      params: { q: query, limit: 6, lang: 'en', layer: 'city' },
      signal
    })
    .then(({ data }) => {
      const seen = new Set();
      return (data.features || [])
        .filter(f => f.properties && f.properties.name)
        .map(toCityOption)
        .filter(option => !seen.has(option.label) && seen.add(option.label));
    });

export default searchCities;
