// @flow

const generateTile = require("./generateTile");

const addNewTileToBoard = (board: Array<Array<number>>) => {
  const height = board.length;
  const width = board[0].length;
  let randomRow;
  let randomCol;
  do {
    randomRow = Math.floor(Math.random() * height);
    randomCol = Math.floor(Math.random() * width);
  } while (board[randomRow][randomCol] > 0);
  board[randomRow][randomCol] = generateTile();
};

module.exports = addNewTileToBoard;
