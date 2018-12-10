// @flow

const cloneBoard = (board: Array<Array<number>>): Array<Array<number>> =>
  board.slice().map((row: Array<number>) => row.map((tile: number) => tile));

module.exports = cloneBoard;
