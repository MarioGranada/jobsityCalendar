import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './Calendar.scss';
import CalendarForm from '../CalendarForm/CalendarForm';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import EditIcon from '@material-ui/icons/Edit';

import { useSelector, useDispatch } from 'react-redux';
import {
  removeRemindersByDate,
  removeReminder,
  openModal
} from '../../store/actions/reminderActions';

const Calendar = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isUpdatingReminder, setIsUpdatingReminder] = useState(false);

  const [selectedReminder, setSelectedReminder] = useState(null);

  const reminders = useSelector(state => state.reminders.reminders);

  const calendarDay = day => {
    const formattedDay = day.toLocaleDateString().replace(/\//g, '-');
    return (
      <div className="day-box">
        <span>{day.getDate()}</span>
        <br />

        <div className="date-buttons-row">
          <AddCircleIcon
            variant="primary"
            onClick={() => {
              onCalendarDateClick(day);
            }}
            className="calendar-icon"
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
        <br />
        <div className="date-reminders-container">
          {reminders[formattedDay] &&
            reminders[formattedDay].map(item => (
              <div className="reminder-container" key={item.id}>
                <div className="date-title">{item.title}</div>
                <div className="reminder-buttons-row">
                  <EditIcon
                    onClick={() => {
                      debugger;
                      setSelectedReminder(item);
                      setSelectedDate(formattedDay);
                      setIsUpdatingReminder(true);
                      dispatch(openModal());
                    }}
                    className="calendar-icon"
                  />
                  <DeleteIcon
                    onClick={() => {
                      dispatch(removeReminder(item));
                    }}
                    className="calendar-icon"
                  />
                </div>
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
    dispatch(openModal());
    debugger;
  };

  return (
    <div className="jobsity-calendar-container">
      <DayPicker
        showOutsideDays
        renderDay={calendarDay}
        fromMonth={new Date()}
      />
      <CalendarForm
        isUpdatingReminder={isUpdatingReminder}
        selectedDate={selectedDate}
        selectedReminder={selectedReminder || null}
      />
    </div>
  );
};

export default Calendar;
