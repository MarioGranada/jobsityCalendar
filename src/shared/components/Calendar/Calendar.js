import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './Calendar.scss';
import CalendarForm from '../CalendarForm/CalendarForm';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { removeRemindersByDate } from '../../store/actions/reminderActions';

const Calendar = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState('');
  const [isUpdatingReminder, setIsUpdatingReminder] = useState(false);

  const [selectedReminder, setSelectedReminder] = useState({});

  const reminders = useSelector(state => state.reminders.reminders);

  const calendarDay = day => {
    const formattedDay = day.toLocaleDateString().replace(/\//g, '-');
    return (
      <div className="day-box">
        <span>{day.getDate()}</span>
        <br />

        <span>
          <AddCircleIcon
            variant="primary"
            onClick={() => {
              onCalendarDateClick(day);
            }}
          />
          <DeleteIcon
            variant="primary"
            onClick={() => {
              dispatch(removeRemindersByDate(formattedDay));
            }}
          />
        </span>
        <br />
        <div className="date-reminders-container">
          {reminders[formattedDay] &&
            reminders[formattedDay].map(item => (
              <div className="date-title" key={item.id}>
                {item.title}
              </div>
            ))}
        </div>
      </div>
    );
  };

  const onCalendarDateClick = day => {
    setSelectedDate(day.toLocaleDateString().replace(/\//g, '-'));
  };

  return (
    <div>
      <DayPicker showOutsideDays renderDay={calendarDay} />
      <CalendarForm
        isUpdating={isUpdatingReminder}
        selectedDate={selectedDate}
        selectedReminder={selectedReminder}
      />
    </div>
  );
};

export default Calendar;
