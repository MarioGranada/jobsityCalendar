import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './Calendar.scss';

const Calendar = ({ users, reminders }) => {
  const calendarDay = day => {
    return <span>{day.getDate()}</span>;
  };

  return <DayPicker showOutsideDays renderDay={calendarDay} />;
};

export default Calendar;
