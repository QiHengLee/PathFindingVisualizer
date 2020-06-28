import React from "react";
import Node from "./Node/Node";
import { dijkstras } from "../algorithms/dijkstra";
import "./PathfindingVisualizer.css";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';

class PathfindingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      startIsPressed: false,
      finishIsPressed: false,
      start_row : Math.floor((window.innerHeight)/34/2),
      start_col : Math.floor((window.innerWidth)/26/4),
      finish_row : Math.floor((window.innerHeight)/34/2),
      finish_col : Math.floor((window.innerWidth)/26/4*3),
      width: Math.floor((window.innerWidth)/26),
      height: Math.floor((window.innerHeight)/33),
      dijkstra: false,
      dfs: false,
      bfs: false,
      a_star: false,
      average : true,
      slow : false,
      fast : false,
      speed: 25,
      progress: true,
      alertChooseAlgo: false,
      alertVisualProgress: false
    };
  }

  componentDidMount() {
    this.initializeGrid(true);
  }

  initializeGrid(clearAll) {
    const grid = [];
    for (var rows = 0; rows < this.state.height; rows++) {
      const row = [];
      for (var cols = 0; cols < this.state.width; cols++) {
        if (rows === this.state.start_row && cols === this.state.start_col) {
          row.push(createNode(rows, cols, true, false));
        }
        else if (rows === this.state.finish_row && cols === this.state.finish_col) {
          row.push(createNode(rows, cols, false, true));
        }
        else {
          if (document.getElementById(`node-${rows}-${cols}`)) {
            if(document.getElementById(`node-${rows}-${cols}`).className === "node node-wall" && !clearAll) {
              row.push(createNode(rows, cols, false, false));
              row[row.length-1].isWall = true
            }
            else {
              document.getElementById(`node-${rows}-${cols}`).className="node"
              row.push(createNode(rows, cols, false, false));
            }
          }
          else {
            row.push(createNode(rows, cols, false, false));
          }
          
        }
      }
      grid.push(row);
    }
    this.setState({ grid: grid });
  }

  chooseAlgo(algo) {
    if (algo === "dfs") {
      document.getElementById("visualizeButton").innerHTML = "Visualize Depth First Search"
      this.setState({dfs:true, bfs: false, dijkstra: false, a_star: false})
    }
    if (algo === "bfs") {
      document.getElementById("visualizeButton").innerHTML = "Visualize Breadth First Search"
      this.setState({dfs:false, bfs: true, dijkstra: false, a_star: false})
    }
    if (algo === "a_star") {
      document.getElementById("visualizeButton").innerHTML = "Visualize A*"
      this.setState({dfs:false, bfs: false, dijkstra: false, a_star: true})
    }
    if (algo === "dijkstra") {
      document.getElementById("visualizeButton").innerHTML = "Visualize Dijkstra"
      this.setState({dfs:false, bfs: false, dijkstra: true, a_star: false})
    }
  }

  chooseSpeed(speed) {
    if (speed === "average") {
      document.getElementById("speedInfo").innerHTML = "Speed : Average"
      this.setState({average : true, fast : false, slow : false, speed : 25})
    }
    else if (speed === "fast") {
      document.getElementById("speedInfo").innerHTML = "Speed : Fast"
      this.setState({average : false, fast : true, slow : false, speed : 5})
    }
    else if (speed === "slow") {
      document.getElementById("speedInfo").innerHTML = "Speed : Slow"
      this.setState({average : false, fast : false, slow : true, speed : 50})
    }
  }

  visualizeAlgo() {
    if (!this.state.progress) {
      this.setState({alertVisualProgress: true})
      return
    }
    this.initializeGrid(false)
    this.setState({
      progress: false
    }, () => {
      if (this.state.dijkstra === true) {
        this.visualizeDijkstras()
      }
      else if (this.state.a_star === true) {
        console.log("a_star")
      }
      else if (this.state.dfs === true) {
        console.log("dfs")
      }
      else if (this.state.bfs === true) {
        console.log("bfs")
      }
      else {
        this.setState({alertChooseAlgo: true, progress: true})
      }
    });
    
  }

  visualizeDijkstras() {
    const { grid } = this.state;
    const nodeOrder = dijkstras(
      grid,
      grid[this.state.start_row][this.state.start_col],
      grid[this.state.finish_row][this.state.finish_col]
    );
    this.animateMap(nodeOrder);
  }

  animateMap = (nodeOrder) => {
    for (let i = 0; i <= nodeOrder.length; i++) {
      if (i === nodeOrder.length-1) {
        setTimeout(() => {
          this.animatePath(this.getPath(nodeOrder));
        }, this.state.speed * i);
        return;
      }
      setTimeout(() => {
        const node = nodeOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className="node node-visited"
      }, this.state.speed * i);
    }
  };

  getPath(nodeOrder) {
    var finishNode = nodeOrder[nodeOrder.length-1].previousNode;
    var path = [];
    while(true) {
      if (finishNode.row === this.state.start_row && finishNode.col === this.state.start_col) {
          break;
      }
      path.push(finishNode);
      finishNode = finishNode.previousNode;
    }
    return path;
  }

  animatePath = (pathOrder) => {
    for(let i = 0; i <= pathOrder.length; i++) {
      if (i === pathOrder.length) {
        setTimeout(() => {
          this.setState({progress: true})  
        }, 50 * i);
        return
      }
      setTimeout(() => {
        const node = pathOrder[pathOrder.length-1-i]
        document.getElementById(`node-${node.row}-${node.col}`).className="node node-path"
      }, 50 * i);
    }
  };

  handleMouseDown(row, col) {
    if (this.state.grid[row][col].isStart) {
      const newGrid = this.state.grid.slice();
      newGrid[this.state.start_row][this.state.start_col].isStart = false;
      newGrid[row][col].isStart = true;
      this.setState({grid: newGrid, startIsPressed: true, start_col : col, start_row: row });  
    }
    else if (this.state.grid[row][col].isFinish) {
      const newGrid = this.state.grid.slice();
      newGrid[this.state.finish_row][this.state.finish_col].isFinish = false;
      newGrid[row][col].isFinish = true;
      this.setState({grid: newGrid, finishIsPressed: true, finish_col : col, finish_row: row });  
    }
    else {
      const newGrid = wallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });  
    }
  }

  handleMouseUp() {
    this.setState({ startIsPressed: false });
    this.setState({ mouseIsPressed: false });
    this.setState({ finishIsPressed: false });
  }

  handleMouseEnter(row, col) {
    if (this.state.startIsPressed) {
      const newGrid = this.state.grid.slice();
      newGrid[this.state.start_row][this.state.start_col].isStart = false;
      newGrid[row][col].isStart = true;
      this.setState({grid: newGrid, startIsPressed: true, start_col : col, start_row: row });  
    }
    else if (this.state.finishIsPressed) {
      const newGrid = this.state.grid.slice();
      newGrid[this.state.finish_row][this.state.finish_col].isFinish = false;
      newGrid[row][col].isFinish = true;
      this.setState({grid: newGrid, finishIsPressed: true, finish_col : col, finish_row: row });  
    }
    else if (this.state.mouseIsPressed) {
      const newGrid = wallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  clearNodes() {
    if (!this.state.progress) {
      this.setState({alertVisualProgress: true})
      return
    }
    this.setState({
      start_row : Math.floor((window.innerHeight)/34/2),
      start_col : Math.floor((window.innerWidth)/25/4),
      finish_row : Math.floor((window.innerHeight)/34/2),
      finish_col : Math.floor((window.innerWidth)/25/4*3),
    }, () => {
      this.initializeGrid(true);
    })
  }

  render() {
    console.log(this.state.alertChooseAlgo)
    return (
      <>
      <Modal show={this.state.alertChooseAlgo} onHide={() => {this.setState({alertChooseAlgo: false})}} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please choose an algorithm to visualize</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      <Modal show={this.state.alertVisualProgress} onHide={() => {this.setState({alertVisualProgress: false})}} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Visualization is in progress</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      <Navbar id="navbar" bg="light">
          <Navbar.Brand>Pathfinding Visualizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Algorithms" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => this.chooseAlgo("dijkstra")}>Dijkstra's Algorithm</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.chooseAlgo("a_star")}>A* Algorithm</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.chooseAlgo("dfs")}>Depth First Search</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.chooseAlgo("bfs")}>Breadth First Search</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Speed">
                <NavDropdown.Item onClick={() => this.chooseSpeed("slow")}>Slow</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.chooseSpeed("average")}>Average</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.chooseSpeed("fast")}>Fast</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={() => this.clearNodes()}>Clear Nodes</Nav.Link>      
              <Button id="visualizeButton" onClick={() => this.visualizeAlgo()} variant="outline-success">Choose Algorithm</Button>{' '}
              <Nav.Link id="speedInfo">Speed : Average</Nav.Link>      
            </Nav>
          </Navbar.Collapse>       
      </Navbar>
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

const createNode = (row, col, isStart, isFinish) => {
  return {
    col,
    row,
    isStart,
    isFinish,
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
