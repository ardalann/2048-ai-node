// @flow

const cloneBoard = require("../cloneBoard");
const shiftBoard = require("../shiftBoard");
const scoreBoard = require("./scoreBoard");

type DirectionType = "up" | "down" | "left" | "right";
type OptionsType = {
  board: Array<Array<number>>,
  move: DirectionType
};

const scorePossibleMove = ({ board, move }: OptionsType): number => {
  const clonedBoard = cloneBoard(board);
  shiftBoard(clonedBoard, move);

  return scoreBoard({ board: clonedBoard });
};

module.exports = scorePossibleMove;
