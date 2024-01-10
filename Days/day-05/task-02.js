// The lowest location number in this example is 46.

const fs = require("fs");

let input = fs.readFileSync("./input.txt", "utf-8"); // read file using node

input = input.split(/\n\s*\n/); // split by a a full linebreak that seperates each piece of data

// deconstruct the array into seperate variables

let [
  seeds,
  seedSoilMap,
  soilFertMap,
  fertWaterMap,
  waterLightMap,
  lightTempMap,
  tempHumidityMap,
  humidityLocationMap,
] = input;

// format the seeds so they are easier to compare against by removing the text, converting numbers to an array and ensuring that they are numbers

seeds = seeds.split(":")[1].trim().split(" ").map(Number);

// format each map outside of the loop to try and optimise

seedSoilMap = seedSoilMap.split(":")[1].trim().split("\n");
soilFertMap = soilFertMap.split(":")[1].trim().split("\n");
fertWaterMap = fertWaterMap.split(":")[1].trim().split("\n");
waterLightMap = waterLightMap.split(":")[1].trim().split("\n");
lightTempMap = lightTempMap.split(":")[1].trim().split("\n");
tempHumidityMap = tempHumidityMap.split(":")[1].trim().split("\n");
humidityLocationMap = humidityLocationMap.split(":")[1].trim().split("\n");

// main function which takes in a number and a map and converts it based on the ranges denoted in the map lines

const convertData = (data, map) => {
  let number = data;

  map.forEach((line) => {
    // split the line into it's three parts and ensure each number is the correct type and then deconstruct it
    const [src, dest, len] = line.split(" ").map(Number);

    // if it is within the range of the given src and the src + len

    if (data >= src && data < src + len) {
      return (number -= src - dest); // shift the values
    }
  });

  return number; // otherwise it maps to itself, so nothing happens
};

// loop until we get a matching seed

let found = false;

for (let i = 28066053; i >= 0; i++) {
  let humidity = convertData(i, humidityLocationMap);
  let temp = convertData(humidity, tempHumidityMap);
  let light = convertData(temp, lightTempMap);
  let water = convertData(light, waterLightMap);
  let fert = convertData(water, fertWaterMap);
  let soil = convertData(fert, soilFertMap);
  let seed = convertData(soil, seedSoilMap);

  console.log(i);

  // the first seed that matches the given seed ranges will always be the lowest location

  if (seed >= Math.min(...seeds)) {
    for (let j = 0; j < seeds.length; j += 2) {
      if (seed >= seeds[j] && seed < seeds[j] + seeds[j + 1]) {
        console.log("lowest location " + i);
        found = true;
        break;
      }
    }
  }

  if (found) {
    break;
  }
}
