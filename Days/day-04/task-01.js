// remove empty lines and split the input into an array of lines

const fs = require("fs");

let fileData = fs.readFileSync("./day-04/input.txt", "utf-8"); // read file using node

let input = fileData.trim().split("\n"); // convert to an array

let sum = 0;

let count = 0;

// for every line, split the line into..

for (let i = 0; i < input.length; i++) {
  count = 0;

  // remove the card number from each card

  let [cardNumber, numbers] = input[i].split(": ");

  // seperate the winning and our numbers

  let [winningNumbers, ourNumbers] = numbers.split(" | ");

  // split these into arrays and filter out the whitespace

  winningNumbers = winningNumbers.split(/\s+/).filter(Boolean).map(Number);
  ourNumbers = ourNumbers.split(/\s+/).filter(Boolean).map(Number);

  // check for matches between our numbers and the winning numbers

  for (let j = 0; j < ourNumbers.length; j++) {
    if (winningNumbers.includes(ourNumbers[j])) {
      // everytime a number matches, increase the count
      count++;
    }
  }

  // calculates the points for each card and updates the total sum

  if (count > 0) {
    sum += Math.pow(2, count - 1);
  }
}

console.log(`The pile of scratchcards is worth ${sum} points!`);
