import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import StyledSearchBar from '../styles/searchbar.styled';
import { DataResult, SearchBarContainer } from '../styles/searchbar.styled';
import { getFormattedAutoCompleteSearchData } from '../config/apiConfig';
import debounce from 'lodash.debounce';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateSearchParam,
  clearSearchParam,
  updateAutoCompleteData,
  clearAutoCompleteData,
  updateSearchCityKey,
  updateSearchCityName,
} from '../features/home/homeSlice';

function SearchBar() {
  const { searchParam, autoCompleteData } = useSelector((store) => store.home);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    let setSearchParam = e.target.value;
    dispatch(updateSearchParam(setSearchParam));

    debouncedSave(setSearchParam);
  };
  const debouncedSave = useCallback(
    debounce((setSearchParam) => {
      handleChange(setSearchParam);
    }, 2000),
    []
  );

  const handleChange = async (setSearchParam) => {
    await getFormattedAutoCompleteSearchData({
      q: setSearchParam,
    }).then((res) => {
      dispatch(clearSearchParam());
      dispatch(updateAutoCompleteData(res.locationList));
    });
  };

  const uniqueLocationList = autoCompleteData?.reduce((finalArray, current) => {
    let obj = finalArray.find(
      (item) => item.LocalizedName === current.LocalizedName
    );

    if (obj) {
      return finalArray;
    }
    return finalArray.concat([current]);
  }, []);

  const handleClick = async (city) => {
    const cityKey = city.target.getAttribute('data-key');
    const cityname = city.target.getAttribute('data-cityname');

    dispatch(updateSearchCityKey(cityKey));
    dispatch(updateSearchCityName(cityname));

    dispatch(clearSearchParam());
    dispatch(clearAutoCompleteData());

    navigate('/city/' + cityname);
  };

  return (
    <SearchBarContainer>
      <StyledSearchBar>
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchParam}
          onChange={handleSearch}
        />
        <div>
          <SearchIcon sx={{ color: 'blue' }} />
        </div>
      </StyledSearchBar>

      {autoCompleteData && autoCompleteData.length !== 0 && (
        <DataResult>
          {uniqueLocationList.slice(0, 5).map((city, index) => {
            return (
              <li
                key={city.Key}
                data-key={city.Key}
                data-cityname={city.LocalizedName}
                onClick={(city) => {
                  handleClick(city);
                }}
              >
                {city.LocalizedName},{city.AdministrativeArea.LocalizedName},
                {city.Country.ID}
              </li>
            );
          })}
        </DataResult>
      )}
    </SearchBarContainer>
  );
}
export default SearchBar;
