import styled from 'styled-components';

export const Loading = styled.div`
  height: 100vh;
  width: 100%;
  color: blue;
  display: grid;
  place-items: center;
  background-color: whitesmoke;
`;

export const MainContainer = styled.div`
  height: 100%;
  width: 100%;
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.textDark};
  @media only screen and (min-width: 768px) {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    overflow: hidden;
    flex-direction: row;
  }
`;

export const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  background-color: ${(props) => props.theme.colors.bgLight};
  width: 100%;
  top: 0;

  div {
    display: flex;
    flex-direction: row;
    div {
      margin: 10px;
      border-radius: 10px;
      border: 2px solid ${(props) => props.theme.colors.pLight};
      background-color: ${(props) => props.theme.colors.pLight};
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
    }
    button {
      margin: 10px 0px;
      padding: 10px;
      cursor: pointer;
      color: ${(props) => props.theme.colors.textLight};

      background-color: ${(props) => props.theme.colors.pLight};
      border: 2px solid ${(props) => props.theme.colors.pLight};
      border-radius: 10px;
      &:hover {
        background-color: ${(props) => props.theme.colors.bgLight};
        color: ${(props) => props.theme.colors.textDark};
      }
    }
  }
  .dark {
    margin: 10px;
    justify-content: center;
    display: flex;
    border-radius: 5px;
    padding: 5px;
    flex-direction: column;
  }
  @media only screen and (min-width: 768px) {
    order: 1;
  }
`;

export const TodayCurrentWeather = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: -2px 3px 10px 0px rgba(0, 0, 0, 0.59);
  text-align: center;
  font-weight: bold;
  background: linear-gradient(
    to right,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.pLight}
  );
  color: ${(props) => props.theme.colors.textLight};
  margin: 75px 10px 20px 20px;
  border-radius: 10px;

  h1 {
    margin-top: 20px;
    font-size: 30px;
  }
  .today-temp {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 2px;
  }
  .cloud {
    margin-bottom: 1px;
  }
  .rain {
    margin-bottom: 20px;
  }
  @media only screen and (min-width: 768px) {
    order: 2;
    width: 32%;
    font-size: 20px;
    h1 {
      font-size: 45px;
    }
    .today-temp {
      font-size: 20px;
    }
  }
`;
export const HourlyForecast = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.background};
  flex-direction: column;
  @media only screen and (min-width: 768px) {
    order: 4;
    overflow: auto;
    flex-wrap: nowrap;
    margin: 10px 0px;
  }

  h4 {
    color: ${(props) => props.theme.colors.textDark};
    margin: 10px;
  }
`;
export const HorizontalscrollContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  overflow: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const Horizontalscroll = styled.section`
  margin: 10px 9px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: ${(props) => props.theme.colors.bgLight};
  box-shadow: -2px 3px 10px 0px rgba(0, 0, 0, 0.3);
  border-radius: 5px;

  .time {
    margin: 5px 0px;
    border-bottom: 1px solid black;
  }
  .icon {
    img {
      width: 60px;
      height: 60px;
    }
  }
  .description {
    margin: 2px;
    font-size: 15px;
  }
  .pop {
    margin: 2px;
    font-size: 12.5px;
  }
`;
export const CurrentWeatherDetails = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  margin: 20px 0px;
  h3 {
    margin: 10px;
    color: ${(props) => props.theme.colors.textDark};

    font-weight: bold;
  }
  @media only screen and (min-width: 768px) {
    order: 2;
    margin: 70px 20px 20px 10px;
    width: 60%;
  }
  @media only screen and (min-width: 1024px) {
    h3 {
      padding-left: 20px;
    }
  }
`;
export const GridWrapper = styled.div`
  margin: 20px 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 7.5rem);
  justify-content: center;

  div {
    background-color: ${(props) => props.theme.colors.bgLight};
    box-shadow: -2px 3px 10px 0px rgba(0, 0, 0, 0.3);

    margin: 10px;
    padding: 5px;
    border-radius: 10px;
    font-size: 15px;
  }

  @media only screen and (min-width: 540px) {
    grid-template-columns: repeat(4, 8rem);
    grid-template-rows: repeat(2, 8rem);
  }
  @media only screen and (max-width: 539px) {
    grid-template-rows: repeat(2, 8rem);
    grid-template-columns: repeat(2, 8rem);
  }
  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 9rem);
    grid-template-rows: repeat(2, 9rem);
    div {
      font-size: 20px;
    }
  }
`;

export const DailyForecast = styled.div`
  display: flex;
  @media only screen and (min-width: 768px) {
    order: 5;
    overflow: auto;
    flex-wrap: nowrap;
    margin: 10px 0px;
  }
  background-color: ${(props) => props.theme.colors.background};
  flex-direction: column;
  h4 {
    color: ${(props) => props.theme.colors.textDark};

    margin: 10px;
  }
`;
