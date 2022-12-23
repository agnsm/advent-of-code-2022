import { readFileSync } from 'fs';

function part1(file: string): number {
  const instructions = file.split('\n')
    .map(line => line.split(' '));
  
  let x = 1;
  let sum = 0;
  let cycle = 1;
  let temp: number | null = null;
  let i = 0;
  while (i < instructions.length) {
    if ((cycle - 20) % 40 == 0) {
      sum += cycle * x;
    }

    if (instructions[i][0] == 'addx') {
      if (!temp) {
        temp = Number(instructions[i][1]);
      } else {
        x += temp;
        temp = null;
        i++;
      }
    } else {
      i++;
    }

    cycle++;
  }

  return sum; 
}

function part2(file: string): string {
  const instructions = file.split('\n')
    .map(line => line.split(' '));
  
  let crt: string[][] = [];
  for (let i = 0; i < 6; i++) {
    crt[i] = [];
  }

  let x = 1;
  let cycle = 0;
  let temp: number | null = null;
  let i = 0;
  while (i < instructions.length) {
    const row = Math.floor(cycle / 40);
    const col = cycle % 40;
    if (col >= x - 1 && col <= x + 1) {
      crt[row][col] = '#';
    } else {
      crt[row][col] = '.';
    }

    if (instructions[i][0] == 'addx') {
      if (!temp) {
        temp = Number(instructions[i][1]);
      } else {
        x += temp;
        temp = null;
        i++;
      }
    } else {
      i++;
    }

    cycle++;
  }

  let image = '';
  crt.forEach(row => {
    image += row.join('') + '\n';
  });

  return image; 
}

function main() {
  const file = readFileSync('../inputs/day10.txt', 'utf-8').trim();
  console.log(part1(file));
  console.log(part2(file));
}

main();
