import React from 'react';
import { Link } from 'react-router-dom';
import './Help.css';

function Help() {
  return (
    <div className="page-container">
      <Link to="/" className="back-button">← Back to Dashboard</Link>
      <h1>Help & Usage Guide</h1>

      <section>
        <h2>Getting Started</h2>
        <p>Select a data structure from the Home page to begin visualization. Each visualizer has:</p>
        <ul>
          <li>Interactive controls for operations</li>
          <li>Speed adjustment for animations</li>
          <li>Status messages and statistics</li>
          <li>Tutorial/help button for guidance</li>
        </ul>
      </section>

      <section>
        <h2>Array Visualizer</h2>
        <ul>
          <li><strong>Load/Add Elements:</strong> Enter comma-separated numbers or single values</li>
          <li><strong>Basic Operations:</strong> Insert, delete, search with immediate feedback</li>
          <li><strong>Sorting:</strong> 6 algorithms with visual comparison and pseudocode</li>
          <li><strong>Controls:</strong> Pause/resume, stop, and adjust animation speed</li>
        </ul>
      </section>

      <section>
        <h2>Stack Visualizer (LIFO)</h2>
        <ul>
          <li><strong>Push:</strong> Add elements to the top of the stack</li>
          <li><strong>Pop:</strong> Remove elements from the top</li>
          <li><strong>Peek:</strong> View the top element without removal</li>
          <li>Visual indicators show stack operations clearly</li>
        </ul>
      </section>

      <section>
        <h2>Queue Visualizer (FIFO)</h2>
        <ul>
          <li><strong>Enqueue:</strong> Add elements to the rear</li>
          <li><strong>Dequeue:</strong> Remove elements from the front</li>
          <li><strong>Peek:</strong> View the front element</li>
          <li>Clear front/rear highlighting during operations</li>
        </ul>
      </section>

      <section>
        <h2>Linked List Visualizer</h2>
        <ul>
          <li>Insert/delete at both front and rear positions</li>
          <li>Visual node connections with arrow indicators</li>
          <li>Peek operations for front and rear values</li>
          <li>Interactive node manipulation</li>
        </ul>
      </section>

      <section>
        <h2>Graph Visualizer</h2>
        <ul>
          <li>Create up to 20 nodes with custom values</li>
          <li>Add directed/undirected edges between nodes</li>
          <li>BFS/DFS traversals with step-by-step highlighting</li>
          <li>Automatic node arrangement with manual dragging</li>
        </ul>
      </section>

      <section>
        <h2>Tree Visualizer</h2>
        <ul>
          <li>Build binary search trees from comma-separated values</li>
          <li>Three traversal methods with animation</li>
          <li>Tree properties detection (balanced, complete, etc.)</li>
          <li>Search functionality with path highlighting</li>
        </ul>
      </section>

      <section>
        <h2>Tips & Tricks</h2>
        <ul>
          <li>Start with small datasets (5-10 elements) for clarity</li>
          <li>Use slower speeds when learning new algorithms</li>
          <li>Pay attention to color highlights during operations</li>
          <li>Refer to pseudocode to connect visuals with logic</li>
          <li>Try different input patterns to see varied behaviors</li>
        </ul>
      </section>
    </div>
  );
}

export default Help;