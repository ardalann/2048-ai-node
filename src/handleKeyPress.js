// @flow

const getPossibleShifts = require("./getPossibleShifts");
const activateAI = require("./ai/activateAI");
const getBestPossibleMove = require("./ai/getBestPossibleMove");
const playTurn = require("./playTurn");

let AISpeed = 0;

let intervalRef: ?IntervalID;

type OptionsType = {
  board: Array<Array<number>>
};

const handleKeyPress = ({ board }: OptionsType) => (
  char: ?string,
  key: ?{
    name: "up" | "down" | "left" | "right" | "return" | "escape" | string,
    ctrl: boolean
  }
) => {
  if (key && ((key.ctrl && key.name === "c") || key.name === "escape")) {
    process.stdin.pause();

    if (intervalRef) {
      clearInterval(intervalRef);
    }

    return;
  } else if (AISpeed === 0 && key && key.name === "p") {
    const possibleShifts = getPossibleShifts(board);
    const shiftDirection = getBestPossibleMove({ board, possibleShifts });
    playTurn({ board, possibleShifts, speed: 0, shiftDirection });
  }

  if (char && /^[1-9]$/.test(char)) {
    AISpeed = parseInt(char, 10);
    if (intervalRef) {
      clearInterval(intervalRef);
    }
    intervalRef = activateAI({
      board,
      speed: AISpeed
    });
  } else if (char === "0") {
    AISpeed = 0;
    if (intervalRef) {
      clearInterval(intervalRef);
    }
  }

  const shiftDirection = AISpeed === 0 && key ? key.name : "";

  playTurn({
    board,
    speed: AISpeed,
    possibleShifts: getPossibleShifts(board),
    shiftDirection
  });
};
module.exports = handleKeyPress;
