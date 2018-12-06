// @flow

const shiftRight = (board: Array<Array<number>>) => {
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    const cols = board[rowIndex].length;
    board[rowIndex] = board[rowIndex].filter((tile: number) => tile > 0);
    const row = board[rowIndex];
    for (let colIndex = row.length - 1; colIndex >= 0; colIndex--) {
      if (row[colIndex - 1] === row[colIndex]) {
        row[colIndex] *= 2;
        row.splice(colIndex - 1, 1);
      }
    }
    if (board[rowIndex].length < cols) {
      board[rowIndex] = new Array(cols - board[rowIndex].length)
        .fill(0)
        .concat(board[rowIndex]);
    }
  }
  return board;
};

module.exports = shiftRight;
