// @flow

const keypress = require("keypress");

const generateBoard = require("./generateBoard");
const addNewTileToBoard = require("./addNewTileToBoard");
const renderBoard = require("./renderBoard");
const shiftBoard = require("./shiftBoard");
const getPossibleShifts = require("./getPossibleShifts");

keypress(process.stdin);

const board = generateBoard();
addNewTileToBoard(board);
renderBoard(board);

process.stdin.on(
  "keypress",
  (
    ch: ?string,
    key: {
      name: "up" | "down" | "left" | "right" | "return" | string,
      ctrl: boolean
    }
  ) => {
    const possibleShifts = getPossibleShifts(board);
    if (
      ["up", "down", "left", "right"].includes(key.name) &&
      possibleShifts.includes(key.name)
    ) {
      shiftBoard(board, key.name);
      addNewTileToBoard(board);
      renderBoard(board);
    } else if (possibleShifts.length === 0) {
      process.stdout.write("Game over!");
      process.stdin.pause();
    }

    if (key && key.ctrl && key.name === "c") {
      process.stdin.pause();
    }
  }
);

process.stdin.setRawMode(true);
process.stdin.resume();
