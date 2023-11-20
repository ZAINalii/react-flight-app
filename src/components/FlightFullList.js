import React, { useMemo, useState, useCallback } from 'react';
import flightsData from '../assets/flightsData.json';
import '../styles/FlightList.css';
import { formatDate } from '../commons/utility';
import { PRICE_UNAVAILABLE } from '../commons/Constants';
import { useParams } from 'react-router-dom';
import ItineraryInfo from './ItineraryInfo';

const FlightFullList = ({
  oneWay,
  selectedDate,
  onFlightSelect,
  returnSelectedDate,
  displayLimit,
}) => {
  const params = useParams();
  const [selectedFlight, setSelectedFlight] = useState(null);

  const filteredFlights = useMemo(() => {
    return flightsData.filter((flight) => {
      var formattedDate = formatDate(flight.ScheduledTimeFull);
      if (formattedDate) {
        if (params.oneway) {
          return formattedDate.split(' ')[0] === params.value;
        } else {
          return (
            flight.departureDate === params.value &&
            flight.returnDate === returnSelectedDate
          );
        }
      }
    });
  }, [flightsData, params.oneway, params.value, returnSelectedDate]);

  const onFlightSelectItinerary = useCallback(
    (flight) => {
      setSelectedFlight(flight);
    },
    []
  );

  const handleCloseItinerary = useCallback(() => {
    setSelectedFlight(null);
  }, []);

  return (
    <div className="flight-list-container">
      <h3>Available Flights</h3>
      <ul className="flight-list">
        {filteredFlights.slice(0, displayLimit).map((flight) => (
          <li key={flight.FlightId} className="flight-item">
            <div>
              {flight.FromAirportName} to {flight.ToAirportName}
            </div>
            <div>{formatDate(flight.ScheduledTimeFull)}</div>
            <div>{flight.price ? `$${flight.price}` : PRICE_UNAVAILABLE}</div>
            <button
              onClick={() => onFlightSelectItinerary(flight)}
              className="select-button"
            >
              Select
            </button>
          </li>
        ))}
      </ul>

      {selectedFlight != null && (
        <ItineraryInfo
          open={!!selectedFlight}
          handleClose={handleCloseItinerary}
          flight={selectedFlight}
        />
      )}
    </div>
  );
};

export default FlightFullList;
