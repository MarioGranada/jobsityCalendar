import MockAdapter from 'axios-mock-adapter';
import searchCities, { placesClient, toCityOption } from './places.service';

const feature = (name, state, country, countrycode) => ({
  properties: { name, state, country, countrycode }
});

describe('Places [Service]', () => {
  it('maps a Photon feature to a city option ("City, CC" value for OpenWeatherMap)', () => {
    expect(toCityOption(feature('Medellín', 'Antioquia', 'Colombia', 'co'))).toEqual({
      name: 'Medellín',
      countryCode: 'CO',
      label: 'Medellín, Antioquia, Colombia',
      value: 'Medellín, CO'
    });
  });

  it('queries Photon for cities and removes duplicate labels', async () => {
    const mock = new MockAdapter(placesClient);
    mock.onGet('/api/').reply(config => {
      expect(config.params).toMatchObject({ q: 'Medel', layer: 'city', lang: 'en' });
      return [
        200,
        {
          features: [
            feature('Medellín', 'Antioquia', 'Colombia', 'CO'),
            feature('Medellín', 'Antioquia', 'Colombia', 'CO'),
            feature('Medellín', 'Extremadura', 'Spain', 'ES'),
            { properties: {} }
          ]
        }
      ];
    });

    const options = await searchCities('Medel');

    expect(options.map(o => o.value)).toEqual(['Medellín, CO', 'Medellín, ES']);
    mock.restore();
  });
});
