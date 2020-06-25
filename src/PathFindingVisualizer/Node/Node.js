import React from "react";

import "./Node.css";

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isStart, isFinish, isVisited } = this.props;
    // console.log(this.state.isVisited);
    const colorName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isVisited
      ? "node-visited"
      : "";

    return <div className={`node ${colorName}`}></div>;
  }
}

export default Node;
