import styled from 'styled-components';

export const StyledHome = styled.section`
  width: 100%;
  overflow: hidden;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.textDark};
`;
