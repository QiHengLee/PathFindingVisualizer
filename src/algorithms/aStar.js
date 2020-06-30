export const aStar = (grid, startNode, finishNode) => {
    var nodeOrder = [];
    var openDict = {};
    
    openDict = addNode(openDict, 0, startNode)
    startNode.f = 0;
    startNode.g = 0;
    startNode.h = 0;

    while(Object.keys(openDict).length > 0) {
        var minF = lowestF(openDict);
        var node = openDict[minF][0]
        openDict = eraseNode(openDict, minF)
        
        node.isVisited = true;

        var neighbours = getNeighbors(node, grid);
        for (const neighbour of neighbours) {
            if (neighbour.col === finishNode.col && neighbour.row === finishNode.row) 
            {
                neighbour.previousNode = node
                nodeOrder.push(neighbour)
                return nodeOrder
            }
            else if (neighbour.isWall === false && neighbour.isVisited === false) {
                
                var g = node.g + 1;
                var h = calculateHValue(neighbour.row, neighbour.col, finishNode.row, finishNode.col);
                var f = g + h;

                if (neighbour.f > f) {
                    openDict = addNode(openDict, f, neighbour)
                    neighbour.f = f
                    neighbour.g = g
                    neighbour.h = h
                    neighbour.previousNode = node
                    nodeOrder.push(neighbour)
                }
            }
        }
    }
    return nodeOrder;
  };

function addNode(dict, f, node) {
    if (f in dict) {
        dict[f].unshift(node)
    }
    else {
        dict[f] = [node]
    }
    return dict
}

function eraseNode(dict, min) {
    if (dict[min].length === 1) {
        delete dict[min]
    }
    else {
        dict[min].shift()
    }

    return dict
}

function lowestF(dict) {
    var keys = Object.keys(dict);
    var min = Number.MAX_SAFE_INTEGER;
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] < min) {
            min = keys[i]
        }
    }
    return min
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

function calculateHValue(sRow, sCol, fRow, fCol) {
    var row = sRow - fRow
    var col = fCol - sCol
    var val = Math.abs(row) + Math.abs (col); 
    return val
}