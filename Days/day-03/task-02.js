const fs = require("fs");

let fileData = fs.readFileSync("./day-03/input.txt", "utf-8"); // read file using node

let input = fileData.split("\n"); // convert to an array

// HELPER FUNCTIONS

const isNumeric = (char) => !isNaN(parseInt(char, 10)); // use a radix of 10 to declare the base in mathematical numeral systems (in this case, decimal)

function getAdjacentChars(input, i, j) {
  let adjacent = [];

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

  return adjacent;
}

// VARIABLES AND INPUT FORMATTING

let sum = 0;

let encounteredDigits = [];

let gearsNumbers = {};

let gearI, gearJ;

// MAIN CODE

// loop through every line of input

for (let i = 0; i < input.length; i++) {
  // generate a map of arrays to determine if a digit has been seen or not

  encounteredDigits.push(Array(input[i].length).fill(false));

  // loop through every character on each line

  for (let j = 0; j < input[i].length; j++) {
    // get the adjacent characters
    let adjacent = getAdjacentChars(input, i, j);

    // if the adjacent characters includes a gear

    const hasGear = adjacent.some((char) => char === "*");

    // and if the current character is a digit

    if (isNumeric(input[i][j]) && hasGear && !encounteredDigits[i][j]) {
      let number = input[i][j];

      // generate the whole number by finding digits backwards

      for (
        let k = j - 1;
        k >= 0 && isNumeric(input[i][k]) && !encounteredDigits[i][k];
        k--
      ) {
        number = input[i][k] + number;
        encounteredDigits[i][k] = true;
      }

      // and finding digits forwards

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

      // get the absolute position of the gear based on it's relative index in adjacent

      switch (adjacent.indexOf("*")) {
        case 0: {
          gearI = i - 1;
          gearJ = j - 1;
          break;
        }
        case 1: {
          gearI = i - 1;
          gearJ = j;
          break;
        }
        case 2: {
          if (input[i - 1]) {
            gearI = i - 1;
            gearJ = j + 1;
          } else {
            gearI = i + 1;
            gearJ = j - 1;
          }

          break;
        }
        case 3: {
          if (!input[i - 1]) {
            gearI = i + 1;
            gearJ = j;
          } else {
            gearI = i;
            gearJ = j - 1;
          }

          break;
        }
        case 4: {
          // issues with the fact that there were no adjacent characters above here, may be a bigger issue elsewhere
          if (input[i - 1]) {
            gearI = i;
            gearJ = j + 1;
          } else {
            gearI = i + 1;
            gearJ = j + 1;
          }
          break;
        }
        case 5: {
          gearI = i + 1;
          gearJ = j - 1;
          break;
        }
        case 6: {
          gearI = i + 1;
          gearJ = j;
          break;
        }
        case 7: {
          gearI = i + 1;
          gearJ = j + 1;
          break;
        }
      }

      // store each gear and it's numbers

      if (!gearsNumbers[`${gearI},${gearJ}`]) {
        gearsNumbers[`${gearI},${gearJ}`] = [];
      }

      gearsNumbers[`${gearI},${gearJ}`].push(parseFloat(number));
    }
  }
}

// for every set of numbers in the object

for (const numberSet in gearsNumbers) {
  // if the length is exactly equal to to

  if (gearsNumbers[numberSet].length == 2) {
    // find the product
    sum += gearsNumbers[numberSet].reduce((a, b) => a * b, 1);
  }
}

console.log(`The sum of the gear ratios is equal to ${sum}`);
