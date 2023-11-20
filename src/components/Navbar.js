import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItinerarySummary from './ItinerarySummary';
import '../styles/Navbar.css';

const Navbar = ({ selectedFlights }) => {
  const [isItenarySummaryOpen, setIsItenarySummaryOpen] = useState(false);

  const handleItineraryInfo = () => {
    setIsItenarySummaryOpen(!isItenarySummaryOpen);
    console.log("iteneanana ", selectedFlights);
  };

  return (
    <div>
      <div className="maroon-border"></div>
      <nav>
        <div className="navbar">
          <div className="nav-right">
            <button onClick={handleItineraryInfo}>Itinerary Info</button>
          </div>
        </div>
      </nav>

      {isItenarySummaryOpen ? (
        <ItinerarySummary
          selectedFlights={selectedFlights}
          open={!!isItenarySummaryOpen}
          handleClose={handleItineraryInfo}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Navbar;
