import React from "react";
import Node from "./Node/Node";
import "./PathfindingVisualizer.css";

class PathfindingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  componentDidMount() {
    const nodes = [];
    for (var rows = 0; rows < 20; rows++) {
      const row = [];
      for (var cols = 0; cols < 50; cols++) {
        const currNode = {
          cols,
          rows,
          isStart: rows === 10 && cols === 5,
          isFinish: rows === 10 && cols === 45,
        };
        row.push(currNode);
      }
      nodes.push(row);
    }
    this.setState({ nodes: nodes });
  }

  render() {
    return (
      <div className="grid">
        {this.state.nodes.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((col, colIdx) => {
                const { isStart, isFinish } = col;
                return (
                  <Node
                    key={colIdx}
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

export default PathfindingVisualizer;
