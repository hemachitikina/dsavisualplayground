import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">DSA Visual Playground</h1>
      <div className="card-grid">
        <Link to="/array" className="card">
          <h2>Array</h2>
          <p>Insert, delete, search and sort operations</p>
        </Link>
        <Link to="/stack" className="card">
          <h2>Stack</h2>
          <p>Push, pop, and peek with visual animation</p>
        </Link>
        <Link to="/queue" className="card">
          <h2>Queue</h2>
          <p>Enqueue, dequeue and front-rear highlights</p>
        </Link>
        <Link to="/linkedlist" className="card">
          <h2>Linked List</h2>
          <p>Insert/delete at front or rear, and peek</p>
        </Link>
        <Link to="/graph" className="card">
          <h2>Graph</h2>
          <p>Create nodes and edges, visualize paths</p>
        </Link>
        <Link to="/tree" className="card">
          <h2>Tree</h2>
          <p>Insert, traverse and display structured trees</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
