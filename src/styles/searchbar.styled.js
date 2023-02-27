import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  height: 45%;
`;
const StyledSearchBar = styled.section`
  margin: 90px 20px 10px 20px;
  display: flex;
  justify-content: center;

  input {
    border: 0;
    color: 'black';
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    font-size: 18px;
    padding: 15px;
    width: 300px;
    text-decoration: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    &:focus {
      outline: none;
    }
  }
  div {
    width: 50px;
    background-color: white;
    display: grid;
    place-items: center;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 45px;
  }
`;

export const DataResult = styled.section`
  justify-content: center;
  margin: auto;
  margin-bottom: 10px;
  width: 250px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  color: black;
  border-radius: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
  li {
    padding: 10px;
    display: flex;

    &::marker {
      content: square;
    }
    &:hover {
      transform: scale(1.01);
      background-color: ${(props) => props.theme.colors.sLight};
      border-radius: 10px;
    }
  }
`;

export default StyledSearchBar;
