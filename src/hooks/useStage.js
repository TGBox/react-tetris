import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

// Hook to handle the useStage for the stage component in the game.
export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    // Is inside of the useEffect because we won't use it somewhere else.
    const updateStage = prevStage => {
      // First we will flush the stage from the previous render.
      const newStage = prevStage.map(row => 
        row.map(cell => (cell[1] === "clear" ? [0, "clear"] : cell)),  
      );

      // Then we draw the tetrisblock according to the object at hand.
      player.tetrisblock.forEach((row, y) => {
        row.forEach((value, x) => {
          if(value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value, 
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });

      return newStage;
    };

    setStage(prev => updateStage(prev));
  }, [player]);

  return [stage, setStage];
};