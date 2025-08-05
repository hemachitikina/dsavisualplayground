import React, { useState } from 'react';
import './QueueVisualizer.css';

function QueueVisualizer() {
  const [queue, setQueue] = useState([]);
  const [animatingIndex, setAnimatingIndex] = useState(null);

  const enqueue = () => {
    const newValue = Math.floor(Math.random() * 50) + 1;
    setQueue(prev => [...prev, newValue]);
    setAnimatingIndex(queue.length);
    setTimeout(() => setAnimatingIndex(null), 300);
  };

  const dequeue = () => {
    if (queue.length === 0) return;
    setAnimatingIndex(0);
    setTimeout(() => {
      setQueue(prev => prev.slice(1));
      setAnimatingIndex(null);
    }, 300);
  };

  return (
    <div className="queue-container">
      <h2>Queue Visualizer (FIFO)</h2>
      <div className="queue">
        {queue.map((value, index) => (
          <div
            key={index}
            className={`queue-element ${index === animatingIndex ? 'animate' : ''}`}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={enqueue}>Enqueue</button>
        <button onClick={dequeue}>Dequeue</button>
      </div>
    </div>
  );
}

export default QueueVisualizer;
