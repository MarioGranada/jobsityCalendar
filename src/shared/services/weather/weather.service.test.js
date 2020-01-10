import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import getWeatherDataByCity from './weather.service';

describe('Weather [Service]', () => {
  it('should exist', done => {
    const mock = new MockAdapter(axios);

    const cityMockName = 'Barcelona';

    mock
      .onGet(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityMockName}&&appid=20f60a20ad90c8349a4f94c44aa6a09b&&units=metrics}`
      )
      .reply(200, {});

    getWeatherDataByCity(cityMockName).then(({ data }) => {
      const { main, description, icon } = data.weather[0];
      expect(data.name).toEqual(cityMockName);
      expect(main).not.toEqual('');
      expect(description).not.toEqual('');
      expect(icon).not.toEqual('');
      done();
    });
  });
});
