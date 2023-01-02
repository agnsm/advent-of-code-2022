import { readFileSync } from 'fs';

class Directory {
  name: string;
  parent: Directory | null;
  subdirectories: Directory[];
  files: File[];
  size: number;

  constructor(name: string) {
    this.name = name;
    this.parent = null;
    this.subdirectories = [];
    this.files = [];
    this.size = 0;
  }

  addSubdirectory(dir: Directory) {
    this.subdirectories.push(dir);
  }

  addFile(file: File) {
    this.files.push(file);
    this.size += file.size;
  }

  updateSize(subDirSize: number) {
    this.size += subDirSize;
  }
}

class File {
  size: number;

  constructor(size: number) {
    this.size = size;
  }
}

class FileSystem {
  root: Directory;
  current: Directory;

  constructor(root: Directory) {
    this.root = root;
    this.current = root;
  }

  calculateSizes(this: FileSystem, data: string[]) {
    let sizes: number[] = [];
  
    let i = 1;
    while (i < data.length) {
      const line = data[i];
      switch (line.substring(0, 4)) {
        case '$ cd':
          if (line.substring(5) == '/') {
            this.current = this.root;
          } else if (line.substring(5) == '..' && this.current.parent) {
            this.current.parent.updateSize(this.current.size);
            sizes.push(this.current.size);
            this.current = this.current.parent;
          } else {
            const temp = this.current;
            this.current = this.current.subdirectories.find(dir => dir.name == line.substring(5)) || this.current;
            this.current.parent = temp;
          }
          i++;
          break;
  
        case '$ ls':
          while (++i < data.length && !data[i].startsWith('$')) {
            if (data[i].startsWith('dir')) {
              const name = data[i].split(' ')[1];
              this.current.addSubdirectory(new Directory(name));
            } else {
              const size = Number(data[i].split(' ')[0]);
              this.current.addFile(new File(size));
            }
          }
          break;
      
        default:
          i++;
          break;
      }
    };
  
    while (this.current != this.root && this.current.parent) {
      this.current.parent.updateSize(this.current.size);
      sizes.push(this.current.size);
      this.current = this.current.parent;
    }
  
    return sizes;
  }
}

function part1(file: string): number {
  const data = file.split('\n').map(line => line.trim());
  const maxDirectorySize = 100000;
  const fileSystem = new FileSystem(new Directory('/'));
  const sizes = fileSystem.calculateSizes(data);

  return sizes.reduce((acc, val) => val <= maxDirectorySize ? acc + val : acc);
}

function part2(file: string): number {
  const data = file.split('\n').map(line => line.trim());
  const diskSpace = 70000000;
  const neededSpace = 30000000;
  const fileSystem = new FileSystem(new Directory('/'));
  const sizes = fileSystem.calculateSizes(data);
  const unusedSpace = diskSpace - fileSystem.root.size;

  return sizes.sort((a, b) => a - b).find(size => unusedSpace + size >= neededSpace) || fileSystem.root.size;
}

function main() {
  const file = readFileSync('../inputs/day7.txt', 'utf-8').trim();
  console.log(part1(file));
  console.log(part2(file));
}

main();
