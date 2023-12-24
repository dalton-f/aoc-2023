const fs = require("fs");

let fileData = fs.readFileSync("./day-03/input.txt", "utf-8"); // read file using node

let input = fileData.split("\n"); // convert to an array

// IMPROVEMENT: array of numbers as strings has been swapped out for a simple parseFloat isNAN check (FROM:  const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; to const isNumeric = (char) => !isNaN(parseFloat(char));)

const isNumeric = (char) => !isNaN(parseFloat(char));

// IMPROVEMENT: refactored to only check if a character isn't a number OR a dot instead of having this string (FROM const specialChars = "~!@#$%^&*_-+=`|(){}[]:;\"'<>,?/"; to (char) => !isNumeric(char) && char != "." && char)

// example input should have a sum of 4361

// let input = `
// 467..114..
// ...*.....3
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`;

let sum = 0;

let encounteredDigits = [];

// loop through each line and every character in each line

for (let i = 0; i < input.length; i++) {
  encounteredDigits.push(Array(input[i].length).fill(false)); // set up a grid of true/false values representing each character on each line

  for (let j = 0; j < input[i].length; j++) {
    let adjacent = []; // store all adjacents chars for each character

    // prev line

    if (input[i - 1]) {
      adjacent.push(input[i - 1][j - 1], input[i - 1][j], input[i - 1][j + 1]);
    }

    // current line

    adjacent.push(input[i][j - 1], input[i][j + 1]);

    // next line

    if (input[i + 1]) {
      adjacent.push(input[i + 1][j - 1], input[i + 1][j], input[i + 1][j + 1]);
    }

    // BUG 3: issues with numbers on the edges of input being counted to the total - this happened due to either the character to the left or right would be undefined, and this was not accounted for in the check - syntax updated to check for && char\

    // for every character in the adjacent array, check if the character is a special character

    const hasSpecial = adjacent.some(
      (char) =>
        char !== undefined &&
        char.trim() !== "" &&
        !isNumeric(char) &&
        char !== "."
    );

    // if the current character we are looping over has a special character adjacent to it AND is a number

    if (isNumeric(input[i][j]) && hasSpecial && !encounteredDigits[i][j]) {
      let number = input[i][j];

      // BUG 1: if there are TWO numbers directly between a special character, they will be combined eg. 35*72 will not be 35 and 72 but 3272 -> changed syntax from checking if [i][j] = '.' to checking if it is a number

      // find any digits backwards

      for (
        let k = j - 1;
        k >= 0 && isNumeric(input[i][k]) && !encounteredDigits[i][k];
        k--
      ) {
        number = input[i][k] + number;
        encounteredDigits[i][k] = true;
      }

      // find any digits forward

      for (
        let k = j + 1;
        k < input[i].length &&
        isNumeric(input[i][k]) &&
        !encounteredDigits[i][k];
        k++
      ) {
        number += input[i][k];
        encounteredDigits[i][k] = true;
      }

      // BUG 2 - inital solution to preventing number duplications works, removes every duplicate - including any real instance of two of the same numbers being in sequence (changed the logic from checking directly against the previousNumber to a map of encountered digits)

      sum += parseInt(number); // ..and add the full number to the total
    }
  }
}

console.log(sum);
