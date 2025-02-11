import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import {Provider} from 'react-redux';
import store from './store'
import {SearchContextProvider} from './context/searchContext';
import {AuthContextProvider} from './context/authContext';
import {FlightProvider }from './context/flightContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <FlightProvider>
    <AuthContextProvider>
    <SearchContextProvider>
    <App />
    </SearchContextProvider >
    </AuthContextProvider>
    </FlightProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
