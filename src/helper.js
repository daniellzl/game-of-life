export const getRandomizedBoard = (R = 0, C = 0) => {
  const board = new Array(R);

  for (let r = 0; r < R; r++) {
    board[r] = new Array(C);
    for (let c = 0; c < C; c++) {
      board[r][c] = Math.random() > 0.65 ? 1 : 0;
    }
  }

  return board;
};

export const getLiveNeighborCount = (r, c, board) => {
  const neighborDiffs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  return neighborDiffs.reduce((count, diff) => {
    if (board[r + diff[0]] && board[r + diff[0]][c + diff[1]] === 1) count++;
    return count;
  }, 0);
};

export const advanceOneGen = (board) => {
  const newBoard = copyBoard(board);
  const R = board.length;
  const C = board[0].length;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      let cell = board[r][c];
      let count = getLiveNeighborCount(r, c, board);

      if (cell === 0) {
        if (count === 3) newBoard[r][c] = 1;
      } else {
        if (count === 2 || count === 3) newBoard[r][c] = 1;
        else newBoard[r][c] = 0;
      }
    }
  }

  return newBoard;
};

export const toggleCell = (r, c, board) => {
  const newBoard = copyBoard(board);
  newBoard[r][c] = newBoard[r][c] === 0 ? 1 : 0;
  return newBoard;
};

export const copyBoard = (board) => {
  const R = board.length;
  const newBoard = new Array(R);

  for (let r = 0; r < R; r++) newBoard[r] = [...board[r]];

  return newBoard;
};