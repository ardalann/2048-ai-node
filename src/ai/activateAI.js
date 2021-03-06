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
    const beforeAIProcessing = new Date().getTime();
    const shiftDirection = getBestPossibleMove({ board, possibleShifts });
    const afterAIProcessing = new Date().getTime();
    playTurn({
      board,
      possibleShifts,
      speed,
      shiftDirection,
      aiProcessingTime: afterAIProcessing - beforeAIProcessing
    });

    if (possibleShifts.length === 0) {
      clearInterval(intervalRef);
    }
  }, 1000 / Math.pow(speed, 2)); // eslint-disable-line no-magic-numbers

  return intervalRef;
};

module.exports = activateAI;
