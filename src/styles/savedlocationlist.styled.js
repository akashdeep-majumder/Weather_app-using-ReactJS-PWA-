import styled from 'styled-components';

export const CitylistContainer = styled.div`
  height: 60%;
`;
export const StyledcityList = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  margin: auto;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  width: 250px;
  display: flex;
  flex-direction: column;
  height: 60%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  h1 {
    margin: 20px 10px;
    font-size: 20px;
    color: ${(props) => props.theme.colors.text};
  }
`;
export const ListContainer = styled.div`
  background-color: ${(props) => props.theme.colors.bgLight};
  display: flex;
  border-radius: 10px;
  overflow-y: auto;
  flex-direction: column;
  height: 100%;
  box-shadow: inset 0px 0px 12px 0px rgba(0, 0, 0, 0.7);
  /* &::-webkit-scrollbar {
    display: none;
  } */
  div {
    display: flex;
    margin: 20px;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    background-color: ${(props) => props.theme.colors.pLight};
    border-radius: 10px;

    li {
      font-size: 20px;
      color: ${(props) => props.theme.colors.text};

      &:hover {
        cursor: pointer;
        transform: scale(1.05);
      }
      &::marker {
        content: none;
      }
    }
    .dltIcon {
      &:hover {
        transform: scale(1.15);
        cursor: pointer;
      }
    }
  }
`;
