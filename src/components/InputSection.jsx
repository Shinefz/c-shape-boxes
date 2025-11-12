import React, { useState } from 'react';
import '../App.css';

export default function InputSection({ onValidInput }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const validateInput = () => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 5 || num > 25) {
      setError('Please enter a number between 5 and 25');
    } else {
      setError('');
      onValidInput(num);
    }
  };

  return (
    <div className="input-wrapper">
      <input
        type="number"
        value={value}
        placeholder="Enter number (5–25)"
        onChange={(e) => setValue(e.target.value)}
        onWheel={(e) => e.target.blur()}
        onKeyDown={(e) => {
          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
          }
        }}
      />
      <button onClick={validateInput}>Generate</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}