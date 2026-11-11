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
import CityAutocomplete from '../CityAutocomplete/CityAutocomplete';
import './CalendarForm.scss';

import {
  addReminder,
  updateReminder,
  closeModal,
  removeReminder
} from '../../store/actions/reminderActions';
import getWeatherDataByCity from '../../services/weather/weather.service';

const CalendarForm = ({
  selectedDate,
  selectedReminder,
  isUpdatingReminder
}) => {
  const dispatch = useDispatch();

  // Calendar remounts this form (via `key`) for every new selection, so the
  // initial state can be derived from props once instead of synced in an effect.
  const [formState, setFormState] = useState(() =>
    isUpdatingReminder
      ? selectedReminder
      : {
          time: '07:30',
          title: '',
          username: '',
          color: 'red'
        }
  );

  const [selectedCity, setSelectedCity] = useState(
    (selectedReminder && selectedReminder.city) || ''
  );

  const [cityForecast, setCityForecast] = useState(null);

  const isModalOpen = useSelector(state => state.reminders.shouldDisplayModal);

  useEffect(() => {
    if (!selectedCity) return undefined;
    let active = true;
    getWeatherDataByCity(selectedCity)
      .then(({ data }) => {
        if (active) setCityForecast(data.weather[0]);
      })
      .catch(() => {
        // unknown city, network error or missing API key: show no forecast
        if (active) setCityForecast(null);
      });
    return () => {
      active = false;
    };
  }, [selectedCity]);

  return (
    <Modal open={isModalOpen}>
      <div className="calendar-form-container">
        <form noValidate autoComplete="off">
          <FormControl className="calendar-form-control">
            <TextField
              id="reminder-date"
              disabled
              label="Date *"
              value={selectedDate}
              inputProps={{
                readOnly: true
              }}
            />
          </FormControl>
          <FormControl className="calendar-form-control">
            <TextField
              id="reminder-username"
              label="Username"
              value={formState.username}
              onChange={e => {
                setFormState({ ...formState, username: e.target.value });
              }}
              error={!formState.username}
              helperText="Required *"
            />
          </FormControl>
          <FormControl className="calendar-form-control">
            <TextField
              id="reminder-title"
              label="Reminder title"
              inputProps={{
                maxLength: 30
              }}
              onChange={e => {
                setFormState({ ...formState, title: e.target.value });
              }}
              value={formState.title}
              error={!formState.title}
              helperText="Required *"
            />
          </FormControl>

          <FormControl className="calendar-form-control">
            <div className="current-city">
              <div>City: {selectedCity}</div>
              <div>
                City Forecast:{' '}
                {selectedCity && cityForecast ? (
                  <span>
                    {cityForecast.main} - {cityForecast.description}{' '}
                    <img
                      src={`https://openweathermap.org/img/w/${cityForecast.icon}.png`}
                      alt="forecast_icon"
                    />
                  </span>
                ) : null}
              </div>
            </div>

            <CityAutocomplete
              onChange={city => {
                setSelectedCity(city);
              }}
            />
          </FormControl>
          <FormControl className="calendar-form-control">
            <TextField
              id="reminder-time"
              label="Time *"
              type="time"
              value={formState.time || ''}
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
            <FormLabel component="legend">Priority level (color) *</FormLabel>
            <RadioGroup
              name="reminder-color"
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
              disabled={
                !formState.title || !formState.username || !selectedCity
              }
              //Other fields no need validation since they are prepopulated and use default values
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
