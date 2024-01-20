const { lcm } = require("mathjs");

// remove any blank lines before and after the input and split by a blank line of space

const fs = require("fs");

let input = fs.readFileSync("days/day-08/input.txt", "utf-8"); // read file using node

input = input.split(/\r?\n\s*\r?\n/); // split by a a full linebreak that seperates each piece of data

// deconstruct into usable variables

let [directions, nodeMap] = input;

let stepCollection = [];

// split the node mappings into lines

nodeMap = nodeMap.split("\n");

// loop over the lines

for (let i = 0; i < nodeMap.length; i++) {
  // isolate the letter triplets

  let isolatedLetters = nodeMap[i].match(/[a-zA-Z0-9]+/g);

  // build an object out of them

  nodeMap[i] = {
    node: isolatedLetters[0],
    L: isolatedLetters[1],
    R: isolatedLetters[2],
  };
}

// set current node and steps to default

let steps = 0;

let currentNodes = [];

// find all nodes ending with A and set them to starting nodes

nodeMap.forEach((node) => {
  if (node.node[node.node.length - 1] === "A") {
    currentNodes.push(node.node);
  }
});

currentNodes.forEach((node) => {
  // reset step count foreach node
  steps = 0;

  // loop until it ends in Z
  while (!node.endsWith("Z")) {
    // loop over the directions until the end and then start at the front
    let direction = directions[steps % directions.length];

    let currentMap = nodeMap.filter((map) => map.node === node);
    node = currentMap[0][direction];

    steps++;
  }

  // push the amount of steps it took for that node to reach an end node

  stepCollection.push(steps);
});

// get LCM of step collection

console.log(lcm(...stepCollection));
