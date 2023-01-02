import { useNavigate } from 'react-router-dom';
import SearchBar from './searchbar';
import CityList from './savedlocationlist';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { StyledHome } from '../styles/home.styled';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar } from '../styles/weather.styled';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { changeMode } from '../features/home/homeSlice';
import { RotatingLines } from 'react-loader-spinner';

const Locations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { locationCityKey, locationCityName, darkMode } = useSelector(
    (state) => state.home
  );

  const handleCurrenLocation = () => {
    navigate('/currentlocation/' + locationCityName);
  };

  const changeDarkMode = () => {
    dispatch(changeMode(darkMode));
  };

  return (
    <StyledHome>
      <Navbar>
        <div>
          {locationCityName && locationCityName !== undefined ? (
            <div>
              <MyLocationIcon
                sx={{ color: 'white', padding: '5px' }}
                fontSize="medium"
                alt="See Weather at your Location"
                onClick={() => {
                  handleCurrenLocation();
                }}
              />
            </div>
          ) : (
            <div
              style={{
                padding: '4px',
              }}
            >
              <RotatingLines
                id="loader"
                strokeColor="white"
                strokeWidth="5"
                animationDuration="1"
                width="28"
                visible={true}
              />
            </div>
          )}
        </div>
        <div className="dark">
          <DarkModeIcon onClick={changeDarkMode} />
        </div>
      </Navbar>
      <SearchBar />
      <CityList />
    </StyledHome>
  );
};

export default Locations;
