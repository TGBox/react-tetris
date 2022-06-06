import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETRISBLOCKS } from "../tetrisblocks";

/* 
  Defines a singular basic Cell of our grid. Will also be used to create the tetrisblocks inside of the game. 
  Uses the StyledCell and the TETRISBLOCKS object to define the styling of the actual block shapes.
*/
const Cell = ({ type }) => (
  <StyledCell type={type} color={TETRISBLOCKS[type].color} />
);

// Will enable react to only rerender the changing cells to improve performance.
export default React.memo(Cell);
