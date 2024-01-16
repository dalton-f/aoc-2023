// remove empty lines and split into an array of lines where each line represents [hand, bid]

const fs = require("fs");

let input = fs.readFileSync("days/day-07/input.txt", "utf-8"); // read file using node

input = input.trim().split("\n");

const hands = [],
  bids = [],
  sortedHands = [];

// using numbers of type string otherwise .indexOf returns -1 causing a much lower total

const cardStrengths = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

let total = 0;

// loop over the array items/lines which represent one pair of [hand, bid] each

input.forEach((line) => {
  // split each line into an actual array and deconstruct it so that accessing the data is easier
  const [hand, bid] = line.split(" ");
  // push each piece of data to the correct array (ensuring correct type)
  hands.push(hand);
  bids.push(parseInt(bid));
});

// loop over each hand and determine which type of hand it is

// using a for loop over foreach as the index will be helpful to keep the bid tied to the hand

for (let i = 0; i < hands.length; i++) {
  // remove the duplicates from each hand to determine how many unique cards there are
  const uniqueCards = [...new Set(hands[i])];
  const uniqueCardCount = uniqueCards.length;

  // high card where we are pushing hand, arbitrary strength, bid

  if (uniqueCardCount === 0) sortedHands.push([hands[i], 3, bids[i]]);

  // five of a kind

  if (uniqueCardCount === 1) sortedHands.push([hands[i], 9, bids[i]]);

  if (uniqueCardCount === 2) {
    // get the count of the first given unique card in the hand
    const cardOccurences = hands[i]
      .split("")
      .filter((card) => card === uniqueCards[0]).length;

    // four of a kind

    if (cardOccurences === 4 || cardOccurences === 1)
      sortedHands.push([hands[i], 8, bids[i]]);

    // full house

    if (cardOccurences === 2 || cardOccurences === 3)
      sortedHands.push([hands[i], 7, bids[i]]);
  }

  if (uniqueCardCount === 3) {
    // same logic as for uniquecardcount 2
    const cardOccurences = hands[i]
      .split("")
      .filter((card) => card === uniqueCards[0]).length;

    const cardOccurences2 = hands[i]
      .split("")
      .filter((card) => card === uniqueCards[1]).length;

    // three of a kind

    if (cardOccurences === 3 || cardOccurences2 === 3) {
      sortedHands.push([hands[i], 6, bids[i]]);
    }
    // two pair
    else {
      sortedHands.push([hands[i], 5, bids[i]]);
    }
  }

  // one pair

  if (uniqueCardCount === 4) sortedHands.push([hands[i], 4, bids[i]]);
}

// sort the hands

sortedHands.sort((a, b) => {
  // sort by hand if they arent the same hand
  if (a[1] !== b[1]) return b[1] - a[1];
  else {
    // loop over each card in both hands to find one whcih doesn't match
    for (let i = 0; i < a[0].length; i++) {
      // if they don't match
      if (a[0][i] !== b[0][i]) {
        // get the index of each card, to compare its strength
        return cardStrengths.indexOf(a[0][i]) - cardStrengths.indexOf(b[0][i]);
      }
    }
  }
});

// reverse the array so we can start at the bottom and go upwards using i + 1 as the ranked multiplier instead of having to worry about it -> the weakest item will always be rank 1.. etc

sortedHands.reverse();

// calculate total

for (let i = 0; i < sortedHands.length; i++) {
  total += sortedHands[i][2] * (i + 1);
}

console.log(total);
