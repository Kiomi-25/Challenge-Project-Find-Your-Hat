const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

//Create a method print() to print out each element in the field by run through a two-dimensional array from the first row to the last row, each row will start from the left-most element to the right most element using loop and array iterators. (Add an extra string to print out the border of the game map and more game play status.)

class Field {
  constructor(arrField) {
    this._arrField = arrField;
    this.x = 0;
    this.y = 0;
    this.isGameOver = false;
  }

  get arrField() {
    return this._arrField;
  }

  //Print the field to the terminal in a two-dimensional plane
  print() {
    return this.arrField.map((arr) => arr.join("")).join("\n");
  }

  moveLocation() {
    let move = prompt(
      "Which direction do you want to move to? (u for Up, d for down, l for left and r for right)"
    );
    switch (move.toLowerCase()) {
      case "u":
        console.log("Moving up");
        this.y -= 1;
        break;
      case "d":
        console.log("Moving down");
        this.y += 1;
        break;
      case "l":
        console.log("Moving left");
        this.x -= 1;
        break;
      case "r":
        console.log("Moving right");
        this.x += 1;
        break;
      default:
    }
  }

  winOrLoss() {
    if (
      this.x < 0 ||
      this.y < 0 ||
      this.x >= this.arrField[this.y].length ||
      this.y >= this.arrField.length
    ) {
      console.log("You went out of bounds.");
      this.isGameOver = true;
    } else if (this.arrField[this.y][this.x] === hole) {
      this.isGameOver = true;
      console.log("You fell.");
    } else if (this.arrField[this.y][this.x] === hat) {
      this.isGameOver = true;
      console.log("You won!");
    }
  }

  gameLoop() {
    while (!this.isGameOver) {
      this.arrField[this.y][this.x] = pathCharacter;
      console.log(this.print());
      this.moveLocation();
      this.winOrLoss();
    }
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
  ["O", "░", "O"],
  ["░", "O", "░"],
  ["░", "O", "░"],
]);

myField.gameLoop();
