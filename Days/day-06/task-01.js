// total race time (T)
// time button held for (t)
// distance travelled (y)

// y = Tt - t^2

const fs = require("fs");

let input = fs.readFileSync("days/day-06/input.txt", "utf-8"); // read file using node

input = input.trim().split("\n");

// format to get an array of times and distances

let times = input[0]
  .split(":")[1]
  .trim()
  .split(" ")
  .filter((item) => item)
  .map(Number);

let distances = input[1]
  .split(":")[1]
  .trim()
  .split(" ")
  .filter((item) => item)
  .map(Number);

let total = 1;

// for each race (using times.length here, doesn't matter as times.length and distances.length will be the same)

for (let i = 0; i < times.length; i++) {
  // set the count of record beating attempts to 0
  let count = 0;
  // from 1 seconds up to the max time of the race
  for (let j = 1; j < times[i]; j++) {
    // apply formula
    let dist = times[i] * j - j ** 2;
    // if the distance is greater than the record, add the count
    if (dist > distances[i]) count++;
  }

  // generate product

  total *= count;
}

console.log(total);
