import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  StyledcityList,
  CitylistContainer,
  ListContainer,
} from '../styles/savedlocationlist.styled';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateSearchCityKey,
  updateSearchCityName,
  updateSavedLocationList,
} from '../features/home/homeSlice';

const CityList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { savedLocationList } = useSelector((state) => state.home || {});

  const handleCityList = async (city) => {
    const citykey = city.target.getAttribute('data-key');
    dispatch(updateSearchCityKey(citykey));

    const cityName = city.target.getAttribute('data-cityname');
    dispatch(updateSearchCityName(cityName));

    navigate('/city/' + cityName);
  };
  const deleteCity = (id) => {
    const updateCityList = savedLocationList.filter((city, index) => {
      return index !== id;
    });
    dispatch(updateSavedLocationList(updateCityList));
  };

  return (
    <CitylistContainer>
      {savedLocationList && savedLocationList.length !== 0 && (
        <StyledcityList>
          <h1> Saved Locations ({savedLocationList.length}/5)</h1>
          <ListContainer>
            {savedLocationList.slice(0, 5).map((city, index) => {
              return (
                <div key={city.cityKey}>
                  <li
                    data-key={city.cityKey}
                    data-cityname={city.cityName}
                    data-country={city.countryName}
                    onClick={(city) => {
                      handleCityList(city);
                    }}
                  >
                    {city.cityName},{city.countryName}
                  </li>

                  <DeleteIcon
                    className="dltIcon"
                    onClick={() => deleteCity(index)}
                  />
                </div>
              );
            })}
          </ListContainer>
        </StyledcityList>
      )}
    </CitylistContainer>
  );
};

export default CityList;
