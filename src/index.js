// @flow

const keypress = require("keypress");

const generateBoard = require("./generateBoard");
const getPossibleShifts = require("./getPossibleShifts");
const addNewTileToBoard = require("./addNewTileToBoard");
const playTurn = require("./playTurn");
const handleKeyPress = require("./handleKeyPress");

keypress(process.stdin);

const board = generateBoard();
addNewTileToBoard(board);

playTurn({
  board,
  speed: 0,
  possibleShifts: getPossibleShifts(board),
  shiftDirection: ""
});

process.stdin.on("keypress", handleKeyPress({ board }));

// $FlowFixMe
process.stdin.setRawMode(true);
process.stdin.resume();
