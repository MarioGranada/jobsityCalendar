import React, { useState } from 'react';
import Calendar from '../../shared/components/Calendar/Calendar';
import './HomeContainer.scss';
import CalendarForm from '../../shared/components/CalendarForm/CalendarForm';

const HomeContainer = () => {
  const [calendarState, setCalendarState] = useState({
    users: [],
    reminders: []
  });

  return (
    <div className="home-container">
      <span> this is my home container</span>
      <Calendar
        users={calendarState.users}
        reminders={calendarState.reminders}
      />
      <CalendarForm setCalendarState={setCalendarState} />
    </div>
  );
};

export default HomeContainer;
