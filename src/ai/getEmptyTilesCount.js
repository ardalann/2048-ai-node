// @flow

type OptionsType = {
  board: Array<Array<number>>
};

const getEmptyTilesCount = ({ board }: OptionsType): number => {
  return board.reduce(
    (sum: number, row: Array<number>) =>
      sum +
      row.reduce(
        (rowEmptyTiles: number, tile: number) =>
          rowEmptyTiles + (tile === 0 ? 1 : 0),
        0
      ),
    0
  );
};

module.exports = getEmptyTilesCount;
