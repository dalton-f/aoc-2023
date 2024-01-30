let sum = 0;

let galaxies = [];

const fs = require("fs");

let input = fs.readFileSync("days/day-11/input.txt", "utf-8"); // read file using node

// Remove any blank lines at the start or end of the input, and split into an array by new
input = input.trim().split("\n");

// Loop over the lines and split them into arrays
input = input.map((line) => line.split(""));

// Loop over the columns of the input

for (let i = 0; i < input[0].length; i++) {
  let column = [];

  // Generate the column

  for (let j = 0; j < input.length; j++) {
    column.push(input[j][i]);
  }

  // Check if it includes a galaxy

  if (!column.includes("#")) {
    // If not, expand it
    for (let k = 0; k < input.length; k++) {
      input[k].splice(i, 0, ".");
    }
    // Force an increment
    i++;
  }
}

// Loop over the characters in each row of input and check if the line includes a galaxy, if it doesn't it needs to double itself

input = input.flatMap((line) => (line.includes("#") ? [line] : [line, line]));

// Loop over the expanded input to get the coordinates of each galaxy

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    // If the current char is a galaxy, push the (x, y) coordinates
    if (input[i][j] === "#") galaxies.push([j, i]);
  }
}

// Loop over each pair of galaxies

for (let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    // Get the distance between them
    sum +=
      Math.abs(galaxies[i][0] - galaxies[j][0]) +
      Math.abs(galaxies[i][1] - galaxies[j][1]);
  }
}

console.log(sum);
