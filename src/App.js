import Locations from './components/home';
import Current from './components/currentlocationweather';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TempCurrent from './components/cityweather';
import { useState, useEffect } from 'react';
import { getFormattedGeoLocationData } from './config/apiConfig';

const getcurrentLocationKeyFromLS = () => {
  let list = localStorage.getItem('currentLocationKey');
  if (list) {
    return JSON.parse(localStorage.getItem('currentLocationKey'));
  } else {
    return '';
  }
};
const getcurrentLocationNameFromLS = () => {
  let list = localStorage.getItem('currentLocationName');
  if (list) {
    return JSON.parse(localStorage.getItem('currentLocationName'));
  } else {
    return '';
  }
};

const App = () => {
  const [latitude, setLatitude] = useState({ value: '' });
  const [longitude, setLongitude] = useState({ value: '' });
  const [currentLocationKey, setCurrentLocationKey] = useState({
    value: getcurrentLocationKeyFromLS(),
  });
  const [currentLocationName, setCurrentLocationName] = useState({
    value: getcurrentLocationNameFromLS(),
  });

  useEffect(() => {
    const fetchCurrentLocationKeyData = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        setLatitude((prevState) => ({ ...prevState, value: lat }));
        const lon = position.coords.longitude;
        setLongitude((prevState) => ({
          ...prevState,
          value: lon,
        }));
      });
      if (latitude.value !== '') {
        const currentLocationData = getFormattedGeoLocationData({
          q: `${latitude.value},${longitude.value}`,
          toplevel: true,
        }).then((response) => {
          console.log(response);
          setCurrentLocationKey((prevState) => ({
            ...prevState,
            value: response.Key,
          }));
          setCurrentLocationName((prevState) => ({
            ...prevState,
            value: response.LocalizedName,
          }));
        });
      }
    };
    fetchCurrentLocationKeyData();
  }, [latitude.value]);

  useEffect(() => {
    localStorage.setItem(
      'currentLocationKey',
      JSON.stringify(currentLocationKey.value)
    );
  }, [currentLocationKey.value]);

  useEffect(() => {
    localStorage.setItem(
      'currentLocationName',
      JSON.stringify(currentLocationName.value)
    );
  }, [currentLocationName.value]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Locations />} />
        <Route path="/currentlocation/:name" element={<Current />}></Route>
        <Route path="/city/:name" element={<TempCurrent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
