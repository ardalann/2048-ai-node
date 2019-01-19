// @flow

const keypress = require("keypress");

const generateBoard = require("./generateBoard");
const getPossibleShifts = require("./getPossibleShifts");
const activateAI = require("./ai/activateAI");
const addNewTileToBoard = require("./addNewTileToBoard");
const playTurn = require("./playTurn");

keypress(process.stdin);

const board = generateBoard();
addNewTileToBoard(board);

let AISpeed = 0;

playTurn({
  board,
  speed: AISpeed,
  possibleShifts: getPossibleShifts(board),
  shiftDirection: ""
});

let intervalRef: ?IntervalID;

process.stdin.on(
  "keypress",
  (
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
  }
);

// $FlowFixMe
process.stdin.setRawMode(true);
process.stdin.resume();
