import { useSelector, useDispatch } from 'react-redux';
import { StyledLandingPage } from '../styles/home.styled';
import { updateWeatherBitApiKey } from '../features/home/homeSlice';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const { weatherBitApiKey } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkApiKey = () => {
    const data = axios
      .get(
        `https://api.weatherbit.io/v2.0/current/airquality?city=Bengaluru&key=${weatherBitApiKey}`
      )
      .then(() => navigate('/home'))
      .catch(() => alert('Api Key is Invalid.  Please Enter a Valid Api Key'));
  };
  const handleKey = () => {
    if (weatherBitApiKey.length !== 32) {
      alert('Api Key should be 32 Characters long.');
    } else {
      checkApiKey();
    }
  };

  const updateKey = (e) => {
    let apiKey = e.target.value;
    dispatch(updateWeatherBitApiKey(apiKey));
  };

  return (
    <StyledLandingPage>
      <h2>Enter Your Weatherbit Api Key..</h2>
      <h5>
        Don't have one,&nbsp;&nbsp;
        <a href="https://www.weatherbit.io/" target="_blank">
          Get your Api Key
        </a>
      </h5>
      <div className="input">
        <input
          type="text"
          placeholder="32 Characters Key"
          value={weatherBitApiKey}
          onChange={(e) => updateKey(e)}
        />
        <button onClick={() => handleKey()}>Enter</button>
      </div>
    </StyledLandingPage>
  );
};

export default LandingPage;
