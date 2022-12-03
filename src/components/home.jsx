import { useNavigate } from 'react-router-dom';
import SearchBar from './searchbar';
import CityList from './savedlocationlist';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import '../styles/locations.scss';

const Locations = () => {
  const navigate = useNavigate();

  const currentLocationName = JSON.parse(
    localStorage.getItem('currentLocationName')
  );

  const handleCurrenLocation = () => {
    navigate('/currentlocation/' + currentLocationName);
  };

  return (
    <div className="main-container">
      <div className="navbar">
        {currentLocationName !== null && (
          <div className="currentLocationWeather">
            <MyLocationIcon
              fontSize="large"
              alt="See Weather at your Location"
              onClick={() => {
                handleCurrenLocation();
              }}
            />
          </div>
        )}
      </div>
      <SearchBar />
      <CityList />
    </div>
  );
};

export default Locations;
