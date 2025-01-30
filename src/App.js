import React, { useState } from 'react';
import './App.css';

function App() {
  // fills buttons with '_'
  const [grid, setGrid] = useState(Array(9).fill('_'));
  // determines which player's turn it is
  const [isXNext, setIsXNext] = useState(true);

  // function to handle button clicks
  const handleClick = (i) => {
    const newGrid = grid.slice(); // creates copy of grid
    if (newGrid[i] === '_') { 
      newGrid[i] = isXNext ? 'X' : 'O'; 
      setGrid(newGrid); 
      setIsXNext(!isXNext); // toggle the player
    }
  };

  // function to render button
  const renderButton = (i) => {
    return (
      <button className="grid-button" key={i} onClick={() => handleClick(i)}>
        {grid[i]} {/* Display the value of the cell */}
      </button>
    );
  };

  // function to render grid
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
        {renderGrid()} {/* Render the grid */}
      </div>
    </div>
  );
}

export default App;