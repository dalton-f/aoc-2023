const fs = require("fs");

let input = fs.readFileSync("days/day-06/input.txt", "utf-8"); // read file using node

input = input.trim().split("\n");

const time = input[0]
  .trim()
  .split(":")[1]
  .split(" ")
  .filter((item) => item)
  .map(Number)
  .join("");

const distance = input[1]
  .trim()
  .split(":")[1]
  .split(" ")
  .filter((item) => item)
  .map(Number)
  .join("");

let count = 0;

for (let i = 1; i < time; i++) {
  let dist = time * i - i ** 2;

  if (dist > distance) count++;
}

console.log(count);
