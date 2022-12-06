import { readFileSync } from 'fs';

function part1(file: string): number {
  const elves = file
    .split('\n\n')
    .map(calories => calories.split('\n').map(val => Number(val)));

  const totalCalories = elves
    .map(calories => calories.reduce((acc, val) => acc + val))
    .sort((a, b) => b - a);
    
  return totalCalories[0];
}

function part2(file: string): number {
  const elves = file
    .split('\n\n')
    .map(calories => calories.split('\n').map(val => Number(val)));

  const totalCalories = elves
    .map(calories => calories.reduce((acc, val) => acc + val))
    .sort((a, b) => b - a);
    
  return totalCalories.slice(0, 3).reduce((acc, val) => acc + val);
}

function main() {
  const file = readFileSync('../inputs/day1.txt', 'utf-8').trim();
  console.log(part1(file));
  console.log(part2(file));
}

main();
