const fs = require("fs");

let fileData = fs.readFileSync("days/day-02/input.txt", "utf-8"); // read file using node

let games = fileData.split("\n"); // convert to an array

let total = 0;

for (let i = 0; i < games.length; i++) {
  const sets = games[i].split("; ");

  let minRed = 0;
  let minGreen = 0;
  let minBlue = 0;

  for (let j = 0; j < sets.length; j++) {
    const colors = sets[j].match(/\b\d+\s(red|green|blue)\b/g); // seperate the x color by using regex
    colors.forEach((color) => {
      let count = parseInt(color.split(" ")[0]);
      let col = color.split(" ")[1];

      // the highest number of red, blues and greens declared in a set of a game will always be the minimum required for it

      if (col === "blue" && count > minBlue) {
        minBlue = count;
      }
      if (col === "red" && count > minRed) {
        minRed = count;
      }

      if (col === "green" && count > minGreen) {
        minGreen = count;
      }
    });
  }

  let powerOfMin = minBlue * minRed * minGreen; // calculate the power for each game

  total += powerOfMin; // update the total
}

console.log(total);
