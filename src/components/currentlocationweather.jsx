import { useEffect, useState } from 'react';
import { Grid } from 'react-loader-spinner';
import HorizontalScroll from 'react-horizontal-scrolling';
import { Outlet, Link } from 'react-router-dom';
import '../styles/current.scss';
import SearchIcon from '@mui/icons-material/Search';
import Day from '../Backgrounds/c02d.mp4';
import Night3 from '../Backgrounds/0150fc53.mp4';
import getFormattedWeathebitData from '../config/apiConfig';
import { getFormattedAccuWeatherData } from '../config/apiConfig';

const getSearchCurrentWeatherFromLS = () => {
  let weatherdata = localStorage.getItem('currentLocation-currentweather');
  if (weatherdata) {
    return JSON.parse(localStorage.getItem('currentLocation-currentweather'));
  } else {
    return [];
  }
};

const getSearchForecastWeatherFromLS = () => {
  let weatherdata = localStorage.getItem('currentLocation-forecastweather');
  if (weatherdata) {
    return JSON.parse(localStorage.getItem('currentLocation-forecastweather'));
  } else {
    return [];
  }
};

const Current = (props) => {
  const [flag, setFlag] = useState(false);
  const [currentLocationWeatherData, setCurrentLocationWeatherData] = useState({
    value: getSearchCurrentWeatherFromLS(),
  });
  const [currentLocationForecastData, setCurrentLocationForecastData] =
    useState({
      value: getSearchForecastWeatherFromLS(),
    });

  const currentLocationName = JSON.parse(
    localStorage.getItem('currentLocationName')
  );
  const currentLocationKey = JSON.parse(
    localStorage.getItem('currentLocationKey')
  );

  useEffect(() => {
    const fetchCurrentLocationWeather = async () => {
      setFlag(true);

      const weatherData = await getFormattedAccuWeatherData(
        currentLocationKey
      ).then((res) => {
        setCurrentLocationWeatherData((prevState) => ({
          ...prevState,
          value: res,
        }));
      });

      const forecastData = await getFormattedWeathebitData({
        city: currentLocationName,
      }).then((res) => {
        setCurrentLocationForecastData((prevState) => ({
          ...prevState,
          value: res,
        }));
        setFlag(false);
      });
    };
    fetchCurrentLocationWeather();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'currentLocation-currentweather',
      JSON.stringify(currentLocationWeatherData.value)
    );
  }, [currentLocationWeatherData.value]);

  useEffect(() => {
    localStorage.setItem(
      'currentLocation-forecastweather',
      JSON.stringify(currentLocationForecastData.value)
    );
  }, [currentLocationForecastData.value]);

  return (
    <div className="cl-temp-current">
      {flag ? (
        <div className="flag">
          <Grid />
        </div>
      ) : (
        <div>
          {currentLocationWeatherData.value.IsDayTime ? (
            <video autoPlay loop muted className="background">
              <source src={Day} type="video/mp4" />
            </video>
          ) : (
            <video autoPlay loop muted className="background">
              <source src={Night3} type="video/mp4" />
            </video>
          )}

          {currentLocationWeatherData.value &&
          currentLocationWeatherData.value.length !== 0 ? (
            <div className="cl-weather">
              <div className="cl-nav">
                <div className="cl-SearchIcon">
                  <Link to="/">
                    <SearchIcon />
                  </Link>
                </div>
              </div>
              <div className="cl-today">
                {currentLocationForecastData &&
                  currentLocationForecastData.value.length !== 0 && (
                    <h1 className="cl-city">
                      {currentLocationForecastData.value.city_name}
                    </h1>
                  )}
                <div className="cl-today-temp">
                  {currentLocationWeatherData.value.Temperature.Metric.Value}°C
                  | {currentLocationWeatherData.value.WeatherText}
                </div>

                <div className="cl-cloud">
                  <div>
                    Clouds : {currentLocationWeatherData.value.CloudCover} %
                  </div>
                </div>
                <div className="cl-rain">
                  Will it rain :
                  {currentLocationWeatherData.value.HasPrecipitation === true
                    ? 'Yes'
                    : 'No'}
                </div>
              </div>
              {currentLocationForecastData.value &&
                currentLocationForecastData.value.length !== 0 && (
                  <div className="cl-hourly-forecast">
                    <h4 className="cl-text">Hourly Forecast(Next 24hr)</h4>
                    <HorizontalScroll>
                      {currentLocationForecastData.value.hourly.map(
                        (hourly, index) => {
                          return (
                            <div className="cl-hourly-details" key={index}>
                              <div className="cl-time">{hourly.time}</div>
                              <div className="cl-hourly-temp">
                                {hourly.temp}°C
                              </div>
                              <div className="cl-hourly-ondition">
                                <div className="cl-hourly-icon">
                                  <img
                                    src={`../icons/${hourly.icon}.png`}
                                    alt="Weather Icon"
                                  />
                                </div>
                                <div className="cl-hourly-description">
                                  {hourly.description}
                                </div>
                              </div>
                              <div className="cl-hourly-pop">
                                Rain probability:{hourly.pop}%
                              </div>
                            </div>
                          );
                        }
                      )}
                    </HorizontalScroll>
                  </div>
                )}
              <div>
                <h3 className="cl-text">Today-details</h3>
                <div className="cl-today-details">
                  <div className="cl-aqi">
                    AQI <p>{currentLocationForecastData.value.aqi}</p>
                  </div>
                  <div className="cl-humidity">
                    Humidity
                    <p>{currentLocationWeatherData.value.RelativeHumidity} %</p>
                  </div>
                  <div className="cl-real-temp">
                    Feels like
                    <p>
                      {
                        currentLocationWeatherData.value.RealFeelTemperature
                          .Metric.Value
                      }
                      °C
                    </p>
                  </div>

                  <div className="cl-precip">
                    precipitation
                    <p>
                      {currentLocationWeatherData.value.Precip1hr.Metric.Value}
                      (mm)
                    </p>
                    in the last hour.
                  </div>
                  <div className="cl-pressure">
                    Pressure
                    <p>
                      {currentLocationWeatherData.value.Pressure.Metric.Value}(
                      {currentLocationWeatherData.value.Pressure.Metric.Unit})
                    </p>
                  </div>
                  <div className="cl-wind">
                    Wind
                    <p>
                      {currentLocationWeatherData.value.Wind.Speed.Metric.Value}
                      ({currentLocationWeatherData.value.Wind.Speed.Metric.Unit}
                      )
                    </p>
                  </div>
                  <div className="cl-uv-index">
                    UVIndex <p>{currentLocationWeatherData.value.UVIndex}</p>
                  </div>
                  <div className="cl-visibility">
                    Visibility
                    <p>
                      {currentLocationWeatherData.value.Visibility.Metric.Value}
                      ({currentLocationWeatherData.value.Visibility.Metric.Unit}
                      )
                    </p>
                  </div>
                </div>
              </div>
              {currentLocationForecastData.value &&
                currentLocationForecastData.value.length !== 0 && (
                  <div className="cl-16day-forecast">
                    <h4 className="cl-text"> 16-day forecast</h4>
                    <HorizontalScroll>
                      {currentLocationForecastData.value.daily.map(
                        (forecast, index) => {
                          return (
                            <div className="cl-forecast-details" key={index}>
                              <div className="date">{forecast.date}</div>
                              <div className="cl-forecast-temp">
                                ↑{forecast.high_temp}°C | ↓{forecast.low_temp}
                                °C
                              </div>
                              <div className="cl-forecast-cloud">
                                Clouds: {forecast.clouds}%
                              </div>
                              <div className="cl-forecast-condition">
                                <div className="cl-forecast-icon">
                                  <img
                                    src={`../icons/${forecast.icon}.png`}
                                    alt="Weather Icon"
                                  />
                                </div>
                                <div className="cl-forecast-description">
                                  {forecast.description}
                                </div>
                              </div>
                              <div className="cl-forecast-pop">
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

export default Current;
