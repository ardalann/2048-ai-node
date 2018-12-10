// @flow

type DirectionType = "up" | "down" | "left" | "right";
type OptionsType = {
  board: Array<Array<number>>,
  move: DirectionType
};

const scorePossibleMove = ({ board, move }: OptionsType): number => {
  return Math.random();
};

module.exports = scorePossibleMove;
