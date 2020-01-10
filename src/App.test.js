import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import App from './App';
import HomeContainer from './containers/HomeContainer/HomeContainer';
import Header from './shared/components/Header/Header';
import Footer from './shared/components/Footer/Footer';

configure({ adapter: new Adapter() });

const mockStore = configureStore();

const store = mockStore({
  reminders: { items: {}, shouldDisplayModal: false }
});

describe('App', () => {
  test('should be rendered', () => {
    const component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should have a Home Container', () => {
    const component = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(component.find(HomeContainer).length).toEqual(1);
  });

  test('should have a Header', () => {
    const component = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(component.find(Header).length).toEqual(1);
  });

  test('should have a Footer', () => {
    const component = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(component.find(Footer).length).toEqual(1);
  });
});
