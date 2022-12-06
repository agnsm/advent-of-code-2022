import { readFileSync } from 'fs';

const shapePoints: { [shape: string]: number } = { 'A': 1, 'B': 2, 'C': 3 };
const winResponse: { [shape: string]: string } = { 'A': 'B', 'B': 'C', 'C': 'A' };
const loseResponse: { [shape: string]: string } = { 'A': 'C', 'B': 'A', 'C': 'B' };

function part1(file: string): number {
  let score = 0;
  
  const rounds = file
    .split('\n')
    .map(round => round.split(' ')
      .map(shape => shape.replace('X', 'A').replace('Y', 'B').replace('Z', 'C')));

  rounds.forEach(round => {
    score += shapePoints[round[1]];

    if (winResponse[round[0]] == round[1]) {
      score += 6;
    } else if (round[0] == round[1]) {
      score += 3;
    }
  });
    
  return score;
}

function part2(file: string): number {
  let score = 0;

  const rounds = file
    .split('\n').map(round => round.split(' '));

  rounds.forEach(round => {
    switch (round[1]) {
      case 'X':
        score += shapePoints[loseResponse[round[0]]];
        break;

      case 'Y':
        score += 3 + shapePoints[round[0]];
        break;

      case 'Z':
        score += 6 + shapePoints[winResponse[round[0]]];
        break;
    
      default:
        break;
    }
  });
    
  return score;
}

function main() {
  const file = readFileSync('../inputs/day2.txt', 'utf-8').trim();
  console.log(part1(file));
  console.log(part2(file));
}

main();
