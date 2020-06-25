class Heap {
  constructor(grid) {
    this.grid = grid;
    this.array = this.setup_Array_Pos(grid);
    this.size = 0;
  }

  setup_Array_Pos(grid) {
    const array = [];
    var pos = 0;
    for (var row = 0; row < grid.length; row++) {
      for (var col = 0; col < grid[0].length; col++) {
        grid[row][col].minHeapPos = pos;
        array.push(grid[row][col]);
        pos++;
      }
    }
    return array;
  }

  swapNode(a, b) {
    var temp = this.array[a];
    this.array[a] = this.array[b];
    this.array[b] = temp;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }

  isInMinHeap(v) {
    if (v.minHeapPos < this.size) {
      return true;
    }
    return false;
  }

  minHeapify(idx) {
    var smallest = idx;
    var left = idx * 2 + 1;
    var right = idx * 2 + 2;

    if (
      left < this.size &&
      this.array[left].distance < this.array[smallest].distance
    ) {
      smallest = left;
    }
    if (
      right < this.size &&
      this.array[right].distance < this.array[smallest].distance
    ) {
      smallest = right;
    }

    if (smallest !== idx) {
      this.array[smallest].minHeapPos = idx;
      this.array[idx].minHeapPos = smallest;

      this.swapNode(smallest, idx);

      this.minHeapify(smallest);
    }
  }

  extractMin() {
    if (this.isEmpty()) {
      return;
    }

    var root = this.array[0];

    var lastNode = this.array[this.size - 1];
    this.array[0] = lastNode;

    lastNode.minHeapPos = 0;
    root.minHeapPos = this.size - 1;

    this.size -= 1;
    this.minHeapify(0);

    return root;
  }

  decreaseKey(v, dist) {
    var i = v.minHeapPos;
    v.distance = dist;

    while (
      i > 0 &&
      this.array[i].distance < this.array[Math.floor((i - 1) / 2)].distance
    ) {
      this.array[i].minHeapPos = Math.floor((i - 1) / 2);
      this.array[Math.floor((i - 1) / 2)].minHeapPos = i;
      this.swapNode(i, Math.floor((i - 1) / 2));

      i = Math.floor((i - 1) / 2);
    }
  }
}

export const dijkstras = (grid) => {
  const heap = new Heap(grid);
  const size = grid.length * grid[0].length;
  heap.size = size;
  grid[0][0].distance = 0;
  heap.decreaseKey(grid[0][4], 10);
  console.log(heap.array);
  console.log(grid);
  console.log(heap.extractMin());
  console.log(heap.extractMin());
  console.log(heap.isInMinHeap(grid[10][10]));
};
