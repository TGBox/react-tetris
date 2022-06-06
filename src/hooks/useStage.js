import { useState } from "react";
import { createStage } from "../gameHelpers";

// Hook to handle the useStage for the stage component in the game.
export const useStage = () => {
  const [stage, setStage] = useState(createStage());

  return [stage, setStage];
};