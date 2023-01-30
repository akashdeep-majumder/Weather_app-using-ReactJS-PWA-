import axios from 'axios';
import { DateTime } from 'luxon';

const WEATHERBIT_BASE_URL = 'https://api.weatherbit.io/v2.0';
const ACCU_BASE_URL = 'https://dataservice.accuweather.com';

// const WEATHERBIT_API_KEY = '54efcc687ecd42c29d14c40b870160bd';
const WEATHERBIT_API_KEY = '23eaba0a13e14cc483fe2c901a6a4953';

// const ACCU_API_KEY = 'hApGgMzUbGtOL4Uz3DITMv4k3LBKgQJ1';
const ACCU_API_KEY = 'KpLRbIOiSFqME9U6ysveGGyxPRAy7ZvZ';
// const ACCU_API_KEY = 'DWJf5AcDFqPqMW66OGwR6kF0wPGjac3c';

const getAccuWeatherWeatherData = async (
  infoType,
  location_key,
  searchParams
) => {
  const url = new URL(ACCU_BASE_URL + '/' + infoType + '/' + location_key);
  url.search = new URLSearchParams({
    ...searchParams,
    apikey: ACCU_API_KEY,
  });

  const res = await axios.get(url);
  return res;
};

const formatCurrentWeatherData = (res) => {
  console.log(res);
  let {
    IsDayTime,
    Temperature,
    WeatherText,
    CloudCover,
    HasPrecipitation,
    RelativeHumidity,
    RealFeelTemperature,
    Precip1hr,
    Pressure,
    Wind,
    Visibility,
    UVIndex,
  } = res.data[[0]];
  return {
    UVIndex,
    IsDayTime,
    Temperature,
    WeatherText,
    CloudCover,
    HasPrecipitation,
    RelativeHumidity,
    RealFeelTemperature,
    Precip1hr,
    Pressure,
    Wind,
    Visibility,
  };
};

const getFormattedAccuWeatherData = async (location_key, searchParams) => {
  const CurrentWeatherData = await getAccuWeatherWeatherData(
    'currentconditions/v1',
    location_key,
    { details: true }
  ).then(formatCurrentWeatherData);
  return { ...CurrentWeatherData };
};

const getWeatherbitWeatherData = async (infoType, searchParams) => {
  const url = new URL(WEATHERBIT_BASE_URL + '/' + infoType);
  url.search = new URLSearchParams({
    ...searchParams,
    key: WEATHERBIT_API_KEY,
  });

  const res = await axios.get(url);
  return res;
};

const formatAqiData = (res) => {
  let { data } = res;
  let { aqi } = data.data[0];
  return { aqi };
};

const formatHourlyData = (res) => {
  let { city_name, country_code, timezone, data } = res.data;
  let hourly = data.slice(1, 24).map((h) => {
    return {
      time: formaToLocalTime(h.ts, timezone, 'hh:mm a'),
      temp: h.app_temp,
      icon: h.weather.icon,
      description: h.weather.description,
      pop: h.pop,
    };
  });
  return { city_name, country_code, timezone, hourly };
};

const formatForecastData = (res) => {
  let { timezone, data } = res.data;

  let daily = data.map((f) => {
    return {
      date: formaToLocalTime(f.ts, timezone, 'ccc'),
      high_temp: f.high_temp,
      low_temp: f.low_temp,
      clouds: f.clouds,
      icon: f.weather.icon,
      description: f.weather.description,
      pop: f.pop,
    };
  });
  return { timezone, daily };
};
const getFormattedWeathebitData = async (searchParams) => {
  const formattedAqiData = await getWeatherbitWeatherData(
    'current/airquality',
    searchParams
  ).then(formatAqiData);

  const formattedHourlyData = await getWeatherbitWeatherData(
    'forecast/hourly',
    {
      city: searchParams.city,
      hours: 25,
    }
  ).then(formatHourlyData);

  const formattedForecastData = await getWeatherbitWeatherData(
    'forecast/daily',
    searchParams
  ).then(formatForecastData);

  return {
    ...formattedAqiData,
    ...formattedHourlyData,
    ...formattedForecastData,
  };
};

const formaToLocalTime = (
  secs,
  zone,
  format = "cccc,dd lll yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const getLocationData = async (infoType, searchParams) => {
  const url = new URL(ACCU_BASE_URL + '/' + infoType);
  url.search = new URLSearchParams({ ...searchParams, apikey: ACCU_API_KEY });

  const res = await axios.get(url);
  return res;
};

const formatAutoCompleteData = async (res) => {
  let { data } = res;

  let locationList = data?.map((a) => {
    return {
      Key: a.Key,
      LocalizedName: a.LocalizedName,
      AdministrativeArea: a.AdministrativeArea,
      Country: a.Country,
    };
  });

  return { locationList };
};
const getFormattedAutoCompleteSearchData = async (searchParams) => {
  const autoCompleteData = await getLocationData(
    'locations/v1/cities/autocomplete',
    searchParams
  ).then(formatAutoCompleteData);
  return { ...autoCompleteData };
};
const formatGeoLocationData = async (res) => {
  let { LocalizedName, Key } = res.data;
  return { LocalizedName, Key };
};

const getFormattedGeoLocationData = async (searchParams) => {
  const geoLocationData = await getLocationData(
    'locations/v1/cities/geoposition/search',
    searchParams
  ).then(formatGeoLocationData);
  return { ...geoLocationData };
};

export {
  getFormattedAccuWeatherData,
  formaToLocalTime,
  getFormattedAutoCompleteSearchData,
  getFormattedGeoLocationData,
};

export default getFormattedWeathebitData;
