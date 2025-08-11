import React, { useState, useEffect } from "react";
import "./QueueVisualizer.css";

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [highlightFront, setHighlightFront] = useState(false);
  const [highlightRear, setHighlightRear] = useState(false);
  const [message, setMessage] = useState("");
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [operationHistory, setOperationHistory] = useState([]);

  useEffect(() => {
    if (highlightFront) {
      const timer = setTimeout(() => setHighlightFront(false), 1000 / speed);
      return () => clearTimeout(timer);
    }
    if (highlightRear) {
      const timer = setTimeout(() => setHighlightRear(false), 1000 / speed);
      return () => clearTimeout(timer);
    }
  }, [highlightFront, highlightRear, speed]);

  const handleEnqueue = () => {
    if (inputValue === "") {
      setMessage("Please enter a value to enqueue.");
      return;
    }
    setQueue((prev) => [...prev, inputValue]);
    setMessage(`Enqueued: "${inputValue}"`);
    setOperationHistory(prev => [...prev, `Enqueued: ${inputValue}`]);
    setInputValue("");
    setHighlightRear(true);
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setMessage("Queue is empty. Nothing to dequeue.");
      return;
    }
    const dequeued = queue[0];
    setQueue((prev) => prev.slice(1));
    setMessage(`Dequeued: "${dequeued}"`);
    setOperationHistory(prev => [...prev, `Dequeued: ${dequeued}`]);
    setHighlightFront(true);
  };

  const handlePeek = () => {
    if (queue.length === 0) {
      setMessage("Queue is empty. Nothing to peek.");
      return;
    }
    const frontItem = queue[0];
    setHighlightFront(true);
    setMessage(`Peeked: "${frontItem}"`);
    setOperationHistory(prev => [...prev, `Peeked: ${frontItem}`]);
  };

  const handleReset = () => {
    setQueue([]);
    setMessage("Queue has been reset.");
    setOperationHistory(prev => [...prev, "Queue reset"]);
  };

  const handleClearHistory = () => {
    setOperationHistory([]);
  };

  const toggleTutorial = () => {
    setIsTutorialOpen(!isTutorialOpen);
  };

  const isQueueEmpty = queue.length === 0;
  const isQueueFull = queue.length >= 10; // Arbitrary limit for visualization

  return (
    <div className="queue-container">
      <a href="/" className="back-button2">← Back to Dashboard</a>

      <div className="queue-header">
        <h2>Queue Visualizer (FIFO)</h2>
        <button onClick={toggleTutorial} className="tutorial-button">
          {isTutorialOpen ? "Hide Tutorial" : "Show Tutorial"}
        </button>
      </div>

      {isTutorialOpen && (
        <div className="tutorial-section">
          <h3>Queue Basics</h3>
          <p>
            A queue is a <strong>First-In-First-Out (FIFO)</strong> data structure.
            Elements are added at the <strong>rear</strong> and removed from the <strong>front</strong>.
          </p>
          <h4>Operations:</h4>
          <ul>
            <li><strong>Enqueue</strong>: Add an element to the rear of the queue</li>
            <li><strong>Dequeue</strong>: Remove an element from the front of the queue</li>
            <li><strong>Peek</strong>: View the front element without removing it</li>
          </ul>
          <h4>Visualization Tips:</h4>
          <ul>
            <li>The <span style={{color: "#ff4500"}}>FRONT</span> label shows the first element to be removed</li>
            <li>Highlighted elements indicate recent operations</li>
            <li>Try different animation speeds using the speed control</li>
          </ul>
        </div>
      )}

      <div className="queue-controls">
        <input
          type="text"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleEnqueue()}
        />
        <button 
          onClick={handleEnqueue} 
          disabled={isQueueFull}
          title={isQueueFull ? "Queue visualization limited to 10 items" : ""}
        >
          Enqueue
        </button>
        <button 
          onClick={handleDequeue} 
          disabled={isQueueEmpty}
          title={isQueueEmpty ? "Queue is empty" : ""}
        >
          Dequeue
        </button>
        <button 
          onClick={handlePeek} 
          disabled={isQueueEmpty}
          title={isQueueEmpty ? "Queue is empty" : ""}
        >
          Peek
        </button>
        <button onClick={handleReset}>Reset</button>
        
        <div className="speed-control">
          <label>Speed:</label>
          <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={4}>4x</option>
          </select>
        </div>
      </div>

      <div className="queue-message">
        {message}
        {isQueueEmpty && <span className="empty-queue"> (Queue is empty)</span>}
        {isQueueFull && <span className="full-queue"> (Queue is full)</span>}
      </div>

      <div className="queue-visual">
        {queue.length === 0 ? (
          <div className="empty-queue-placeholder">Empty Queue</div>
        ) : (
          queue.map((item, index) => {
            const isFront = index === 0;
            const isRear = index === queue.length - 1;
            return (
              <div
                key={index}
                className={`queue-item 
                  ${isFront && highlightFront ? "highlight-front" : ""}
                  ${isRear && highlightRear ? "highlight-rear" : ""}`}
              >
                {isFront && <span className="front-label">FRONT</span>}
                {isRear && <span className="rear-label">REAR</span>}
                <span className="queue-value">{item}</span>
                <span className="queue-index">[{index}]</span>
              </div>
            );
          })
        )}
      </div>

      <div className="queue-info">
        <div className="queue-stats">
          <p>Size: <strong>{queue.length}</strong></p>
          <p>Front: <strong>{queue[0] || "None"}</strong></p>
          <p>Rear: <strong>{queue[queue.length - 1] || "None"}</strong></p>
        </div>

        <div className="operation-history">
          <div className="history-header">
            <h4>Operation History</h4>
            <button onClick={handleClearHistory} className="clear-history">
              Clear
            </button>
          </div>
          <div className="history-items">
            {operationHistory.length === 0 ? (
              <p>No operations yet</p>
            ) : (
              operationHistory.slice().reverse().map((item, index) => (
                <div key={index} className="history-item">
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueVisualizer;