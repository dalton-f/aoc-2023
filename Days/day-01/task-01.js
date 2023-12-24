const fs = require("fs");

let text = fs.readFileSync("days/day-01/input.txt", "utf-8"); // read file using node

let lines = text.split("\n"); // convert to an array

let temp = [];

// for every line
lines.forEach((line) => {
  line = line.replace(/\D/g, ""); // remove any non-numerical character

  firstChar = line.slice(0, 1); // get the first character
  lastChar = line.slice(-1); // get the last character

  line = firstChar + lastChar; // combine the first and last characters

  temp.push(parseInt(line)); // push new number to a new array
});

const sum = (arr) => arr.reduce((partialSum, a) => partialSum + a); // calculate sum of array

console.log(sum(temp));
