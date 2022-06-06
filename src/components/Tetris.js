import React, { useState } from "react";

// Styled components.
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// Custom Hooks.
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

// Actual components.
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// Main game.
const Tetris = () => {
  // UseStates for the drop time of the tetris blocks and a boolean to indicate the winning condition.
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  // Using our custom hooks to create a player and a stage with the user as initial useState.
  const [player] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log("rerenderer.");
  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" /> 
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton />
        </aside>
      </StyledTetris>
      
    </StyledTetrisWrapper>
  );
};

export default Tetris;
