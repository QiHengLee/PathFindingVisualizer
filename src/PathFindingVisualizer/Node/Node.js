import React from "react";

import "./Node.css";

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: this.props.isStart,
      isFinish: this.props.isFinish,
    };
  }

  render() {
    // const { isStart, isFinish } = this.props;
    console.log(this.isStart);
    const colorName = this.isFinish
      ? "node-finish"
      : this.isStart
      ? "node-start"
      : "";
    return <div className={`node ${colorName}`}></div>;
  }
}

export default Node;
