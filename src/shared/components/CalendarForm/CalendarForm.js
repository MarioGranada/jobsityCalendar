import React, { useState, useEffect } from 'react';
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
  closeModal,
  removeReminder
} from '../../store/actions/reminderActions';

const CalendarForm = ({
  selectedDate,
  selectedReminder,
  isUpdatingReminder
}) => {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({});

  const [selectedCity, setSelectedCity] = useState('');

  const isModalOpen = useSelector(state => state.reminders.shouldDisplayModal);

  useEffect(() => {
    let initialFormState = isUpdatingReminder
      ? selectedReminder
      : {
          time: '07:30',
          title: '',
          username: '',
          color: 'red'
        };
    setFormState(initialFormState);
    setSelectedCity((selectedReminder && selectedReminder.city) || '');
  }, [selectedDate, selectedReminder, isUpdatingReminder]);

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
              }}
              value={formState.title}
            />
          </FormControl>

          <FormControl className="calendar-form-control">
            {isUpdatingReminder ? (
              <div className="current-city">
                <div>City: {selectedCity}</div>

                <div>Current weather: {selectedCity}</div>
              </div>
            ) : null}
            <AlgoliaPlaces
              placeholder="Preferred city"
              language="en"
              type="city"
              onChange={({ suggestion }) => {
                setSelectedCity(suggestion.name);
              }}
            />
          </FormControl>
          <FormControl className="calendar-form-control">
            <TextField
              label="Time"
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
              {isUpdatingReminder ? 'Update Reminder' : 'Add Reminder'}
            </Button>
            {isUpdatingReminder ? (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  dispatch(removeReminder(selectedReminder));
                  dispatch(closeModal());
                }}
              >
                Delete
              </Button>
            ) : null}
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
