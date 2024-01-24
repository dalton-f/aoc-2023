const fs = require("fs");

let input = fs.readFileSync("days/day-05/input.txt", "utf-8"); // read file using node

input = input.split(/\n\s*\n/); // split by a a full linebreak that seperates each piece of data

let seedsRanges = [];

// use deconstruction to assign each map into a variable

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

// format seeds by removing the text and creating an array of type number

seeds = seeds
  .split(":")[1]
  .split(" ")
  .filter((item) => item)
  .map(Number);

// loop through the seeds in pairs to generate the initial seed ranges

for (let i = 0; i < seeds.length; i += 2) {
  seedsRanges.push({ start: seeds[i], end: seeds[i] + seeds[i + 1] });
}

// set up function to use for each map to do conversions

const convertData = (data, map) => {
  let newRanges = [];

  // format map by removing the text and generating an array of

  map = map
    .split(":")[1]
    .split("\n")
    .filter((item) => item);

  // loop over each line in the map

  data.forEach((range) => {
    let wasConverted = false;
    map.forEach((line) => {
      // split the line into an array of numbers so we can get each value

      line = line.split(" ").map(Number);

      // deconstruct the line into convenient variables

      const [dst, src, len] = line;

      // some data at the end matches the map
      if (range.end >= src && range.start < src && range.end < src + len) {
        // overlapping section, converted
        newRanges.push({
          start: src + (dst - src),
          end: range.end + (dst - src),
        });
        // not overlapping section
        newRanges.push({ start: range.start, end: src - 1 });
        wasConverted = true;
      }
      // some data at the start matches the map
      else if (
        range.start >= src &&
        range.end >= src + len &&
        range.start < src + len
      ) {
        // overlapping section, converted
        newRanges.push({
          start: range.start + (dst - src),
          end: src + len - 1 + (dst - src),
        });
        // not overlapping section
        newRanges.push({ start: src + len, end: range.end });
        wasConverted = true;
      }
      // else data maps fully
      else if (range.start >= src && range.end < src + len) {
        newRanges.push({
          start: range.start + (dst - src),
          end: range.end + (dst - src),
        });
        wasConverted = true;
      }
    });

    if (!wasConverted) newRanges.push(range);
  });

  return newRanges;
};

let soilNumbers = convertData(seedsRanges, seedToSoil);
let fertNumbers = convertData(soilNumbers, soilToFert);
let waterNumbers = convertData(fertNumbers, fertToWater);
let lightNumbers = convertData(waterNumbers, waterToLight);
let tempNumbers = convertData(lightNumbers, lightToTemp);
let humidNumbers = convertData(tempNumbers, tempToHumid);
let locationNumbers = convertData(humidNumbers, humidToLoc);

console.log(locationNumbers);

// get lowest location number from array of object ranges

console.log(
  locationNumbers.reduce((prev, curr) =>
    prev.start < curr.start ? prev : curr
  ).start
);
