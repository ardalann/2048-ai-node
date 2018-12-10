// @flow

const addNewTileToBoard = require("./addNewTileToBoard");
const renderScreen = require("./renderScreen");
const shiftBoard = require("./shiftBoard");

type DirectionType = "up" | "down" | "left" | "right";
type OptionsType = {
  board: Array<Array<number>>,
  possibleShifts: Array<DirectionType>,
  shiftDirection: ?string,
  speed: number
};

const playTurn = ({
  board,
  possibleShifts,
  speed,
  shiftDirection
}: OptionsType) => {
  if (
    shiftDirection &&
    (shiftDirection === "up" ||
      shiftDirection === "down" ||
      shiftDirection === "left" ||
      shiftDirection === "right") &&
    possibleShifts.includes(shiftDirection)
  ) {
    shiftBoard(board, shiftDirection);
    addNewTileToBoard(board);
  }

  renderScreen({ board, AISpeed: speed, possibleShifts });
};

module.exports = playTurn;
