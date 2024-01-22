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

// go around the loop until we return to start

do {
  const currentChar = input[currentLine][currentIndex];

  // includes previous direction as we need to differntiate which way we are going into a pipe incase we go backwards

  switch (currentChar) {
    case "-":
      if (prevDir === "right") {
        currentIndex++;
        prevDir = "right";
      } else {
        currentIndex--;
        prevDir = "left";
      }
      break;

    case "|":
      if (prevDir === "down") {
        currentLine++;
        prevDir = "down";
      } else {
        currentLine--;
        prevDir = "up";
      }
      break;

    case "7":
      if (prevDir === "up") {
        currentIndex--;
        prevDir = "left";
      } else if (prevDir === "right") {
        currentLine++;
        prevDir = "down";
      }
      break;

    case "J":
      if (prevDir === "down") {
        currentIndex--;
        prevDir = "left";
      } else {
        currentLine--;
        prevDir = "up";
      }
      break;

    case "L":
      if (prevDir === "left") {
        currentLine--;
        prevDir = "up";
      } else {
        currentIndex++;
        prevDir = "right";
      }
      break;

    case "F":
      if (prevDir === "up") {
        currentIndex++;
        prevDir = "right";
      } else {
        currentLine++;
        prevDir = "down";
      }
      break;
  }

  // count the amount of pipes until we loop back round to the start

  pipes++;
} while (input[currentLine][currentIndex] !== "S");

// +1 for the starting position, divided by two to get the furthest away

let distance = (pipes + 1) / 2;

console.log(distance);
