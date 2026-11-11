import React, { useEffect, useState } from 'react';
import { TextField, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import searchCities from '../../services/places/places.service';

import './CityAutocomplete.scss';

const MIN_CHARS = 2;
const DEBOUNCE_MS = 300;

// City type-ahead backed by Photon (OpenStreetMap). Calls onChange with the
// "City, CC" value of the picked suggestion, or '' when cleared.
const CityAutocomplete = ({ onChange, label = 'Preferred city *' }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = inputValue.trim();
    if (query.length < MIN_CHARS) return undefined;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      setLoading(true);
      searchCities(query, { signal: controller.signal })
        .then(setOptions)
        .catch(() => {
          if (!controller.signal.aborted) setOptions([]);
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false);
        });
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [inputValue]);

  return (
    <div className="city-autocomplete">
      <Autocomplete
        id="reminder-city"
        options={inputValue.trim().length < MIN_CHARS ? [] : options}
        loading={loading}
        filterOptions={x => x}
        getOptionLabel={option => option.label}
        getOptionSelected={(option, value) => option.label === value.label}
        noOptionsText={
          inputValue.trim().length < MIN_CHARS
            ? `Type at least ${MIN_CHARS} letters`
            : 'No cities found'
        }
        onInputChange={(event, value) => setInputValue(value)}
        onChange={(event, option) => onChange(option ? option.value : '')}
        renderInput={params => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={18} /> : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
      />
      <small className="city-autocomplete-attribution">
        Search by{' '}
        <a href="https://photon.komoot.io" target="_blank" rel="noopener noreferrer">
          Photon
        </a>{' '}
        · ©{' '}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenStreetMap
        </a>{' '}
        contributors
      </small>
    </div>
  );
};

export default CityAutocomplete;
