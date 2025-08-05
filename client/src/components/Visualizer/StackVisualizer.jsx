import React, { useState } from 'react';
import './StackVisualizer.css';

function StackVisualizer() {
  const [stack, setStack] = useState([]);
  const [animatingIndex, setAnimatingIndex] = useState(null);

  const pushElement = () => {
    const newValue = Math.floor(Math.random() * 50) + 1;
    setStack(prev => [...prev, newValue]);
    setAnimatingIndex(stack.length);
    setTimeout(() => setAnimatingIndex(null), 300);
  };

  const popElement = () => {
    if (stack.length === 0) return;
    setAnimatingIndex(stack.length - 1);
    setTimeout(() => {
      setStack(prev => prev.slice(0, -1));
      setAnimatingIndex(null);
    }, 300);
  };

  return (
    <div className="stack-container">
      <h2>Stack Visualizer (LIFO)</h2>
      <div className="stack">
        {stack.map((value, index) => (
          <div
            key={index}
            className={`stack-element ${index === animatingIndex ? 'animate' : ''}`}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={pushElement}>Push</button>
        <button onClick={popElement}>Pop</button>
      </div>
    </div>
  );
}

export default StackVisualizer;
