// 21 arrangements for demo input

// let input = `
// ???.### 1,1,3
// .??..??...?##. 1,1,3
// ?#?#?#?#?#?#?#? 1,3,1,6
// ????.#...#... 4,1,1
// ????.######..#####. 1,6,5
// ?###???????? 3,2,1`;

const fs = require("fs");

let input = fs.readFileSync("days/day-12/input.txt", "utf-8"); // read file using node

let totalArrangments = 0;

// remove any blank lines and break it into an array of records

input = input.trim().split("\n");

const memo = new Map();

// loop over each line

input.forEach((line) => {
  let output = [];
  let [springs, sizes] = line.split(" ");

  // convert the size of each contiguous group of damaged springs into an array of numbers

  sizes = sizes.split(",").map(Number);

  const generateCombinations = (springs) => {
    // base cases to ensure a more efficient runtime - if the combination has already been seen, it can be skipped - this can be memoized
    if (springs.length < 2) return;

    if (output.includes(springs)) return;

    if (memo.has(springs)) {
      output = [...output, ...memo.get(springs)];
      return;
    }

    output.push(springs);

    // loop over each character of the damaged springs

    for (let i = 0; i < springs.length; i++) {
      const char = springs[i];

      // replace any unknown spring with a damaged spring, assume remaining question marks are operational

      if (char === "?") {
        let temp = springs.split("");

        temp[i] = "#";

        temp = temp.join("");

        generateCombinations(temp);
      }
    }

    memo.set(springs, output.slice());
  };

  generateCombinations(springs);

  const testCombinations = (combinations) => {
    combinations.forEach((combination) => {
      // After assuming any remaining springs in a combination are functional, we can replace them, then use them to spilt it into groups of damaged springs
      // These groups are then swapped into their corresponding lengths to compare with the sizings mapped
      combination = combination
        .replaceAll("?", ".")
        .split(".")
        .filter((item) => item)
        .map((string) => string.length);

      // using json stringify is the easiest way to compare two array values, if they are a match then increase the total

      if (JSON.stringify(combination) === JSON.stringify(sizes))
        totalArrangments += 1;
    });
  };

  testCombinations(output);
});

console.log(totalArrangments);
