import React, { useState } from 'react';
import { connect } from 'react-redux';
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

const CalendarForm = ({ setCalendarState }) => {
  const [formState, setFormState] = useState({});

  const onChangeColor = event => {
    setFormState({ ...formState, color: event.target.value });
  };

  return (
    <div className="calendar-form-container">
      <form noValidate autoComplete="off">
        <FormControl>
          <TextField
            label="Reminder title"
            inputProps={{
              maxLength: 30
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel component="legend">Priority level (color)</FormLabel>
          <RadioGroup onChange={onChangeColor}>
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
          ></AlgoliaPlaces>
        </FormControl>

        <FormControl>
          <TextField
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 300 // 5 min
            }}
          ></TextField>
        </FormControl>
        <Button variant="contained" color="primary">
          Add Reminder
        </Button>
      </form>
    </div>
  );
};

export default CalendarForm;
