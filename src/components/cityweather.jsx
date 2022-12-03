import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Grid } from 'react-loader-spinner';
import HorizontalScroll from 'react-horizontal-scrolling';
import '../styles/tempcurrent.scss';
import SearchIcon from '@mui/icons-material/Search';
import Day from '../Backgrounds/c02d.mp4';
import Night3 from '../Backgrounds/0150fc53.mp4';
import getFormattedWeathebitData from '../config/apiConfig';
import { getFormattedAccuWeatherData } from '../config/apiConfig';

const getCityListFromLS = () => {
  let citylist = localStorage.getItem('city-list');
  if (citylist) {
    return JSON.parse(localStorage.getItem('city-list'));
  } else {
    return [];
  }
};

const getSearchCurrentWeatherFromLS = () => {
  let weatherdata = localStorage.getItem('search-currentweather');
  if (weatherdata) {
    return JSON.parse(localStorage.getItem('search-currentweather'));
  } else {
    return [];
  }
};

const getSearchForecastWeatherFromLS = () => {
  let weatherdata = localStorage.getItem('search-forecastweather');
  if (weatherdata) {
    return JSON.parse(localStorage.getItem('search-forecastweather'));
  } else {
    return [];
  }
};

const TempCurrent = () => {
  const [loading, setLoading] = useState(false);
  const [cityList, setCityList] = useState(getCityListFromLS());
  const [currentWeatherData, setCurrentWeatherData] = useState({
    value: getSearchCurrentWeatherFromLS(),
  });
  const [forecastWeatherData, setForecastWeatherData] = useState({
    value: getSearchForecastWeatherFromLS(),
  });

  // const currentWeatherData = JSON.parse(
  //   localStorage.getItem('search-currentweather')
  // );
  // const forecastWeatherData = JSON.parse(
  //   localStorage.getItem('search-forecastweather')
  // );
  // console.log(currentWeatherData);
  // console.log(forecastWeatherData);
  const cityKey = JSON.parse(localStorage.getItem('search-citykey'));
  const cityName = JSON.parse(localStorage.getItem('search-cityname'));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const weatherData = await getFormattedAccuWeatherData(cityKey).then(
        (res) => {
          setCurrentWeatherData((prevState) => ({ ...prevState, value: res }));
        }
      );

      const forecastData = await getFormattedWeathebitData({
        city: cityName,
      }).then((res) => {
        setForecastWeatherData((prevState) => ({ ...prevState, value: res }));
        setLoading(false);
      });
    };
    fetchData();
  }, []);

  const handleAdd = (e) => {
    const btn = document.getElementById('adddBtn');
    btn.style.visibility = 'hidden';
    const cityData = {
      cityName: e.target.getAttribute('data-cityname'),
      cityKey: e.target.getAttribute('data-key'),
      countryName: e.target.getAttribute('data-countryname'),
    };
    const list = [...cityList];
    list.push(cityData);
    const uniqueCityList = list.reduce((finalArray, current) => {
      let obj = finalArray.find((item) => item.cityName === current.cityName);

      if (obj) {
        return finalArray;
      }
      return finalArray.concat([current]);
    }, []);

    setCityList(uniqueCityList);
  };

  useEffect(() => {
    localStorage.setItem('city-list', JSON.stringify(cityList));
  }, [cityList]);

  useEffect(() => {
    localStorage.setItem(
      'search-currentweather',
      JSON.stringify(currentWeatherData.value)
    );
  }, [currentWeatherData.value]);

  useEffect(() => {
    localStorage.setItem(
      'search-forecastweather',
      JSON.stringify(forecastWeatherData.value)
    );
  }, [forecastWeatherData.value]);

  return (
    <div className="temp-current">
      {loading ? (
        <div className="loading">
          <Grid color="blue" />
        </div>
      ) : (
        <div>
          {currentWeatherData.value.IsDayTime ? (
            <video autoPlay loop muted className="backgroundVid">
              <source src={Day} type="video/mp4" />
            </video>
          ) : (
            <video autoPlay loop muted className="backgroundVid">
              <source src={Night3} type="video/mp4" />
            </video>
          )}
          {currentWeatherData.value && currentWeatherData.value.length !== 0 ? (
            <div className="weather">
              <div className="nav">
                <div className="searchBtn ">
                  <Link to="/">
                    <SearchIcon />
                  </Link>
                </div>

                <button
                  className="plusBtn"
                  id="adddBtn"
                  data-key={cityKey}
                  data-cityname={forecastWeatherData.value.city_name}
                  data-countryname={forecastWeatherData.value.country_code}
                  onClick={(e) => handleAdd(e)}
                >
                  Add
                </button>
              </div>
              <div className="today">
                {forecastWeatherData.value &&
                  forecastWeatherData.value.length !== 0 && (
                    <h1 className="cityname">
                      {forecastWeatherData.value.city_name}
                    </h1>
                  )}
                <div className="today-temp">
                  {currentWeatherData.value.Temperature.Metric.Value} °C |
                  {currentWeatherData.value.WeatherText}
                </div>

                <div className="cloud">
                  <div>Clouds : {currentWeatherData.value.CloudCover} %</div>
                </div>
                <div className="rain">
                  Will it rain :
                  {currentWeatherData.value.HasPrecipitation === true
                    ? 'Yes'
                    : 'No'}
                </div>
              </div>
              {forecastWeatherData.value &&
                forecastWeatherData.value.length !== 0 && (
                  <div className="hourly-forecast">
                    <h4 className="text">Hourly Forecast(Next 24hr)</h4>
                    <HorizontalScroll>
                      {forecastWeatherData.value.hourly.map((hourly, index) => {
                        return (
                          <div className="hourly-details" key={index}>
                            <div className="time">{hourly.time}</div>
                            <div className="hourly-temp">{hourly.temp}°C</div>
                            <div className="hourly-ondition">
                              <div className="hourly-icon">
                                <img
                                  src={`../icons/${hourly.icon}.png`}
                                  alt="Weather Icon"
                                />
                              </div>
                              <div className="hourly-description">
                                {hourly.description}
                              </div>
                            </div>
                            <div className="hourly-pop">
                              Rain probability:{hourly.pop}%
                            </div>
                          </div>
                        );
                      })}
                    </HorizontalScroll>
                  </div>
                )}
              <div>
                <h3 className="today-text">Today-details</h3>
                <div className="today-details">
                  <div className="aqi">
                    AQI <p>{forecastWeatherData.value.aqi}</p>
                  </div>
                  <div className="humidity">
                    Humidity
                    <p>{currentWeatherData.value.RelativeHumidity} %</p>
                  </div>
                  <div className="real-temp">
                    Feels like
                    <p>
                      {
                        currentWeatherData.value.RealFeelTemperature.Metric
                          .Value
                      }{' '}
                      °C
                    </p>
                  </div>
                  <div className="precip">
                    precipitation
                    <p>{currentWeatherData.value.Precip1hr.Metric.Value}(mm)</p>
                    in the last hour.
                  </div>
                  <div className="pressure">
                    Pressure
                    <p>
                      {currentWeatherData.value.Pressure.Metric.Value}(
                      {currentWeatherData.value.Pressure.Metric.Unit})
                    </p>
                  </div>
                  <div className="wind">
                    Wind
                    <p>
                      {currentWeatherData.value.Wind.Speed.Metric.Value}(
                      {currentWeatherData.value.Wind.Speed.Metric.Unit})
                    </p>
                  </div>
                  <div className="uv-index">
                    UVIndex <p>{currentWeatherData.value.UVIndex}</p>
                  </div>
                  <div className="visibility">
                    Visibility
                    <p>
                      {currentWeatherData.value.Visibility.Metric.Value}(
                      {currentWeatherData.value.Visibility.Metric.Unit})
                    </p>
                  </div>
                </div>
              </div>
              {forecastWeatherData.value &&
                forecastWeatherData.value.length !== 0 && (
                  <div className="16day-forecast">
                    <h4 className="text"> 16-day forecast</h4>
                    <HorizontalScroll>
                      {forecastWeatherData.value.daily.map(
                        (forecast, index) => {
                          return (
                            <div className="forecast-details" key={index}>
                              <div className="date">{forecast.date}</div>
                              <div className="forecast-temp">
                                ↑{forecast.high_temp}°C | ↓{forecast.low_temp}°C
                              </div>
                              <div className="forecast-cloud">
                                Clouds: {forecast.clouds}%
                              </div>
                              <div className="forecast-condition">
                                <div className="forecast-icon">
                                  <img
                                    src={`../icons/${forecast.icon}.png`}
                                    alt="Weather Icon"
                                  />
                                </div>
                                <div className="forecast-description">
                                  {forecast.description}
                                </div>
                              </div>
                              <div className="forecast-pop">
                                Rain probability:{forecast.pop}%
                              </div>
                            </div>
                          );
                        }
                      )}
                    </HorizontalScroll>
                  </div>
                )}

              <Outlet />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TempCurrent;
