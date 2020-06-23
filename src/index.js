import React from 'react';
import ReactDOM from 'react-dom';
import PathfindingVisualizer from './PathFindingVisualizer/PathfindingVisualizer';

class App extends React.Component {
    //React says that we have to define render
    render() {
        return (<PathfindingVisualizer></PathfindingVisualizer>);
    }
}

ReactDOM.render(
    <App />, 
    document.querySelector('#root')
);