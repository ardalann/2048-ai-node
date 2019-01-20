// @flow

const { HEURISTIC_MAX_DEPTH } = require("../config");
const scorePossibleMove = require("./scorePossibleMove");

type DirectionType = "up" | "down" | "left" | "right";
type PossibleShiftScoreType = {
  d: DirectionType,
  s: number
};
type OptionsType = {
  board: Array<Array<number>>,
  possibleShifts: Array<DirectionType>
};

const getBestPossibleMove = ({
  board,
  possibleShifts
}: OptionsType): DirectionType | null => {
  if (possibleShifts.length === 0) {
    return null;
  }
  const possibleShiftsScores = possibleShifts.map(
    (direction: DirectionType): PossibleShiftScoreType => ({
      d: direction,
      s: scorePossibleMove({
        board,
        move: direction,
        maxDepth: HEURISTIC_MAX_DEPTH
      })
    })
  );
  const sortedShiftsScores = possibleShiftsScores.sort(
    (shiftA: PossibleShiftScoreType, shiftB: PossibleShiftScoreType) =>
      shiftB.s - shiftA.s
  );

  return sortedShiftsScores[0].d;
};

module.exports = getBestPossibleMove;
