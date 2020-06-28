export const dfs = (grid, startNode, finishNode) => {
    var nodeOrder = []
    startNode.isVisited = true;

    nodeOrder = dfsUtil(grid, startNode, finishNode, nodeOrder)
    console.log(nodeOrder)
    return nodeOrder
};

function dfsUtil(grid, startNode, finishNode, nodeOrder) {
    var node = startNode
    var neighbours = getNeighbors(node, grid);
    for (const neighbour of neighbours) {
        if (!neighbour.isVisited && !neighbour.isWall) {
            neighbour.previousNode = node;
            neighbour.isVisited = true;
            nodeOrder.push(neighbour);
            if (
                neighbour.col === finishNode.col &&
                neighbour.row === finishNode.row
            ) {
                return nodeOrder;
            }
            nodeOrder = dfsUtil(grid, neighbour, finishNode, nodeOrder)
            if (
                nodeOrder[nodeOrder.length-1].col === finishNode.col &&
                nodeOrder[nodeOrder.length-1].row === finishNode.row
            ) {
                return nodeOrder;
            }
        }
    }
    return nodeOrder
}

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
