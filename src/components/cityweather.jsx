import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Grid } from 'react-loader-spinner';
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
  handleCityCurrentWeather,
  handleCityForecastWeather,
  handleLoading,
} from '../features/weather/cityWeatherSlice';
import {
  updateSavedLocationList,
  changeMode,
} from '../features/home/homeSlice';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const TempCurrent = () => {
  const { cityCurrentWeather, cityForecastWeather, loading } = useSelector(
    (store) => store.cityWeather
  );
  const {
    searchCityKey,
    searchCityName,
    savedLocationList,
    darkMode,
    weatherBitApiKey,
    apiKeyValid,
  } = useSelector((state) => state.home);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(handleLoading(true));

      const weatherData = await getFormattedAccuWeatherData(searchCityKey).then(
        (res) => {
          dispatch(handleCityCurrentWeather(res));
        }
      );

      const forecastData = await getFormattedWeathebitData(
        {
          city: searchCityName,
        },
        weatherBitApiKey
      ).then((res) => {
        dispatch(handleCityForecastWeather(res));
        dispatch(handleLoading(false));
      });
    };
    fetchData();
  }, []);

  const changeDarkMode = () => {
    dispatch(changeMode(darkMode));
  };

  const handleAdd = (e) => {
    const btn = document.getElementById('adddBtn');
    btn.style.visibility = 'hidden';
    const cityData = {
      cityName: e.target.getAttribute('data-cityname'),
      cityKey: e.target.getAttribute('data-key'),
      countryName: e.target.getAttribute('data-countryname'),
    };
    const list = [...savedLocationList];
    list.push(cityData);
    const uniqueCityList = list.reduce((finalArray, current) => {
      let obj = finalArray.find((item) => item.cityName === current.cityName);

      if (obj) {
        return finalArray;
      }
      return finalArray.concat([current]);
    }, []);

    dispatch(updateSavedLocationList(uniqueCityList));
  };

  useEffect(() => {
    if (apiKeyValid === false) {
      navigate('/keyValidation');
    }
  }, [apiKeyValid]);

  return (
    <MainContainer>
      {loading ? (
        <Loading>
          <Grid color="blue" />
        </Loading>
      ) : (
        <>
          {cityCurrentWeather && cityCurrentWeather.length !== 0 ? (
            <Container>
              <Navbar>
                <div>
                  <div>
                    <Link to="/home">
                      <SearchIcon
                        sx={{ color: 'white' }}
                        style={{ padding: '5px' }}
                      />
                    </Link>
                  </div>

                  <button
                    id="adddBtn"
                    data-key={searchCityKey}
                    data-cityname={cityForecastWeather.city_name}
                    data-countryname={cityForecastWeather.country_code}
                    onClick={(e) => handleAdd(e)}
                  >
                    Save
                  </button>
                </div>
                <div className="dark">
                  <DarkModeIcon onClick={changeDarkMode} />
                </div>
              </Navbar>
              <TodayCurrentWeather>
                {cityForecastWeather && cityForecastWeather.length !== 0 && (
                  <h1>{cityForecastWeather.city_name}</h1>
                )}
                <div className="today-temp">
                  {cityCurrentWeather.Temperature.Metric.Value} °C | {''}
                  {cityCurrentWeather.WeatherText}
                </div>

                <div className="cloud">
                  <div>Clouds : {cityCurrentWeather.CloudCover} %</div>
                </div>
                <div className="rain">
                  Will it rain :
                  {cityCurrentWeather.HasPrecipitation === true ? 'Yes' : 'No'}
                </div>
              </TodayCurrentWeather>
              {cityForecastWeather && cityForecastWeather.length !== 0 && (
                <HourlyForecast>
                  <h4>Hourly Forecast</h4>
                  <HorizontalscrollContainer>
                    {cityForecastWeather.hourly.map((hourly, index) => {
                      return (
                        <Horizontalscroll key={index}>
                          <div className="time">{hourly.time}</div>
                          <div className="temp">{hourly.temp}°C</div>
                          <div className="condition">
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
                    AQI <p>{cityForecastWeather.aqi}</p>
                  </div>
                  <div>
                    Humidity
                    <p>{cityCurrentWeather.RelativeHumidity} %</p>
                  </div>
                  <div>
                    Feels like
                    <p>
                      {cityCurrentWeather.RealFeelTemperature.Metric.Value} °C
                    </p>
                  </div>
                  <div>
                    precipitation
                    <p>
                      {cityCurrentWeather.Precip1hr.Metric.Value}(mm) in the
                      last hour.
                    </p>
                  </div>
                  <div>
                    Pressure
                    <p>
                      {cityCurrentWeather.Pressure.Metric.Value}(
                      {cityCurrentWeather.Pressure.Metric.Unit})
                    </p>
                  </div>
                  <div>
                    Wind
                    <p>
                      {cityCurrentWeather.Wind.Speed.Metric.Value}(
                      {cityCurrentWeather.Wind.Speed.Metric.Unit})
                    </p>
                  </div>
                  <div>
                    UVIndex <p>{cityCurrentWeather.UVIndex}</p>
                  </div>
                  <div>
                    Visibility
                    <p>
                      {cityCurrentWeather.Visibility.Metric.Value}(
                      {cityCurrentWeather.Visibility.Metric.Unit})
                    </p>
                  </div>
                </GridWrapper>
              </CurrentWeatherDetails>
              {cityForecastWeather && cityForecastWeather.length !== 0 && (
                <DailyForecast>
                  <h4>Daily Forecast</h4>
                  <HorizontalscrollContainer>
                    {cityForecastWeather.daily.map((forecast, index) => {
                      return (
                        <Horizontalscroll key={index}>
                          <div className="time">{forecast.date}</div>
                          <div className="temp">
                            ↑{forecast.high_temp}°C | ↓{forecast.low_temp}°C
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

export default TempCurrent;
