// @flow

const renderBoard = (board: Array<Array<number>>) => {
  const maxTileWidth = Math.max(
    ...board.map((row: Array<number>) =>
      Math.max(...row.map((tile: number) => tile.toString().length))
    )
  );
  const columns = board[0].length;
  const tilePadding = 2;
  const firstSeparator = `${`|${"‾".repeat(
    // eslint-disable-next-line no-magic-numbers
    maxTileWidth + 2 * tilePadding
  )}`.repeat(columns)}|\n`;
  const horizontalSeparator = `${`|${" ".repeat(
    // eslint-disable-next-line no-magic-numbers
    maxTileWidth + 2 * tilePadding
  )}`.repeat(columns)}|\n${`|${"‾".repeat(
    // eslint-disable-next-line no-magic-numbers
    maxTileWidth + 2 * tilePadding
  )}`.repeat(columns)}|\n`;
  const lastSeparator = `${`|${"_".repeat(
    // eslint-disable-next-line no-magic-numbers
    maxTileWidth + 2 * tilePadding
  )}`.repeat(columns)}|\n\n`;
  process.stdout.write(firstSeparator);
  for (let row = 0; row < board.length; row++) {
    process.stdout.write(`|`);
    for (let column = 0; column < board[row].length; column++) {
      process.stdout.write(
        `${board[row][column]
          .toString()
          .replace(/^0$/, "")
          .padStart(maxTileWidth + tilePadding)}${" ".repeat(tilePadding)}|`
      );
    }
    process.stdout.write(
      `\n${row === board.length - 1 ? lastSeparator : horizontalSeparator}`
    );
  }
};

module.exports = renderBoard;
