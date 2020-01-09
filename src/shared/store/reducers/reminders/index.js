import initialState from './initialState';
import * as actionTypes from '../../actionTypes/remindersActionTypes';

const remindersReducer = (state = initialState, action) => {
  let dateSchedule, reminders;

  switch (action.type) {
    case actionTypes.FETCH_REMINDERS:
      return state; // return current list of reminders
    case actionTypes.ADD_REMINDER:
      const newReminder = action.payload.reminder;
      let currentRemindersByDate = state.items[newReminder.date]
        ? state.items[newReminder.date]
        : [];
      dateSchedule = {};
      dateSchedule[newReminder.date] = [
        ...currentRemindersByDate,
        {
          ...newReminder,
          id: newReminder.date + '_' + currentRemindersByDate.length
        }
      ];

      return {
        ...state,
        items: { ...state.items, ...dateSchedule }
      };
    case actionTypes.UPDATE_REMINDER:
      const updatedReminder = action.payload.reminder;
      reminders = state.items[updatedReminder.date].filter(
        item => item.id !== updatedReminder.id
      );

      dateSchedule = {};
      dateSchedule[updatedReminder.date] = [...reminders, updatedReminder];

      return { ...state, items: { ...state.items, ...dateSchedule } };

    case actionTypes.REMOVE_REMINDER:
      const removeReminder = action.payload.reminder;
      reminders = state.items[removeReminder.date].filter(
        item => item.id !== removeReminder.id
      );

      dateSchedule = {};
      dateSchedule[removeReminder.date] = reminders;

      return {
        ...state,
        items: { ...state.items, ...dateSchedule }
      };

    case actionTypes.REMOVE_REMINDERS_BY_DATE:
      const currentDateSchedules = { ...state.items };
      delete currentDateSchedules[action.payload.date];

      return {
        ...state,
        items: { ...currentDateSchedules }
      };

    case actionTypes.OPEN_MODAL:
      return { ...state, shouldDisplayModal: true };

    case actionTypes.CLOSE_MODAL:
      return { ...state, shouldDisplayModal: false };

    default:
      return state;
  }
};

export default remindersReducer;
