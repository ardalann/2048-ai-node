// @flow

const getPoints = require("./getPoints");
const renderBoard = require("./renderBoard");

type OptionsType = {
  board: Array<Array<number>>,
  AISpeed: number,
  possibleShifts: Array<"up" | "down" | "left" | "right">
};

const renderScreen = ({ board, AISpeed, possibleShifts }: OptionsType) => {
  const instuctions = [];

  instuctions.push(
    AISpeed > 0
      ? "Press 0 to deactivate the AI."
      : "Press 1-9 to activate the AI. " +
          "The number will determine how fast the AI plays the game."
  );

  if (!process.env.DEBUG) {
    process.stdout.write("\u001b[2J\u001b[0;0H"); // clear console
  }

  process.stdout.write(`Score: ${getPoints(board)} | `);
  process.stdout.write(`AI: ${AISpeed > 0 ? AISpeed : "off"}\n\n`);
  renderBoard(board);

  if (possibleShifts.length === 0) {
    process.stdout.write("Game over!");
    process.stdout.write("\n\nPress Esc to exit.");
    return;
  }

  process.stdout.write(`\n${instuctions.join("\n")}`);
};

module.exports = renderScreen;
