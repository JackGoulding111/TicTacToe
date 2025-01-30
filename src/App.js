import React, { useState } from 'react';
import './App.css';

function App() {
  // State to manage the grid, current player, winner, and AI mode
  const [grid, setGrid] = useState(Array(9).fill('_'));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isAIMode, setIsAIMode] = useState(false);

  // Handle a cell click
  const handleClick = (i) => {
    // If there's a winner or the cell is already filled, do nothing
    if (winner || grid[i] !== '_') return;

    // Update the grid with the current player's move
    const newGrid = grid.slice();
    newGrid[i] = isXNext ? 'X' : 'O';
    setGrid(newGrid);

    // Check for a winner
    const calculatedWinner = calculateWinner(newGrid);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
      return;
    }

    // If AI mode is enabled, make the AI move
    if (isAIMode) {
      const aiMove = getAIMove(newGrid);
      if (aiMove !== null) {
        newGrid[aiMove] = 'O';
        setGrid(newGrid);

        const aiWinner = calculateWinner(newGrid);
        if (aiWinner) {
          setWinner(aiWinner);
        }
      }
    } else {
      // Switch to the other player
      setIsXNext(!isXNext);
    }
  };

  // Calculate the winner of the game
  const calculateWinner = (grid) => {
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (grid[a] !== '_' && grid[a] === grid[b] && grid[a] === grid[c]) {
        return grid[a];
      }
    }
    return null;
  };

  // Get the AI's move
  const getAIMove = (grid) => {
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

    // Check if AI can win
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (grid[a] === 'O' && grid[a] === grid[b] && grid[c] === '_') return c;
      if (grid[a] === 'O' && grid[a] === grid[c] && grid[b] === '_') return b;
      if (grid[b] === 'O' && grid[b] === grid[c] && grid[a] === '_') return a;
    }

    // Check if AI needs to block player
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (grid[a] === 'X' && grid[a] === grid[b] && grid[c] === '_') return c;
      if (grid[a] === 'X' && grid[a] === grid[c] && grid[b] === '_') return b;
      if (grid[b] === 'X' && grid[b] === grid[c] && grid[a] === '_') return a;
    }

    // Otherwise, pick a random empty cell
    const emptyCells = grid.map((val, idx) => val === '_' ? idx : null).filter(val => val !== null);
    if (emptyCells.length > 0) {
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    return null;
  };

  // Render a button for each cell in the grid
  const renderButton = (i) => {
    return (
      <button className="grid-button" key={i} onClick={() => handleClick(i)}>
        {grid[i]}
      </button>
    );
  };

  // Render the grid
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

  // Reset the game
  const resetGame = () => {
    setGrid(Array(9).fill('_'));
    setIsXNext(true);
    setWinner(null);
  };

  // Toggle AI mode and reset the game
  const toggleAIMode = () => {
    setIsAIMode(!isAIMode);
    resetGame();
  };

  return (
    <div className="App">
      <div className="grid-container">
        {renderGrid()}
      </div>
      {winner && <div className="winner">Winner: {winner}</div>}
      <button className="reset-button" onClick={resetGame}>Reset</button>
      <button className="ai-button" onClick={toggleAIMode}>
        {isAIMode ? 'Play a friend instead' : 'Play an AI instead'}
      </button>
    </div>
  );
}

export default App;