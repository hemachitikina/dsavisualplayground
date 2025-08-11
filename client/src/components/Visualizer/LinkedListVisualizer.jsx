import React, { useState } from 'react';
import './LinkedListVisualizer.css';

function LinkedListVisualizer() {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [showTutorial, setShowTutorial] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const insertFront = () => {
    if (inputValue === '') {
      setMessage('Please enter a value first!');
      return;
    }
    setList([inputValue, ...list]);
    setMessage(`Inserted "${inputValue}" at front`);
    setInputValue('');
  };

  const insertRear = () => {
    if (inputValue === '') {
      setMessage('Please enter a value first!');
      return;
    }
    setList([...list, inputValue]);
    setMessage(`Inserted "${inputValue}" at rear`);
    setInputValue('');
  };

  const deleteFront = () => {
    if (list.length === 0) {
      setMessage('List is empty!');
      return;
    }
    const removed = list[0];
    setList(list.slice(1));
    setMessage(`Deleted "${removed}" from front`);
  };

  const deleteRear = () => {
    if (list.length === 0) {
      setMessage('List is empty!');
      return;
    }
    const removed = list[list.length - 1];
    setList(list.slice(0, -1));
    setMessage(`Deleted "${removed}" from rear`);
  };

  const peekFront = () => {
    if (list.length === 0) {
      setMessage('List is empty!');
    } else {
      setMessage(`Front value is "${list[0]}"`);
    }
  };

  const peekRear = () => {
    if (list.length === 0) {
      setMessage('List is empty!');
    } else {
      setMessage(`Rear value is "${list[list.length - 1]}"`);
    }
  };

  const resetList = () => {
    setList([]);
    setMessage('List reset successfully!');
  };

  const toggleTutorial = () => {
    setShowTutorial(!showTutorial);
  };

  const listSize = () => {
    setMessage(`List contains ${list.length} elements`);
  };

  return (
    <div className="linkedlist-container">
      <a href="/" className="back-button1">← Back to Dashboard</a>

      <h2>Linked List Visualizer</h2>
      
      <div className="header-controls">
        <button onClick={toggleTutorial} className="tutorial-button">
          {showTutorial ? 'Hide Tutorial' : 'Show Tutorial'}
        </button>
        <button onClick={listSize} className="size-button">
          List Size
        </button>
      </div>

      {showTutorial && (
        <div className="tutorial-section">
          <h3>Linked List Tutorial</h3>
          <p>A linked list is a linear data structure where elements are linked using pointers.</p>
          <ul>
            <li><strong>Insert Front:</strong> Adds an element at the beginning</li>
            <li><strong>Insert Rear:</strong> Adds an element at the end</li>
            <li><strong>Delete Front:</strong> Removes the first element</li>
            <li><strong>Delete Rear:</strong> Removes the last element</li>
            <li><strong>Peek Front/Rear:</strong> View first/last element without removal</li>
          </ul>
          <p>Try adding several elements and observe how the list changes!</p>
        </div>
      )}

      <div className="linkedlist-controls">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter value"
          onKeyPress={(e) => e.key === 'Enter' && insertFront()}
        />
        <div className="button-group">
          <button onClick={insertFront}>Insert Front</button>
          <button onClick={insertRear}>Insert Rear</button>
          <button onClick={deleteFront}>Delete Front</button>
          <button onClick={deleteRear}>Delete Rear</button>
          <button onClick={peekFront}>Peek Front</button>
          <button onClick={peekRear}>Peek Rear</button>
          <button onClick={resetList}>Reset</button>
        </div>
      </div>

      <div className="linkedlist-message">{message}</div>

      <div className="linkedlist-visual">
        {list.length === 0 ? (
          <div className="empty-list">List is empty. Add some elements!</div>
        ) : (
          list.map((value, index) => (
            <div key={index} className="list-node">
              {value}
              {index < list.length - 1 && <span className="arrow">→</span>}
            </div>
          ))
        )}
      </div>

      <div className="acknowledgement">
        <p>Developed with React | Color scheme: Bootstrap's gray palette</p>
      </div>
    </div>
  );
}

export default LinkedListVisualizer;