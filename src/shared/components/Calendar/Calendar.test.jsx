import React from 'react';
import { fireEvent, screen, within } from '@testing-library/react';

import Calendar from './Calendar';
import {
  freezeDate,
  sampleReminders,
  mockStore,
  realStore,
  renderWithStore,
  actionTypes
} from '../../../test/utils';

const addIcons = container =>
  container.querySelectorAll('.date-buttons-row > svg.calendar-icon');

describe('Calendar [Component]', () => {
  let store;
  let view;

  beforeEach(() => {
    freezeDate();
    store = mockStore({ items: sampleReminders });
    view = renderWithStore(<Calendar />, store);
  });
  afterEach(() => vi.useRealTimers());

  it('should be rendered', () => {
    expect(view.asFragment()).toMatchSnapshot();
  });

  it('should have a CalendarForm component', () => {
    // the form lives in a modal: open it through the store and it must render
    const open = renderWithStore(<Calendar />, mockStore({ shouldDisplayModal: true }));
    expect(screen.getByRole('button', { name: 'Add Reminder' })).toBeInTheDocument();
    open.unmount();
  });

  it('should have a DayPicker component', () => {
    expect(view.container.querySelectorAll('.DayPicker')).toHaveLength(1);
    expect(view.container.querySelector('.DayPicker-Caption')).toHaveTextContent('January 2020');
  });

  it('should have multiple add icons', () => {
    expect(addIcons(view.container).length).not.toEqual(0);
  });

  it('should have multiple Clear icons', () => {
    expect(view.container.querySelectorAll('svg.clear-icon').length).not.toEqual(0);
  });

  it('should select given date when an add icon is clicked', () => {
    view.unmount();
    const live = renderWithStore(<Calendar />, realStore({ items: sampleReminders }));
    const firstAddIcon = addIcons(live.container)[0];
    const clickedDate = firstAddIcon.getAttribute('label');

    fireEvent.click(firstAddIcon);

    expect(screen.getByLabelText('Date *')).toHaveValue(clickedDate);
  });

  it('should open a modal when an add icon is clicked', () => {
    fireEvent.click(addIcons(view.container)[0]);

    expect(actionTypes(store)).toEqual(['OPEN_MODAL']);
  });

  it('should remove all reminders for a given date when a clear button is clicked', () => {
    const selectedDate = '1-9-2020';
    const dayBox = view.container.querySelector('#day-box_' + selectedDate);
    expect(within(dayBox).getByText('test reminder 1')).toBeInTheDocument();

    fireEvent.click(dayBox.querySelector('.clear-date-label'));

    expect(store.getActions()).toEqual([
      { type: 'REMOVE_REMINDERS_BY_DATE', payload: { date: selectedDate } }
    ]);
  });
});
