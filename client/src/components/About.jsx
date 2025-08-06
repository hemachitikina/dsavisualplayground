import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
  return (
    <div className="page-container">
      <Link to="/" className="back-button">← Back to Dashboard</Link>
      <h1>About DSA Visual Playground</h1>
      <p>
        Welcome to <strong>DSA Visual Playground</strong>! Inspired by tools like
        VisuAlgo and Algorithm Visualizer, this platform helps you explore common
        data structures and algorithms interactively
      </p>
      <ul>
        <li>Visualize structures: Arrays, Stacks, Queues, Linked Lists, Trees.</li>
        <li>Interactive controls: Insert, Delete, Peek, Shuffle, Search, Traversals.</li>
        <li>Step-by-step animations to build algorithm intuition.</li>
      </ul>
      <p>
        Our goal is to help you learn by seeing—by making invisible algorithmics
        visible, just like academic and educational platforms do.
      </p>
    </div>
  );
}

export default About;
