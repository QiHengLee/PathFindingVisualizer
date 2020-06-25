import React from "react";
import Node from "./Node/Node";
import { dijkstras } from "../algorithms/dijkstra";
import "./PathfindingVisualizer.css";

const START_ROW = 10;
const START_COL = 5;
const FINISH_ROW = 10;
const FINISH_COL = 34;

class PathfindingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      test: true,
    };
  }

  componentDidMount() {
    this.initializeGrid();
  }

  initializeGrid() {
    const grid = [];
    for (var rows = 0; rows < 20; rows++) {
      const row = [];
      for (var cols = 0; cols < 40; cols++) {
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
    // this.animatePath(nodeOrder);
  }

  testing() {
    setTimeout(() => {
      console.log("haha");
    }, 100000);
  }

  animateMap = (nodeOrder) => {
    for (let i = 0; i <= nodeOrder.length; i++) {
      if (i === nodeOrder.length) {
        setTimeout(() => {
          this.animatePath(nodeOrder);
        }, 50 * i);
        return;
      }
      setTimeout(() => {
        const node = nodeOrder[i];
        const newGrid = this.state.grid.slice();
        newGrid[node.row][node.col].isVisited = true;
        this.setState({ grid: newGrid });
      }, 50 * i);
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

  render() {
    return (
      <div className="grid">
        <button onClick={() => this.visualizeDijkstras()}>
          Visualize Dijkstras Algorithm
        </button>
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
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
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

export default PathfindingVisualizer;
