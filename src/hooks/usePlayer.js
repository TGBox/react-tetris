import { useCallback, useState } from "react";
import { checkForCollision, STAGE_WIDTH } from "../gameHelpers";
import { TETRISBLOCKS, randomTetrisblock } from "../tetrisblocks";

// Handles the player's state within the game.
export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetrisblocks: TETRISBLOCKS[0].shape,
    collided: false,
  });

  // Handles the rotation of a given tetrisblock matrix in the correct direction.
  const rotate = (matrix, dir) => {
    // Rows get transposed to columns.
    const rotatedMatrix = matrix.map((_, index) => 
      matrix.map(col => col[index]),
    );
    // Reverse each row to get a rotated matrix.
    if(dir > 0) {
      // Clockwise rotation.
      return rotatedMatrix.map(row => row.reverse());
    } else {
      // Anticlockwise rotation.
      return rotatedMatrix.reverse();
    }
  };

  // Will rotate the tetrisblock of the player in the game.
  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetrisblocks = rotate(clonedPlayer.tetrisblocks, dir);
    // Position collision check on rotation.
    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while(checkForCollision(clonedPlayer, stage, { x: 0, y: 0})){
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetrisblocks[0].length) {
        rotate(clonedPlayer.tetrisblocks, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  // Updates the player position with the values provided.
  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
      collided,
    }))
  };

  // Resets the player of the game. Creates new object with the default values.
  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetrisblocks: randomTetrisblock().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};