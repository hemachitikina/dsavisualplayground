import React, { useState } from 'react';
import './LinkedListVisualizer.css';

function LinkedListVisualizer() {
  const [list, setList] = useState([10, 20, 30]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isTraversing, setIsTraversing] = useState(false);

  const insertAtEnd = () => {
    const newValue = Math.floor(Math.random() * 100) + 1;
    setList([...list, newValue]);
  };

  const deleteFromEnd = () => {
    if (list.length === 0) return;
    setList(list.slice(0, -1));
  };

  const traverseList = async () => {
    setIsTraversing(true);
    for (let i = 0; i < list.length; i++) {
      setActiveIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 500)); // delay for animation
    }
    setActiveIndex(null);
    setIsTraversing(false);
  };

  return (
    <div className="linkedlist-container">
      <h2>Linked List Visualizer</h2>
      
      <div className="linkedlist">
        {list.map((value, index) => (
          <div key={index} className="node-wrapper">
            <div className={`node ${index === activeIndex ? 'active' : ''}`}>
              {value}
            </div>
            {index !== list.length - 1 && <div className="arrow">→</div>}
          </div>
        ))}
      </div>

      <div className="controls">
        <button onClick={insertAtEnd} disabled={isTraversing}>Insert at End</button>
        <button onClick={deleteFromEnd} disabled={isTraversing}>Delete from End</button>
        <button onClick={traverseList} disabled={isTraversing}>Traverse</button>
      </div>
    </div>
  );
}

export default LinkedListVisualizer;
