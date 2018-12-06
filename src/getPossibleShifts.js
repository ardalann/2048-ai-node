// @flow

const swapRowsAndColumns = require("./swapRowsAndColumns");

const findLastIndex = (
  arr: Array<number>,
  callback: (number, number) => boolean
) => {
  const reverseIndex = arr
    .slice()
    .reverse()
    .findIndex(callback);

  if (reverseIndex === -1) {
    return -1;
  }

  return (arr.length - reverseIndex - 1) % arr.length;
};

const isArrowLeftPossible = (board: Array<Array<number>>) =>
  board.some((row: Array<number>) => {
    const firstEmptyTileIndex = row.findIndex((num: number) => num === 0);
    const lastNonEmptyTileIndex = findLastIndex(row, (num: number) => num > 0);
    const emptyTileOnTheLeft =
      firstEmptyTileIndex > -1 && firstEmptyTileIndex < lastNonEmptyTileIndex;

    const nonEmptyTiles = row.filter((tile: number) => tile > 0);
    const hasSimilarAdjacentTiles =
      nonEmptyTiles.findIndex(
        (tile: number, index: number) => tile === nonEmptyTiles[index + 1]
      ) > -1;

    return emptyTileOnTheLeft || hasSimilarAdjacentTiles;
  });

const isArrowRightPossible = (board: Array<Array<number>>) =>
  board.some((row: Array<number>) => {
    const firstNonEmptyTileIndex = row.findIndex((num: number) => num > 0);
    const lastEmptyTileIndex = findLastIndex(row, (num: number) => num === 0);
    const emptyTileOnTheRight =
      firstNonEmptyTileIndex > -1 &&
      firstNonEmptyTileIndex < lastEmptyTileIndex;

    const nonEmptyTiles = row.filter((tile: number) => tile > 0);
    const hasSimilarAdjacentTiles =
      nonEmptyTiles.findIndex(
        (tile: number, index: number) => tile === nonEmptyTiles[index + 1]
      ) > -1;

    return emptyTileOnTheRight || hasSimilarAdjacentTiles;
  });

const getPossibleShifts = (board: Array<Array<number>>) => {
  const possibleMoves = [];

  if (isArrowLeftPossible(board)) {
    possibleMoves.push("left");
  }

  if (isArrowRightPossible(board)) {
    possibleMoves.push("right");
  }

  swapRowsAndColumns(board);

  if (isArrowLeftPossible(board)) {
    possibleMoves.push("up");
  }

  if (isArrowRightPossible(board)) {
    possibleMoves.push("down");
  }

  swapRowsAndColumns(board);

  return possibleMoves;
};

module.exports = getPossibleShifts;
