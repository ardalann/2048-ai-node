// @flow

// const { CHANCE_OF_4 } = require("../config");
const cloneBoard = require("../cloneBoard");

type OptionsType = {
  board: Array<Array<number>>
};

const scoreBoard = ({ board }: OptionsType): number => {
  const clonedBoard = cloneBoard(board);
  // shiftBoard(clonedBoard, move);

  return Math.random();
};

module.exports = scoreBoard;
