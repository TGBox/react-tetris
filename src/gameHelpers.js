// Size of the game area grid.
export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// Creates the initial stage with multidimensional arrays, filled with empty tetrisblocks.
export const createStage = () => 
  Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, "clear"]));

// Collision detection that utilizes the player, the current game stage and the desired move set.
export const checkForCollision = (player, stage, { x: moveX, y: moveY }) => {
  // Iterating through our multidimensional grid cell array.
  for (let y = 0; y < player.tetrisblocks.length; y += 1) {
    for (let x = 0; x < player.tetrisblocks[0].length; x += 1) {
      // Checking if we actually are on a cell with a tetrisblock on it.
      if (player.tetrisblocks[y][x] !== 0) {
        // Checking if we move inside of the area boundaries and if the targeted cell is clear.
        if(!stage[y + player.pos.y + moveY] || 
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== "clear"
        ) {
            return true;
        }
      }
    }
  }
  return false;
};