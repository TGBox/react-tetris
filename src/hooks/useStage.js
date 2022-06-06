import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

// Hook to handle the useStage for the stage component in the game.
export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    // Handles deleting of filled rows an refilling of the stage array.
    const sweepRows = newStage => {
      // Checks if any cell in the row from our stage is 0. If not, it counts our score up and readds a row.
      newStage.reduce((accumulated, row) => {
        if(row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1);
          accumulated.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          return accumulated;
        }
        accumulated.push(row);
        return accumulated;
      }, []);
    }

    // Is inside of the useEffect because we won't use it somewhere else.
    const updateStage = prevStage => {
      // First we will flush the stage from the previous render.
      const newStage = prevStage.map(row => 
        row.map(cell => (cell[1] === "clear" ? [0, "clear"] : cell)),  
      );

      // Then we draw the tetrisblock according to the object at hand.
      player.tetrisblocks.forEach((row, y) => {
        row.forEach((value, x) => {
          if(value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value, 
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });

      // Then we check for collision. If true, we reset the player and sweeps the rows of the new stage.
      if(player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage(prev => updateStage(prev));
  }, [player.pos.x, player.pos.y, player.collided, player.tetrisblocks, resetPlayer]);

  return [stage, setStage, rowsCleared];
};