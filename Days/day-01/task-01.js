// The Task:

// The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
// For example:

// 1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet

// In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.
// Consider your entire calibration document. What is the sum of all of the calibration values?

const fs = require("fs");

let text = fs.readFileSync("Days/day-01/input.txt", "utf-8"); // read file using node

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
