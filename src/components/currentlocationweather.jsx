import { useEffect, useState } from 'react';
import { Grid } from 'react-loader-spinner';
import { Outlet, Link } from 'react-router-dom';
import {
  Loading,
  MainContainer,
  Container,
  Navbar,
  TodayCurrentWeather,
  HourlyForecast,
  CurrentWeatherDetails,
  GridWrapper,
  DailyForecast,
  Horizontalscroll,
  HorizontalscrollContainer,
} from '../styles/weather.styled';
import SearchIcon from '@mui/icons-material/Search';
import getFormattedWeathebitData from '../config/apiConfig';
import { getFormattedAccuWeatherData } from '../config/apiConfig';
import { useSelector, useDispatch } from 'react-redux';
import {
  handleFlag,
  handleLocationCurrentWeather,
  handleLocationForecastWeather,
} from '../features/weather/locationWeatherSlice';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { changeMode } from '../features/home/homeSlice';

const Current = (props) => {
  const { locationCityKey, locationCityName, darkMode } = useSelector(
    (state) => state.home
  );
  const { locationCurrentWeather, locationForecastWeather, flag } = useSelector(
    (state) => state.locationWeather
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentLocationWeather = async () => {
      dispatch(handleFlag(true));

      const weatherData = await getFormattedAccuWeatherData(
        locationCityKey
      ).then((res) => {
        dispatch(handleLocationCurrentWeather(res));
      });

      const forecastData = await getFormattedWeathebitData({
        city: locationCityName,
      }).then((res) => {
        dispatch(handleLocationForecastWeather(res));
        dispatch(handleFlag(false));
      });
    };
    fetchCurrentLocationWeather();
  }, []);

  const changeDarkMode = () => {
    dispatch(changeMode(darkMode));
  };

  return (
    <MainContainer>
      {flag ? (
        <Loading>
          <Grid />
        </Loading>
      ) : (
        <>
          {locationCurrentWeather && locationCurrentWeather.length !== 0 ? (
            <Container>
              <Navbar>
                <div>
                  <div>
                    <Link to="/">
                      <SearchIcon
                        sx={{ color: 'white' }}
                        style={{ padding: '5px' }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="dark">
                  <DarkModeIcon onClick={changeDarkMode} />
                </div>
              </Navbar>
              <TodayCurrentWeather>
                {locationForecastWeather &&
                  locationForecastWeather.length !== 0 && (
                    <h1 className="city">
                      {locationForecastWeather.city_name}
                    </h1>
                  )}
                <div className="today-temp">
                  {locationCurrentWeather.Temperature.Metric.Value}°C |{' '}
                  {locationCurrentWeather.WeatherText}
                </div>

                <div className="cloud">
                  <div>Clouds : {locationCurrentWeather.CloudCover} %</div>
                </div>
                <div className="rain">
                  Will it rain :
                  {locationCurrentWeather.HasPrecipitation === true
                    ? 'Yes'
                    : 'No'}
                </div>
              </TodayCurrentWeather>
              {locationForecastWeather &&
                locationForecastWeather.length !== 0 && (
                  <HourlyForecast>
                    <h4 className="text">Hourly Forecast</h4>
                    <HorizontalscrollContainer>
                      {locationForecastWeather.hourly.map((hourly, index) => {
                        return (
                          <Horizontalscroll key={index}>
                            <div className="time">{hourly.time}</div>
                            <div className="temp">{hourly.temp}°C</div>
                            <div className="ondition">
                              <div className="icon">
                                <img
                                  src={`../icons/${hourly.icon}.png`}
                                  alt="Weather Icon"
                                />
                              </div>
                              <div className="description">
                                {hourly.description}
                              </div>
                            </div>
                            <div className="pop">
                              Rain probability:{hourly.pop}%
                            </div>
                          </Horizontalscroll>
                        );
                      })}
                    </HorizontalscrollContainer>
                  </HourlyForecast>
                )}
              <CurrentWeatherDetails>
                <h3>Current Weather Details</h3>
                <GridWrapper>
                  <div>
                    AQI <p>{locationForecastWeather.aqi}</p>
                  </div>
                  <div>
                    Humidity
                    <p>{locationCurrentWeather.RelativeHumidity} %</p>
                  </div>
                  <div>
                    Feels like
                    <p>
                      {locationCurrentWeather.RealFeelTemperature.Metric.Value}
                      °C
                    </p>
                  </div>
                  <div>
                    precipitation
                    <p>
                      {locationCurrentWeather.Precip1hr.Metric.Value}
                      (mm) in the last hour.
                    </p>
                  </div>
                  <div>
                    Pressure
                    <p>
                      {locationCurrentWeather.Pressure.Metric.Value}(
                      {locationCurrentWeather.Pressure.Metric.Unit})
                    </p>
                  </div>
                  <div>
                    Wind
                    <p>
                      {locationCurrentWeather.Wind.Speed.Metric.Value}(
                      {locationCurrentWeather.Wind.Speed.Metric.Unit})
                    </p>
                  </div>
                  <div>
                    UVIndex <p>{locationCurrentWeather.UVIndex}</p>
                  </div>
                  <div>
                    Visibility
                    <p>
                      {locationCurrentWeather.Visibility.Metric.Value}(
                      {locationCurrentWeather.Visibility.Metric.Unit})
                    </p>
                  </div>
                </GridWrapper>
              </CurrentWeatherDetails>
              {locationForecastWeather &&
                locationForecastWeather.length !== 0 && (
                  <DailyForecast>
                    <h4>Daily Forecast</h4>
                    <HorizontalscrollContainer>
                      {locationForecastWeather.daily.map((forecast, index) => {
                        return (
                          <Horizontalscroll key={index}>
                            <div className="date">{forecast.date}</div>
                            <div className="temp">
                              ↑{forecast.high_temp}°C | ↓{forecast.low_temp}
                              °C
                            </div>
                            <div className="cloud">
                              Clouds: {forecast.clouds}%
                            </div>
                            <div className="condition">
                              <div className="icon">
                                <img
                                  src={`../icons/${forecast.icon}.png`}
                                  alt="Weather Icon"
                                />
                              </div>
                              <div className="description">
                                {forecast.description}
                              </div>
                            </div>
                            <div className="pop">
                              Rain probability:{forecast.pop}%
                            </div>
                          </Horizontalscroll>
                        );
                      })}
                    </HorizontalscrollContainer>
                  </DailyForecast>
                )}

              <Outlet />
            </Container>
          ) : null}
        </>
      )}
    </MainContainer>
  );
};

export default Current;
