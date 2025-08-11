import React, { useState, useRef } from 'react';
import './ArrayVisualizer.css';
import { Link } from 'react-router-dom';

function ArrayVisualizer() {
  const [array, setArray] = useState([10, 30, 20, 5, 40]);
  const [message, setMessage] = useState('');
  const [isSorting, setIsSorting] = useState(false);
  const [searchIndex, setSearchIndex] = useState(null);
  const [speed, setSpeed] = useState(300);
  const [customInput, setCustomInput] = useState("");
  const [showTutorial, setShowTutorial] = useState(false);
  const [pseudocode, setPseudocode] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [deleteValue, setDeleteValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const shouldContinue = useRef(true);

  const delay = ms => new Promise(resolve => {
    if (!isPaused) {
      setTimeout(resolve, ms);
    } else {
      const interval = setInterval(() => {
        if (!isPaused) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    }
  });

  const updateArray = async (newArray, delayMs = speed) => {
    setArray([...newArray]);
    setCurrentStep(prev => prev + 1);
    await delay(delayMs);
  };

  // Tutorial content
  const tutorialContent = [
    { title: "Welcome", content: "Visualize array operations and sorting algorithms." },
    { title: "Loading Arrays", content: "Enter comma-separated numbers to load custom arrays." },
    { title: "Basic Operations", content: "Delete or search for elements. Shuffle to randomize." },
    { title: "Sorting", content: "Try different sorting algorithms with visualizations." },
    { title: "Controls", content: "Adjust speed, pause/resume, or stop sorting anytime." },
    { title: "Features", content: "Hover over bars for values. Found elements highlight green." }
  ];

  // Algorithm pseudocodes
  const algorithmPseudocode = {
    bubbleSort: `Bubble Sort:
for i from 0 to n-1:
  for j from 0 to n-i-2:
    if arr[j] > arr[j+1]:
      swap arr[j] and arr[j+1]`,
    insertionSort: `Insertion Sort:
for i from 1 to n-1:
  key = arr[i]
  j = i-1
  while j >= 0 and arr[j] > key:
    arr[j+1] = arr[j]
    j = j-1
  arr[j+1] = key`,
    selectionSort: `Selection Sort:
for i from 0 to n-1:
  min_idx = i
  for j from i+1 to n:
    if arr[j] < arr[min_idx]:
      min_idx = j
  swap arr[i] and arr[min_idx]`,
    mergeSort: `Merge Sort:
if length <= 1: return
mid = length / 2
left = mergeSort(arr[0..mid])
right = mergeSort(arr[mid..end])
merge(left, right)`,
    quickSort: `Quick Sort:
if left >= right: return
pivot = partition(arr, left, right)
quickSort(arr, left, pivot-1)
quickSort(arr, pivot+1, right)`,
    heapSort: `Heap Sort:
Build max heap from array
for i from n-1 down to 1:
  swap arr[0] and arr[i]
  heapify(arr, i, 0)`
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    setMessage(isPaused ? 'Resumed' : 'Paused');
  };

  const stopSorting = () => {
    shouldContinue.current = false;
    setIsSorting(false);
    setIsPaused(false);
    setMessage('Sorting stopped');
  };

  const resetArray = () => {
    setArray([10, 30, 20, 5, 40]);
    setMessage('Array reset to default');
    setSearchIndex(null);
    setCurrentStep(0);
    setPseudocode('');
    setDeleteValue('');
    setSearchValue('');
  };

  const shuffleArray = () => {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    setArray(shuffled);
    setMessage('Array shuffled.');
    setCurrentStep(prev => prev + 1);
  };

  const handleDelete = () => {
    const num = Number(deleteValue);
    if (!isNaN(num)) {
      const index = array.indexOf(num);
      if (index !== -1) {
        const newArray = [...array];
        newArray.splice(index, 1);
        setArray(newArray);
        setMessage(`Deleted ${num} successfully.`);
        setCurrentStep(prev => prev + 1);
        setDeleteValue('');
      } else {
        setMessage(`${num} not found.`);
      }
    } else {
      setMessage('Invalid input.');
    }
  };

  const handleSearch = () => {
    const num = Number(searchValue);
    if (!isNaN(num)) {
      const index = array.indexOf(num);
      if (index !== -1) {
        setSearchIndex(index);
        setMessage(`${num} found at index ${index}.`);
      } else {
        setSearchIndex(null);
        setMessage(`${num} not found.`);
      }
      setCurrentStep(prev => prev + 1);
    } else {
      setMessage('Invalid input.');
    }
  };

  const loadCustomArray = () => {
    const parsed = customInput
      .split(",")
      .map(str => parseFloat(str.trim()))
      .filter(num => !isNaN(num));
    if (parsed.length > 0) {
      setArray(parsed);
      setMessage("Loaded custom array!");
      setCurrentStep(0);
    } else {
      setMessage("Invalid input. Please enter comma-separated numbers.");
    }
  };

  const addToArray = () => {
    const num = parseFloat(customInput.trim());
    if (!isNaN(num)) {
      setArray([...array, num]);
      setMessage(`Added ${num} to array`);
      setCurrentStep(prev => prev + 1);
      setCustomInput("");
    } else {
      setMessage("Please enter a valid number");
    }
  };

  const resetCustomInput = () => {
    setCustomInput("");
    setMessage("Input field cleared.");
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    setMessage('Bubble Sort started...');
    setPseudocode(algorithmPseudocode.bubbleSort);
    shouldContinue.current = true;
    let arr = [...array];
    
    for (let i = 0; i < arr.length && shouldContinue.current; i++) {
      for (let j = 0; j < arr.length - i - 1 && shouldContinue.current; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          await updateArray(arr);
        }
        if (!shouldContinue.current) break;
      }
      if (!shouldContinue.current) break;
    }
    
    if (shouldContinue.current) {
      setMessage('Bubble Sort completed.');
    }
    setIsSorting(false);
    setIsPaused(false);
  };

  const insertionSort = async () => {
    setIsSorting(true);
    setMessage('Insertion Sort started...');
    setPseudocode(algorithmPseudocode.insertionSort);
    shouldContinue.current = true;
    let arr = [...array];
    
    for (let i = 1; i < arr.length && shouldContinue.current; i++) {
      let key = arr[i];
      let j = i - 1;
      
      while (j >= 0 && arr[j] > key && shouldContinue.current) {
        arr[j + 1] = arr[j];
        await updateArray(arr);
        j--;
        if (!shouldContinue.current) break;
      }
      
      arr[j + 1] = key;
      await updateArray(arr);
      if (!shouldContinue.current) break;
    }
    
    if (shouldContinue.current) {
      setMessage('Insertion Sort completed.');
    }
    setIsSorting(false);
    setIsPaused(false);
  };

  const selectionSort = async () => {
    setIsSorting(true);
    setMessage('Selection Sort started...');
    setPseudocode(algorithmPseudocode.selectionSort);
    shouldContinue.current = true;
    let arr = [...array];
    
    for (let i = 0; i < arr.length - 1 && shouldContinue.current; i++) {
      let minIndex = i;
      
      for (let j = i + 1; j < arr.length && shouldContinue.current; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
        if (!shouldContinue.current) break;
      }
      
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        await updateArray(arr);
      }
      if (!shouldContinue.current) break;
    }
    
    if (shouldContinue.current) {
      setMessage('Selection Sort completed.');
    }
    setIsSorting(false);
    setIsPaused(false);
  };

  const mergeSort = async () => {
    setIsSorting(true);
    setMessage('Merge Sort started...');
    setPseudocode(algorithmPseudocode.mergeSort);
    shouldContinue.current = true;

    const merge = async (left, right) => {
      let result = [], i = 0, j = 0;
      
      while (i < left.length && j < right.length && shouldContinue.current) {
        if (left[i] < right[j]) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
        if (!shouldContinue.current) break;
      }
      
      return [...result, ...left.slice(i), ...right.slice(j)];
    };

    const sort = async (arr) => {
      if (arr.length <= 1 || !shouldContinue.current) return arr;
      const mid = Math.floor(arr.length / 2);
      const left = await sort(arr.slice(0, mid));
      const right = await sort(arr.slice(mid));
      const merged = await merge(left, right);
      await updateArray(merged);
      return merged;
    };

    const sorted = await sort(array);
    if (shouldContinue.current) {
      setArray(sorted);
      setMessage('Merge Sort completed.');
    }
    setIsSorting(false);
    setIsPaused(false);
  };

  const quickSort = async () => {
    setIsSorting(true);
    setMessage('Quick Sort started...');
    setPseudocode(algorithmPseudocode.quickSort);
    shouldContinue.current = true;

    const partition = async (arr, low, high) => {
      let pivot = arr[high];
      let i = low - 1;
      
      for (let j = low; j < high && shouldContinue.current; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          await updateArray(arr);
        }
        if (!shouldContinue.current) break;
      }
      
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      await updateArray(arr);
      return i + 1;
    };

    const sort = async (arr, low, high) => {
      if (low < high && shouldContinue.current) {
        let pi = await partition(arr, low, high);
        await sort(arr, low, pi - 1);
        await sort(arr, pi + 1, high);
      }
    };

    let arr = [...array];
    await sort(arr, 0, arr.length - 1);
    if (shouldContinue.current) {
      setArray(arr);
      setMessage('Quick Sort completed.');
    }
    setIsSorting(false);
    setIsPaused(false);
  };

  const heapSort = async () => {
    setIsSorting(true);
    setMessage('Heap Sort started...');
    setPseudocode(algorithmPseudocode.heapSort);
    shouldContinue.current = true;
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

    for (let i = Math.floor(arr.length / 2) - 1; i >= 0 && shouldContinue.current; i--) {
      await heapify(arr, arr.length, i);
      if (!shouldContinue.current) break;
    }

    for (let i = arr.length - 1; i > 0 && shouldContinue.current; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      await updateArray(arr);
      await heapify(arr, i, 0);
      if (!shouldContinue.current) break;
    }

    if (shouldContinue.current) {
      setArray(arr);
      setMessage('Heap Sort completed.');
    }
    setIsSorting(false);
    setIsPaused(false);
  };

  // Calculate array statistics
  const arrayStats = {
    length: array.length,
    max: Math.max(...array),
    min: Math.min(...array),
    sum: array.reduce((a, b) => a + b, 0),
    average: array.length > 0 ? (array.reduce((a, b) => a + b, 0) / array.length) : 0
  };

  return (
    <div className="array-container">
      <div className="header-section">
        <Link to="/" className="back-button">← Back to Dashboard</Link>
        <button className="tutorial-button" onClick={() => setShowTutorial(!showTutorial)}>
          {showTutorial ? 'Hide Tutorial' : 'Show Tutorial'}
        </button>
      </div>

      {showTutorial && (
        <div className="tutorial-modal">
          <h3>Array Visualizer Tutorial</h3>
          <button className="close-tutorial" onClick={() => setShowTutorial(false)}>×</button>
          <div className="tutorial-content">
            {tutorialContent.map((item, index) => (
              <div key={index} className="tutorial-item">
                <h4>{item.title}</h4>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2>Array Visualizer</h2>
      <p className="status">{message}</p>

      <div className="array-stats">
        <div><strong>Length:</strong> {arrayStats.length}</div>
        <div><strong>Max:</strong> {arrayStats.max}</div>
        <div><strong>Min:</strong> {arrayStats.min}</div>
        <div><strong>Sum:</strong> {arrayStats.sum}</div>
        <div><strong>Avg:</strong> {arrayStats.average.toFixed(2)}</div>
        <div><strong>Steps:</strong> {currentStep}</div>
      </div>

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
        {array.map((value, index) => {
          const maxVal = Math.max(...array);
          const height = Math.max((value / maxVal) * 260, 20);
          
          return (
            <div
              key={index}
              className={`array-bar ${searchIndex === index ? 'found' : ''}`}
              style={{ height: `${height}px` }}
            >
              <span className="bar-label">{value}</span>
            </div>
          );
        })}
      </div>

      <div className="control-panel">
        <div className="input-section">
          <div className="input-group">
            <label>Custom Array:</label>
            <input
              type="text"
              value={customInput}
              placeholder="e.g. 5,3,8,1 or single number"
              onChange={e => setCustomInput(e.target.value)}
              disabled={isSorting}
            />
            <button onClick={loadCustomArray} disabled={isSorting}>
              Load
            </button>
            <button onClick={addToArray} disabled={isSorting}>
              Add
            </button>
            <button onClick={resetCustomInput} disabled={isSorting}>
              Clear
            </button>
          </div>

          <div className="input-group">
            <label>Delete Value:</label>
            <input
              type="number"
              value={deleteValue}
              onChange={e => setDeleteValue(e.target.value)}
              disabled={isSorting}
            />
            <button onClick={handleDelete} disabled={isSorting}>
              Delete
            </button>
          </div>

          <div className="input-group">
            <label>Search Value:</label>
            <input
              type="number"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              disabled={isSorting}
            />
            <button onClick={handleSearch} disabled={isSorting}>
              Search
            </button>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={shuffleArray} disabled={isSorting}>Shuffle</button>
          <button onClick={resetArray} disabled={isSorting}>Reset Array</button>
        </div>

        <div className="sort-buttons">
          <button onClick={bubbleSort} disabled={isSorting}>Bubble Sort</button>
          <button onClick={insertionSort} disabled={isSorting}>Insertion Sort</button>
          <button onClick={selectionSort} disabled={isSorting}>Selection Sort</button>
          <button onClick={mergeSort} disabled={isSorting}>Merge Sort</button>
          <button onClick={quickSort} disabled={isSorting}>Quick Sort</button>
          <button onClick={heapSort} disabled={isSorting}>Heap Sort</button>
        </div>

        {isSorting && (
          <div className="sort-controls">
            <button 
              onClick={togglePause} 
              className={isPaused ? 'resume-button' : 'pause-button'}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button onClick={stopSorting} className="stop-button">Stop</button>
          </div>
        )}
      </div>

      {pseudocode && (
        <div className="pseudocode">
          <h4>Current Algorithm</h4>
          <pre>{pseudocode}</pre>
        </div>
      )}
    </div>
  );
}

export default ArrayVisualizer;