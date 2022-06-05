const Board = require("./src/board");

const steps = 10;
const board = new Board();

board.createGame();
board.debug();

for (let i = 0; i < steps; i++) {
  board.tick();
  board.debug();
}

// For an endless Game of Life
// Hard to visualize with the current state of the visualization
// while(true) {
//   board.tick();
//   board.debug();
// }
