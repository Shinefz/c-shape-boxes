import React, { useState } from 'react';
import InputSection from './components/InputSection';
import BoxGrid from './components/BoxGrid';
import './App.css';

function App() {
  const [boxCount, setBoxCount] = useState(null);
  const [layout, setLayout] = useState('c-shape');

  return (
    <div className="app">
      <h1>Interactive Boxes</h1>

      <InputSection
        onValidInput={setBoxCount}
        onToggleLayout={() =>
          setLayout((prev) => (prev === 'grid' ? 'c-shape' : 'grid'))
        }
        isCLayout={layout === 'c-shape'}
      />

      {boxCount && <BoxGrid count={boxCount} layout={layout} />}
    </div>
  );
}

export default App;