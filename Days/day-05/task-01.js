const fs = require("fs");

let input = fs.readFileSync("days/day-05/input.txt", "utf-8"); // read file using node

input = input.split(/\n\s*\n/); // split by a a full linebreak that seperates each piece of data

// grab all of the seperate sections of data

let [
  seeds,
  seedSoilMap,
  soilFertMap,
  fertWaterMap,
  waterLightMap,
  lightTempMap,
  tempHumidMap,
  humidLocationMap,
] = input;

// parse the data as needed -> split seeds: 79 14 55 13 into an array of 'seeds' and 79 14 55 13, grab the last index (the numbers) + split them into an array, filter out any whitespace + ensure that the data type is a number/int

seeds = seeds
  .split(":")[1]
  .split(" ")
  .filter((x) => x)
  .map((seed) => parseInt(seed));

function convertMapData(data, map) {
  const converted = [];

  // parse map data to get an array of each line of numbers - split at the text, get the numbers and split by line

  map = map.split(":")[1].trim().split("\n");

  // for each number (eg. seed numbers)

  data.forEach((number) => {
    let wasConverted = false;

    // loop over the lines in the map

    map.forEach((line) => {
      // store data into vars

      const [destination, source, length] = line
        .split(" ") // split each line into it's 3 parts
        .map((item) => parseInt(item)); // map them to ints

      // check if the seed is in the range that the line data covers

      if (number >= source && number < source + length) {
        converted.push(number + (destination - source)); // push the conversion to the new array
        wasConverted = true;
      }
    });

    if (!wasConverted) converted.push(number); // otherwise push itself to the ar
  });

  return converted;
}

// run through all the maps - this is using 7x more memory that it really needs, as all of this can come directly from the seeds variable instead of passing by value with the primitive datatypes

const soilNumbers = convertMapData(seeds, seedSoilMap);
const fertNumbers = convertMapData(soilNumbers, soilFertMap);
const waterNumbers = convertMapData(fertNumbers, fertWaterMap);
const lightNumbers = convertMapData(waterNumbers, waterLightMap);
const tempNumbers = convertMapData(lightNumbers, lightTempMap);
const humidNumbers = convertMapData(tempNumbers, tempHumidMap);
const locationNumbers = convertMapData(humidNumbers, humidLocationMap);

// get lowest number

console.log(Math.min(...locationNumbers));
