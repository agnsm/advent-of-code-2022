import { readFileSync } from 'fs';

class Monkey {
  id: number;
  startingItems: number[];
  operation: string;
  counter: number;
  test: Test;

  constructor(id: number, startingItems: number[], operation: string, test: Test) {
    this.id = id;
    this.startingItems = startingItems;
    this.operation = operation;
    this.counter = 0;
    this.test = test;
  }
  
  inspectItem(index: number) {
    this.counter++;
    this.startingItems[index] = Math.floor(eval(this.operation.replaceAll('old', this.startingItems[index].toString())) / 3);

    if (this.startingItems[index] % this.test.value == 0) {
      return this.test.ifTrue;
    } else {
      return this.test.ifFalse;
    }
  }

  inspectItem2(index: number, commonMultiple: number) {
    this.counter++;
    this.startingItems[index] = eval(this.operation.replaceAll('old', this.startingItems[index].toString())) % commonMultiple;

    if (this.startingItems[index] % this.test.value == 0) {
      return this.test.ifTrue;
    } else {
      return this.test.ifFalse;
    }
  }
}

class Test {
  value: number;
  ifTrue: number;
  ifFalse: number;

  constructor(value: number, ifTrue: number, ifFalse: number) {
    this.value = value;
    this.ifTrue = ifTrue;
    this.ifFalse = ifFalse;
  }
}

function createMonkeyArray(file: string): Monkey[] {
  const monkeys: Monkey[] = [];

  file.split('\n\n').forEach(monkeyData => {
    const monkey: string[] = monkeyData.split('\n').map(attr => attr.trim());

    const id = +monkey[0].slice(0, -1).split(' ').pop()!;
    const startingItems = monkey[1].substring('Starting items: '.length).split(', ').map(val => +val);
    const operation = monkey[2].substring(monkey[2].indexOf('old'));

    const testValue = +monkey[3].split(' ').pop()!;
    const testIfTrue = +monkey[4].split(' ').pop()!;
    const testIfFalse = +monkey[5].split(' ').pop()!;

    const test = new Test(testValue, testIfTrue, testIfFalse);
    monkeys.push(new Monkey(id, startingItems, operation, test));
  });

  return monkeys;
}

function part1(file: string): number {
  const monkeys = createMonkeyArray(file);

  for (let i = 0; i < 20; i++) {
    monkeys.forEach(monkey => {
      while (monkey.startingItems[0]) {
        const throwTo = monkey.inspectItem(0);
        monkeys[throwTo].startingItems.push(monkey.startingItems[0]);
        monkey.startingItems.splice(0, 1);
      }
    });
  }

  monkeys.sort((a, b) => b.counter - a.counter);

  return monkeys[0].counter * monkeys[1].counter; 
}

function part2(file: string): number {
  const monkeys = createMonkeyArray(file);
  const commonMultiple = monkeys.map(monkey => monkey.test.value).reduce((acc, val) => acc * val);

  for (let i = 0; i < 10000; i++) {
    monkeys.forEach(monkey => {
      while (monkey.startingItems[0]) {
        const throwTo = monkey.inspectItem2(0, commonMultiple);
        monkeys[throwTo].startingItems.push(monkey.startingItems[0]);
        monkey.startingItems.splice(0, 1);
      }
    });
  }

  monkeys.sort((a, b) => b.counter - a.counter);

  return monkeys[0].counter * monkeys[1].counter; 
}

function main() {
  const file = readFileSync('../inputs/day11.txt', 'utf-8').trim();
  console.log(part1(file));
  console.log(part2(file));
}

main();
