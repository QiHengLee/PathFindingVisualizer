import React from "react";

import "./Node.css";

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isVisited,
      isPath,
      isWall,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
    } = this.props;
    // console.log(this.state.isVisited);
    const colorName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : isPath
      ? "node-path"
      : isVisited
      ? "node-visited"
      : "";

    return (
      <div
        className={`node ${colorName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp()}
        onMouseEnter={() => onMouseEnter(row, col)}
      ></div>
    );
  }
}

export default Node;
