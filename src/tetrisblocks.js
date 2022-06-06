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
    color: "80, 227, 230",
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0]
    ], 
    color: "35, 88, 222",
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"]
    ], 
    color: "222, 155, 33",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"]
    ], 
    color: "234, 222, 6",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0]
    ], 
    color: "44, 222, 56",
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0]
    ], 
    color: "123, 66, 205",
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