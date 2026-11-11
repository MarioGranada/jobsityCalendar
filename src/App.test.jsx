import React from 'react';
import App from './App';
import { freezeDate, mockStore, renderWithStore } from './test/utils';

describe('App', () => {
  let view;
  beforeEach(() => {
    freezeDate();
    view = renderWithStore(<App />, mockStore());
  });
  afterEach(() => vi.useRealTimers());

  test('should be rendered', () => {
    expect(view.asFragment()).toMatchSnapshot();
  });

  test('should have a Home Container', () => {
    expect(view.container.querySelectorAll('.home-container')).toHaveLength(1);
  });

  test('should have a Header', () => {
    expect(view.container.querySelectorAll('.header-container')).toHaveLength(1);
  });

  test('should have a Footer', () => {
    expect(view.container.querySelectorAll('.footer-container')).toHaveLength(1);
  });
});
