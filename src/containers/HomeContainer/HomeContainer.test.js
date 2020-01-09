import React from 'react';
import HomeContainer from './HomeContainer';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

const mockStore = configureStore();

const store = mockStore({
  reminders: { items: {}, shouldDisplayModal: false }
});

test('HomeContainer should be rendered', () => {
  const component = renderer.create(
    <Provider store={store}>
      <HomeContainer />
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
