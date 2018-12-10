// @flow

const keypress = require("keypress");

const generateBoard = require("./generateBoard");
const addNewTileToBoard = require("./addNewTileToBoard");
const renderScreen = require("./renderScreen");
const shiftBoard = require("./shiftBoard");
const getPossibleShifts = require("./getPossibleShifts");

keypress(process.stdin);

const board = generateBoard();
addNewTileToBoard(board);

let AISpeed = 0;

renderScreen({ board, AISpeed, possibleShifts: getPossibleShifts(board) });

process.stdin.on(
  "keypress",
  (
    char: ?string,
    key: ?{
      name: "up" | "down" | "left" | "right" | "return" | string,
      ctrl: boolean
    }
  ) => {
    if (key && key.ctrl && key.name === "c") {
      process.stdin.pause();
      return;
    }

    if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(char)) {
      AISpeed = parseInt(char, 10);
    } else if (char === "0") {
      AISpeed = 0;
    }

    const possibleShifts = getPossibleShifts(board);

    const keyName = key ? key.name : "";
    const shiftDirection = AISpeed ? "left" : keyName;

    if (
      (shiftDirection === "up" ||
        shiftDirection === "down" ||
        shiftDirection === "left" ||
        shiftDirection === "right") &&
      possibleShifts.includes(shiftDirection)
    ) {
      shiftBoard(board, shiftDirection);
      addNewTileToBoard(board);
    }

    renderScreen({ board, AISpeed, possibleShifts });
  }
);

// $FlowFixMe
process.stdin.setRawMode(true);
process.stdin.resume();
