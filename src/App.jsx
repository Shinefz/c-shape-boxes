import React, { useState } from 'react';
import InputSection from './components/InputSection';
import BoxGrid from './components/BoxGrid';
import './App.css';

function App() {
  const [boxCount, setBoxCount] = useState(null);

  return (
    <div className="app">
      <h1>Interactive Boxes</h1>

      <InputSection
        onValidInput={setBoxCount}
      />

      {boxCount && <BoxGrid count={boxCount} />}
    </div>
  );
}

export default App;