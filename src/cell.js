const { randomInRange } = require("./utilities");

class Cell {
  constructor({ positionX, positionY, initialize = false }) {
    this.positionX = positionX;
    this.positionY = positionY;
    if (initialize) {
      this.isAlive = randomInRange(0, 1) === 1 ? true : false;
    }
  }

  debug() {
    console.debug(this);
  }
}

module.exports = Cell;
