import axios from 'axios';

// OpenWeatherMap "Current weather data" (free plan). The key is inlined into the
// public bundle at build time (VITE_*), so use a free-tier key you can rotate.
export const weatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5'
});

// `city` accepts OpenWeatherMap's "City" or "City, CC" (ISO country code) format.
const getWeatherDataByCity = city => {
  return weatherClient.get('/weather', {
    params: {
      q: city,
      appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
      units: 'metric'
    }
  });
};

export default getWeatherDataByCity;
