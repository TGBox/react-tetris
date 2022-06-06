export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// Creates the initial stage with multidimensional arrays, filled with empty tetrisblocks.
export const createStage = () => 
  Array.from(Array(STAGE_HEIGHT), () => 
    new Array(STAGE_WIDTH).fill([0, "clear"])
  )