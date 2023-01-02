import { configureStore } from '@reduxjs/toolkit';
import cityWeatherReducer from '../features/weather/cityWeatherSlice';
import locationWeatherReducer from '../features/weather/locationWeatherSlice';
import homeReducer from '../features/home/homeSlice';

export const store = configureStore({
  reducer: {
    cityWeather: cityWeatherReducer,
    locationWeather: locationWeatherReducer,
    home: homeReducer,
  },
});
