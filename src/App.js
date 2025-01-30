import React, { useState } from 'react';
import './App.css';

function App() {
  // State to hold the current grid values
  const [grid, setGrid] = useState(Array(9).fill('_'));
  // State to determine the next player (X or O)
  const [isXNext, setIsXNext] = useState(true);
  // State to hold the winner
  const [winner, setWinner] = useState(null);

  // Function to handle a cell click
  const handleClick = (i) => {
    // Ignore clicks if there's a winner or the cell is not empty
    if (winner || grid[i] !== '_') return;

    // Create a copy of the grid and update the clicked cell
    const newGrid = grid.slice();
    newGrid[i] = isXNext ? 'X' : 'O';
    setGrid(newGrid);
    // Toggle the next player
    setIsXNext(!isXNext);

    // Check for a winner
    const calculatedWinner = calculateWinner(newGrid);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
    }
  };

  // Function to calculate the winner
  const calculateWinner = (grid) => {
    // Winning combinations
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check each winning combination
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (grid[a] !== '_' && grid[a] === grid[b] && grid[a] === grid[c]) {
        return grid[a];
      }
    }
    return null;
  };

  // Function to render a single button
  const renderButton = (i) => {
    return (
      <button className="grid-button" key={i} onClick={() => handleClick(i)}>
        {grid[i]}
      </button>
    );
  };

  // Function to render the grid
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
      {winner && <div className="winner">Winner: {winner}</div>}
    </div>
  );
}

export default App;