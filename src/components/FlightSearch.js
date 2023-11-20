import React, { useState } from 'react';
import { DISPLAY_LIMIT } from '../commons/Constants';
import FlightList from './FlightList';
import '../styles/FlightSearch.css';
import { Autocomplete, TextField } from '@mui/material'; 
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const FlightSearch = ({ onFlightSelect }) => {
  const [oneWay, setOneWay] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [returnSelectedDate, setReturnSelectedDate] = useState(null);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleReturnDateChange = (date) => {
    setReturnSelectedDate(date);
  };

  const handleFlightSelect = (flight) => {
    onFlightSelect(flight);
  };

  const departureOptions = ['Oslo', 'Stockholm', 'Copenhagen'];
  const destinationOptions = ['Oslo', 'Stockholm', 'Copenhagen'];

  return (
    <div className="flight-list-container">
      <h2>Flight Search</h2>
      <div className="flight-options">
      <div className="radio-container">

        <label className="custom-font">
          <input
            type="radio"
            value="one-way"
            checked={oneWay}
            className="custom-radio"
            onChange={() => setOneWay(true)}
          />
          One Way
        </label>
        </div>

        <div className="radio-container">

        <label className="custom-font">
          <input
            type="radio"
            value="return"
            checked={!oneWay}
            className="custom-radio"
            onChange={() => setOneWay(false)}
          />
          Return
        </label>
        </div>

        <Autocomplete
          value={departure}
          onChange={(event, newValue) => {
            setDeparture(newValue);
          }}
          options={departureOptions}
          renderInput={(params) => (
            <TextField {...params} label="Departure" variant="outlined" className="autocomplete-input"/>
          )}
        />

        <Autocomplete
          value={destination}
          onChange={(event, newValue) => {
            setDestination(newValue);
          }}
          options={destinationOptions}
          renderInput={(params) => (
            <TextField {...params} label="Destination" variant="outlined" className="autocomplete-input"/>
          )}
        />

      
        <input
          type="date"
          onChange={(e) => handleDateChange(e.target.value)}
          className="date-picker"
        />

          
        {!oneWay && (
          <input
            type="date"
            onChange={(e) => handleReturnDateChange(e.target.value)}
            className="date-picker"
          />
        )}
      </div>

      <FlightList
        oneWay={oneWay}
        selectedDate={selectedDate}
        returnSelectedDate={returnSelectedDate}
        onFlightSelect={handleFlightSelect}
        displayLimit={DISPLAY_LIMIT}
        departure={departure}
        destination={destination}
      />
    </div>
  );
};

export default FlightSearch;
