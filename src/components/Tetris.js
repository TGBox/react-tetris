import React, { useState } from "react";

// Creates new stage.
import { createStage, checkForCollision} from "../gameHelpers";

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
  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  // Handles player movement on the horizontal axis.
  const movePlayer = dir => {
    if(!checkForCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  // Handles the start of a new game.
  const startGame = () => {
    // Reset everything.
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  };

  // Moves the current block downwards.
  const drop = () => {
    if(!checkForCollision(player, stage, { x: 0, y: 1})) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over condition.
      if(player.pos.y < 1) {
        console.log("GAME OVER!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  // Handles the press of the down arrow key to speed up the falling tetris block.
  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  // Handles the key inputs from the player.
  const move = ({ keyCode }) => {
    if(!gameOver) {
      if(keyCode === 37) {  // Left arrow key.
        movePlayer(-1);
      } else if(keyCode === 39) { // Right arrow key.
        movePlayer(1);
      } else if(keyCode === 40) { // Down arrow key.
        dropPlayer();
      }
    }
  };

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
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
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
      
    </StyledTetrisWrapper>
  );
};

export default Tetris;
