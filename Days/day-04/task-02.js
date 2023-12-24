const fs = require("fs");

let fileData = fs.readFileSync("./day-04/input.txt", "utf-8"); // read file using node

let input = fileData.trim().split("\n"); // convert to an array

let count = 0;

const cardCount = new Array(input.length).fill(1);

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

  // if there is a winning count

  if (count > 0) {
    // go through all of the cards from the next card in the sequence up until the card denoted by the count
    for (let j = i + 1; j < i + 1 + count; j++) {
      // add the sums of the current wins to the count of the next card
      cardCount[j] += cardCount[i];
    }
  }
}

let total = cardCount.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);

console.log(`You will end up with a total of ${total} scratchcards`);
