// using the directional information, how many steps does it take to get from AAA to ZZZ (2 steps).. RL repeats to RLRLRL etc

// remove any blank lines before and after the input and split by a blank line of space

const fs = require("fs");

let input = fs.readFileSync("days/day-08/input.txt", "utf-8"); // read file using node

input = input.split(/\r?\n\s*\r?\n/); // split by a a full linebreak that seperates each piece of data

// deconstruct into usable variables

let [directions, nodeMap] = input;

// split the node mappings into lines

nodeMap = nodeMap.split("\n");

// loop over the lines

for (let i = 0; i < nodeMap.length; i++) {
  // isolate the letter triplets

  let isolatedLetters = nodeMap[i].match(/[a-zA-Z]+/g);

  // build an object out of them

  nodeMap[i] = {
    node: isolatedLetters[0],
    L: isolatedLetters[1],
    R: isolatedLetters[2],
  };
}

// set current node and steps to default

let currentNode = "AAA";

let steps = 0;

// loop until the node is ZZZ

while (currentNode !== "ZZZ") {
  // iterate over each direction until the end
  let direction = directions[steps % directions.length];

  // filter the nodeMap array of objects until we get the matching object to current node

  let currentMap = nodeMap.filter((map) => map.node === currentNode);

  // move in the correct direction

  currentNode = currentMap[0][direction];

  // increment steps until we reach ZZZ

  steps++;
}

console.log(steps);
