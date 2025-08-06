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
        <p>Select a data structure from the Home page (Array, Stack, Queue, Linked List, Graph, or Tree)</p>
      </section>

      <section>
        <h2>1. Array Visualizer</h2>
        <ul>
          <li>Insert/Delete elements manually.</li>
          <li>Shuffle or Reset the array.</li>
          <li>Choose a sorting algorithm and adjust the speed using the slider.</li>
          <li>Search highlights the found element in green.</li>
        </ul>
      </section>

      <section>
        <h2>2. Stack (LIFO)</h2>
        <ul>
          <li>Use Push to add an element to the top.</li>
          <li>Pop removes the top element; Peek highlights it.</li>
          <li>Reset clears all elements.</li>
          <li>Actions display acknowledgment messages.</li>
        </ul>
      </section>

      <section>
        <h2>3. Queue (FIFO)</h2>
        <ul>
          <li>Use Enqueue to add at rear, Dequeue to remove from front.</li>
          <li>Peek highlights the front element.</li>
          <li>Reset clears the queue.</li>
          <li>Notification messages update on each action.</li>
        </ul>
      </section>

      <section>
        <h2>4. Linked List</h2>
        <ul>
          <li>Insert at front or rear; delete from front or rear.</li>
          <li>Peek front or rear values.</li>
          <li>Reset rebuilds an empty list.</li>
          <li>Visual nodes are connected with arrows → indicating list flow.</li>
        </ul>
      </section>

      <section>
        <h2>5. Graph Visualizer</h2>
        <ul>
          <li>Add nodes and edges dynamically.</li>
          <li>Set a start node and perform BFS or DFS traversals.</li>
          <li>Traversal highlights visited nodes in order.</li>
          <li>Graph layouts are automatically arranged in a circular pattern.</li>
        </ul>
      </section>

      <section>
        <h2>6. Tree Visualizer</h2>
        <ul>
          <li>Insert values to build a binary tree (BST logic).</li>
          <li>Run In-order, Pre-order, and Post-order traversals.</li>
          <li>Displays traversal results, tree height, and type info (full, complete, balanced).</li>
          <li>Connected nodes visually represent parent-child relations with arrows during rendering.</li>
        </ul>
      </section>

      <section>
        <h2>🧠 Tips & Insights</h2>
        <ul>
          <li>Start with small numbers—great for understanding scale differences.</li>
          <li>Keep sorting speed low for better clarity on transitions.</li>
          <li>Peek and search actions briefly animate top/front items for emphasis.</li>
          <li>Tree visualizer calculates structural properties—ideal for learning balanced vs. unbalanced trees.</li>
        </ul>
      </section>

      <section>
        <h2>Why Visualize?</h2>
        <p>
          Visualization makes abstract operations (like algorithms and structural changes) easier to understand and remember. Seeing each step helps build both intuition and confidence. 
        </p>
      </section>
    </div>
  );
}

export default Help;
