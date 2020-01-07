import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Button
} from '@material-ui/core';
import AlgoliaPlaces from 'algolia-places-react';

import './CalendarForm.scss';
import classNames from 'classnames';
import { addReminder } from '../../store/actions/reminderActions';
import getWeatherDataByCity from '../../services/weather/weather.service';

const CalendarForm = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    time: '07:30',
    color: 'red',
    title: '',
    city: '',
    username: ''
  });

  return (
    <div
      className={classNames('calendar-form-container', {
        shouldDisplayForm: !!selectedDate
      })}
    >
      <form noValidate autoComplete="off">
        <FormControl>
          <TextField
            disabled
            label="Date"
            value={selectedDate}
            inputProps={{
              readOnly: true
            }}
            onChange={e => {
              setFormState({ ...formState, date: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Username"
            onChange={e => {
              setFormState({ ...formState, username: e.target.value });
              console.log('username in form', formState);
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Reminder title"
            inputProps={{
              maxLength: 30
            }}
            onChange={e => {
              setFormState({ ...formState, title: e.target.value });
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel component="legend">Priority level (color)</FormLabel>
          <RadioGroup
            onChange={e => {
              setFormState({ ...formState, color: e.target.value });
            }}
            value={formState.color}
          >
            <FormControlLabel
              value="red"
              control={<Radio />}
              label="High Priority"
            />
            <FormControlLabel
              value="yellow"
              control={<Radio />}
              label="Priority"
            />
            <FormControlLabel
              value="green"
              control={<Radio />}
              label="Low Priority"
            />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel component="legend">City</FormLabel>
          <AlgoliaPlaces
            placeholder="Preferred city"
            language="en"
            type="city"
            onChange={({ suggestion }) => {
              setFormState({ ...formState, city: suggestion.name });
            }}
          ></AlgoliaPlaces>
        </FormControl>

        <FormControl>
          <TextField
            type="time"
            defaultValue={formState.time}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 300 // 5 min
            }}
            onChange={e => {
              setFormState({ ...formState, time: e.target.value });
            }}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(addReminder({ ...formState, date: selectedDate }));
            getWeatherDataByCity('Buenos aires').then(data => {
              console.log('weather data', data);
            });
          }}
        >
          Add Reminder
        </Button>
      </form>
    </div>
  );
};

export default CalendarForm;
