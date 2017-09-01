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

const Header = (props) => {
	// header displayed on page

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

const GenerationDisplay = (props) => {
	// displays the current generation

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

const Grid = (props) => {
	// Return entire grid representing current state of game

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

const GridRow = (props) => {
	// Return grid row representing current state of game

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

const Buttons = (props) => {
	// Buttons that start, stop, and clear the game

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

const Instructions = (props) => {
	// Instructions for using the app

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

const generateRandomGrid = (size) => {
    /*
  	Int -> Arr[Arr[Bool]]
  	Given integer n, return an n x n 2D array populated with either true or false
  	*/

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

const generateDeadGrid = (size) => {
    /*
	Int -> Arr[Arr[Bool]]
	Given integer n, return an n x n 2D array populated with false
	*/

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

const willLive = (rowIndex, colIndex, currentGrid) => {
	// Given the row index and column index of a grid along with the grid, apply the rules of game of life to cell defined by row and index to determine whether it lives or dies

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
	// main application

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

	componentDidMount() {
	    // when application is loaded, generate grids and start game

	    this.setState({
	        gridA: generateRandomGrid(this.state.gridSize),
	        gridB: generateDeadGrid(this.state.gridSize)
	    }, this.playGame());
	}

	advanceGeneration() {
		// Take the current generation grid, apply game of life rules to grid, save to next generation grid and update generation

	    // assign current generation grid
	    let currentGrid = this.state.displayGrid === "A"
	        ? this.state.gridA
	        : this.state.gridB;
	    let nextGrid = this.state.displayGrid === "A"
	        ? this.state.gridB
	        : this.state.gridA;

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

	playGame() {
	    // Start game of life

	    if (this.state.gameRunning === false) {
	        this.gameInstance = setInterval(() => this.advanceGeneration(), this.state.updateTime);
	        this.setState({gameRunning: true});
	    }
	}

	stopGame() {
	    // Stop the game from playing out

	    this.setState({gameRunning: false});
	    clearInterval(this.gameInstance);
	}

	clearGame() {
		// Stop game from playing out and resets the board

	    this.setState({gameRunning: false});
	    clearInterval(this.gameInstance);
	    const emptyGrid = this.generateDeadGrid(30);
	    this.setState({gridA: emptyGrid, currentGen: 1, displayGrid: "A"});
	}

	changeCellStatus(rowIndex, colIndex) {
		// Takes in a cells row index and column index and changes the status of that cell (dead to live, live to dead)

	    // obtain current grid
	    var currentGrid = (this.state.displayGrid === "A")
	        ? this.state.gridA
	        : this.state.gridB;

	    // change status of cell
	    currentGrid[rowIndex][colIndex] = !(currentGrid[rowIndex][colIndex]);

	    // save grid
	    if (this.state.displayGrid === "A") {
	        this.setState({gridA: currentGrid});
	    } else {
	        this.setState({gridB: currentGrid});
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
