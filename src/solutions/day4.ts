import { readFileSync } from 'fs';

function part1(file: string): number {
  let count = 0;
  const pairs = file.split('\n').map(item => item.split(','));

  pairs.forEach(sections => {
    const section1 = sections[0].split('-').map(val => Number(val));
    const section2 = sections[1].split('-').map(val => Number(val));

    if (section1[0] <= section2[0] && section2[1] <= section1[1]
      || section2[0] <= section1[0] && section1[1] <= section2[1]) {
      count++; 
    }
  });

  return count;
}

function part2(file: string): number {
  let count = 0;
  const pairs = file.split('\n').map(item => item.split(','));

  pairs.forEach(sections => {
    const section1 = sections[0].split('-').map(val => Number(val));
    const section2 = sections[1].split('-').map(val => Number(val));

    if(section1[0] <= section2[0] && section2[0] <= section1[1]
      || section2[0] <= section1[0] && section1[0] <= section2[1]) {
      count++; 
    }
  });

  return count;
}

function main() {
  const file = readFileSync('../inputs/day4.txt', 'utf-8').trim();
  console.log(part1(file));
  console.log(part2(file));
}

main();
