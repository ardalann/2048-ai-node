// @flow

const shiftLeft = require("./shiftLeft");

describe("shiftLeft", () => {
  it("should not recursively merge tiles", () => {
    const board = [[4, 4, 8, 16], [0, 0, 0, 8], [0, 0, 2, 4], [0, 0, 0, 0]];
    const expectedBoard = [
      [8, 8, 16, 0],
      [8, 0, 0, 0],
      [2, 4, 0, 0],
      [0, 0, 0, 0]
    ];

    shiftLeft(board);

    expect(board).toMatchObject(expectedBoard);
  });
});
