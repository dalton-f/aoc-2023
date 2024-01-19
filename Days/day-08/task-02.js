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

// repeat while all the current nodes do not end in Z

while (!currentNodes.every((node) => node.endsWith("Z"))) {
  // loop over the directions until the end and then start at the front
  let direction = directions[steps % directions.length];

  // loop over each of the current nodes so they get converted together

  for (let i = 0; i < currentNodes.length; i++) {
    let currentMap = nodeMap.filter((map) => map.node === currentNodes[i]);
    currentNodes[i] = currentMap[0][direction];
  }

  // increment steps until we reach a point where all the current nodes end with Z

  steps++;
}

console.log(steps);
