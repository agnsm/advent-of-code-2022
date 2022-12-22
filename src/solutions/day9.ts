import { readFileSync } from 'fs';

class Knot {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Head {
  position: Knot;
  positionHistory: Knot[];

  constructor(x: number, y: number) {
    this.position = new Knot(x, y);
    this.positionHistory = [this.position];
  }

  move(this: Head, direction: string) {
    switch (direction) {
      case 'R':
        this.position = new Knot(this.position.x+1, this.position.y);
        break;
      
      case 'L':
        this.position = new Knot(this.position.x-1, this.position.y);
        break;

      case 'U':
        this.position = new Knot(this.position.x, this.position.y+1);
        break;

      case 'D':
        this.position = new Knot(this.position.x, this.position.y-1);
        break;
    
      default:
        break;
    }

    this.positionHistory.push(this.position);
  }
}

class Tail {
  position: Knot;
  positionHistory: Knot[];

  constructor(x: number, y: number) {
    this.position = new Knot(x, y);
    this.positionHistory = [this.position];
  }

  move(this: Tail, previousKnot: Knot) {
    const diff = this.calculatePositionDifference(previousKnot);
    if (this.position.x == previousKnot.x) {
      if (diff.y < 0) {
        this.position = new Knot(this.position.x, this.position.y+1);
      } else {
        this.position = new Knot(this.position.x, this.position.y-1);
      }
    } else if (this.position.y == previousKnot.y) {
      if (diff.x < 0) {
        this.position = new Knot(this.position.x+1, this.position.y);
      } else {
        this.position = new Knot(this.position.x-1, this.position.y);
      }
    } else {
      this.position = new Knot(
        diff.x < 0 ? this.position.x+1 : this.position.x-1,
        diff.y < 0 ? this.position.y+1 : this.position.y-1
      );
    }

    this.positionHistory.push(this.position);
  }

  calculatePositionDifference(this: Tail, previousKnot: Knot): any {
    return {
      x: this.position.x - previousKnot.x, 
      y: this.position.y - previousKnot.y 
    };
  }

  getUniquePositions(): Set<string> {
    return new Set(this.positionHistory.map(pos => pos.x + ' ' + pos.y));
  }
}

class Grid {
  head: Head;
  tail: Tail[];

  constructor() {
    this.head = new Head(0, 0);
    this.tail = [];
    for (let i = 0; i < 9; i++) {
      this.tail[i] = new Tail(0, 0);
    }
  }

  moveHead(direction: string) {
    this.head.move(direction);
  }

  moveTail(index: number) {
    if (!this.isTailNextToPreviousKnot(index)) {
      const previousKnot = index == 0 ? this.head : this.tail[index-1];
      this.tail[index].move(previousKnot.position);
    }
  }

  isTailNextToPreviousKnot(index: number): boolean {
    const previousKnot = index == 0 ? this.head : this.tail[index-1];
    if (Math.abs(previousKnot.position.x - this.tail[index].position.x) <= 1 
      && Math.abs(previousKnot.position.y - this.tail[index].position.y) <= 1) {
      return true;
    } else {
      return false;
    }
  }
}

function part1(file: string): number {
  const moves = file.split('\n')
    .map(line => line.split(' '));

  const grid = new Grid();

  for (let i = 0; i < moves.length; i++) {
    let steps = Number(moves[i][1]);
    while (steps-- > 0) {
      grid.moveHead(moves[i][0]);
      grid.moveTail(0);
    }
  }

  return grid.tail[0].getUniquePositions().size; 
}

function part2(file: string): number {
  const moves = file.split('\n')
    .map(line => line.split(' '));

  const grid = new Grid();

  for (let i = 0; i < moves.length; i++) {
    let steps = Number(moves[i][1]);
    while (steps-- > 0) {
      grid.moveHead(moves[i][0]);
      for (let i = 0; i < 9; i++) {
        grid.moveTail(i);
      }
    }
  }

  return grid.tail[grid.tail.length-1].getUniquePositions().size;
}

function main() {
  const file = readFileSync('../inputs/day9.txt', 'utf-8').trim();
  console.log(part1(file));
  console.log(part2(file));
}

main();
