import React from "react";
import Node from "./Node/Node";
import { dijkstras } from "../algorithms/dijkstra";
import "./PathfindingVisualizer.css";

const START_ROW = 10;
const START_COL = 5;
const FINISH_ROW = 10;
const FINISH_COL = 44;

class PathfindingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    this.initializeGrid();
  }

  initializeGrid() {
    const grid = [];
    for (var rows = 0; rows < 20; rows++) {
      const row = [];
      for (var cols = 0; cols < 50; cols++) {
        row.push(createNode(rows, cols));
      }
      grid.push(row);
    }
    this.setState({ grid: grid });
  }

  visualizeDijkstras() {
    const { grid } = this.state;
    const nodeOrder = dijkstras(
      grid,
      grid[START_ROW][START_COL],
      grid[FINISH_ROW][FINISH_COL]
    );
    this.animateMap(nodeOrder);
  }

  animateMap = (nodeOrder) => {
    for (let i = 0; i <= nodeOrder.length; i++) {
      if (i === nodeOrder.length) {
        setTimeout(() => {
          this.animatePath(nodeOrder);
        }, 25 * i);
        return;
      }
      setTimeout(() => {
        const node = nodeOrder[i];
        const newGrid = this.state.grid.slice();
        newGrid[node.row][node.col].isVisited = true;
        this.setState({ grid: newGrid });
      }, 25 * i);
    }
  };

  animatePath = (nodeOrder) => {
    var finishNode = nodeOrder[nodeOrder.length - 1];
    while (true) {
      const node = finishNode.previousNode;
      const newGrid = this.state.grid.slice();
      newGrid[node.row][node.col].isPath = true;
      if (node.row === START_ROW && node.col === START_COL) {
        break;
      }
      finishNode = node;
      this.setState({ grid: newGrid });
    }
  };

  handleMouseDown(row, col) {
    const newGrid = wallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  handleMouseEnter(row, col) {
    if (this.state.mouseIsPressed) {
      const newGrid = wallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  render() {
    return (
      <>
        <button onClick={() => this.visualizeDijkstras()}>
          Visualize Dijkstras Algorithm
        </button>
        <div className="grid">
          {this.state.grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    col,
                    row,
                    isWall,
                    isStart,
                    isFinish,
                    isVisited,
                    isPath,
                  } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isWall={isWall}
                      isStart={isStart}
                      isFinish={isFinish}
                      isVisited={isVisited}
                      isPath={isPath}
                      onMouseDown={this.handleMouseDown.bind(this)}
                      onMouseUp={this.handleMouseUp.bind(this)}
                      onMouseEnter={this.handleMouseEnter.bind(this)}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const createNode = (row, col) => {
  return {
    col,
    row,
    isStart: row === START_ROW && col === START_COL,
    isFinish: row === FINISH_ROW && col === FINISH_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    minHeapPos: 0,
    isPath: false,
  };
};

function wallToggled(grid, row, col) {
  var val = grid[row][col].isWall;
  grid[row][col].isWall = !val;
  return grid;
}

export default PathfindingVisualizer;
