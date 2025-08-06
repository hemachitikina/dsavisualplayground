import React, { useState } from 'react';
import './ArrayVisualizer.css';
import { Link } from 'react-router-dom';


function ArrayVisualizer() {
  const [array, setArray] = useState([10, 30, 20, 5, 40]);
  const [message, setMessage] = useState('');
  const [isSorting, setIsSorting] = useState(false);
  const [searchIndex, setSearchIndex] = useState(null);
  const [speed, setSpeed] = useState(300);

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const updateArray = async (newArray, delayMs = speed) => {
    setArray([...newArray]);
    await delay(delayMs);
  };

  const insertElement = () => {
    const input = prompt('Enter a number to insert:');
    const num = Number(input);
    if (!isNaN(num)) {
      setArray([...array, num]);
      setMessage(`Inserted ${num} successfully.`);
    } else {
      setMessage('Invalid input.');
    }
  };

  const deleteElement = () => {
    const input = prompt('Enter a number to delete:');
    const num = Number(input);
    if (!isNaN(num)) {
      const index = array.indexOf(num);
      if (index !== -1) {
        const newArray = [...array];
        newArray.splice(index, 1);
        setArray(newArray);
        setMessage(`Deleted ${num} successfully.`);
      } else {
        setMessage(`${num} not found.`);
      }
    } else {
      setMessage('Invalid input.');
    }
  };

  const shuffleArray = () => {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    setArray(shuffled);
    setMessage('Array shuffled.');
  };

  const searchElement = () => {
    const input = prompt('Enter number to search:');
    const num = Number(input);
    if (!isNaN(num)) {
      const index = array.indexOf(num);
      if (index !== -1) {
        setSearchIndex(index);
        setMessage(`${num} found at index ${index}.`);
      } else {
        setSearchIndex(null);
        setMessage(`${num} not found.`);
      }
    }
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    setMessage('Bubble Sort started...');
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          await updateArray(arr);
        }
      }
    }
    setArray(arr);
    setMessage('Bubble Sort completed.');
    setIsSorting(false);
  };

  const insertionSort = async () => {
    setIsSorting(true);
    setMessage('Insertion Sort started...');
    let arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        await updateArray(arr);
        j--;
      }
      arr[j + 1] = key;
      await updateArray(arr);
    }
    setMessage('Insertion Sort completed.');
    setIsSorting(false);
  };

  const selectionSort = async () => {
    setIsSorting(true);
    setMessage('Selection Sort started...');
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) minIndex = j;
      }
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      await updateArray(arr);
    }
    setMessage('Selection Sort completed.');
    setIsSorting(false);
  };

  const mergeSort = async () => {
    setIsSorting(true);
    setMessage('Merge Sort started...');

    const merge = async (left, right) => {
      let result = [], i = 0, j = 0;
      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
      }
      return [...result, ...left.slice(i), ...right.slice(j)];
    };

    const sort = async (arr) => {
      if (arr.length <= 1) return arr;
      const mid = Math.floor(arr.length / 2);
      const left = await sort(arr.slice(0, mid));
      const right = await sort(arr.slice(mid));
      const merged = await merge(left, right);
      await updateArray(merged);
      return merged;
    };

    const sorted = await sort(array);
    setArray(sorted);
    setMessage('Merge Sort completed.');
    setIsSorting(false);
  };

  const quickSort = async () => {
    setIsSorting(true);
    setMessage('Quick Sort started...');

    const sort = async (arr, left, right) => {
      if (left >= right) return;
      let pivot = arr[right];
      let i = left;
      for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          await updateArray(arr);
          i++;
        }
      }
      [arr[i], arr[right]] = [arr[right], arr[i]];
      await updateArray(arr);
      await sort(arr, left, i - 1);
      await sort(arr, i + 1, right);
    };

    let arr = [...array];
    await sort(arr, 0, arr.length - 1);
    setArray(arr);
    setMessage('Quick Sort completed.');
    setIsSorting(false);
  };

  const heapSort = async () => {
    setIsSorting(true);
    setMessage('Heap Sort started...');
    let arr = [...array];

    const heapify = async (arr, n, i) => {
      let largest = i;
      let l = 2 * i + 1;
      let r = 2 * i + 2;

      if (l < n && arr[l] > arr[largest]) largest = l;
      if (r < n && arr[r] > arr[largest]) largest = r;

      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        await updateArray(arr);
        await heapify(arr, n, largest);
      }
    };

    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      await heapify(arr, arr.length, i);
    }

    for (let i = arr.length - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      await updateArray(arr);
      await heapify(arr, i, 0);
    }

    setArray(arr);
    setMessage('Heap Sort completed.');
    setIsSorting(false);
  };
  

  return (
    <div className="array-container">
      <Link to="/" className="back-button">← Back to Dashboard</Link>

      <h2>Array Visualizer</h2>
      <p className="status">{message}</p>
       {/* 🕹 Speed Control Slider */}
      <div className="speed-control">
        <label>Speed: {speed}ms</label>
        <input
          type="range"
          min="50"
          max="1000"
          step="50"
          value={speed}
          disabled={isSorting}
          onChange={e => setSpeed(Number(e.target.value))}
        />
      </div>


      <div className="array-bars">
        {(() => {
  const maxVal = Math.max(...array);
  const MIN_HEIGHT = 20;
  const MAX_HEIGHT = 260;

  return array.map((value, index) => {
    const scaledHeight = (value / maxVal) * MAX_HEIGHT;
    const finalHeight = Math.max(scaledHeight, MIN_HEIGHT);

    return (
      <div
        key={index}
        className={`array-bar ${searchIndex === index ? 'found' : ''}`}
        style={{ height: `${finalHeight}px` }}
      >
        <span className='bar-label'>{value}</span>
      </div>
    );
  });
})()}

      </div>

      <div className="buttons">
        <button onClick={insertElement} disabled={isSorting}>Insert</button>
        <button onClick={deleteElement} disabled={isSorting}>Delete</button>
        <button onClick={shuffleArray} disabled={isSorting}>Shuffle</button>
        <button onClick={searchElement} disabled={isSorting}>Search</button>
        <button onClick={bubbleSort} disabled={isSorting}>Bubble Sort</button>
        <button onClick={insertionSort} disabled={isSorting}>Insertion Sort</button>
        <button onClick={selectionSort} disabled={isSorting}>Selection Sort</button>
        <button onClick={mergeSort} disabled={isSorting}>Merge Sort</button>
        <button onClick={quickSort} disabled={isSorting}>Quick Sort</button>
        <button onClick={heapSort} disabled={isSorting}>Heap Sort</button>
      </div>
    </div>
  );
}

export default ArrayVisualizer;
