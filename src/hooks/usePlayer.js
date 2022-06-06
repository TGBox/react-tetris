import { useCallback, useState } from "react";
import { STAGE_WIDTH } from "../gameHelpers";
import { TETRISBLOCKS, randomTetrisblock } from "../tetrisblocks";

// Handles the player's state within the game.
export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetrisblocks: TETRISBLOCKS[0].shape,
    collided: false,
  });

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

  return [player, updatePlayerPos, resetPlayer];
};