// @flow

const shiftRight = require("./shiftRight");

describe("shiftRight", () => {
  it("should not recursively merge tiles", () => {
    const board = [[16, 8, 4, 4], [8, 0, 0, 0], [4, 2, 0, 0], [0, 0, 0, 0]];
    const expectedBoard = [
      [0, 16, 8, 8],
      [0, 0, 0, 8],
      [0, 0, 4, 2],
      [0, 0, 0, 0]
    ];

    shiftRight(board);

    expect(board).toMatchObject(expectedBoard);
  });
});
