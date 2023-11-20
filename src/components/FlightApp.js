import React, { useState } from 'react';
import FlightSearch from './FlightSearch';
import ItinerarySummary from './ItinerarySummary';
import '../styles/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { lazy } from 'react';
import { Suspense } from 'react';
import Navbar from './Navbar';

const FlightApp = () => {
  const [selectedFlights, setSelectedFlights] = useState([]);

  const handleFlightSelection = (flight) => {
    setSelectedFlights([...selectedFlights, flight]);
  };


  return (
    <div className="app-container">
        <Navbar selectedFlights={selectedFlights} /> 

      <div className="overlay"></div>
      <h1>Flight Booking App</h1>
      <div className="app-content">
        <FlightSearch onFlightSelect={handleFlightSelection} />
      </div>
    </div>

  );
};

export default FlightApp;
