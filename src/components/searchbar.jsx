import React, { useCallback } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/search.scss';
import { getFormattedAutoCompleteSearchData } from '../config/apiConfig';
import debounce from 'lodash.debounce';

function SearchBar() {
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useState({ value: '' });
  const [autoCompleteData, setAutoCompleteData] = useState({ value: [] });

  const handleSearch = async (e) => {
    let updateSearchParam = e.target.value;
    setSearchParam({ ...searchParam, value: updateSearchParam });
    debouncedSave(updateSearchParam);
  };
  const debouncedSave = useCallback(
    debounce((updateSearchParam) => {
      handleChange(updateSearchParam);
    }, 2000),
    []
  );

  const handleChange = async (updateSearchParam) => {
    if (updateSearchParam !== '') {
      await getFormattedAutoCompleteSearchData({
        q: updateSearchParam,
      }).then((res) => {
        setSearchParam((prevState) => ({ ...prevState, value: '' }));
        setAutoCompleteData((prevState) => ({
          ...prevState,
          value: res.locationList,
        }));
      });
    }
  };
  const uniqueLocationList = autoCompleteData.value?.reduce(
    (finalArray, current) => {
      let obj = finalArray.find(
        (item) => item.LocalizedName === current.LocalizedName
      );

      if (obj) {
        return finalArray;
      }
      return finalArray.concat([current]);
    },
    []
  );

  const handleClick = async (city) => {
    const cityKey = city.target.getAttribute('data-key');
    const cityname = city.target.getAttribute('data-cityname');

    localStorage.setItem('search-citykey', JSON.stringify(cityKey));
    localStorage.setItem('search-cityname', JSON.stringify(cityname));

    setSearchParam((searchParam) => ({ ...searchParam, value: '' }));
    setAutoCompleteData((prevState) => ({ ...prevState, value: [] }));

    navigate('/city/' + cityname);
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchParam.value}
          onChange={handleSearch}
        />
        <div className="searchIcon">
          <SearchIcon color="blue" />
        </div>
      </div>

      {autoCompleteData.value && autoCompleteData.value.length !== 0 && (
        <div className="dataResult">
          {uniqueLocationList.slice(0, 5).map((city, index) => {
            return (
              <li
                key={city.Key}
                className="dataItem"
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
        </div>
      )}
    </div>
  );
}
export default SearchBar;
