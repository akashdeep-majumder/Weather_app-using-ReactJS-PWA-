import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locationKey: '',
  locationCurrentWeather: [],
  locationForecastWeather: [],
  flag: false,
};
const locationWeatherSlice = createSlice({
  name: 'locationWeather',
  initialState,
  reducers: {
    handleLocationCurrentWeather: (state, action) => {
      state.locationCurrentWeather = action.payload;
    },
    handleLocationForecastWeather: (state, action) => {
      state.locationForecastWeather = action.payload;
    },
    handleFlag: (state, action) => {
      state.flag = action.payload;
    },
  },
});

export const {
  handleLocationCurrentWeather,
  handleLocationForecastWeather,
  handleFlag,
} = locationWeatherSlice.actions;

export default locationWeatherSlice.reducer;
