import { useState, useEffect, useMemo, useCallback } from 'react';

// Custom hook to update the game status.
export const useGameStatus = rowsCleared => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  // Points are using the React useMemo to cache their values. Avoids unnecessary recreation on every tick.
  const linePoints = useMemo(() => [40, 100, 300, 1200], []);

  // Calculates the score for the game.
  const calcScore = useCallback(() => {
    // We have score.
    if (rowsCleared > 0) {
      // This is how original Tetris score is calculated.
      setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows(prev => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};