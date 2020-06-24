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
    dijkstras(grid, grid[START_ROW][START_COL], grid[FINISH_ROW][FINISH_COL]);
  }

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
                const { col, row, isWall, isStart, isFinish } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    row={row}
                    isWall={isWall}
                    isStart={isStart}
                    isFinish={isFinish}
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
  };
};

export default PathfindingVisualizer;
