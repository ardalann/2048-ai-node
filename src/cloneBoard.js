// @flow

const cloneBoard = (board: Array<Array<number>>) =>
  board.slice().map((row: Array<number>) => row.slice());

module.exports = cloneBoard;
