import React, { useState } from "react";

// Creates new stage.
import { createStage, checkForCollision} from "../gameHelpers";

// Styled components.
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// Custom Hooks.
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

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
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

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
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  // Moves the current block downwards.
  const drop = () => {
    // Level increase for clearing ten rows.
    if(rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Difficulty increase.
      setDropTime(1000 / (level + 1) + 200);
    }
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

  // Handles the restarting of the implicit drop timer when the down key is released.
  const keyUp = ({ keyCode }) => {
    if(!gameOver) {
      if(keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  // Handles the press of the down arrow key to speed up the falling tetris block.
  const dropPlayer = () => {
    // Will stop the implicit dropping.
    setDropTime(null);
    drop();
  };

  // Handles the key inputs from the player.
  const move = ({ keyCode }) => {
    if(!gameOver) {
      if(keyCode === 37) {  
        // Left arrow key to move left.
        movePlayer(-1);
      } else if(keyCode === 39) { 
        // Right arrow key to move right.
        movePlayer(1);
      } else if(keyCode === 40) { 
        // Down arrow key to drop down fast.
        dropPlayer();
      } else if(keyCode === 38) { 
        // Up arrow key for clockwise rotation.
        playerRotate(stage, 1);
      } 
    }
  };

  // Hook to handle a single implicit drop with the current interval.
  useInterval(() => {
    drop(); 
  }, dropTime);

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text={`Game Over! Score: ${score}`} /> 
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
      
    </StyledTetrisWrapper>
  );
};

export default Tetris;
