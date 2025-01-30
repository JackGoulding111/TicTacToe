import React from 'react';
import './App.css';

function App() {
  const renderButton = (i) => {
    return <button className="grid-button" key={i}>_</button>;
  };

  const renderGrid = () => {
    let grid = [];
    for (let row = 0; row < 3; row++) {
      let buttons = [];
      for (let col = 0; col < 3; col++) {
        buttons.push(renderButton(row * 3 + col));
      }
      grid.push(<div className="grid-row" key={row}>{buttons}</div>);
    }
    return grid;
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
// hello