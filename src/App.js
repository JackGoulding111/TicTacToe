import React, { useState } from 'react';
import './App.css';

function App() {
  const [grid, setGrid] = useState(Array(9).fill('_'));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isAIMode, setIsAIMode] = useState(false);

  const handleClick = (i) => {
    if (winner || grid[i] !== '_') return;

    const newGrid = grid.slice();
    newGrid[i] = isXNext ? 'X' : 'O';
    setGrid(newGrid);

    const calculatedWinner = calculateWinner(newGrid);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
      return;
    }

    if (isAIMode) {
      const emptyCells = newGrid.map((val, idx) => val === '_' ? idx : null).filter(val => val !== null);
      if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        newGrid[randomIndex] = 'O';
        setGrid(newGrid);

        const aiWinner = calculateWinner(newGrid);
        if (aiWinner) {
          setWinner(aiWinner);
        }
      }
    } else {
      setIsXNext(!isXNext);
    }
  };

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

  const resetGame = () => {
    setGrid(Array(9).fill('_'));
    setIsXNext(true);
    setWinner(null);
  };

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