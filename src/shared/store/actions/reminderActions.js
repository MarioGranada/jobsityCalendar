import * as actionTypes from '../actionTypes/remindersActionTypes';

export const fetchReminders = reminders => ({
  type: actionTypes.FETCH_REMINDERS,
  payload: { reminders }
});

export const addReminder = reminder => ({
  type: actionTypes.ADD_REMINDER,
  payload: { reminder }
});

export const updateReminder = reminder => ({
  type: actionTypes.UPDATE_REMINDER,
  payload: { reminder }
});

export const removeReminder = reminder => ({
  type: actionTypes.REMOVE_REMINDER,
  payload: { reminder }
});

export const removeRemindersByDate = date => ({
  type: actionTypes.REMOVE_REMINDERS_BY_DATE,
  payload: { date }
});

export const openModal = () => ({
  type: actionTypes.OPEN_MODAL
});

export const closeModal = () => ({
  type: actionTypes.CLOSE_MODAL
});
