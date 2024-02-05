// variable declerations

let currentLine, currentIndex, prevDir;

let pipes = 0;

// remove blank lines from input and convert to an array of lines

const fs = require("fs");

let input = fs.readFileSync("days/day-10/input.txt", "utf-8"); // read file using node

// remove any blank lines and split into an array of reports

input = input.trim().split("\n");
// get the index positions of the starting point

const startingLine = input.findIndex((line) => line.includes("S"));
const startingIndex = input[startingLine].indexOf("S");

// get the starting direction

currentLine = startingLine;
currentIndex = startingIndex;

if (
  input[currentLine][currentIndex + 1] === "-" ||
  input[currentLine][currentIndex + 1] === "7"
) {
  prevDir = "right";
  currentIndex++;
} else if (input[currentLine + 1][currentIndex] === "|") {
  prevDir = "down";
  currentLine++;
} else if (input[currentLine - 1][currentIndex] === "|") {
  prevDir = "up";
  currentLine--;
} else if (input[currentLine][currentIndex - 1] === "-") {
  prevDir = "left";
  currentIndex--;
}

const moveInDirection = (direction) => {
  switch (direction) {
    case "right":
      currentIndex++;
      break;
    case "left":
      currentIndex--;
      break;
    case "up":
      currentLine--;
      break;
    case "down":
      currentLine++;
      break;
  }
};

// move through the loop until we reach the start again

do {
  const currentChar = input[currentLine][currentIndex];

  // includes previous direction as we need to differntiate which way we are going into a pipe incase we go backwards

  switch (currentChar) {
    case "-":
      prevDir = prevDir === "right" ? "right" : "left";
      moveInDirection(prevDir);
      break;

    case "|":
      prevDir = prevDir === "down" ? "down" : "up";
      moveInDirection(prevDir);
      break;

    case "7":
      prevDir = prevDir === "up" ? "left" : "down";
      moveInDirection(prevDir);
      break;

    case "J":
      prevDir = prevDir === "down" ? "left" : "up";
      moveInDirection(prevDir);
      break;

    case "L":
      prevDir = prevDir === "left" ? "up" : "right";
      moveInDirection(prevDir);
      break;

    case "F":
      prevDir = prevDir === "up" ? "right" : "down";
      moveInDirection(prevDir);
      break;
  }

  // count the amount of pipes until we loop back round to the start

  pipes++;
} while (input[currentLine][currentIndex] !== "S");

// +1 for the starting position, divided by two to get the furthest away

let distance = (pipes + 1) / 2;

console.log(distance);
