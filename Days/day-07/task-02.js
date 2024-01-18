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
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
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
  let newHand = hands[i];

  // if the hand inclues a joker card

  if (hands[i].includes("J")) {
    // remove the joker card
    let handWithoutJoker = hands[i].replaceAll("J", "").split("");

    // sort by strongest cards
    let strongestCard = handWithoutJoker.sort((a, b) => {
      return cardStrengths.indexOf(a) - cardStrengths.indexOf(b);
    });

    // find the most occurant card in the hand

    let count = 0;
    let mostCard;

    for (let i = 0; i < strongestCard.length; i++) {
      let cardOccurences = newHand
        .split("")
        .filter((card) => card === strongestCard[i]).length;

      if (cardOccurences > count) {
        count = cardOccurences;
        mostCard = strongestCard[i];
      }
    }

    // if there is a card that occurs more than once, set the joker to most occurant

    count !== 0 || count !== 1
      ? (strongestCard = mostCard)
      : (strongestCard = strongestCard[0]);

    newHand = hands[i].replaceAll("J", strongestCard);

    // if the hand is full of jokers, handle the edgecase and default to a full house of aces

    if (handWithoutJoker.length === 0) newHand = "AAAAA";
  }

  // remove the duplicates from each hand to determine how many unique cards there are
  const uniqueCards = [...new Set(newHand)];
  const uniqueCardCount = uniqueCards.length;

  // high card where we are pushing newhand, hand with joker, arbitrary strength, bid

  if (uniqueCardCount === 5) sortedHands.push([newHand, hands[i], 3, bids[i]]);

  // five of a kind

  if (uniqueCardCount === 1) sortedHands.push([newHand, hands[i], 9, bids[i]]);

  if (uniqueCardCount === 2) {
    // get the count of the first given unique card in the hand
    const cardOccurences = newHand
      .split("")
      .filter((card) => card === uniqueCards[0]).length;

    // four of a kind

    if (cardOccurences === 4 || cardOccurences === 1) {
      sortedHands.push([newHand, hands[i], 8, bids[i]]);
    }

    // full house
    else if (cardOccurences === 2 || cardOccurences === 3) {
      sortedHands.push([newHand, hands[i], 7, bids[i]]);
    }
  }

  if (uniqueCardCount === 3) {
    // generates an array of the count of each unique card

    const cardOccurences = uniqueCards.map(
      (card) => newHand.split("").filter((c) => c === card).length
    );

    // three of a kind

    // if any card has a count equal to 3

    if (cardOccurences.some((count) => count === 3)) {
      sortedHands.push([newHand, hands[i], 6, bids[i]]);
    }
    // otherwise assume it is a two pair
    else {
      sortedHands.push([newHand, hands[i], 5, bids[i]]);
    }
  }

  // one pair

  if (uniqueCardCount === 4) sortedHands.push([newHand, hands[i], 4, bids[i]]);
}

// sort the hands

sortedHands.sort((a, b) => {
  // sort by hand if they arent the same hand
  if (a[2] !== b[2]) return b[2] - a[2];
  else {
    // loop over each card in both hands to find one which doesn't match
    for (let i = 0; i < a[1].length; i++) {
      // if they don't match
      if (a[1][i] !== b[1][i]) {
        // get the index of each card, to compare its strength
        return cardStrengths.indexOf(a[1][i]) - cardStrengths.indexOf(b[1][i]);
      }
    }
  }
});

// reverse the array so we can start at the bottom and go upwards using i + 1 as the ranked multiplier instead of having to worry about it -> the weakest item will always be rank 1.. etc

sortedHands.reverse();

// calculate total

for (let i = 0; i < sortedHands.length; i++) {
  total += sortedHands[i][3] * (i + 1);
}

console.log(total);
