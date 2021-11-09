import { useState } from "react";

/*
  1. any live cill with < 2 live neighbors die
  2. any live cell with 2 or 3 live neighbors live
  3. any live cell with > 3 live neighbors die
  4. any dead cell with 3 live neighbors lives
*/

const generateEmptyBoard = (rows = 0, cols = 0) => {
  const board = new Array(rows);
  for (let r = 0; r < rows; r++) {
    let row = new Array(cols).fill(0);
    board[r] = row;
  }
  return board;
};

const fillBoardRandomly = (board) => {
  let R = board.length;
  let C = board[0].length;
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      board[r][c] = Math.random() > 0.65 ? 1 : 0;
    }
  }
  return board;
};

const INITIAL_BOARD = fillBoardRandomly(generateEmptyBoard(5, 5));
const NEIGHBOR_DIFFS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

const getLiveNeighborCount = (r, c, board) => {
  return NEIGHBOR_DIFFS.reduce((count, diff) => {
    if (board[r + diff[0]] && board[r + diff[0]][c + diff[1]] === 1) count++;
    return count;
  }, 0);
};

const advanceOneGeneration = (board) => {
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

const copyBoard = (board) => {
  const R = board.length;
  const newBoard = new Array(R);
  for (let r = 0; r < R; r++)
    newBoard[r] = [...board[r]];
  return newBoard;
};

const GameOfLife = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [generation, setGeneration] = useState(0);  
  const [gameInterval, setGameInterval] = useState(null);
  const [isLiveGame, setIsLiveGame] = useState(false);


  const startGame = () => {
    const interval = setInterval(() => {
      setBoard(board => advanceOneGeneration(board));
      setGeneration(generation => generation + 1);
    }, 2000);
    setGameInterval(interval);
    setIsLiveGame(true);
  };

  const stopGame = () => {
    clearInterval(gameInterval);
    setIsLiveGame(false);
  }

  const resetGame = () => {
    if (isLiveGame) return;
    setBoard(INITIAL_BOARD);
    setGeneration(0);
  }

  const handleCellClick = (r, c) => () => {
    if (isLiveGame) return;
    setBoard(board => {
      const boardCopy = copyBoard(board);
      boardCopy[r][c] = boardCopy[r][c] === 0 ? 1 : 0;
      return boardCopy;
    })
  };

  return (
    <>
      <div>{generation}</div>
      {board.map((row, r) => {
        return (
          <div style={{ display: "flex" }}>
            {row.map((col, c) => (
              <div style={{ padding: "10px" }} onClick={handleCellClick(r, c)}>{col}</div>
            ))}
          </div>
        );
      })}
      <div>
        <button onClick={startGame} disabled={isLiveGame}>start</button>
        <button onClick={stopGame} disabled={!isLiveGame}>stop</button>
        <button onClick={resetGame} disabled={isLiveGame}>reset</button>
      </div>
    </>
  );
};

export default GameOfLife;
