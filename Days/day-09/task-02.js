// remove any instance of NaN (each difference will always be one length shorter than the previous difference/initial sequence) but keep 0 value

const filterArray = (arr) => arr.filter((item) => (isNaN(item) ? false : true));

const fs = require("fs");

let input = fs.readFileSync("days/day-09/input.txt", "utf-8"); // read file using node

// remove any blank lines and split into an array of reports

input = input.trim().split("\n");

let total = 0;

// loop over each report and make it into it's own array of numbers

input.forEach((report) => {
  report = report.split(" ").map(Number);

  let differenceSet = [],
    currDiff = [];

  differenceSet.push(report);

  // generate the inital set of differences

  for (let i = 0; i < report.length; i++) {
    currDiff.push(report[i + 1] - report[i]);
  }

  currDiff = filterArray(currDiff);

  // loop until every number in currDiff is equal

  while (!currDiff.every((item) => item === currDiff[0])) {
    // store the curr diff
    differenceSet.push(filterArray(currDiff));

    // generate the diff of the curr diff

    for (let i = 0; i < currDiff.length; i++) {
      currDiff[i] = currDiff[i + 1] - currDiff[i];
      currDiff = filterArray(currDiff);
    }
  }

  differenceSet.push(currDiff);

  // once we have every set of differences, we loop backwards to find the next term for each subsequence

  for (let i = differenceSet.length - 1; i >= 0; i--) {
    // if there is a set before it,
    if (differenceSet[i - 1]) {
      // add the previous item to the array
      differenceSet[i - 1].unshift(
        differenceSet[i - 1][0] - differenceSet[i][0]
      );
    }
  }

  // get the new first item for the first difference and add to total

  total += differenceSet[0][0];
});

console.log(total);
