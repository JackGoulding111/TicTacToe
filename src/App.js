import React, { useState } from 'react';
import './App.css';

function App() {
  const [grid, setGrid] = useState(Array(9).fill('_'));

  const handleClick = (i) => {
    const newGrid = grid.slice();
    newGrid[i] = 'O';
    setGrid(newGrid);
  };

  const renderButton = (i) => {
    return (
      <button className="grid-button" key={i} onClick={() => handleClick(i)}>
        {grid[i]}
      </button>
    );
  };

  const renderGrid = () => {
    let gridRows = [];
    for (let row = 0; row < 3; row++) {
      let buttons = [];
      for (let col = 0; col < 3; col++) {
        buttons.push(renderButton(row * 3 + col));
      }
      gridRows.push(<div className="grid-row" key={row}>{buttons}</div>);
    }
    return gridRows;
  };

  return (
    <div className="App">
      <div className="grid-container">
        {renderGrid()}
      </div>
    </div>
  );
}

export default App;