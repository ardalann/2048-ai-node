// @flow

const playTurn = require("../playTurn");
const getPossibleShifts = require("../getPossibleShifts");

const getBestPossibleMove = require("./getBestPossibleMove");

type OptionsType = {
  board: Array<Array<number>>,
  speed: number
};

const activateAI = ({ board, speed }: OptionsType): ?IntervalID => {
  if (speed < 1) {
    return null;
  }

  const intervalRef: IntervalID = setInterval(() => {
    const possibleShifts = getPossibleShifts(board);
    const shiftDirection = getBestPossibleMove({ board, possibleShifts });
    playTurn({ board, possibleShifts, speed, shiftDirection });

    if (possibleShifts.length === 0) {
      clearInterval(intervalRef);
    }
  }, 1000 / speed); // eslint-disable-line no-magic-numbers

  return intervalRef;
};

module.exports = activateAI;
