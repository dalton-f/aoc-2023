// The Task

// The Elf leads you over to the pile of colorful cards. There, you discover dozens of scratchcards, all with their opaque covering already scratched off. Picking one up, it looks like each card has two lists of numbers separated by a vertical bar (|): a list of winning numbers and then a list of numbers you have. You organize the information into a table (your puzzle input).

// As far as the Elf has been able to figure out, you have to figure out which of the numbers you have appear in the list of winning numbers. The first match makes the card worth one point and each match after the first doubles the point value of that card.

// For example:

// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
// In the above example, card 1 has five winning numbers (41, 48, 83, 86, and 17) and eight numbers you have (83, 86, 6, 31, 17, 9, 48, and 53). Of the numbers you have, four of them (48, 83, 17, and 86) are winning numbers! That means card 1 is worth 8 points (1 for the first match, then doubled three times for each of the three matches after the first).

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
