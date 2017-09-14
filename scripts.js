/*
 ██████  ██       ██████  ██████   █████  ██      ███████
██       ██      ██    ██ ██   ██ ██   ██ ██      ██
██   ███ ██      ██    ██ ██████  ███████ ██      ███████
██    ██ ██      ██    ██ ██   ██ ██   ██ ██           ██
 ██████  ███████  ██████  ██████  ██   ██ ███████ ███████
*/

const GRIDSIZE = 30; // height and width of grid
const UPDATETIME = 1500; // time it takes to advanced one generation in game of life

/*
██   ██ ███████  █████  ██████  ███████ ██████
██   ██ ██      ██   ██ ██   ██ ██      ██   ██
███████ █████   ███████ ██   ██ █████   ██████
██   ██ ██      ██   ██ ██   ██ ██      ██   ██
██   ██ ███████ ██   ██ ██████  ███████ ██   ██
*/

// header displayed on page
const Header = (props) => {
  return (
    <div>
      <h1>Game of Life</h1>
    </div>
  );
}

/*
 ██████  ███████ ███    ██ ██████  ██ ███████ ██████
██       ██      ████   ██ ██   ██ ██ ██      ██   ██
██   ███ █████   ██ ██  ██ ██   ██ ██ ███████ ██████
██    ██ ██      ██  ██ ██ ██   ██ ██      ██ ██
 ██████  ███████ ██   ████ ██████  ██ ███████ ██
*/

// displays the current generation
const GenerationDisplay = (props) => {
  return (
    <div>
      <h4>Current Generation: {props.currentGen}</h4>
    </div>
  );
}

/*
 ██████  ██████  ██ ██████
██       ██   ██ ██ ██   ██
██   ███ ██████  ██ ██   ██
██    ██ ██   ██ ██ ██   ██
 ██████  ██   ██ ██ ██████
*/

// Return entire grid representing current state of game
const Grid = (props) => {

  const cells = props.currentGrid.map((row, index) => {
    return (<GridRow key={index} row={row} rowIndex={index} onCellClick={props.onCellClick}/>);
  });

  return (
    <div>
      <table>
        <tbody>
          {cells}
        </tbody>
      </table>
    </div>
  );
}

/*
 ██████  ██████  ██ ██████  ██████   ██████  ██     ██
██       ██   ██ ██ ██   ██ ██   ██ ██    ██ ██     ██
██   ███ ██████  ██ ██   ██ ██████  ██    ██ ██  █  ██
██    ██ ██   ██ ██ ██   ██ ██   ██ ██    ██ ██ ███ ██
 ██████  ██   ██ ██ ██████  ██   ██  ██████   ███ ███
*/

// Return grid row representing current state of game
const GridRow = (props) => {

  const row = props.row.map((cell, index) => {
    return (
      <td className={(cell === true)
        ? "alive"
        : "dead"} key={index} onClick={() => props.onCellClick(props.rowIndex, index)}></td>
    );
  });

  return (
    <tr>
      {row}
    </tr>
  );
}

/*
██████  ██    ██ ████████ ████████  ██████  ███    ██ ███████
██   ██ ██    ██    ██       ██    ██    ██ ████   ██ ██
██████  ██    ██    ██       ██    ██    ██ ██ ██  ██ ███████
██   ██ ██    ██    ██       ██    ██    ██ ██  ██ ██      ██
██████   ██████     ██       ██     ██████  ██   ████ ███████
*/

// Buttons that start, stop, and clear the game
const Buttons = (props) => {
  return (
    <div>
      <button type="button" className="start" onClick={props.playGame}>Start</button>
      <button type="button" className="stop" onClick={props.stopGame}>Stop</button>
      <button type="button" className="clear" onClick={props.clearGame}>Clear</button>
    </div>
  );
}

/*
██ ███    ██ ███████ ████████ ██████  ██    ██  ██████ ████████
██ ████   ██ ██         ██    ██   ██ ██    ██ ██         ██
██ ██ ██  ██ ███████    ██    ██████  ██    ██ ██         ██
██ ██  ██ ██      ██    ██    ██   ██ ██    ██ ██         ██
██ ██   ████ ███████    ██    ██   ██  ██████   ██████    ██
*/

// Instructions for using the app
const Instructions = (props) => {
  return (
    <div>
      <p>You can add or remove cells anytime you want!</p>
      <p>Learn more about the Game of Life at
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Wikipedia</a>
      </p>
    </div>
  );
}

/*
██████   █████  ███    ██ ██████   ██████  ██████  ██ ██████
██   ██ ██   ██ ████   ██ ██   ██ ██       ██   ██ ██ ██   ██
██████  ███████ ██ ██  ██ ██   ██ ██   ███ ██████  ██ ██   ██
██   ██ ██   ██ ██  ██ ██ ██   ██ ██    ██ ██   ██ ██ ██   ██
██   ██ ██   ██ ██   ████ ██████   ██████  ██   ██ ██ ██████
*/

/*
Int -> Arr[Arr[Bool]]
Given integer n, return an n x n 2D array populated with either true or false
*/
const generateRandomGrid = (size) => {

  // result 2D array
  let result = [];

  // populate array with true or false
  for (var i = 0; i < size; i++) {
    var row = [];
    for (var j = 0; j < size; j++) {
      if (Math.random() > 0.5) {
        row.push(true);
      } else {
        row.push(false)
      }
    }
    result.push(row);
  }

  return result;
}

/*
██████  ███████  █████  ██████   ██████  ██████  ██ ██████
██   ██ ██      ██   ██ ██   ██ ██       ██   ██ ██ ██   ██
██   ██ █████   ███████ ██   ██ ██   ███ ██████  ██ ██   ██
██   ██ ██      ██   ██ ██   ██ ██    ██ ██   ██ ██ ██   ██
██████  ███████ ██   ██ ██████   ██████  ██   ██ ██ ██████
*/

/*
Int -> Arr[Arr[Bool]]
Given integer n, return an n x n 2D array populated with false
*/
const generateDeadGrid = (size) => {

  // result 2D array
  let result = [];

  // populate array with false
  for (var i = 0; i < size; i++) {
    var row = [];
    for (var j = 0; j < size; j++) {
      row.push(false)
    }
    result.push(row);
  }

  return result;
}

/*
██     ██ ██ ██      ██      ██      ██ ██    ██ ███████
██     ██ ██ ██      ██      ██      ██ ██    ██ ██
██  █  ██ ██ ██      ██      ██      ██ ██    ██ █████
██ ███ ██ ██ ██      ██      ██      ██  ██  ██  ██
 ███ ███  ██ ███████ ███████ ███████ ██   ████   ███████
*/

// Given the row index and column index of a grid along with the grid, apply the rules of game of life to cell defined by row and index to determine whether it lives or dies
const willLive = (rowIndex, colIndex, currentGrid) => {

	// obtain cell
	const cell = currentGrid[rowIndex][colIndex];

	// determine number of living cells surrounding cell
	var livingNeighbours = 0;
	const neighbourIndices = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
	neighbourIndices.forEach(function(index) {
    if ((currentGrid[rowIndex + index[0]] !== undefined) && (currentGrid[rowIndex + index[0]][colIndex + index[1]] === true)) {
			livingNeighbours += 1;
		}
	});

	// if element (living or dead) has exactly 3 living neighbours or living element has 2 neighbours then cell lives, else dies
	return ((livingNeighbours === 3) || (cell === true && livingNeighbours === 2)) ? true : false;
}

/*
 █████  ██████  ██████
██   ██ ██   ██ ██   ██
███████ ██████  ██████
██   ██ ██      ██
██   ██ ██      ██
*/

class App extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
	    gridA: [],
	    gridB: [],
	    currentGen: 1,
	    displayGrid: "A",
	    gridSize: GRIDSIZE,
	    gameRunning: false,
	    updateTime: UPDATETIME
	  }
	  this.changeCellStatus = this.changeCellStatus.bind(this);
	  this.playGame = this.playGame.bind(this)
	  this.stopGame = this.stopGame.bind(this)
	  this.clearGame = this.clearGame.bind(this)
	}

  // when application is loaded, generate grids and start game
	componentDidMount() {
	  this.setState({
	    gridA: generateRandomGrid(this.state.gridSize),
	    gridB: generateDeadGrid(this.state.gridSize)
	  }, this.playGame());
	}

  // Take the current generation grid, apply game of life rules to grid, save to next generation grid and update generation
	advanceGeneration() {

    // assign current generation grid
    let currentGrid = this.state.displayGrid === "A" ?
      this.state.gridA :
      this.state.gridB;
    let nextGrid = this.state.displayGrid === "A" ?
      this.state.gridB :
      this.state.gridA;

    // for each cell, determine if cell lives or dies for next generation
    currentGrid.forEach(function(row, rowIndex) {
      row.forEach(function(cell, colIndex) {

        // save determination in next generation grid
        nextGrid[rowIndex][colIndex] = willLive(rowIndex, colIndex, currentGrid);
      }, this);
    }, this);

    // save next generation grid and update relevant generational information;
    if (this.state.displayGrid === "A") {
      this.setState({
        gridB: nextGrid,
        currentGen: this.state.currentGen + 1,
        displayGrid: "B"
      });
    } else {
      this.setState({
        gridA: nextGrid,
        currentGen: this.state.currentGen + 1,
        displayGrid: "A"
      });
    }
	}

  // Start game of life
	playGame() {
    if (this.state.gameRunning === false) {
      this.gameInstance = setInterval(() => this.advanceGeneration(), this.state.updateTime);
      this.setState({ gameRunning: true });
    }
	}

  // Stop the game from playing out
	stopGame() {
    this.setState({gameRunning: false});
    clearInterval(this.gameInstance);
	}

  // Stop game from playing out and resets the board
	clearGame() {
    this.setState({gameRunning: false});
    clearInterval(this.gameInstance);
    const emptyGrid = this.generateDeadGrid(30);
    this.setState({gridA: emptyGrid, currentGen: 1, displayGrid: "A"});
	}

  // Takes in a cells row index and column index and changes the status of that cell (dead to live, live to dead)
	changeCellStatus(rowIndex, colIndex) {

    // obtain current grid
    var currentGrid = (this.state.displayGrid === "A") ?
      this.state.gridA :
      this.state.gridB;

    // change status of cell
    currentGrid[rowIndex][colIndex] = !(currentGrid[rowIndex][colIndex]);

    // save grid
    if (this.state.displayGrid === "A") {
      this.setState({ gridA: currentGrid });
    } else {
      this.setState({ gridB: currentGrid });
    }
	}

	render() {
		return (
			<div>
        <Header />
				<GenerationDisplay
					currentGen={this.state.currentGen}
				/>
				<Grid
					currentGrid={this.state.displayGrid === "A" ? this.state.gridA : this.state.gridB}
					onCellClick={this.changeCellStatus}
				/>
				<Buttons
					playGame={this.playGame}
					stopGame={this.stopGame}
					clearGame={this.clearGame}
				/>
				<Instructions />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector(".App"));
