// FlightContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const FlightContext = createContext();

// Create a provider component
export const FlightProvider = ({ children }) => {
  const [flightData, setFlightData] = useState(null);
  console.log('context',flightData)

  return (
    <FlightContext.Provider value={{ flightData, setFlightData }}>
      {children}
    </FlightContext.Provider>
  );
};
