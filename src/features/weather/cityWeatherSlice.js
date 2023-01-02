import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cityCurrentWeather: [],
  cityForecastWeather: [],
  loading: false,
};
const cityWeatherSlice = createSlice({
  name: 'cityWeather',
  initialState,
  reducers: {
    handleCityCurrentWeather: (state, action) => {
      state.cityCurrentWeather = action.payload;
    },
    handleCityForecastWeather: (state, action) => {
      state.cityForecastWeather = action.payload;
    },
    handleLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  handleCityCurrentWeather,
  handleCityForecastWeather,
  handleLoading,
} = cityWeatherSlice.actions;

export default cityWeatherSlice.reducer;
