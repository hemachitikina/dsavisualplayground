import React, { useEffect, useState } from 'react';
import ArrayVisualizer from './components/Visualizer/ArrayVisualizer';
import StackVisualizer from './components/Visualizer/StackVisualizer';
import QueueVisualizer from './components/Visualizer/QueueVisualizer';
import LinkedListVisualizer from './components/Visualizer/LinkedListVisualizer';
import GraphVisualizer from './components/Visualizer/GraphVisualizer';
import TreeVisualizer from './components/Visualizer/TreeVisualizer';

function App() {
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    fetch('/api/message')
      .then(res => res.text())
      .then(data => setBackendMessage(data));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>DSA Visual Playground</h1>
      <p>Backend says: {backendMessage}</p>

      <ArrayVisualizer />
      <StackVisualizer />
      <QueueVisualizer />
      <LinkedListVisualizer />
      <GraphVisualizer />
      <TreeVisualizer />
    </div>
  );
}

export default App;


