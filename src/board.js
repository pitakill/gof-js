const Cell = require("./cell");

class Board {
  // TODO: Make board init state configurable with parameters
  constructor({ rows, columns } = { rows: 10, columns: 10 }) {
    this.rows = rows;
    this.columns = columns;
    // board representation with cells live or death
    this.game = [];
    // number of iterations
    this.step = 0;
  }

  createGame() {
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.columns; y++) {
        this.game.push(
          new Cell({ positionX: x, positionY: y, initialize: true })
        );
      }
    }
  }

  isAlive(x, y) {
    if (x < 0 || x > this.rows - 1 || y < 0 || y > this.columns - 1) {
      return false;
    }

    return this.game[this.boardCoordinateToArrayIndex(x, y)].isAlive;
  }

  // Returns an array with the indices of the current alive cells around of [x,y]
  currentCellsAlive(x, y) {
    const alive = [];
    for (let a = x - 1; a <= x + 1; a++) {
      for (let b = y - 1; b <= y + 1; b++) {
        // Skip the cell itself
        if (a === x && b === y) {
          continue;
        }

        if (this.isAlive(a, b)) {
          alive.push(this.boardCoordinateToArrayIndex(a, b));
        }
      }
    }

    return alive;
  }

  boardCoordinateToArrayIndex(x, y) {
    return y + x * this.columns;
  }

  // Game logic from: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
  // Any live cell with two or three live neighbours survives.
  // Any dead cell with three live neighbours becomes a live cell.
  // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
  tick() {
    const nextBoardRepresentation = [];

    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.columns; y++) {
        // Get the current cells alive next to the [x,y] cell
        const cellsAlive = this.currentCellsAlive(x, y);
        const index = this.boardCoordinateToArrayIndex(x, y);

        nextBoardRepresentation[index] = new Cell({
          positionX: x,
          positionY: y,
        });

        switch (cellsAlive.length) {
          // The cell remains the same
          case 2: {
            nextBoardRepresentation[index].isAlive = this.game[index].isAlive;
            break;
          }
          // The cell is going to live
          case 3: {
            nextBoardRepresentation[index].isAlive = true;
            break;
          }
          // The cell is going to die
          default: {
            nextBoardRepresentation[index].isAlive = false;
          }
        }
      }
    }

    // Update the board with the new representation of the board already updated
    // i.e. after the tick (the new generation of cells)
    this.game = nextBoardRepresentation;
    this.step++;
  }

  debug(full = false) {
    console.debug(this);
    // TODO: Better debug to notice easily the tick
    full ? this.game.forEach((cell) => cell.debug()) : null;
  }
}

module.exports = Board;
