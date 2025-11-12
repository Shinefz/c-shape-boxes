import React, { useEffect, useRef, useState } from 'react';
import './BoxGrid.css';

export default function BoxGrid({ count = 9 }) {
  const [colors, setColors] = useState(Array(count).fill('red'));
  const [clickOrder, setClickOrder] = useState([]);
  const [isReverting, setIsReverting] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setColors(Array(count).fill('red'));
    setClickOrder([]);
    setIsReverting(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [count]);

  const handleClick = (i) => {
    if (isReverting) return;
    if (colors[i] === 'green') return;
  
    const nextColors = [...colors];
    nextColors[i] = 'green';
    const nextOrder = [...clickOrder, i];
  
    setColors(nextColors);
    setClickOrder(nextOrder);
  
    const allGreen = nextColors.every((c) => c === 'green');
    if (allGreen && nextOrder.length === count) {
      startRevert(nextOrder);
    }
  };
  
  const startRevert = (order) => {

    setIsReverting(true);
    const reverseOrder = [...order].reverse();

    let idx = -1;
  
    const timer = setInterval(() => {
      setColors((prev) => {
        const updated = [...prev];
        updated[reverseOrder[idx]] = 'red';
        return updated;
      });
  
      idx++;
      if (idx >= reverseOrder.length) {
        clearInterval(timer);
        intervalRef.current = null;
        setIsReverting(false);
        setClickOrder([]);
      }
    }, 1000);
  
    intervalRef.current = timer;
  };
  
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const top = Math.ceil(count / 3);
  const bottom = top;
  const side = count - (top + bottom);

  const boxes = Array.from({ length: count }, (_, i) => i);
  let index = 0;

  const topBoxes = boxes.slice(index, index + top);
  index += top;
  const sideBoxes = boxes.slice(index, index + side);
  index += side;
  const bottomBoxes = boxes.slice(index, index + bottom);

  return (
    <div className="box-grid-container">
      <div className="row top-row">
        {topBoxes.map((i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            className={`box ${colors[i]} ${isReverting ? 'reverting' : ''}`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="side-column">
        {sideBoxes.map((i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            className={`box ${colors[i]} ${isReverting ? 'reverting' : ''}`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="row bottom-row">
        {bottomBoxes.map((i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            className={`box ${colors[i]} ${isReverting ? 'reverting' : ''}`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="status">
        {isReverting
          ? '🔄 Reverting...'
          : `✅ ${clickOrder.length}/${count} boxes clicked`}
      </div>
    </div>
  );
}