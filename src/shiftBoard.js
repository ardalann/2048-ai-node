// @flow

const shiftLeft = require("./shiftLeft");
const shiftRight = require("./shiftRight");
const swapRowsAndColumns = require("./swapRowsAndColumns");

const shiftBoard = (
  board: Array<Array<number>>,
  direction: "up" | "down" | "left" | "right"
) => {
  switch (direction) {
    case "left":
      shiftLeft(board);
      return;
    case "right":
      shiftRight(board);
      return;
    case "up":
      swapRowsAndColumns(board);
      shiftLeft(board);
      swapRowsAndColumns(board);
      return;
    case "down":
      swapRowsAndColumns(board);
      shiftRight(board);
      swapRowsAndColumns(board);
      return;
  }
};

module.exports = shiftBoard;
