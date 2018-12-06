// @flow

const keypress = require("keypress");

const generateBoard = require("./generateBoard");
const renderBoard = require("./renderBoard");

keypress(process.stdin);

const board = generateBoard();

process.stdin.on(
  "keypress",
  (
    ch: ?string,
    key: {
      name: "up" | "down" | "left" | "right" | "return" | string,
      ctrl: boolean
    }
  ) => {
    renderBoard(board);
    if (key && key.ctrl && key.name === "c") {
      process.stdin.pause();
    }
  }
);

process.stdin.setRawMode(true);
process.stdin.resume();
