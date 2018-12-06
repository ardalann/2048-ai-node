// @flow

const generateTile = require("./generateTile");

// eslint-disable-next-line no-magic-numbers
const generateBoard = (width: number = 4, height: number = 4) => {
  const board = new Array(height);
  for (let row = 0; row < height; row++) {
    board[row] = new Array(width).fill(0);
  }
  const randomRow = Math.floor(Math.random() * height);
  const randomCol = Math.floor(Math.random() * width);
  board[randomRow][randomCol] = generateTile();
  return board;
};

module.exports = generateBoard;
