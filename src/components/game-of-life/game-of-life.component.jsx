import { useState } from "react";
import { getRandomizedBoard, advanceOneGen, toggleCell } from "../../helper.js";

const BOARD_X = 5;
const BOARD_Y = 5
const UPDATE_INTERVAL = 2000;

const GameOfLife = ({ initialBoard = getRandomizedBoard(BOARD_X, BOARD_Y)}) => {
  const [board, setBoard] = useState(initialBoard);
  const [generation, setGeneration] = useState(0);
  const [gameInterval, setGameInterval] = useState(null);
  const [isLiveGame, setIsLiveGame] = useState(false);

  const startGame = () => {
    const interval = setInterval(() => {
      setBoard((board) => advanceOneGen(board));
      setGeneration((generation) => generation + 1);
    }, UPDATE_INTERVAL);
    setGameInterval(interval);
    setIsLiveGame(true);
  };

  const stopGame = () => {
    clearInterval(gameInterval);
    setIsLiveGame(false);
  };

  const resetGame = () => {
    if (isLiveGame) return;
    setBoard(initialBoard);
    setGeneration(0);
  };

  const handleCellClick = (r, c) => () => {
    if (isLiveGame) return;
    setBoard((board) => toggleCell(r, c, board));
  };

  return (
    <>
      <div>{generation}</div>
      {board.map((row, rowI) => {
        return (
          <div key={`row${rowI}`} style={{ display: "flex" }}>
            {row.map((col, colI) => (
              <div key={`col${colI}`} style={{ padding: "10px" }} onClick={handleCellClick(rowI, colI)}>
                {col}
              </div>
            ))}
          </div>
        );
      })}
      <div>
        <button onClick={startGame} disabled={isLiveGame}>
          start
        </button>
        <button onClick={stopGame} disabled={!isLiveGame}>
          stop
        </button>
        <button onClick={resetGame} disabled={isLiveGame}>
          reset
        </button>
      </div>
    </>
  );
};

export default GameOfLife;
