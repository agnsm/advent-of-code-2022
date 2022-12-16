import { readFileSync } from 'fs';

function part1(file: string): number {
  let index = 0;
  const length = 4;
  let marker = length;

  while (marker < file.length) {
    let chars = file.substring(index, marker);

    if (new Set(chars).size != length) {
      index++;
      marker++;
    } else {
      break;
    }
  }

  return marker;
}

function part2(file: string): number {
  let index = 0;
  const length = 14;
  let marker = length;

  while (marker < file.length) {
    let chars = file.substring(index, marker);
    
    if (new Set(chars).size != length) {
      index++;
      marker++;
    } else {
      break;
    }
  }

  return marker;
}

function main() {
  const file = readFileSync('../inputs/day6.txt', 'utf-8').trim();
  console.log(part1(file));
  console.log(part2(file));
}

main();
