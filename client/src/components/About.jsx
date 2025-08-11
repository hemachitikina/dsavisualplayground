import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
  return (
    <div className="page-container">
      <Link to="/" className="back-button">← Back to Dashboard</Link>
      <h1>About DSA Visual Playground</h1>
      <p>
        Welcome to <strong>DSA Visual Playground</strong>! This interactive platform helps you 
        visualize and understand fundamental data structures and algorithms through 
        intuitive animations and step-by-step execution.
      </p>
      
      <h2>Features</h2>
      <ul>
        <li><strong>Array Visualizer:</strong> Insert, delete, search, shuffle, and sort with 6 different algorithms (Bubble, Insertion, Selection, Merge, Quick, Heap)</li>
        <li><strong>Stack Visualizer:</strong> Push, pop, and peek operations with LIFO principle visualization</li>
        <li><strong>Queue Visualizer:</strong> Enqueue, dequeue, and peek operations with FIFO principle visualization</li>
        <li><strong>Linked List Visualizer:</strong> Insert/delete at front/rear and peek operations with node connections</li>
        <li><strong>Graph Visualizer:</strong> Create nodes and edges, perform BFS/DFS traversals with path highlighting</li>
        <li><strong>Tree Visualizer:</strong> Build binary trees and perform in-order, pre-order, post-order traversals</li>
      </ul>
      
      <h2>Interactive Learning</h2>
      <p>
        Each visualizer includes:
      </p>
      <ul>
        <li>Step-by-step animations with speed control</li>
        <li>Pseudocode display for algorithms</li>
        <li>Interactive tutorials and operation history</li>
        <li>Visual highlighting of current operations</li>
        <li>Comprehensive statistics and properties</li>
      </ul>
      
      <p>
        Our goal is to make abstract concepts concrete through visualization, helping you 
        develop both intuition and confidence with data structures and algorithms.
      </p>
    </div>
  );
}

export default About;