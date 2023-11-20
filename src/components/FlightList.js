import React, { useMemo, useCallback } from 'react';
import flightsData from '../assets/flightsData.json';
import '../styles/FlightList.css';
import { formatDate } from '../commons/utility';
import { PRICE_UNAVAILABLE, SELECT_FLIGHTS_MESSAGE } from '../commons/Constants';
import { Link } from 'react-router-dom';

const FlightList = ({
  oneWay,
  selectedDate,
  onFlightSelect,
  returnSelectedDate,
  displayLimit,
  departure,
  destination,
  ...props
}) => {
  const filteredFlights = useMemo(() => {
    return flightsData.filter((flight) => {
      var formattedDate = formatDate(flight.ScheduledTimeFull);
      if (oneWay) {
        return (
          formattedDate.split(' ')[0] === selectedDate &&
          flight.FromAirportName === departure &&
          flight.ToAirportName === destination
        );
      } else {
        return (
          flight.departureDate === selectedDate && flight.returnDate === returnSelectedDate
        );
      }
    });
  }, [flightsData, oneWay, selectedDate, departure, destination, returnSelectedDate]);

  const renderFlightItem = useCallback(
    (flight) => (
      <li key={flight.FlightId} className="flight-item">
        <div>
          {flight.FromAirportName} to {flight.ToAirportName}
        </div>
        <div>
          {flight.ScheduledTimeFull} {oneWay ? '' : `to ${flight.returnDate}`}
        </div>
        <div>{flight.price ? `$${flight.price}` : PRICE_UNAVAILABLE}</div>
        <button onClick={() => onFlightSelect(flight)} className="select-button">
          Select
        </button>
      </li>
    ),
    [onFlightSelect, oneWay]
  );

  const flightItems = useMemo(() => {
    return filteredFlights.slice(0, displayLimit).map((flight) => renderFlightItem(flight));
  }, [filteredFlights, displayLimit, renderFlightItem]);

  return (
    <div className="flight-list-container">
      <h3>Available Flights</h3>
      <ul className="flight-list">{filteredFlights.length > 0 ? flightItems : SELECT_FLIGHTS_MESSAGE}
        {displayLimit > 0 && filteredFlights.length > displayLimit && (
          <Link to={'flight-full-list/' + selectedDate + '/' + oneWay}>
            <button className="select-button centered">Show more</button>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default FlightList;
