// @flow

const getPoints = require("./getPoints");
const renderBoard = require("./renderBoard");
const scoreBoard = require("./ai/scoreBoard");

type OptionsType = {
  board: Array<Array<number>>,
  AISpeed: number,
  possibleShifts: Array<"up" | "down" | "left" | "right">,
  aiProcessingTime?: number
};

const renderScreen = ({
  board,
  AISpeed,
  possibleShifts,
  aiProcessingTime
}: OptionsType) => {
  const instuctions = [];

  instuctions.push(
    AISpeed > 0
      ? "Press 0 to deactivate the AI."
      : "Press 1-9 to activate the AI. " +
          "The number will determine how fast the AI plays the game.\n" +
          "Press P to have the AI play one turn."
  );

  if (!process.env.DEBUG) {
    process.stdout.write("\u001b[2J\u001b[0;0H"); // clear console
  }

  process.stdout.write(`Score: ${getPoints(board)}`);
  process.stdout.write(` | AI: ${AISpeed > 0 ? AISpeed : "off"}`);

  if (process.env.DEBUG) {
    process.stdout.write(
      ` | Board score: ${Math.round(scoreBoard({ board }))}`
    );

    if (aiProcessingTime) {
      process.stdout.write(` | AI took: ${aiProcessingTime}ms`);
    }
  }

  process.stdout.write(`\n\n`);
  renderBoard(board);

  if (possibleShifts.length === 0) {
    process.stdout.write("Game over!");
    process.stdout.write("\n\nPress Esc to exit.");
    return;
  }

  process.stdout.write(`\n${instuctions.join("\n")}\n`);
};

module.exports = renderScreen;
