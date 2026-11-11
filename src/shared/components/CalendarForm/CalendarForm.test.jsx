import React from 'react';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import CalendarForm from './CalendarForm';
import { sampleReminders, mockStore, renderWithStore, actionTypes } from '../../../test/utils';

vi.mock('../../services/places/places.service', () => ({
  default: vi.fn(() =>
    Promise.resolve([
      { name: 'Barcelona', countryCode: 'ES', label: 'Barcelona, Catalonia, Spain', value: 'Barcelona, ES' }
    ])
  )
}));

vi.mock('../../services/weather/weather.service', () => ({
  default: vi.fn(() =>
    Promise.resolve({ data: { weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }] } })
  )
}));

const selectedReminder = {
  title: 'test reminder 1',
  id: '1-9-2020_0',
  username: 'test username',
  city: 'Barcelona',
  time: '07:30',
  color: 'red'
};

const addReminderProps = { isUpdatingReminder: false, selectedDate: '1-9-2020', selectedReminder: null };
const updateReminderProps = { isUpdatingReminder: true, selectedDate: '1-9-2020', selectedReminder };

const openStore = () => mockStore({ items: sampleReminders, shouldDisplayModal: true });
const buttonNames = () => screen.getAllByRole('button').filter(b => b.closest('.buttons-row')).map(b => b.textContent);
const textInputs = () => screen.getAllByRole('textbox').concat(Array.from(document.querySelectorAll('input[type=time]')));

describe('CalendarForm [Component]', () => {
  let store;
  let view;
  beforeEach(() => {
    store = openStore();
    view = renderWithStore(<CalendarForm {...addReminderProps} />, store);
  });

  it('should be rendered', () => {
    expect(document.querySelector('.calendar-form-container')).toMatchSnapshot();
  });

  it('should have a disabled and populated text field for date', () => {
    const dateInput = screen.getByLabelText('Date *');
    expect(dateInput).toHaveValue('1-9-2020');
    expect(dateInput).toBeDisabled();
  });

  it('should have a text field for reminder date, title, username and time', () => {
    expect(screen.getByLabelText('Date *')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Reminder title')).toBeInTheDocument();
    expect(screen.getByLabelText('Time *')).toHaveAttribute('type', 'time');
    expect(textInputs().length).toBeGreaterThanOrEqual(4);
  });

  it('should have an autocomplete field for city', () => {
    const city = screen.getByLabelText('Preferred city *');
    expect(city).toHaveAttribute('aria-autocomplete', 'list');
    expect(screen.getByText(/OpenStreetMap/)).toBeInTheDocument();
  });

  it('should have a radio group for selecting a priority level (color) and have 3 options', () => {
    const group = screen.getByRole('radiogroup');
    expect(within(group).getAllByRole('radio')).toHaveLength(3);
  });

  it('should have 2 buttons (Add Reminder and Cancel) when date selected and no reminder is selected', () => {
    expect(buttonNames()).toEqual(['Add Reminder', 'Cancel']);
  });

  it('should have red (high priority), yellow (Priority) and green (low Priority) in radio buttons', () => {
    const expected = [
      ['red', 'High Priority'],
      ['yellow', 'Priority'],
      ['green', 'Low Priority']
    ];
    expected.forEach(([value, label]) => {
      expect(screen.getByLabelText(label)).toHaveAttribute('value', value);
    });
  });

  it('should dispatch add reminder action when creating new reminder', async () => {
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'username test ' } });
    fireEvent.change(screen.getByLabelText('Reminder title'), { target: { value: 'title test' } });

    const city = screen.getByLabelText('Preferred city *');
    fireEvent.change(city, { target: { value: 'Barc' } });
    fireEvent.click(await screen.findByText('Barcelona, Catalonia, Spain', {}, { timeout: 2000 }));

    expect(await screen.findByText('City: Barcelona, ES')).toBeInTheDocument();
    expect(await screen.findByText(/Clear - clear sky/)).toBeInTheDocument();

    const add = screen.getByRole('button', { name: 'Add Reminder' });
    expect(add).toBeEnabled();
    fireEvent.click(add);

    expect(actionTypes(store)).toEqual(['ADD_REMINDER', 'CLOSE_MODAL']);
    expect(store.getActions()[0].payload.reminder).toMatchObject({
      username: 'username test ',
      title: 'title test',
      city: 'Barcelona, ES',
      date: '1-9-2020',
      time: '07:30',
      color: 'red'
    });
  });

  it('should dispatch close modal action when closing form', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(actionTypes(store)).toEqual(['CLOSE_MODAL']);
    view.unmount();
  });
});

describe('CalendarForm updating Reminder [component]', () => {
  let store;
  beforeEach(() => {
    store = openStore();
    renderWithStore(<CalendarForm {...updateReminderProps} />, store);
  });

  it('should have an update reminder button when a reminder is selected', () => {
    expect(buttonNames()).toHaveLength(3);
    expect(buttonNames()[0]).toEqual('Update Reminder');
  });

  it('should have an additional delete button when a reminder is selected', () => {
    expect(buttonNames()).toHaveLength(3);
    expect(buttonNames()[1]).toEqual('Delete');
  });

  it('should dispatch update reminder action when editing existing reminder', async () => {
    await waitFor(() => expect(screen.getByRole('button', { name: 'Update Reminder' })).toBeEnabled());
    fireEvent.click(screen.getByRole('button', { name: 'Update Reminder' }));
    expect(actionTypes(store)).toEqual(['UPDATE_REMINDER', 'CLOSE_MODAL']);
    expect(store.getActions()[0].payload.reminder).toMatchObject({ id: '1-9-2020_0', city: 'Barcelona' });
  });

  it('should dispatch delete reminder action when removing existing reminder', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(actionTypes(store)).toEqual(['REMOVE_REMINDER', 'CLOSE_MODAL']);
  });
});
