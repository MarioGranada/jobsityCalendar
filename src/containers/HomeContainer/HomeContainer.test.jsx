import React from 'react';
import HomeContainer from './HomeContainer';
import { freezeDate, mockStore, renderWithStore } from '../../test/utils';

describe('HomeContainer [Container]', () => {
  beforeEach(freezeDate);
  afterEach(() => vi.useRealTimers());

  test('should be rendered', () => {
    const { asFragment } = renderWithStore(<HomeContainer />, mockStore());
    expect(asFragment()).toMatchSnapshot();
  });

  test('should have a Calendar component', () => {
    const { container } = renderWithStore(<HomeContainer />, mockStore());
    expect(container.querySelector('.home-container .jobsity-calendar-container')).toBeInTheDocument();
  });
});
