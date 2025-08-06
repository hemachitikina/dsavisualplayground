import React, { useState } from 'react';
import './LinkedListVisualizer.css';

function LinkedListVisualizer() {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const insertFront = () => {
    if (inputValue === '') return;
    setList([inputValue, ...list]);
    setMessage(`Inserted ${inputValue} at front`);
    setInputValue('');
  };

  const insertRear = () => {
    if (inputValue === '') return;
    setList([...list, inputValue]);
    setMessage(`Inserted ${inputValue} at rear`);
    setInputValue('');
  };

  const deleteFront = () => {
    if (list.length === 0) {
      setMessage('List is empty!');
      return;
    }
    const removed = list[0];
    setList(list.slice(1));
    setMessage(`Deleted ${removed} from front`);
  };

  const deleteRear = () => {
    if (list.length === 0) {
      setMessage('List is empty!');
      return;
    }
    const removed = list[list.length - 1];
    setList(list.slice(0, -1));
    setMessage(`Deleted ${removed} from rear`);
  };

  const peekFront = () => {
    if (list.length === 0) {
      setMessage('List is empty!');
    } else {
      setMessage(`Front value is ${list[0]}`);
    }
  };

  const peekRear = () => {
    if (list.length === 0) {
      setMessage('List is empty!');
    } else {
      setMessage(`Rear value is ${list[list.length - 1]}`);
    }
  };

  const resetList = () => {
    setList([]);
    setMessage('List reset successfully!');
  };

  return (
    <div className="linkedlist-container">
      <h2>Linked List Visualizer</h2>

      <div className="linkedlist-controls">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter value"
        />
        <button onClick={insertFront}>Insert Front</button>
        <button onClick={insertRear}>Insert Rear</button>
        <button onClick={deleteFront}>Delete Front</button>
        <button onClick={deleteRear}>Delete Rear</button>
        <button onClick={peekFront}>Peek Front</button>
        <button onClick={peekRear}>Peek Rear</button>
        <button onClick={resetList}>Reset</button>
      </div>

      <div className="linkedlist-message">{message}</div>

      <div className="linkedlist-visual">
        {list.map((value, index) => (
          <div key={index} className="list-node">
            {value}
            {index < list.length - 1 && <span className="arrow">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LinkedListVisualizer;
