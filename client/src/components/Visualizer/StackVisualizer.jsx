import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./StackVisualizer.css";

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [highlightTop, setHighlightTop] = useState(false);
  const [message, setMessage] = useState(""); // NEW

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
    setTimeout(() => setHighlightTop(false), 1000);
  };

  const handleReset = () => {
    setStack([]);
    setMessage("Stack has been reset.");
  };

  return (
    <div className="stack-container">
      {/* 🚀 Back-to-Dashboard Link */}
      <Link to="/" className="back-button">← Back to Dashboard</Link>

      <h2>Stack Visualizer (LIFO)</h2>

      <div className="stack-controls">
        <input
          type="text"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handlePush}>Push</button>
        <button onClick={handlePop}>Pop</button>
        <button onClick={handlePeek}>Peek</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="stack-message">{message}</div>

      <div className="stack-visual">
        {[...stack].reverse().map((item, index) => {
          const isTop = index === 0;
          return (
            <div
              key={index}
              className={`stack-item ${isTop && highlightTop ? "highlight" : ""}`}
            >
              {isTop && <span className="top-label">TOP</span>}
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StackVisualizer;
