import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Visualizer/Navbar'; 

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
    <Router>
      <div style={{ fontFamily: 'Arial' }}>
        <Navbar />
        <div style={{ padding: '2rem' }}>
          <h1>DSA Visual Playground</h1>
          <p>Backend says: {backendMessage}</p>

          <Routes>
            <Route path="/" element={<Navigate to="/array" />} />
            <Route path="/array" element={<ArrayVisualizer />} />
            <Route path="/stack" element={<StackVisualizer />} />
            <Route path="/queue" element={<QueueVisualizer />} />
            <Route path="/linkedlist" element={<LinkedListVisualizer />} />
            <Route path="/graph" element={<GraphVisualizer />} />
            <Route path="/tree" element={<TreeVisualizer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
