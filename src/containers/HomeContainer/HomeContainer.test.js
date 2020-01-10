import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import HomeContainer from './HomeContainer';
import Calendar from '../../shared/components/Calendar/Calendar';

configure({ adapter: new Adapter() });

const mockStore = configureStore();

const store = mockStore({
  reminders: { items: {}, shouldDisplayModal: false }
});

describe('HomeContainer [Container]', () => {
  test('should be rendered', () => {
    const component = renderer.create(
      <Provider store={store}>
        <HomeContainer />
      </Provider>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should have a Calendar component', () => {
    const component = mount(
      <Provider store={store}>
        <HomeContainer />
      </Provider>
    );

    expect(component.find(Calendar).length).toEqual(1);
  });
});
