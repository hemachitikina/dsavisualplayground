import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './components/Visualizer/Home';
import ArrayVisualizer from './components/Visualizer/ArrayVisualizer';
import StackVisualizer from './components/Visualizer/StackVisualizer';
import QueueVisualizer from './components/Visualizer/QueueVisualizer';
import LinkedListVisualizer from './components/Visualizer/LinkedListVisualizer';
import GraphVisualizer from './components/Visualizer/GraphVisualizer';
import TreeVisualizer from './components/Visualizer/TreeVisualizer';
import About from './components/About';
import Help from './components/Help';
import Contact from './components/Contact';


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
        <Routes>
          <Route path="/" element={<Home backendMessage={backendMessage} />} />
          <Route path="/array" element={<ArrayVisualizer />} />
          <Route path="/stack" element={<StackVisualizer />} />
          <Route path="/queue" element={<QueueVisualizer />} />
          <Route path="/linkedlist" element={<LinkedListVisualizer />} />
          <Route path="/graph" element={<GraphVisualizer />} />
          <Route path="/tree" element={<TreeVisualizer />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />

  
        </Routes>
      </div>
    </Router>
  );
}

export default App;

