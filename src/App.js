import Locations from './components/home';
import Current from './components/currentlocationweather';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TempCurrent from './components/cityweather';
import { useEffect } from 'react';
import { getFormattedGeoLocationData } from './config/apiConfig';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateLatitude,
  updateLocationCityKey,
  updateLocationCityName,
  updateLongitude,
} from './features/home/homeSlice';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const Globalstyles = createGlobalStyle`
body{
  margin:0;
  padding:0;
  
  *{
    font-family: 'Roboto', sans-serif;
  }}
`;
const theme = {
  colors: {
    background: '#d2d9f4',
    bgLight: '#f0f8ff',
    textDark: 'black',
    textLight: 'white',
    primary: '#4c2a96',
    pLight: '#724bc3',
  },
};
const darkTheme = {
  colors: {
    background: '#030311',
    bgLight: '#3D3748',
    textDark: 'white',
    textLight: 'white',
    primary: '#4c2a96',
    pLight: '#724bc3',
  },
};

const App = () => {
  const { latitude, longitude, darkMode } = useSelector((store) => store.home);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentLocationData = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        dispatch(updateLatitude(lat));

        const lon = position.coords.longitude;
        dispatch(updateLongitude(lon));
      });
      if (latitude !== '') {
        const currentLocationData = getFormattedGeoLocationData({
          q: `${latitude},${longitude}`,
          toplevel: true,
        }).then((response) => {
          if (response.Key !== undefined) {
            dispatch(updateLocationCityKey(response.Key));
            dispatch(updateLocationCityName(response.LocalizedName));
          }
        });
      }
    };
    fetchCurrentLocationData();
  }, [latitude]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <Globalstyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Locations />} />
          <Route path="/currentlocation/:name" element={<Current />}></Route>
          <Route path="/city/:name" element={<TempCurrent />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
