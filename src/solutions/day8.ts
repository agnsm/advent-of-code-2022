import { readFileSync } from 'fs';

class Tree {
  height: number;
  visible: boolean;
  scenicScore: number;

  constructor(height: number) {
    this.height = height;
    this.visible = false;
    this.scenicScore = 1;
  }

  isVisible(this: Tree, maxHeight: number): number {
    if (this.height > maxHeight) {
      this.visible = true;
    }
    return Math.max(this.height, maxHeight);
  }
}

function part1(file: string): number {
  const grid = file.split('\n')
    .map(row => row.split('')
      .map(height => new Tree(Number(height))));

  for (let row = 0; row < grid.length; row++) {
    // from left
    let maxHeight = -1;
    for (let col = 0; col < grid[row].length; col++) {
      maxHeight = grid[row][col].isVisible(maxHeight);
    }

    // from right
    maxHeight = -1;
    for (let col = grid[row].length - 1; col >= 0; col--) {
      maxHeight = grid[row][col].isVisible(maxHeight);
    }
  }

  for (let col = 0; col < grid[0].length; col++) {
    // from top
    let maxHeight = -1;
    for (let row = 0; row < grid.length; row++) {
      maxHeight = grid[row][col].isVisible(maxHeight);
    }

    // from bottom
    maxHeight = -1;
    for (let row = grid.length - 1; row >= 0; row--) {
      maxHeight = grid[row][col].isVisible(maxHeight);
    }
  }

  return grid.flat().filter(tree => tree.visible).length;
}

function part2(file: string): number {
  const grid = file.split('\n')
    .map(row => row.split('')
      .map(height => new Tree(Number(height))));

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const tree = grid[row][col];

      // from top
      let viewDist = 0;
      for (let index = row - 1; index >= 0; index--) {
        viewDist++;
        if (grid[index][col].height >= tree.height) break;
      }
      tree.scenicScore *= viewDist;

      // from bottom
      viewDist = 0;
      for (let index = row + 1; index < grid.length; index++) {
        viewDist++;
        if (grid[index][col].height >= tree.height) break;
      }
      tree.scenicScore *= viewDist;

      // from left
      viewDist = 0;
      for (let index = col - 1; index >= 0; index--) {
        viewDist++;
        if (grid[row][index].height >= tree.height) break;
      }
      tree.scenicScore *= viewDist;

      
      // from right
      viewDist = 0;
      for (let index = col + 1; index < grid[row].length; index++) {
        viewDist++;
        if (grid[row][index].height >= tree.height) break;
      }
      tree.scenicScore *= viewDist;
    }
  }

  return Math.max(...grid.flat().map(tree => tree.scenicScore));
}

function main() {
  const file = readFileSync('../inputs/day8.txt', 'utf-8').trim();
  console.log(part1(file));
  console.log(part2(file));
}

main();
