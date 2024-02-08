// 1e6 represents 1000000 (a million) - this could be changed to 2 to complete part 1 as well
const expansionValue = 1e6;

let sum = 0;

let emptyRows = [];
let emptyCols = [];
let galaxies = [];

// Get input via node

const fs = require("fs");

let input = fs.readFileSync("days/day-11/input.txt", "utf-8");

// Remove any blank lines at the start or end of the input, and split into an array by new
// Loop over the lines and split them into arrays

input = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

// Loop over the non-expanded input to get the coordinates of each galaxy

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    // If the current char is a galaxy, push the (x, y) coordinates
    if (input[i][j] === "#") galaxies.push([j, i]);
  }
}

// Loop over the rows and columns (same loop as part 1, just not expanding the content here)

for (let i = 0; i < input[0].length; i++) {
  let isColEmpty = true;

  // Check for an empty row + store the index

  if (input[i].every((char) => char === ".")) emptyRows.push(i);

  // Check for an empty column

  for (let j = 0; j < input.length; j++) {
    if (input[j][i] === "#") {
      isColEmpty = false;
      // Stop checking the column as soon as we find a galaxy (slightly improves performance with the early break)
      break;
    }
  }

  // Store the index

  if (isColEmpty) emptyCols.push(i);
}

// Loop over each pair of galaxies

for (let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    // Destruct for easier usage + readability where x = column index, y = row index
    const [x1, y1] = galaxies[i];
    const [x2, y2] = galaxies[j];

    // Get the distance between them
    let dist = Math.abs(x1 - x2) + Math.abs(y1 - y2);

    // For every empty row index and empty column index
    // Check if it is between the two points based on the min and max of their row and column values
    // If it is between them, add it to a new array (by filtering it down)
    // Each time an item is filtered, the length of the new array increases - this represents the amount of empty columns or rows that must expand between a set of two points

    // eg. the first pair of galaxy coordinates in the demo input are (3, 0) and (7, 1)
    // So [x1, x2] = [3, 7] and [y1, y2] = [0, 1]
    // There are empty rows at indexes 3 and 7 and empty columns at indexes 2, 5, and 8
    // The first instance of a row in the pair of points will be the min of [0, 1] which is 0 and the last instance will be the max, so 1
    // Both 3 and 7 are greater than the minimum, so may be between the points but they are greater than the max, so there are no empty rows between these two points

    const emptyRowsBetween = emptyRows.filter(
      (row) => row > Math.min(y1, y2) && row < Math.max(y1, y2)
    ).length;

    const emptyColsBetween = emptyCols.filter(
      (col) => col > Math.min(x1, x2) && col < Math.max(x1, x2)
    ).length;

    // For the amount of empty columns and rows between each points, add the expansion value to the sum (-1 to include the current row/column itself) to simulate an expansion

    sum +=
      dist +
      emptyRowsBetween * (expansionValue - 1) +
      emptyColsBetween * (expansionValue - 1);
  }
}

console.log(sum);
