import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import remindersReducer from '../shared/store/reducers/reminders';

// The original suites were recorded in January 2020; freeze "today" so the
// DayPicker month (and every snapshot) stays deterministic.
export const FROZEN_TODAY = new Date(2020, 0, 20, 12, 0, 0);
export const freezeDate = () => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(FROZEN_TODAY);
};

export const sampleReminders = {
  '1-9-2020': [
    { title: 'test reminder 1', id: '1-9-2020_0', time: '07:30', color: 'red' },
    { title: 'test reminder2', id: '1-9-2020_1', time: '08:30', color: 'green' }
  ]
};

// redux-mock-store: records dispatched actions, state never changes
export const mockStore = (reminders = {}) =>
  configureStore()({ reminders: { items: {}, shouldDisplayModal: false, ...reminders } });

// real store: lets interactions (open modal, add reminder) take effect
export const realStore = (reminders = {}) =>
  createStore(combineReducers({ reminders: remindersReducer }), {
    reminders: { items: {}, shouldDisplayModal: false, ...reminders }
  });

export const renderWithStore = (ui, store) => ({
  store,
  ...render(<Provider store={store}>{ui}</Provider>)
});

export const actionTypes = store => store.getActions().map(a => a.type);
