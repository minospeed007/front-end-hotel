import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import paris from '../../assets/paris2.png';
import new_york from '../../assets/new_york.jpg';
import shangai from '../../assets/shangai.png';

import {  Paper } from '@mui/material';
import dxb from '../../assets/dxb.avif';

import { Link } from 'react-router-dom';
import './flight.css';
import './flight_list.css';
import {  Calendar } from 'react-date-range';
import { format, addDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Navbar from '../../components/navbar/Navbar';
import { FlightContext } from '../../context/flightContext';
import small from '../../assets/pay-small-icon.png';


const FlightSearch = () => {
  const [dubai, setDubai] = useState('');
  const [madrid, setMadrid] = useState('');
  const [canada, setCanada] = useState('');


  const [sourceAirport, setSourceAirport] = useState('');
  const [destinationAirport, setDestinationAirport] = useState('');
  const [itineraryType, setItineraryType] = useState('ROUND_TRIP');
  const [numAdults, setNumAdults] = useState(1);
  const [cabinType, setCabinType] = useState('Economy');
  const [sortOrder, setSortOrder] = useState('Price');
  const [nonstop, setNonstop] = useState('0');
  const [openDepartureDate, setOpenDepartureDate] = useState(false);
  const [openReturnDate, setOpenReturnDate] = useState(false);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
const [onewayFlight, setOnewayFlight]=useState('')
  const departureDateRef = useRef();
  const returnDateRef = useRef();
  const { setFlightData } = useContext(FlightContext);
  const { flightData } = useContext(FlightContext);
  console.log('flight',flightData);
  // Get number of stops
  const getNumberOfStops = (segments) => segments?.length - 1;
  const formatTime = (dateTime) => moment(dateTime).format('HH:mm');

  const convertDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (departureDateRef.current && !departureDateRef.current.contains(event.target)) {
        setOpenDepartureDate(false);
      }
      if (returnDateRef.current && !returnDateRef.current.contains(event.target)) {
        setOpenReturnDate(false);
      }
    };
    handleCanadaFlight();
    handleMadridFlight();
    handleSearchFlight();
    handleDubaiFlight();
    console.log('Dubai',dubai);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [departureDateRef, returnDateRef]);

  const handleSearch = async () => {
    const formattedDepartureDate = format(departureDate, 'yyyy-MM-dd');

    const apiUrl = itineraryType === 'ONE_WAY'
      ? 'https://agoda-com.p.rapidapi.com/flights/search-one-way'
      : 'https://agoda-com.p.rapidapi.com/flights/search-roundtrip';

    const options = {
      method: 'GET',
      url: apiUrl,
      params: {
        origin: sourceAirport,
        destination: destinationAirport,
        departureDate: formattedDepartureDate,
        ...(itineraryType === 'ROUND_TRIP' && { returnDate: format(returnDate, 'yyyy-MM-dd') }),
        sort: sortOrder,
        adults: numAdults.toString(),
        cabinType: cabinType.toUpperCase(),
        stops: nonstop
      },
      headers: {
        'x-rapidapi-key': '46f44f79a1msh6d1a47c39ed677fp1cd9a6jsn779aa9920912',
        'x-rapidapi-host': 'agoda-com.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setFlightData(response.data);
      console.log("agoda_api", response.data);
      console.log('Data set in context');
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  };
  const paySmall = (price) => {
    const smallPrice = price / 3;
    return smallPrice;
  };

  const handleSearchFlight = async () => {
    const currentDate = new Date();
    const departureDate = addDays(currentDate, 3);
    const formattedDepartureDate = format(departureDate, 'yyyy-MM-dd');
  
    const apiUrl =  'https://agoda-com.p.rapidapi.com/flights/search-one-way';
    

    const options = {
      method: 'GET',
      url: apiUrl,
      params: {
        origin: 'CDG',
        destination: 'JFK',
        departureDate: formattedDepartureDate,
        cabinType: cabinType.toUpperCase(),
        stops: 0
      },
      headers: {
        'x-rapidapi-key': '46f44f79a1msh6d1a47c39ed677fp1cd9a6jsn779aa9920912',
        'x-rapidapi-host': 'agoda-com.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setOnewayFlight(response.data);
      console.log("agoda_api", response.data);
      console.log('Data set in context');
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  };
  const handleMadridFlight = async () => {
    const currentDate = new Date();
    const departureDate = addDays(currentDate, 3);
    const formattedDepartureDate = format(departureDate, 'yyyy-MM-dd');
  
    const apiUrl =  'https://agoda-com.p.rapidapi.com/flights/search-one-way';
    

    const options = {
      method: 'GET',
      url: apiUrl,
      params: {
        origin: 'MAD',
        destination: 'PVG',
        departureDate: formattedDepartureDate,
        cabinType: cabinType.toUpperCase(),
        stops: 0
      },
      headers: {
        'x-rapidapi-key': '46f44f79a1msh6d1a47c39ed677fp1cd9a6jsn779aa9920912',
        'x-rapidapi-host': 'agoda-com.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setMadrid(response.data);
      console.log("agoda_api", response.data);
      console.log('Data set in context');
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  };
  const handleDubaiFlight = async () => {
    const currentDate = new Date();
    const departureDate = addDays(currentDate, 3);
    const formattedDepartureDate = format(departureDate, 'yyyy-MM-dd');
  
    const apiUrl =  'https://agoda-com.p.rapidapi.com/flights/search-one-way';
    

    const options = {
      method: 'GET',
      url: apiUrl,
      params: {
        origin: 'BOM',
        destination: 'DXB',
        departureDate: formattedDepartureDate,
        cabinType: cabinType.toUpperCase(),
        stops: 0
      },
      headers: {
        'x-rapidapi-key': '46f44f79a1msh6d1a47c39ed677fp1cd9a6jsn779aa9920912',
        'x-rapidapi-host': 'agoda-com.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setDubai(response.data);
      console.log("Dubai", response.data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  };
  const handleCanadaFlight = async () => {
    const currentDate = new Date();
    const departureDate = addDays(currentDate, 3);
    const formattedDepartureDate = format(departureDate, 'yyyy-MM-dd');
  
    const apiUrl =  'https://agoda-com.p.rapidapi.com/flights/search-one-way';
    

    const options = {
      method: 'GET',
      url: apiUrl,
      params: {
        origin: 'HKG',
        destination: 'JFK',
        departureDate: formattedDepartureDate,
        cabinType: cabinType.toUpperCase(),
        stops: 0
      },
      headers: {
        'x-rapidapi-key': '46f44f79a1msh6d1a47c39ed677fp1cd9a6jsn779aa9920912',
        'x-rapidapi-host': 'agoda-com.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setCanada(response.data);
      console.log("Dubai", response.data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  };
  return (
    <>
      <Navbar />
      <div className='flight-img-div'>
        <div className="text-overlay">
          <div className="overlay-div">
            <h2 className='earn-h2'>Earn</h2>
            <br />
            <span className='bonus'>50% BONUS</span>
            <br />
            <div className='earn'> <span className="earn-text">on Flight Booking</span><br />
              <button className='book-btn'>Book Now</button>
            </div>
          </div>
        </div>
      </div>
      <div className='flight-div'>
        <h1>Flight Search</h1>
        <form className='flight-form'>
          <div className='form-row'>
            <label>
              <p>Source Airport Code:</p>
              <input type="text" value={sourceAirport} onChange={(e) => setSourceAirport(e.target.value)} className='flight-input' />
            </label>
            <label>
              <p>Destination Airport Code:</p>
              <input type="text" value={destinationAirport} onChange={(e) => setDestinationAirport(e.target.value)} className='flight-input' />
            </label>
          </div>
          <div className='form-row'>
            <label>
              <p>Departure Date:</p>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDepartureDate(!openDepartureDate)}
                  className="headerSearchText"
                >
                  {`${format(departureDate, 'MM/dd/yyyy')}`}
                </span>
                {openDepartureDate && (
                  <div ref={departureDateRef}>
                    <Calendar
                      date={departureDate}
                      onChange={(date) => {
                        setDepartureDate(date);
                        setOpenDepartureDate(false);
                      }}
                      minDate={new Date()}
                    />
                  </div>
                )}
              </div>
            </label>
            {itineraryType === 'ROUND_TRIP' && (
              <label>
                <p>Return Date:</p>
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                  <span
                    onClick={() => setOpenReturnDate(!openReturnDate)}
                    className="headerSearchText"
                  >
                    {`${format(returnDate, 'MM/dd/yyyy')}`}
                  </span>
                  {openReturnDate && (
                    <div ref={returnDateRef}>
                      <Calendar
                        date={returnDate}
                        onChange={(date) => {
                          setReturnDate(date);
                          setOpenReturnDate(false);
                        }}
                        minDate={departureDate}
                      />
                    </div>
                  )}
                </div>
              </label>
            )}
          </div>
          <div className='form-row'>
            <label>
              <p>Itinerary Type:</p>
              <select value={itineraryType} onChange={(e) => setItineraryType(e.target.value)} className='flight-input'>
                <option value="ONE_WAY">One Way</option>
                <option value="ROUND_TRIP">Round Trip</option>
              </select>
            </label>
            <label>
              <p>Number of Adults:</p>
              <input type="number" min="1" value={numAdults} onChange={(e) => setNumAdults(e.target.value)} className='flight-input' />
            </label>
          </div>
          <div className='form-row'>
            <label>
              <p>Class of Service:</p>
              <select value={cabinType} onChange={(e) => setCabinType(e.target.value)} className='flight-input'>
                <option value="Economy">Economy</option>
                <option value="PremiumEconomy"> Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First">First</option>
              </select>
            </label>
          </div>
          <div className='form-row'>
            <label>
              <p>Sort Order:</p>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className='flight-input'>
                <option value="Best">Best Value</option>
                <option value="Duration">Duration</option>
                <option value="Price">Price</option>
                <option value="OnwardDepartureTime"> Outbound departure time: Earliest first </option>
                <option value="OnwardArrivalTime">Outbound arrival time: Earliest first</option>
                <option value="ReturnDepartureTime"> Return departure time: Earliest first</option>
                <option value="ReturnArrivalTime"> Return arrival time: Earliest first</option>
              </select>
            </label>
            <label>
              <p>Stops:</p>
              <select value={nonstop} onChange={(e) => setNonstop(e.target.value)} className='flight-input'>
                <option value="0"> Direct</option>
                <option value="1">1 stop (It will include direct )</option>
                <option value="-1">2+ stops (It will include direct and 1 stop)</option>
              </select>
            </label>
          </div>
         
        </form>
        
        <Link to='/list_flight'>
        <div className='link-btn-div'>
            <button type="button" onClick={handleSearch}  className='search-btn'>Search Flights</button>
            </div>

          </Link>


      </div>
      <div className='oneWay-root-div'>
      <Paper className='offer-root' >
      

      <div className='offer-div'>
      <div className='h2-offer-div'>
      <h1>Offers</h1>
      </div>
        <div>
      <h3>Flight</h3>
      <hr className='flight-hr'/>
      </div>
      <div>
      <h3>Hotels</h3>     <hr className='hotel-hr'/>
      </div>

      </div>
      <div className='paper-root'>

        <Paper className='paper'>
      {onewayFlight?.data?.bundles?.[0] && (
  <div key={0} className='oneWay-div'>
    <div className='paris-img-div'>
    <img src={ paris } alt='Paris' className='paris-img'/>

    </div>

    <div className='oneWay-h4-div'>
      <div className='oneWay-img-div'>
        <h5 className='oneway-h'>Round Trip</h5>
        <div className='img-div-oneWay'>
        <img src={onewayFlight.data.bundles?.[0]?.outboundSlice.segments[0].carrierContent.carrierIcon} alt="" className='oneWay-img' />
        </div>
</div>
        <div className='flight-divs'>
        <h3>{onewayFlight.data.bundles[0].outboundSlice?.segments[0]?.airportContent.departureCityName}</h3>
              <h4>To</h4>
              <h3>{onewayFlight.data.bundles[0].outboundSlice.segments.slice(-1)[0].airportContent.arrivalCityName}</h3>

              </div>
              <div className='pay-div'>
      <h5 className='oneway-h'> Pay Now</h5>
      <h2 className='oneWay-h2'> ${onewayFlight?.data?.bundles?.[0]?.itineraries?.[0]?.itineraryInfo?.price?.usd?.charges?.[0]?.total?.inc}
        </h2>
        </div>
              <div className='oneWay-small-div'>
            <img src={small} alt='pay-small' className='pay-small-small' />
            <h3> ${paySmall(onewayFlight?.data?.bundles?.[0]?.itineraries?.[0]?.itineraryInfo?.price?.usd?.charges?.[0]?.total?.inc).toFixed(2)}</h3>
            <div className='book-now-div'>
           <button className='book-now-btns'>Book Now</button>
          </div>
             </div>
           
    </div>
    
  </div>
)}
</Paper>
 <Paper className='paper'>
      {madrid?.data?.bundles?.[0] && (
  <div key={0} className='oneWay-div'>
    <div className='paris-img-div'>
    <img src={ shangai} alt='Paris' className='paris-img'/>

    </div>

    <div className='oneWay-h4-div'>
      <div className='oneWay-img-div'>
        <h5 className='oneway-h'>Round Trip</h5>
        <div className='img-div-oneWay'>
        <img src={madrid.data.bundles?.[0]?.outboundSlice.segments[0].carrierContent.carrierIcon} alt="" className='oneWay-img' />
        </div>
</div>
        <div className='flight-divs'>
        <h3>{madrid.data.bundles[0].outboundSlice?.segments[0]?.airportContent.departureCityName}</h3>
              <h4>To</h4>
              <h3>{madrid.data.bundles[0].outboundSlice.segments.slice(-1)[0].airportContent.arrivalCityName}</h3>

              </div>
              <div className='pay-div'>
      <h5 className='oneway-h'> Pay Now</h5>
      <h2 className='oneWay-h2'> ${madrid?.data?.bundles?.[0]?.itineraries?.[0]?.itineraryInfo?.price?.usd?.charges?.[0]?.total?.inc}
        </h2>
        </div>
              <div className='oneWay-small-div'>
            <img src={small} alt='pay-small' className='pay-small-small' />
            <h3> ${paySmall(madrid?.data?.bundles?.[0]?.itineraries?.[0]?.itineraryInfo?.price?.usd?.charges?.[0]?.total?.inc).toFixed(2)}</h3>
            <div className='book-now-div'>
           <button className='book-now-btns'>Book Now</button>
          </div>
             </div>
           
    </div>
    
  </div>
)}
</Paper>

<Paper className='paper'>

      {canada?.data?.bundles?.[0] && (
  <div key={0} className='oneWay-div'>
    <div className='paris-img-div'>
    <img src={ new_york} alt='Paris' className='paris-img'/>

    </div>

    <div className='oneWay-h4-div'>
      <div className='oneWay-img-div'>
        <h5 className='oneway-h'>Round Trip</h5>
        <div className='img-div-oneWay'>
        <img src={canada.data.bundles?.[0]?.outboundSlice.segments[0].carrierContent.carrierIcon} alt="" className='oneWay-img' />
        </div>
</div>
        <div className='flight-divs'>
        <h3>{canada.data.bundles[0].outboundSlice?.segments[0]?.airportContent.departureCityName}</h3>
              <h4>To</h4>
              <h3>{canada.data.bundles[0].outboundSlice.segments.slice(-1)[0].airportContent.arrivalCityName}</h3>

              </div>
              <div className='pay-div'>
      <h5 className='oneway-h'> Pay Now</h5>
      <h2 className='oneWay-h2'> ${canada?.data?.bundles?.[0]?.itineraries?.[0]?.itineraryInfo?.price?.usd?.charges?.[0]?.total?.inc}
        </h2>
        </div>
              <div className='oneWay-small-div'>
            <img src={small} alt='pay-small' className='pay-small-small' />
            <h3> ${paySmall(canada?.data?.bundles?.[0]?.itineraries?.[0]?.itineraryInfo?.price?.usd?.charges?.[0]?.total?.inc).toFixed(2)}</h3>
            <div className='book-now-div'>
           <button className='book-now-btns'>Book Now</button>
          </div>
             </div>
           
    </div>
    
  </div>
)}
</Paper>

<Paper className='paper'>

      {dubai?.data?.bundles?.[0] && (
  <div key={0} className='oneWay-div'>
    <div className='paris-img-div'>
      <img src={ dxb } alt='Paris' className='paris-img'/>

    </div>

    <div className='oneWay-h4-div'>
      <div className='oneWay-img-div'>
        <h5 className='oneway-h'>Round Trip</h5>
        <div className='img-div-oneWay'>
        <img src={dubai.data.bundles?.[0]?.outboundSlice.segments[0].carrierContent.carrierIcon} alt="" className='oneWay-img' />
        </div>
</div>
        <div className='flight-divs'>
        <h3>{dubai.data.bundles[0].outboundSlice?.segments[0]?.airportContent.departureCityName}</h3>
              <h4>To</h4>
              <h3>{dubai.data.bundles[0].outboundSlice.segments.slice(-1)[0].airportContent.arrivalCityName}</h3>

              </div>
              <div className='pay-div'>
      <h5 className='oneway-h'> Pay Now</h5>
      <h2 className='oneWay-h2'> ${dubai?.data?.bundles?.[0]?.itineraries?.[0]?.itineraryInfo?.price?.usd?.charges?.[0]?.total?.inc}
        </h2>
        </div>
              <div className='oneWay-small-div'>
            <img src={small} alt='pay-small' className='pay-small-small' />
            <h3> ${paySmall(dubai?.data?.bundles?.[0]?.itineraries?.[0]?.itineraryInfo?.price?.usd?.charges?.[0]?.total?.inc).toFixed(2)}</h3>
            <div className='book-now-div'>
           <button className='book-now-btns'>Book Now</button>
          </div>
             </div>
           
    </div>
    
  </div>
)}
</Paper>
</div>
</Paper>



</div>
    </>
  );
};

export default FlightSearch;
