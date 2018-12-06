// @flow

const swapRowsAndColumns = (board: Array<Array<number>>) => {
  for (let rowIndex = 0; rowIndex < board.length - 1; rowIndex++) {
    for (let colIndex = rowIndex + 1; colIndex < board.length; colIndex++) {
      const temp = board[rowIndex][colIndex];
      board[rowIndex][colIndex] = board[colIndex][rowIndex];
      board[colIndex][rowIndex] = temp;
    }
  }
};

module.exports = swapRowsAndColumns;
