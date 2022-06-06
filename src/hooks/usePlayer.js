import { useState } from "react";
import { randomTetrisblock } from "../tetrisblocks";

// Hook to handle the player's state within the game.
export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetrisblock: randomTetrisblock().shape,
    collided: false,
  });

  return [player];
};