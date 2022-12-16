import { readFileSync } from 'fs';

function part1(file: string): string {
  const data = file.split('\n');
  const crates = data.slice(0, 8).reverse();
  const procedure = data.slice(10);

  let stacks: string[][] = [];

  crates.forEach((line, index) => {
    for (let i = 1; i < line.length; i += 4) {
      const num = Math.ceil(i/4);
      const crate = line[i];

      if (index == 0) {
        stacks[num] = [];
      }

      if (crate != ' ') {
        stacks[num].push(crate);
      }
    }
  });

  procedure.forEach(instruction => {
    const values = instruction.split(' ').map(val => Number(val));
    let move = values[1];
    const from = values[3];
    const to = values[5];

    while (move > 0) {
      move--;
      const top = stacks[from].pop(); 
      if (top) {
        stacks[to].push(top);
      }
    }
  });

  return stacks.map(stack => stack.pop()).join('');
}

function part2(file: string): string {
  const data = file.split('\n');
  const crates = data.slice(0, 8).reverse();
  const procedure = data.slice(10);

  let stacks: string[][] = [];

  crates.forEach((line, index) => {
    for (let i = 1; i < line.length; i += 4) {
      const num = Math.ceil(i/4);
      const crate = line[i];

      if (index == 0) {
        stacks[num] = [];
      }

      if (crate != ' ') {
        stacks[num].push(crate);
      }
    }
  });

  procedure.forEach(instruction => {
    const values = instruction.split(' ').map(val => Number(val));
    let move = values[1];
    const from = values[3];
    const to = values[5];

    let tempCrates: string[] = [];
    while (move > 0) {
      move--;
      const top = stacks[from].pop(); 
      if (top) {
        tempCrates.unshift(top);
      }
    }

    stacks[to].push(...tempCrates);
  });

  return stacks.map(stack => stack.pop()).join('');
}

function main() {
  const file = readFileSync('../inputs/day5.txt', 'utf-8').trim();
  console.log(part1(file));
  console.log(part2(file));
}

main();
