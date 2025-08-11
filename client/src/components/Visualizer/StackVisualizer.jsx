import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./StackVisualizer.css";

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [highlightTop, setHighlightTop] = useState(false);
  const [message, setMessage] = useState("");
  const [showTutorial, setShowTutorial] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  const handlePush = () => {
    if (!inputValue.trim()) {
      setMessage("Please enter a value to push.");
      return;
    }
    setStack((prev) => [...prev, inputValue]);
    setMessage(`Pushed: "${inputValue}"`);
    setInputValue("");
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setMessage("Stack is empty. Nothing to pop.");
      return;
    }
    const popped = stack[stack.length - 1];
    setStack((prev) => prev.slice(0, -1));
    setMessage(`Popped: "${popped}"`);
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      setMessage("Stack is empty. Nothing to peek.");
      return;
    }
    const top = stack[stack.length - 1];
    setHighlightTop(true);
    setMessage(`Peeked: "${top}"`);
    setTimeout(() => setHighlightTop(false), 1000 / animationSpeed);
  };

  const handleReset = () => {
    setStack([]);
    setMessage("Stack has been reset.");
  };

  const handleSpeedChange = (e) => {
    setAnimationSpeed(parseFloat(e.target.value));
  };

  return (
    <div className="stack-container">
      <Link to="/" className="back-button">← Back to Dashboard</Link>

      <h2>Stack Visualizer (LIFO)</h2>
      
      <div className="speed-control">
        <label htmlFor="speed">Animation Speed:</label>
        <input
          id="speed"
          type="range"
          min="0.5"
          max="3"
          step="0.5"
          value={animationSpeed}
          onChange={handleSpeedChange}
        />
        <span>{animationSpeed}x</span>
      </div>

      <div className="stack-controls">
        <input
          type="text"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handlePush()}
        />
        <button onClick={handlePush}>Push</button>
        <button onClick={handlePop}>Pop</button>
        <button onClick={handlePeek}>Peek</button>
        <button onClick={handleReset}>Reset</button>
        <button 
          className="tutorial-button"
          onClick={() => setShowTutorial(!showTutorial)}
        >
          {showTutorial ? "Hide Tutorial" : "Show Tutorial"}
        </button>
      </div>

      <div className="stack-message">{message}</div>

      {showTutorial && (
        <div className="tutorial-section">
          <h3>Stack Tutorial</h3>
          <p>
            A stack is a Last-In-First-Out (LIFO) data structure. Imagine a stack of plates - 
            the last plate you put on top is the first one you take off.
          </p>
          <ul>
            <li><strong>Push</strong>: Adds an element to the top of the stack</li>
            <li><strong>Pop</strong>: Removes and returns the top element</li>
            <li><strong>Peek</strong>: Views the top element without removing it</li>
            <li><strong>Reset</strong>: Clears the entire stack</li>
          </ul>
          <p>
            Try pushing several values, then popping them to see the LIFO principle in action!
          </p>
        </div>
      )}

      <div className="stack-visual">
        {stack.length === 0 ? (
          <div className="empty-stack">Stack is empty</div>
        ) : (
          [...stack].reverse().map((item, index) => {
            const isTop = index === 0;
            return (
              <div
                key={index}
                className={`stack-item ${isTop && highlightTop ? "highlight" : ""}`}
                style={{
                  transition: `all ${0.3 / animationSpeed}s ease`
                }}
              >
                {isTop && <span className="top-label">TOP</span>}
                {item}
              </div>
            );
          })
        )}
      </div>

      <div className="stack-info">
        <p>Current stack size: {stack.length}</p>
        {stack.length > 0 && (
          <p>Top element: {stack[stack.length - 1]}</p>
        )}
      </div>
    </div>
  );
};

export default StackVisualizer;