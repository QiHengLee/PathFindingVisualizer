export const bfs = (grid, startNode, finishNode) => {
    var nodeOrder = []
    var queue = []
    queue.push(startNode)
    startNode.isVisited = true;
    
    while(queue.length > 0) {
        var node = queue.shift();
        var neighbours = getNeighbors(node, grid);
        for (const neighbour of neighbours) {
            if (!neighbour.isVisited && !neighbour.isWall) {
                neighbour.previousNode = node;
                neighbour.isVisited = true;
                queue.push(neighbour);
                nodeOrder.push(neighbour);
                if (
                    neighbour.col === finishNode.col &&
                    neighbour.row === finishNode.row
                ) {
                    return nodeOrder;
                }
            }
        }
    }
    console.log(nodeOrder)
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
  