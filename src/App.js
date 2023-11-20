import React, { useState } from 'react';
import FlightSearch from './components/FlightSearch';
import ItinerarySummary from './components/ItinerarySummary';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { lazy } from 'react';
import { Suspense } from 'react';
import FlightApp from './components/FlightApp';
import FlightFullList from './components/FlightFullList';
import Navbar from './components/Navbar';

const App = () => { 
  const FlightFullListPage = lazy(() => import('./components/FlightFullList'));

  return (
    <Router> 

      <Routes>
        <Route path="" element={
              <Suspense fallback={<div>Loading...</div>}>
                <FlightApp />
              </Suspense>
            } />
      <Route  name="/flight-full-list" path="/flight-full-list/:value/:oneway" Component={FlightFullList}/> 

    </Routes>
  </Router>


  );
};

export default App;
