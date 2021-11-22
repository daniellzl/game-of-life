import { useState } from "react";
import {
  getRandomizedBoard,
  advanceOneGen,
  toggleCell,
  clearBoard,
} from "../../helper.js";
import GridCell from "../grid-cell/grid-cell.component";
import CSS from "./game-of-life.module.scss";

const BOARD_X = 40;
const BOARD_Y = 30;
const UPDATE_INTERVAL = 750;

const GameOfLife = ({
  initialBoard = getRandomizedBoard(BOARD_Y, BOARD_X),
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

  const clearGame = () => {
    setBoard((board) => clearBoard(board));
    setGeneration(0);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setGeneration(0);
  };

  const handleCellClick = (r, c) => () => {
    setBoard((board) => toggleCell(r, c, board));
  };

  return (
    <div className={CSS.gameOfLife}>
      <div className={CSS.titleFrame}>
        <div className={`${CSS.title}`}>Conway's Game of Life</div>
        <div className={CSS.icons}>
          <a
            className={CSS.link}
            target="_blank"
            rel="noreferrer"
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          >
            ?
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/daniellzl/game-of-life"
          >
            <i class="nes-icon github"></i>
          </a>
        </div>
      </div>
      <div className={`${CSS.generations}`}>Generations: {generation}</div>
      <div className={CSS.board}>
        {board.map((row, rowI) => {
          return (
            <div key={`row${rowI}`} style={{ display: "flex" }}>
              {row.map((col, colI) => (
                <GridCell
                  key={`col${colI}`}
                  isAlive={col === 1}
                  isLiveGame={isLiveGame}
                  handleCellClick={handleCellClick(rowI, colI)}
                />
              ))}
            </div>
          );
        })}
      </div>
      <div className={CSS.buttons}>
        <button
          className={`nes-btn ${isLiveGame ? "is-disabled" : "is-success"} ${
            CSS.button
          }`}
          onClick={startGame}
          disabled={isLiveGame}
        >
          START
        </button>
        <button
          className={`nes-btn ${isLiveGame ? "is-error" : "is-disabled"} ${
            CSS.button
          }`}
          onClick={stopGame}
          disabled={!isLiveGame}
        >
          STOP
        </button>
        <button
          className={`nes-btn is-warning ${CSS.button}`}
          onClick={clearGame}
        >
          CLEAR
        </button>
        <button
          className={`nes-btn is-primary ${CSS.button}`}
          onClick={resetGame}
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default GameOfLife;
