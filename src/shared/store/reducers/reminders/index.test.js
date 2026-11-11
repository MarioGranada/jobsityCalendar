import initialState from './initialState';
import remindersReducer from './index';
import * as actions from '../../actions/reminderActions';

const reminder = {
  date: '1-9-2020',
  id: '1-9-2020_0',
  time: '07:30',
  title: 'Reminder Mock',
  username: 'Reminder Mock Username',
  city: 'Barcelona'
};

const date = '1-9-2020';

describe('Reminders [Reducer]', () => {
  it('should return the initial state', () => {
    expect(remindersReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_REMINDERS', () => {
    const expectedState = {
      ...initialState,
      items: { '1-9-2020': [reminder] }
    };
    expect(remindersReducer(expectedState, actions.fetchReminders())).toEqual(
      expectedState
    );
  });

  it('should handle ADD_REMINDER', () => {
    const expectedState = {
      ...initialState,
      items: { '1-9-2020': [reminder] }
    };
    expect(remindersReducer(undefined, actions.addReminder(reminder))).toEqual(
      expectedState
    );
  });

  it('should handle UPDATE_REMINDER', () => {
    const updatedReminder = {
      ...reminder,
      title: 'Reminder Mock update',
      time: '08:30'
    };

    const initialMockPopulatedState = {
      ...initialState,
      items: { '1-9-2020': [reminder] }
    };
    const expectedState = {
      ...initialState,
      items: { '1-9-2020': [updatedReminder] }
    };
    expect(
      remindersReducer(
        initialMockPopulatedState,
        actions.updateReminder(updatedReminder)
      )
    ).toEqual(expectedState);
  });

  it('should handle REMOVE_REMINDER', () => {
    const initialMockPopulatedState = {
      ...initialState,
      items: { '1-9-2020': [reminder] }
    };
    const expectedState = { ...initialState, items: { '1-9-2020': [] } };
    expect(
      remindersReducer(
        initialMockPopulatedState,
        actions.removeReminder(reminder)
      )
    ).toEqual(expectedState);
  });

  it('should handle REMOVE_REMINDERS_BY_DATE', () => {
    const additionalReminder = {
      ...reminder,
      title: 'Another Mock Reminder',
      time: '10:00'
    };
    const initialMockPopulatedState = {
      ...initialState,
      items: { '1-9-2020': [reminder, additionalReminder] }
    };
    const expectedState = { ...initialState, items: {} };
    expect(
      remindersReducer(
        initialMockPopulatedState,
        actions.removeRemindersByDate('1-9-2020')
      )
    ).toEqual(expectedState);
  });

  it('should handle OPEN_MODAL', () => {
    const expectedState = { ...initialState, shouldDisplayModal: true };
    expect(remindersReducer(undefined, actions.openModal())).toEqual(
      expectedState
    );
  });

  it('should handle CLOSE_MODAL', () => {
    const initialMockPopulatedState = {
      ...initialState,
      shouldDisplayModal: true
    };
    const expectedState = { ...initialState, shouldDisplayModal: false };
    expect(
      remindersReducer(initialMockPopulatedState, actions.closeModal())
    ).toEqual(expectedState);
  });
});
