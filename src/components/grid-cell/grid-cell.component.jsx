import CSS from "./grid-cell.module.scss";

const GridCell = ({ isAlive, isLiveGame, handleCellClick }) => {
  return (
    <div className={`${CSS.gridCell} ${isAlive ? CSS.alive : null} ${isLiveGame ? CSS.liveGame : null}`} onClick={handleCellClick}></div>
  );
};

export default GridCell;
