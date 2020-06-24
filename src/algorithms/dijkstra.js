class Heap {
  constructor(grid) {
    this.grid = grid;
    this.array = this.setupArray(grid);
    this.size = 0;
    this.pos = [];
  }

  setupArray(grid) {
    const array = [];
    for (var row = 0; row < grid.length; row++) {
      for (var col = 0; col < grid.length; col++) {
        array.push(grid[row][col]);
      }
    }
    return array;
  }
}

export const dijkstras = (grid) => {
  const heap = new Heap(grid);
  const size = grid.length * grid[0].length;
  heap.size = size;
  console.log(heap.array[0].distance);
};
