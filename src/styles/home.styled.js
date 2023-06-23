import styled from 'styled-components';

export const StyledHome = styled.section`
  width: 100%;
  overflow: hidden;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.textDark};
`;
export const StyledLandingPage = styled.section`
  width: 100%;
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.textDark};

  input {
    border: 0;
    color: 'black';
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    font-size: 18px;
    padding: 10px;
    width: 300px;
    text-decoration: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    &:focus {
      outline: none;
    }
  }
  button {
    border: 0;
    color: blue;
    background-color: white;
    font-size: 18px;
    padding: 10px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    cursor: pointer;
    border-left: 0.5px solid black;
  }
`;
