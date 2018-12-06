// @flow

const shiftLeft = (board: Array<Array<number>>) => {
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    const cols = board[rowIndex].length;
    board[rowIndex] = board[rowIndex].filter((tile: number) => tile > 0);
    const row = board[rowIndex];
    for (let colIndex = 0; colIndex < row.length - 1; colIndex++) {
      if (row[colIndex] === row[colIndex + 1]) {
        row[colIndex] *= 2;
        row.splice(colIndex + 1, 1);
      }
    }
    if (board[rowIndex].length < cols) {
      board[rowIndex] = board[rowIndex].concat(
        new Array(cols - board[rowIndex].length).fill(0)
      );
    }
  }
  return board;
};

module.exports = shiftLeft;
