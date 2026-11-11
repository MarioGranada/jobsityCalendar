import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './Calendar.scss';
import CalendarForm from '../CalendarForm/CalendarForm';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

import { useSelector, useDispatch } from 'react-redux';
import {
  removeRemindersByDate,
  openModal
} from '../../store/actions/reminderActions';

const Calendar = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isUpdatingReminder, setIsUpdatingReminder] = useState(false);

  const [selectedReminder, setSelectedReminder] = useState(null);
  // bumped on every open so CalendarForm remounts with fresh state
  const [formKey, setFormKey] = useState(0);

  const reminders = useSelector(state => state.reminders.items);

  const calendarDay = day => {
    const formattedDay = day.toLocaleDateString().replace(/\//g, '-');
    return (
      <div className="day-box" id={'day-box_' + formattedDay}>
        <span>{day.getDate()}</span>
        <br />

        <div className="date-buttons-row">
          <AddCircleIcon
            variant="primary"
            onClick={() => {
              onCalendarDateClick(day);
            }}
            className="calendar-icon"
            label={formattedDay}
          />
          <span
            className="clear-date-label"
            onClick={() => {
              dispatch(removeRemindersByDate(formattedDay));
            }}
          >
            Clear{' '}
            <HighlightOffRoundedIcon
              variant="primary"
              className="calendar-icon clear-icon"
            />
          </span>
        </div>

        <div className="date-reminders-container">
          {reminders[formattedDay] &&
            reminders[formattedDay].map(item => (
              <div
                className={`date-title ${item.color}`}
                onClick={() => {
                  setSelectedReminder(item);
                  setSelectedDate(formattedDay);
                  setIsUpdatingReminder(true);
                  setFormKey(key => key + 1);
                  dispatch(openModal());
                }}
                key={item.id}
              >
                {item.title}
              </div>
            ))}
        </div>
      </div>
    );
  };

  const onCalendarDateClick = day => {
    setSelectedDate(day.toLocaleDateString().replace(/\//g, '-'));
    setSelectedReminder(null);
    setIsUpdatingReminder(false);
    setFormKey(key => key + 1);
    dispatch(openModal());
  };

  return (
    <div className="jobsity-calendar-container">
      <DayPicker
        showOutsideDays
        renderDay={calendarDay}
        fromMonth={new Date()}
      />
      <CalendarForm
        key={formKey}
        isUpdatingReminder={isUpdatingReminder}
        selectedDate={selectedDate}
        selectedReminder={selectedReminder || null}
      />
    </div>
  );
};

export default Calendar;
