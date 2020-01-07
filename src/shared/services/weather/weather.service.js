import axios from 'axios';

const baseAxiosInstance = axios.create({
  baseURL: 'https://samples.openweathermap.org/data/2.5/weather'
});

const getWeatherDataByCity = city => {
  return baseAxiosInstance.get('/', {
    params: { q: city, appid: 'b6907d289e10d714a6e88b30761fae22' }
  });
};

export default getWeatherDataByCity;
