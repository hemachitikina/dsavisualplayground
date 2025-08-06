import React, { useState } from "react";
import "./StackVisualizer.css";

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [highlightTop, setHighlightTop] = useState(false);
  const [message, setMessage] = useState(""); // NEW

  const handlePush = () => {
    if (inputValue === "") {
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
    const topItem = stack[stack.length - 1];
    setHighlightTop(true);
    setMessage(`Peeked: "${topItem}"`);
    setTimeout(() => setHighlightTop(false), 1000);
  };

  const handleReset = () => {
    setStack([]);
    setMessage("Stack has been reset.");
  };

  return (
    <div className="stack-container">
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

      {/* Message */}
      <div className="stack-message">{message}</div>

      {/* Stack visual */}
      <div className="stack-visual">
        {[...stack].reverse().map((item, index) => {
          const isTop = index === 0; // After reverse, index 0 is top
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
