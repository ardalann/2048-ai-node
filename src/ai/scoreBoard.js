// @flow

const {
  HEURISTIC_FACTOR_LOST_PENALTY,
  HEURISTIC_FACTOR_MONOTONICITY_POWER,
  HEURISTIC_FACTOR_MONOTONICITY_WEIGHT,
  HEURISTIC_FACTOR_MONOTONICITY_REDUCTION_IF_AT_RISK,
  HEURISTIC_FACTOR_SUM_POWER,
  HEURISTIC_FACTOR_SUM_WEIGHT,
  // HEURISTIC_FACTOR_MERGES_WEIGHT,
  HEURISTIC_FACTOR_EMPTY_WEIGHT
} = require("../config");
const getPossibleShifts = require("../getPossibleShifts");
const getEmptyTilesCount = require("./getEmptyTilesCount");

type OptionsType = {
  board: Array<Array<number>>
};

const scoreBoard = ({ board }: OptionsType): number => {
  const possibleShifts = getPossibleShifts(board);
  const hasLost = possibleShifts.length > 0 ? 0 : 1;

  let monotonicityTop = 0;
  for (let column = 0; column < board[0].length; column++) {
    if (column === 0 || board[0][column - 1] > board[0][column]) {
      monotonicityTop += Math.pow(
        board[0][column],
        HEURISTIC_FACTOR_MONOTONICITY_POWER
      );
    }
  }
  let monotonicityLeft = 0;
  for (let column = 0; column < board[0].length; column++) {
    if (column === 0 || board[0][column - 1] > board[0][column]) {
      monotonicityLeft += Math.pow(
        board[0][column],
        HEURISTIC_FACTOR_MONOTONICITY_POWER
      );
    }
  }
  const monotonicityAtRisk =
    !possibleShifts.includes("left") && !possibleShifts.includes("top");
  const monotonicity =
    Math.max(monotonicityTop, monotonicityLeft) *
    (1 -
      (monotonicityAtRisk
        ? HEURISTIC_FACTOR_MONOTONICITY_REDUCTION_IF_AT_RISK
        : 0));

  const sum = board.reduce(
    (prevTotal: number, currentRow: Array<number>) =>
      prevTotal +
      currentRow.reduce(
        (prevRowTotal: number, tile: number) =>
          prevRowTotal + Math.pow(tile, HEURISTIC_FACTOR_SUM_POWER),
        0
      ),
    0
  );

  // const merges;

  const emptyTiles = getEmptyTilesCount({ board });

  const score =
    HEURISTIC_FACTOR_LOST_PENALTY * hasLost +
    HEURISTIC_FACTOR_MONOTONICITY_WEIGHT * monotonicity +
    HEURISTIC_FACTOR_SUM_WEIGHT * sum +
    HEURISTIC_FACTOR_EMPTY_WEIGHT * emptyTiles;

  if (process.env.DEBUG) {
    console.log("scoreBoard\n", board.join("\n"), {
      score,
      hasLost,
      monotonicity,
      sum,
      emptyTiles
    });
  }

  return score;
};

module.exports = scoreBoard;
