import { useState } from "react";
import { getRandomizedBoard, advanceOneGen, toggleCell } from "../../helper.js";

const INITIAL_BOARD = getRandomizedBoard(5, 5);
const UPDATE_TIME = 2000;

const GameOfLife = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [generation, setGeneration] = useState(0);
  const [gameInterval, setGameInterval] = useState(null);
  const [isLiveGame, setIsLiveGame] = useState(false);

  const startGame = () => {
    const interval = setInterval(() => {
      setBoard((board) => advanceOneGen(board));
      setGeneration((generation) => generation + 1);
    }, UPDATE_TIME);
    setGameInterval(interval);
    setIsLiveGame(true);
  };

  const stopGame = () => {
    clearInterval(gameInterval);
    setIsLiveGame(false);
  };

  const resetGame = () => {
    if (isLiveGame) return;
    setBoard(INITIAL_BOARD);
    setGeneration(0);
  };

  const handleCellClick = (r, c) => () => {
    if (isLiveGame) return;
    setBoard((board) => toggleCell(r, c, board));
  };

  return (
    <>
      <div>{generation}</div>
      {board.map((row, r) => {
        return (
          <div style={{ display: "flex" }}>
            {row.map((col, c) => (
              <div style={{ padding: "10px" }} onClick={handleCellClick(r, c)}>
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
