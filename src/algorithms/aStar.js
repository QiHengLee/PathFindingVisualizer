export const aStar = (grid, startNode, finishNode) => {
    var nodeOrder = [];
    //try
    //try2
    return nodeOrder;
  };
  
  function getNeighbors(node, grid) {
    const neighbours = [];
    const { row, col } = node;
    if (row > 0) {
      neighbours.push(grid[row - 1][col]);
    }
    if (col < grid[0].length - 1) {
      neighbours.push(grid[row][col + 1]);
    }
    if (row < grid.length - 1) {
      neighbours.push(grid[row + 1][col]);
    }
    if (col > 0) {
      neighbours.push(grid[row][col - 1]);
    }
  
    return neighbours;
  }
  