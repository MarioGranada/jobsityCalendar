import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Button,
  Modal
} from '@material-ui/core';
import AlgoliaPlaces from 'algolia-places-react';
import './CalendarForm.scss';

import {
  addReminder,
  updateReminder,
  closeModal
} from '../../store/actions/reminderActions';

const CalendarForm = ({
  selectedDate,
  selectedReminder,
  isUpdatingReminder
}) => {
  const dispatch = useDispatch();
  const initialFormState = isUpdatingReminder
    ? selectedReminder
    : {
        time: '07:30',
        title: '',
        username: '',
        color: ''
      };
  const [formState, setFormState] = useState(initialFormState);

  const [selectedCity, setSelectedCity] = useState(initialFormState.city || '');

  const isModalOpen = useSelector(state => state.reminders.shouldDisplayModal);

  return (
    <Modal open={isModalOpen}>
      <div className="calendar-form-container">
        <form noValidate autoComplete="off">
          <FormControl className="calendar-form-control">
            <TextField
              disabled
              label="Date"
              value={selectedDate}
              inputProps={{
                readOnly: true
              }}
            />
          </FormControl>
          <FormControl className="calendar-form-control">
            <TextField
              label="Username"
              value={formState.username}
              onChange={e => {
                setFormState({ ...formState, username: e.target.value });
                console.log('in here', formState);
              }}
            />
          </FormControl>
          <FormControl className="calendar-form-control">
            <TextField
              label="Reminder title"
              inputProps={{
                maxLength: 30
              }}
              onChange={e => {
                setFormState({ ...formState, title: e.target.value });
                console.log('in here', formState);
              }}
              value={formState.title}
            />
          </FormControl>

          <FormControl className="calendar-form-control">
            <AlgoliaPlaces
              placeholder="Preferred city"
              language="en"
              type="city"
              onChange={({ suggestion }) => {
                console.log('in here city before', formState);
                // setFormState({ ...formState, city: suggestion.name });
                setSelectedCity(suggestion.name);
                console.log('in here city', formState);
              }}
            />
          </FormControl>
          <FormControl className="calendar-form-control">
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

          <FormControl className="calendar-form-control">
            <FormLabel component="legend">Priority level (color)</FormLabel>
            <RadioGroup
              onChange={e => {
                setFormState({ ...formState, color: e.target.value });
                e.stopPropagation();
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

          <div className="buttons-row">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(
                  isUpdatingReminder
                    ? updateReminder({
                        ...selectedReminder,
                        ...formState,
                        date: selectedDate,
                        city: selectedCity
                      })
                    : addReminder({
                        ...formState,
                        date: selectedDate,
                        city: selectedCity
                      })
                );
                dispatch(closeModal());
              }}
            >
              Add Reminder
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(closeModal());
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CalendarForm;
