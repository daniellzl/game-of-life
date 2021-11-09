import {
  getRandomizedBoard,
  getLiveNeighborCount,
  advanceOneGen,
  toggleCell,
  copyBoard
} from "./helper.js";

describe("getRandomizedBoard", () => {
  it("gets an empty board with no argument", () => {
    let board = getRandomizedBoard();
    expect(Array.isArray(board)).toBeTruthy();
    expect(board.length).toBe(0);
  });

  it("gets a 1 x 1 matrix filled with 0s with (1, 1) argument", () => {
    let board = getRandomizedBoard(1, 1);
    expect(Array.isArray(board)).toBeTruthy();
    expect(board.length).toBe(1);
    expect(board[0].length).toBe(1);
    expect(board[0][0] === 1 || board[0][0] === 0).toBeTruthy();
  });

  it("gets a 5 x 5 matrix filled with 0s with (5, 5) argument", () => {
    let board = getRandomizedBoard(5, 5);
    expect(Array.isArray(board)).toBeTruthy();
    expect(board.length).toBe(5);
    expect(board[0].length).toBe(5);
    expect(board[4][4] === 1 || board[4][4] === 0).toBeTruthy();
  });
});

describe("getLiveNeighborCount", () => {
  it("returns 0 for cell with no neighbors", () => {
    let count = getLiveNeighborCount(0, 0, [[0]]);
    expect(count).toBe(0);
  });

  it("returns 1 for cell with 1 neighbors", () => {
    let board = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    let count = getLiveNeighborCount(1, 1, board);
    expect(count).toBe(1);
  });

  it("returns 8 for cell with 8 neighbors", () => {
    let board = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    let count = getLiveNeighborCount(1, 1, board);
    expect(count).toBe(8);
  });

  it("returns 3 for edge cell with 3 neighbors", () => {
    let board = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    let count = getLiveNeighborCount(2, 2, board);
    expect(count).toBe(3);
  });
});

describe("advanceOneGen", () => {
  it("kills cell with less than 2 living neighbors", () => {
    let board = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    let olderBoard = advanceOneGen(board);
    expect(olderBoard[1][1]).toBe(0);
  });

  it("maintains life of live cell with 2 living neighbors", () => {
    let board = [
      [0, 1, 0],
      [0, 1, 0],
      [1, 0, 0],
    ];
    let olderBoard = advanceOneGen(board);
    expect(olderBoard[1][1]).toBe(1);
  });

  it("maintains life of live cell with 3 living neighbors", () => {
    let board = [
      [1, 0, 1],
      [0, 1, 0],
      [0, 1, 0],
    ];
    let olderBoard = advanceOneGen(board);
    expect(olderBoard[1][1]).toBe(1);
  });

  it("kills cell with more than 3 living neighbors", () => {
    let board = [
      [0, 1, 0],
      [0, 1, 1],
      [1, 1, 1],
    ];
    let olderBoard = advanceOneGen(board);
    expect(olderBoard[1][1]).toBe(0);
  });

  it("gives life to dead cell with 3 living neighbors", () => {
    let board = [
      [0, 1, 0],
      [0, 0, 0],
      [1, 1, 0],
    ];
    let olderBoard = advanceOneGen(board);
    expect(olderBoard[1][1]).toBe(1);
  });
});

describe("toggleCell", () => {
  it("takes a cell and toggles it from living to dead and vice versa", () => {
    let board = [
      [0, 1, 0],
      [0, 0, 0],
      [1, 1, 0],
    ];
    let toggledBoard = toggleCell(1, 1, board);
    expect(toggledBoard[1][1]).toBe(1);
  })
});

describe("copyBoard", () => {
  it ("takes a board and produces an exact copy of it", () => {
    let board = [
      [0, 1, 0],
      [0, 0, 0],
      [1, 1, 0],
    ];
    let boardCopy = copyBoard(board);
    let R = board.length;
    let C = board[0].length;

    expect(board).not.toBe(boardCopy);

    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        expect(board[r][c]).toEqual(boardCopy[r][c]);
      }
    }
  })
})
