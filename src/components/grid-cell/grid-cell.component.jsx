const GridCell = ({ isAlive }) => {
  return (
    <div>
      {isAlive ? "1" : "0"}
    </div>
  )
}

export default GridCell;