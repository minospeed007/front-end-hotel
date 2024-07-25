import React, { useContext, useEffect, useState } from 'react';
import './flight_list.css';
import price from '../../assets/price-alert.svg';
import watch from '../../assets/watch.svg';
import small from '../../assets/pay-small-img.png';
import { FlightContext } from '../../context/flightContext';
import moment from 'moment';

const FlightList = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    nonStop: false,
    oneStop: false,
    onePlusStop: false,
  });

  const { flightData } = useContext(FlightContext);
  const [stopCounts, setStopCounts] = useState({
    nonStop: 0,
    oneStop: 0,
    onePlusStop: 0,
  });
  const [filteredItineraries, setFilteredItineraries] = useState([]);

  useEffect(() => {
    if (flightData) {
      calculateStopCounts();
      filterItineraries();
    }
  }, [flightData, selectedOptions]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [name]: checked,
    }));
  };

  const calculateStopCounts = () => {
    let noStop = 0;
    let oneStop = 0;
    let onePlusStop = 0;

    flightData?.data?.bundles?.forEach((bundle) => {
      const segments = bundle.outboundSlice?.segments;
      if (segments) {
        const stopCount = segments.length - 1;
        if (stopCount === 0) {
          noStop++;
        } else if (stopCount === 1) {
          oneStop++;
        } else if (stopCount > 1) {
          onePlusStop++;
        }
      }
    });

    setStopCounts({ nonStop: noStop, oneStop: oneStop, onePlusStop: onePlusStop });
  };

  const filterItineraries = () => {
    const { nonStop, oneStop, onePlusStop } = selectedOptions;
    let filtered = flightData?.data?.bundles || [];

    if (nonStop || oneStop || onePlusStop) {
      filtered = filtered.filter((bundle) => {
        const stopCount = bundle.outboundSlice?.segments?.length - 1;
        if (nonStop && stopCount === 0) return true;
        if (oneStop && stopCount === 1) return true;
        if (onePlusStop && stopCount > 1) return true;
        return false;
      });
    }

    setFilteredItineraries(filtered);
  };

  const formatDateTime = (dateTime) => moment(dateTime).format('MMMM Do YYYY, h:mm A');
  const formatTime = (dateTime) => moment(dateTime).format('HH:mm');
  const convertDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const paySmall = (price) => {
    const smallPrice = price / 3;
    return smallPrice;
  };

  const getCheapestItinerariesByAirline = () => {
    const airlineCheapestPriceMap = {};

    filteredItineraries.forEach((bundle) => {
      bundle.itineraries?.forEach((itinerary) => {
        const airline = bundle.outboundSlice?.segments?.[0]?.carrierContent?.carrierName;
        const price = itinerary?.itineraryInfo?.price?.usd?.charges?.[0]?.total?.inc;

        if (airline && price !== undefined) {
          if (!airlineCheapestPriceMap[airline] || price < airlineCheapestPriceMap[airline].price) {
            airlineCheapestPriceMap[airline] = {
              price,
              bundle,
              itinerary,
            };
          }
        }
      });
    });

    return Object.values(airlineCheapestPriceMap);
  };

  const getNumberOfStops = (segments) => segments?.length - 1;

  const cheapestItineraries = getCheapestItinerariesByAirline();

  const isRoundTrip = () => flightData?.data?.bundles?.[0]?.itineraries?.[0]?.inboundSlice !== null;

  const originAirport = flightData?.data?.bundles?.[0]?.outboundSlice?.segments?.[0]?.airportContent?.departureCityName;
  const destinationAirport = flightData?.data?.bundles?.[0]?.outboundSlice?.segments?.slice(-1)[0]?.airportContent?.arrivalCityName;

  return (
    <div className='flight-root'>
      <div className='outer-div'>
        <div className='search-div'>
          <div className='search-title'>
            <h3>From</h3>
            <h5>{originAirport}</h5>
          </div>
          <div className='search-title'>
            <h3>To</h3>
            <h5>{destinationAirport}</h5>
          </div>
          <div className='search-title'>
            <h3>Departure</h3>
            <h5>{formatDateTime(flightData?.data?.bundles?.[0]?.outboundSlice?.segments?.[0]?.departDateTime)}</h5>
          </div>
          {isRoundTrip() && (
            <div className='search-title'>
              <h3>Return</h3>
              <h5>{formatDateTime(flightData?.data?.bundles?.[0]?.itineraries?.[0]?.inboundSlice?.segments?.[0]?.departDateTime)}</h5>
            </div>
          )}
          <div className='search-title'>
            <h3>Total Price</h3>
            <h5>${flightData?.data?.bundles?.[0]?.itineraries?.[0]?.itineraryInfo?.price?.usd?.charges?.[0]?.total?.inc}</h5>
          </div>
          <div className='search-title'>
            <h3>Class</h3>
            <h5>{flightData?.data?.bundles?.[0]?.outboundSlice?.segments?.[0]?.cabinClassContent?.cabinName}</h5>
          </div>
        </div>
        <div className="inner-div">
          <div className='price-watch'>
            <div>
              <h5>Not ready to book now?</h5>
              <h5>Turn on</h5>
              <img src={price} alt='price-alert' />
              <p>To get price updates</p>
              <button className='list-btn'>Get price update</button>
            </div>
            <div className='flight-list-img-div'>
              <img src={watch} alt='watch-icon' />
            </div>
          </div>
          <div className="inner-div2">
            <div className='onward-div'>
              <h3>Onward Journey</h3>
              <div className='onward-hr-div'>
              <hr className='onward-hr'/>
              </div>
            </div> 
            <div className='stop-from-div'>
              <h3>Stops From {originAirport}</h3>
            </div>
            <div className="stop-options">
              <label>
                <input
                  type="checkbox"
                  name="nonStop"
                  checked={selectedOptions.nonStop}
                  onChange={handleCheckboxChange}
                />
                Non-stop ({stopCounts.nonStop})
              </label>
              <label>
                <input
                  type="checkbox"
                  name="oneStop"
                  checked={selectedOptions.oneStop}
                  onChange={handleCheckboxChange}
                />
                1 stop ({stopCounts.oneStop})
              </label>
              <label>
                <input
                  type="checkbox"
                  name="onePlusStop"
                  checked={selectedOptions.onePlusStop}
                  onChange={handleCheckboxChange}
                />
                1+ stop ({stopCounts.onePlusStop})
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className='segment-div'>
        {cheapestItineraries.map(({ bundle, itinerary }, index) => (
          <div key={`${bundle.key}-${index}`} className='seg-div'>
            {bundle.outboundSlice?.segments?.[0]?.carrierContent && (
              <div key={`carrier-${bundle.key}-${index}`} className='bundle-div'>
                <div className='logo-and-img-div'>
                  <div className='seg-logo-img'>
                    <img src={bundle.outboundSlice.segments[0].carrierContent.carrierIcon} alt="" className='seg-img' />
                    <h3>{bundle.outboundSlice.segments[0].carrierContent.carrierName}</h3>
                  </div>
                  <div className='segment-price-div'>
                    <div className='price-div'>
                      <small className='full-price-list'> Full Price</small>
                      <h3> ${itinerary.itineraryInfo.price.usd.charges[0].total.inc}</h3>
                    </div>
                    <div className='pay-small-div'>
                      <div>
                        <img src={small} alt='pay-small-' className='pay-small' />
                      </div>
                      <div className='full-price-div'>
                        <small className='full-price2'> Pay Small Small</small>
                        <h3> ${paySmall(itinerary.itineraryInfo.price.usd.charges[0].total.inc).toFixed(2)}</h3>
                      </div>
                    </div>
                    <div className='book-now-div'>
                      <button className='book-now-btn'>Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className='seg-price-div'>
              {bundle.outboundSlice?.segments?.[0]?.airportContent && (
                <div key={`airport-${bundle.key}-${index}`} className='seg-bound-div'>
                  <div className='tro-fro-div'>
                    <div className='return-root-div'>
                      <div className='depart-h4-div'>
                        <h4 className='full-price'>
                          Departure
                          <span className='seg-span'>{formatTime(bundle.outboundSlice.segments[0].departDateTime)}</span>
                          <small className='full-price-air'>{bundle.outboundSlice.segments[0].carrierContent.carrierName}</small>
                        </h4>
                      </div>
                      <div className='depart-div'>
                        <div className='take-off'>
                          <h2>{formatTime(bundle.outboundSlice.segments[0].departDateTime)}</h2>
                <p>{bundle.outboundSlice?.segments[0]?.airportContent.departureCityName }</p>
                        </div>
                        <div className='stop-div'>
                          <h4>{convertDuration(bundle.outboundSlice.segments[0].duration)}</h4>
                          <h5>{getNumberOfStops(bundle.outboundSlice.segments)} Stop(s)</h5>
                          <hr className='stop-hr' />
                        </div>
                        <div className='return-div'>
                          <h2>{formatTime(bundle.outboundSlice.segments.slice(-1)[0].arrivalDateTime)}</h2>
                          <p>{bundle.outboundSlice.segments.slice(-1)[0].airportContent.arrivalCityName}</p>
                        </div>
                      </div>
                    </div>
                    {isRoundTrip() && (
                      <div className='return-root-div'>
                        <div className='depart-h4-div'>
                          <h4 className='full-price'>
                            Return
                            <span className='seg-span'>{formatTime(bundle.itineraries[0].inboundSlice.segments[0].departDateTime)}</span>
                            <small className='full-price'>{bundle.outboundSlice.segments[0].carrierContent.carrierName}</small>
                          </h4>
                        </div>
                        <div className='depart-div'>
                          <div className='take-off'>
                            <h2>{formatTime(bundle.itineraries[0].inboundSlice.segments[0].departDateTime)}</h2>
       <p>{bundle.itineraries[0].inboundSlice?.segments[0]?.airportContent?.departureCityName}</p>
                          </div>
                          <div className='stop-div'>
                            <h4>{convertDuration(bundle.itineraries[0].inboundSlice.segments[0].duration)}</h4>
                            <h5>{getNumberOfStops(bundle.itineraries[0].inboundSlice.segments)} Stop(s)</h5>
                            <hr className='stop-hr' />
                          </div>
                          <div className='return-div'>
                            <h2>{formatTime(bundle.itineraries[0].inboundSlice.segments[0].arrivalDateTime)}</h2>
                            <p>{bundle.itineraries[0].inboundSlice.segments?.slice(-1)[0].airportContent.arrivalCityName}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightList;
