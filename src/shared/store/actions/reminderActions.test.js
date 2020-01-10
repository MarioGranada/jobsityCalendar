import * as actions from './reminderActions';
import * as actionTypes from '../actionTypes/remindersActionTypes';

const reminder = {
  date: '1-9-2020',
  id: '1-9-2020_0',
  time: '07:30',
  title: 'Reminder Mock',
  username: 'Reminder Mock Username',
  city: 'Barcelona'
};

const date = '1-9-2020';

describe('reminderActions [Actions]', () => {
  it('should call fetch reminders action when calling reminders', () => {
    const expectedAction = {
      type: actionTypes.FETCH_REMINDERS
    };
    expect(actions.fetchReminders()).toEqual(expectedAction);
  });

  it('should create an add reminder action when creating a new reminder', () => {
    const expectedAction = {
      type: actionTypes.ADD_REMINDER,
      payload: { reminder }
    };

    expect(actions.addReminder(reminder)).toEqual(expectedAction);
  });

  it('should call udpate reminder action when udpating reminder', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_REMINDER,
      payload: { reminder }
    };
    expect(actions.updateReminder(reminder)).toEqual(expectedAction);
  });

  it('should call remove reminder action when removing reminder', () => {
    const expectedAction = {
      type: actionTypes.REMOVE_REMINDER,
      payload: { reminder }
    };
    expect(actions.removeReminder(reminder)).toEqual(expectedAction);
  });

  it('should call remove reminders by date when removing reminders for a given date', () => {
    const expectedAction = {
      type: actionTypes.REMOVE_REMINDERS_BY_DATE,
      payload: { date }
    };
    expect(actions.removeRemindersByDate(date)).toEqual(expectedAction);
  });

  it('should call open modal action when opening modal', () => {
    const expectedAction = {
      type: actionTypes.OPEN_MODAL
    };
    expect(actions.openModal()).toEqual(expectedAction);
  });

  it('should call close modal when closing modal', () => {
    const expectedAction = {
      type: actionTypes.CLOSE_MODAL
    };
    expect(actions.closeModal()).toEqual(expectedAction);
  });
});
