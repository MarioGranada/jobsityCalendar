import MockAdapter from 'axios-mock-adapter';
import getWeatherDataByCity, { weatherClient } from './weather.service';

describe('Weather [Service]', () => {
  it('should exist', async () => {
    const mock = new MockAdapter(weatherClient);
    const cityMockName = 'Barcelona, ES';
    mock.onGet('/weather').reply(config => [
      200,
      {
        name: config.params.q,
        params: config.params,
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }]
      }
    ]);

    const { data } = await getWeatherDataByCity(cityMockName);
    const { main, description, icon } = data.weather[0];

    expect(data.name).toEqual(cityMockName);
    expect(data.params).toEqual({ q: cityMockName, appid: 'test-openweather-key', units: 'metric' });
    expect(main).not.toEqual('');
    expect(description).not.toEqual('');
    expect(icon).not.toEqual('');
    mock.restore();
  });
});
