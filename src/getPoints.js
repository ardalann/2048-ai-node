// @flow

const getPoints = (board: Array<Array<number>>) =>
  board.reduce(
    (prevTotal: number, currentRow: Array<number>) =>
      prevTotal +
      currentRow.reduce(
        (prevRowTotal: number, tile: number) => prevRowTotal + tile,
        0
      ),
    0
  );

module.exports = getPoints;
