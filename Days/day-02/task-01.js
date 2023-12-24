const fs = require("fs");

let fileData = fs.readFileSync("days/day-02/input.txt", "utf-8"); // read file using node

let games = fileData.split("\n"); // convert to an array

let totalCount = 0;

let reds;

let greens;

let blues;

for (let i = 0; i < games.length; i++) {
  const sets = games[i].split("; "); // splits the games into each set
  let isPossible = true; // assume the game is possible by default

  for (let j = 0; j < sets.length; j++) {
    const colors = sets[j].match(/\b\d+\s(red|green|blue)\b/g); // seperate the x color by using regex

    let reds = 0;
    let greens = 0;
    let blues = 0;

    colors.forEach((color) => {
      // for each color
      let count = color.split(" ")[0];
      let col = color.split(" ")[1]; // get the key/value pair

      if (col === "blue") {
        blues += parseInt(count); // update the counts
      }
      if (col === "red") {
        reds += parseInt(count);
      }
      if (col === "green") {
        greens += parseInt(count);
      }
    });

    if (reds > 12 || greens > 13 || blues > 14) {
      // if the counts surpass the limit, the game isn't possible
      isPossible = false;
      break;
    }
  }

  if (isPossible) {
    // if the game is possible, add the game number to the total count
    totalCount += i + 1;
  }
}

console.log(totalCount);
