// expected 46

// 50 98 2 means seed number 98 = 50 and seed number 99 = 51

let input = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

input = input.trim().split("\n\n");

// deconstruct array into vars

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

let seedRanges = [],
  newRanges = [];

// format seeds into an array of type number

seeds = seeds
  .split(":")[1]
  .split(" ")
  .filter((item) => item)
  .map(Number);

for (let i = 0; i < seeds.length; i += 2) {
  seedRanges.push({ start: seeds[i], end: seeds[i] + seeds[i + 1] });
}

const convertData = (data, map) => {
  newRanges = [];

  // format map
  map = map
    .split(":")[1]
    .split("\n")
    .filter((item) => item);

  // loop over and format lines

  map.forEach((line) => {
    // split each line of the map into an array of type number
    line = line.split(" ").map(Number);
    // deconstruct into relevant variables
    const [dst, src, len] = line;

    // loop over each range

    data.forEach((range) => {
      // overflow at the end
      if (range.start > src && range.end > src + len) {
        newRanges.push({ start: range.start, end: src + len - 1 });
        newRanges.push({ start: src + len, end: range.end });
      }
      // no overlap, maps fully
      else if (range.start >= src && range.end < src + len) {
        newRanges.push({
          start: range.start + (dst - src),
          end: range.end + (dst - src),
        });
      }
    });
  });

  return newRanges;
};

let soilNumbers = convertData(seedRanges, seedToSoil);
let fertNumbers = convertData(soilNumbers, soilToFert);
let waterNumbers = convertData(fertNumbers, fertToWater);
let lightNumbers = convertData(waterNumbers, waterToLight);
let tempNumbers = convertData(lightNumbers, lightToTemp);
let humidNums = convertData(tempNumbers, tempToHumid);
let locationNums = convertData(humidNums, humidToLoc);

locationNums.forEach((demo) => {
  console.log(demo);
});
