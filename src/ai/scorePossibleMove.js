// @flow

const { CHANCE_OF_4 } = require("../config");

const cloneBoard = require("../cloneBoard");
const shiftBoard = require("../shiftBoard");
const getPossibleShifts = require("../getPossibleShifts");
const scoreBoard = require("./scoreBoard");

const scoreBestPossibleMove = ({
  board,
  maxDepth
}: {
  board: Array<Array<number>>,
  maxDepth: number
}): number => {
  const possibleMoves = getPossibleShifts(board);

  return possibleMoves.reduce(
    (best: number, move: "up" | "down" | "left" | "right") =>
      // eslint-disable-next-line
      Math.max(best, scorePossibleMove({ board, move, maxDepth })),
    0
  );
};

const deeplyScoreBoard = ({
  board,
  maxDepth
}: {
  board: Array<Array<number>>,
  maxDepth: number
}): number => {
  if (maxDepth < 1) {
    return scoreBoard({ board });
  } else {
    return scoreBestPossibleMove({ board, maxDepth: maxDepth - 1 });
  }
};

type DirectionType = "up" | "down" | "left" | "right";
type OptionsType = {
  board: Array<Array<number>>,
  move: DirectionType,
  maxDepth?: number
};

const scorePossibleMove = ({
  board,
  move,
  maxDepth = 0
}: OptionsType): number => {
  const clonedBoard = cloneBoard(board);
  shiftBoard(clonedBoard, move);

  const scores = [];
  for (let row = 0; row < clonedBoard.length; row++) {
    for (let column = 0; column < clonedBoard[row].length; column++) {
      if (clonedBoard[row][column] === 0) {
        clonedBoard[row][column] = 2;
        scores.push(
          (1 - CHANCE_OF_4) * deeplyScoreBoard({ board: clonedBoard, maxDepth })
        );
        clonedBoard[row][column] = 4;
        scores.push(
          CHANCE_OF_4 * deeplyScoreBoard({ board: clonedBoard, maxDepth })
        );
        clonedBoard[row][column] = 0;
      }
    }
  }

  return (
    scores.reduce((total: number, score: number) => total + score, 0) /
    scores.length
  );
};

module.exports = scorePossibleMove;
