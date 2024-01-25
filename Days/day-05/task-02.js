const fs = require("fs");

let input = fs.readFileSync("days/day-05/input.txt", "utf-8"); // read file using node

input = input.split(/\n\s*\n/); // split by a a full linebreak that seperates each piece of data

let seedRanges = [];

// deconstruct array into helpful variables

let [
  seeds,
  seedToSoil,
  soilToFert,
  fertToWater,
  waterToLight,
  lightToTemp,
  tempToHumid,
  humidToLoc,
] = input;

// format seeds into an array of numbers

seeds = seeds
  .split(":")[1]
  .split(" ")
  .filter((item) => item)
  .map(Number);

// generate objects for ranges based on each seed pair

for (let i = 0; i < seeds.length; i += 2) {
  seedRanges.push({ start: seeds[i], end: seeds[i] + seeds[i + 1] });
}

const convertData = (data, map) => {
  let newRanges = [];

  // format map

  map = map
    .split(":")[1]
    .split("\n")
    .filter((item) => item);

  while (data.length > 0) {
    let range = data.shift();

    let wasConverted = false;

    // check each range against each line

    map.forEach((line) => {
      // format line into an array of numbers
      line = line.split(" ").map(Number);

      // deconstruct it

      const [dst, src, len] = line;

      let overflowStart = Math.max(range.start, src);
      let overflowEnd = Math.min(range.end, src + len);

      if (overflowStart < overflowEnd) {
        newRanges.push({
          start: overflowStart - src + dst,
          end: overflowEnd - src + dst,
        });

        wasConverted = true;

        // pushes anythign that doesn't get mapped back into data to check if it maps to other lines

        if (overflowStart > range.start) {
          data.push({ start: range.start, end: overflowStart });
        }

        if (range.end > overflowEnd) {
          data.push({ start: overflowEnd, end: range.end });
        }
      }
    });

    // if it cannot be mapped, maps to itself

    if (!wasConverted) newRanges.push(range);
  }

  return newRanges;
};

let soilRanges = convertData(seedRanges, seedToSoil);
let fertRanges = convertData(soilRanges, soilToFert);
let waterRanges = convertData(fertRanges, fertToWater);
let lightRanges = convertData(waterRanges, waterToLight);
let tempRanges = convertData(lightRanges, lightToTemp);
let humidRanges = convertData(tempRanges, tempToHumid);
let locationRanges = convertData(humidRanges, humidToLoc);

// 46 - 56, 56 - 60, 60 - 61, 82 - 85, 86 - 90, 94 - 97, 97 - 99

let lowestLoc = locationRanges.reduce((prev, curr) =>
  prev.start < curr.start ? prev : curr
);

console.log(lowestLoc);

// 99751240
