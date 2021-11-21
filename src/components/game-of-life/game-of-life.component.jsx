import { useState } from "react";
import { getRandomizedBoard, advanceOneGen, toggleCell } from "../../helper.js";
import GridCell from "../grid-cell/grid-cell.component";
import "nes.css/css/nes.min.css";
import CSS from "./game-of-life.module.scss";

const BOARD_X = 5;
const BOARD_Y = 5;
const UPDATE_INTERVAL = 2000;

const GameOfLife = ({
  initialBoard = getRandomizedBoard(BOARD_X, BOARD_Y),
}) => {
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
    <div className={CSS.gameOfLife}>
      <div className="nes-text is-primary">Game of Life</div>
      <div>Generation: {generation}</div>
      <div>
        {board.map((row, rowI) => {
          return (
            <div key={`row${rowI}`} style={{ display: "flex" }}>
              {row.map((col, colI) => (
                <div
                  key={`col${colI}`}
                  style={{ padding: "10px" }}
                  onClick={handleCellClick(rowI, colI)}
                >
                  <GridCell isAlive={col === 1} />
                </div>
              ))}
            </div>
          );
        })}
      </div>

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
    </div>
  );
};

export default GameOfLife;
