import styled from "styled-components";
import bgImage from "../../assets/bg.png";

// Styled component to define the Wrapper for the Tetris game.
export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
`

/* 
  Styled component to define the Tetris game as a whole.
  Contains a nested styled component for the aside.
*/
export const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;