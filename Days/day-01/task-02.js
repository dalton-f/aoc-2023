const fs = require("fs");

const nums = {
  eightwo: 82,
  oneight: 18,
  threeight: 38,
  fiveight: 58,
  sevenine: 79,
  eighthree: 83,
  nineight: 98,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let text = fs.readFileSync("days/day-01/input.txt", "utf-8"); // read file using node

let lines = text.split("\n"); // convert to an array

let temp = [];

lines.forEach((line) => {
  const numsInLine = Object.keys(nums).filter((num) => line.includes(num)); // generates an array of all the worded numbers within a line, based on the keys in nums
  numsInLine.sort((a, b) => line.indexOf(a) - line.indexOf(b)); // ensures the order of the worded numbers is maintained so the values can be replaced correctly - first issue I encountered

  numsInLine.forEach((num) => {
    line = line.replaceAll(num, nums[num]); // replace every instance of each worded number in the line with it's corresponding numerical value
  });

  // given line nldeightwoshgnsjnzmbkbxcxltsqtstrgdmvqvxbfour6six, this was throwing out ['eight', 'four', 'six'], the two was not being caught

  line = line.replace(/\D/g, ""); // remove any non-numerical character

  firstChar = line.slice(0, 1); // get the first character
  lastChar = line.slice(-1); // get the last character

  line = firstChar + lastChar; // combine the first and last characters
  temp.push(parseInt(line)); // push new number to a new array
});

const sum = (arr) => arr.reduce((partialSum, a) => partialSum + a); // calculate sum of array

console.log(sum(temp));
