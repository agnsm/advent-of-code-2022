import { readFileSync } from 'fs';

function part1(file: string): number {
  let priority = 0;
  const rucksacks = file.split('\n').map(item => item.split(''));

  rucksacks.forEach(items => {
    const compartment1 = items.slice(0, items.length / 2);
    const compartment2 = items.slice(items.length / 2);
    const common = compartment1.filter(item => compartment2.includes(item))[0];

    if (common.charCodeAt(0) >= 'a'.charCodeAt(0)) {
      priority += common.charCodeAt(0) - 96;
    } else {
      priority += common.charCodeAt(0) - 38;
    }
  });

  return priority;
}

function part2(file: string): number {
  let priority = 0;
  const rucksacks = file.split('\n').map(item => item.split(''));

  for (let i = 0; i < rucksacks.length; i+=3) {
    const items1 = rucksacks[i];
    const items2 = rucksacks[i+1];
    const items3 = rucksacks[i+2];
    const common = items1.filter(item => items2.includes(item) && items3.includes(item))[0];
    
    if (common.charCodeAt(0) >= 'a'.charCodeAt(0)) {
      priority += common.charCodeAt(0) - 96;
    } else {
      priority += common.charCodeAt(0) - 38;
    }
  }

  return priority;
}

function main() {
  const file = readFileSync('../inputs/day3.txt', 'utf-8').trim();
  console.log(part1(file));
  console.log(part2(file));
}

main();
