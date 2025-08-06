import React, { useState } from "react";
import "./QueueVisualizer.css";

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [highlightFront, setHighlightFront] = useState(false);
  const [message, setMessage] = useState("");

  const handleEnqueue = () => {
    if (inputValue === "") {
      setMessage("Please enter a value to enqueue.");
      return;
    }
    setQueue((prev) => [...prev, inputValue]);
    setMessage(`Enqueued: "${inputValue}"`);
    setInputValue("");
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setMessage("Queue is empty. Nothing to dequeue.");
      return;
    }
    const dequeued = queue[0];
    setQueue((prev) => prev.slice(1));
    setMessage(`Dequeued: "${dequeued}"`);
  };

  const handlePeek = () => {
    if (queue.length === 0) {
      setMessage("Queue is empty. Nothing to peek.");
      return;
    }
    const frontItem = queue[0];
    setHighlightFront(true);
    setMessage(`Peeked: "${frontItem}"`);
    setTimeout(() => setHighlightFront(false), 1000);
  };

  const handleReset = () => {
    setQueue([]);
    setMessage("Queue has been reset.");
  };

  return (
    <div className="queue-container">
      <a href="/" className="back-button2">← Back to Dashboard</a>

      <h2>Queue Visualizer (FIFO)</h2>

      <div className="queue-controls">
        <input
          type="text"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleEnqueue}>Enqueue</button>
        <button onClick={handleDequeue}>Dequeue</button>
        <button onClick={handlePeek}>Peek</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="queue-message">{message}</div>

      <div className="queue-visual">
        {queue.map((item, index) => {
          const isFront = index === 0;
          return (
            <div
              key={index}
              className={`queue-item ${isFront && highlightFront ? "highlight" : ""}`}
            >
              {isFront && <span className="front-label">FRONT</span>}
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QueueVisualizer;
