import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/citylist.scss';

const cityListFromLS = () => {
  let list = localStorage.getItem('city-list');
  if (list) {
    return JSON.parse(localStorage.getItem('city-list'));
  } else {
    return [];
  }
};

const CityList = () => {
  const navigate = useNavigate();
  const [locationList, setLocationList] = useState(cityListFromLS);

  const handleCityList = async (city) => {
    const citykey = city.target.getAttribute('data-key');
    localStorage.setItem('search-citykey', JSON.stringify(citykey));

    const cityName = city.target.getAttribute('data-cityname');
    localStorage.setItem('search-cityname', JSON.stringify(cityName));

    navigate('/city/' + cityName);
  };
  const deleteCity = (id) => {
    const updateCityList = locationList.filter((city, index) => {
      return index !== id;
    });
    setLocationList(updateCityList);
  };

  useEffect(() => {
    localStorage.setItem('city-list', JSON.stringify(locationList));
  }, [locationList]);

  return (
    <div className="container">
      {locationList && locationList.length !== 0 && (
        <div className="citylist">
          <div>
            <h1 className="locations"> Your Locations</h1>
          </div>
          {locationList.slice(0, 5).map((city, index) => {
            return (
              <div className="cities" key={city.cityKey}>
                <div
                  className="city"
                  data-key={city.cityKey}
                  data-cityname={city.cityName}
                  data-country={city.countryName}
                  onClick={(city) => {
                    handleCityList(city);
                  }}
                >
                  {city.cityName},{city.countryName}
                </div>

                <div className="delete" onClick={() => deleteCity(index)}>
                  <DeleteIcon />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CityList;
