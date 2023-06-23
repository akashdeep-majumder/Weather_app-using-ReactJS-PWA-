import { createSlice } from '@reduxjs/toolkit';

const getLocationCityKey = () => {
  let locationCityKey = localStorage.getItem('locationCityKey');
  if (locationCityKey) {
    return JSON.parse(localStorage.getItem('locationCityKey'));
  } else {
    return '';
  }
};
const getLocationCityName = () => {
  let locationCityName = localStorage.getItem('locationCityName');
  if (locationCityName) {
    return JSON.parse(localStorage.getItem('locationCityName'));
  } else {
    return '';
  }
};
const getSavedLocationList = () => {
  let savedLocationList = localStorage.getItem('savedLocationList');
  if (savedLocationList) {
    return JSON.parse(localStorage.getItem('savedLocationList'));
  } else {
    return [];
  }
};
const getSearchCityKey = () => {
  let searchCityKey = localStorage.getItem('searchCityKey');
  if (searchCityKey) {
    return JSON.parse(localStorage.getItem('searchCityKey'));
  } else {
    return '';
  }
};
const getSearchCityName = () => {
  let searchCityName = localStorage.getItem('searchCityName');
  if (searchCityName) {
    return JSON.parse(localStorage.getItem('searchCityName'));
  } else {
    return [];
  }
};
const getWeatherBitApiKey = () => {
  let weatherBitApiKey = localStorage.getItem('weatherBitApiKey');
  if (weatherBitApiKey) {
    return JSON.parse(localStorage.getItem('weatherBitApiKey'));
  } else {
    return '';
  }
};
const getKeyValidationFromLS = () => {
  let apiKeyValid = localStorage.getItem('apiKeyValid');
  if (apiKeyValid) {
    return JSON.parse(localStorage.getItem('apiKeyValid'));
  } else {
    return false;
  }
};

const initialState = {
  darkMode: false,
  weatherBitApiKey: getWeatherBitApiKey(),
  latitude: '',
  longitude: '',
  locationCityKey: getLocationCityKey(),
  locationCityName: getLocationCityName(),
  searchParam: '',
  autoCompleteData: [],
  searchCityKey: getSearchCityKey(),
  searchCityName: getSearchCityName(),
  savedLocationList: getSavedLocationList(),
  apiKeyValid: getKeyValidationFromLS(),
};
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.darkMode = !action.payload;
    },
    updateLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    updateLongitude: (state, action) => {
      state.longitude = action.payload;
    },
    updateLocationCityKey: (state, action) => {
      state.locationCityKey = action.payload;
      localStorage.setItem(
        'locationCityKey',
        JSON.stringify(state.locationCityKey)
      );
    },
    updateLocationCityName: (state, action) => {
      state.locationCityName = action.payload;
      localStorage.setItem(
        'locationCityName',
        JSON.stringify(state.locationCityName)
      );
    },
    updateSearchParam: (state, action) => {
      state.searchParam = action.payload;
    },
    clearSearchParam: (state) => {
      state.searchParam = '';
    },
    updateAutoCompleteData: (state, action) => {
      state.autoCompleteData = action.payload;
    },
    clearAutoCompleteData: (state) => {
      state.autoCompleteData = [];
    },
    updateSearchCityKey: (state, action) => {
      state.searchCityKey = action.payload;
      localStorage.setItem(
        'searchCityKey',
        JSON.stringify(state.searchCityKey)
      );
    },
    updateSearchCityName: (state, action) => {
      state.searchCityName = action.payload;
      localStorage.setItem(
        'searchCityName',
        JSON.stringify(state.searchCityName)
      );
    },
    updateSavedLocationList: (state, action) => {
      state.savedLocationList = action.payload;
      localStorage.setItem(
        'savedLocationList',
        JSON.stringify(state.savedLocationList)
      );
    },
    updateWeatherBitApiKey: (state, action) => {
      state.weatherBitApiKey = action.payload;
      localStorage.setItem(
        'weatherBitApiKey',
        JSON.stringify(state.weatherBitApiKey)
      );
    },
    updateApiValidation: (state, action) => {
      state.apiKeyValid = action.payload;
      localStorage.setItem('apiKeyValid', JSON.stringify(state.apiKeyValid));
    },
  },
});

export const {
  changeMode,
  updateWeatherBitApiKey,
  updateLatitude,
  updateLongitude,
  updateLocationCityKey,
  updateLocationCityName,
  updateSearchParam,
  clearSearchParam,
  updateAutoCompleteData,
  clearAutoCompleteData,
  updateSearchCityKey,
  updateSearchCityName,
  updateSavedLocationList,
  updateApiValidation,
} = homeSlice.actions;

export default homeSlice.reducer;
