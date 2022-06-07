// Object containing the different tetrisblocks represented as multidimensional arrays.
export const TETRISBLOCKS = {
  0: { shape: [[0]], color: "0, 0, 0" },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0]
    ], 
    color: "55, 235, 233",
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0]
    ], 
    color: "235, 55, 222",
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"]
    ], 
    color: "88, 236, 59",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"]
    ], 
    color: "234, 222, 55",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0]
    ], 
    color: "44, 55, 250",
  },
  T: {
    shape: [
      ["T", "T", "T"],
      [0, "T", 0],
      [0, 0, 0]
    ], 
    color: "190, 111, 5",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0]
    ], 
    color: "222, 77, 77",
  },
}

// Will generate random Tetris blocks for our game.
export const randomTetrisblock = () => {
  // Selection of all shapes as String.
  const tetrisblocks = "IJLOSTZ";
  // Random number generation to select one of the letters as random.
  const randBlock = 
    tetrisblocks[Math.floor(Math.random() * tetrisblocks.length)];
  // Return of the object with the random selection.
  return TETRISBLOCKS[randBlock];
}