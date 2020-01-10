import axios from 'axios';

const baseAxiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather'
});

const getWeatherDataByCity = city => {
  return baseAxiosInstance.get('/', {
    params: {
      q: city,
      appid: '20f60a20ad90c8349a4f94c44aa6a09b',
      units: 'metric'
    }
  });
};

export default getWeatherDataByCity;
