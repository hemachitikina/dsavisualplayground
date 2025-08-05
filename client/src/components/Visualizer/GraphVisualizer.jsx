import React, { useState, useRef, useEffect } from 'react';
import './GraphVisualizer.css';

const GraphVisualizer = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeName, setNodeName] = useState('');
  const [fromNode, setFromNode] = useState('');
  const [toNode, setToNode] = useState('');
  const [positions, setPositions] = useState({});
  const [visited, setVisited] = useState([]);
  const [startNode, setStartNode] = useState('');

  const containerRef = useRef(null);

  useEffect(() => {
    const radius = 180;
    const centerX = 400;
    const centerY = 230;
    const angleStep = (2 * Math.PI) / Math.max(nodes.length, 1);
    const newPositions = {};

    nodes.forEach((node, index) => {
      const angle = index * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      newPositions[node] = { x, y };
    });

    setPositions(newPositions);
  }, [nodes]);

  const handleAddNode = () => {
    if (!nodeName || nodes.includes(nodeName)) return;
    setNodes([...nodes, nodeName]);
    setNodeName('');
  };

  const handleAddEdge = () => {
    if (fromNode && toNode && fromNode !== toNode) {
      const exists = edges.some(edge => edge.from === fromNode && edge.to === toNode);
      if (!exists) {
        setEdges([...edges, { from: fromNode, to: toNode }]);
      }
      setFromNode('');
      setToNode('');
    }
  };

  const buildAdjList = () => {
    const adjList = {};
    nodes.forEach(node => {
      adjList[node] = [];
    });
    edges.forEach(({ from, to }) => {
      adjList[from].push(to);
      adjList[to].push(from); // For undirected graph
    });
    return adjList;
  };

  const animateTraversal = (order) => {
    let i = 0;
    const visitedNodes = [];

    const interval = setInterval(() => {
      if (i >= order.length) {
        clearInterval(interval);
        return;
      }
      visitedNodes.push(order[i]);
      setVisited([...visitedNodes]);
      i++;
    }, 700);
  };

  const handleDFS = () => {
    const adjList = buildAdjList();
    const visitedSet = new Set();
    const order = [];

    const dfs = (node) => {
      if (!node || visitedSet.has(node)) return;
      visitedSet.add(node);
      order.push(node);
      for (let neighbor of adjList[node]) {
        dfs(neighbor);
      }
    };

    dfs(startNode);
    animateTraversal(order);
  };

  const handleBFS = () => {
    const adjList = buildAdjList();
    const visitedSet = new Set();
    const order = [];
    const queue = [startNode];

    while (queue.length) {
      const node = queue.shift();
      if (!visitedSet.has(node)) {
        visitedSet.add(node);
        order.push(node);
        for (let neighbor of adjList[node]) {
          if (!visitedSet.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }

    animateTraversal(order);
  };

  const calculateEdgeStyle = (from, to) => {
    const fromPos = positions[from];
    const toPos = positions[to];

    if (!fromPos || !toPos) return {};

    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    return {
      left: fromPos.x + 30,
      top: fromPos.y + 30,
      width: length,
      transform: `rotate(${angle}deg)`,
    };
  };

  return (
    <div className="graph-container">
      <h2 className="graph-title">Graph Visualizer</h2>

      <div className="controls">
        <input value={nodeName} onChange={e => setNodeName(e.target.value)} placeholder="Node Name" />
        <button onClick={handleAddNode}>Add Node</button>

        <input value={fromNode} onChange={e => setFromNode(e.target.value)} placeholder="From" />
        <input value={toNode} onChange={e => setToNode(e.target.value)} placeholder="To" />
        <button onClick={handleAddEdge}>Add Edge</button>

        <input value={startNode} onChange={e => setStartNode(e.target.value)} placeholder="Start Node" />
        <button onClick={handleDFS}>Run DFS</button>
        <button onClick={handleBFS}>Run BFS</button>
      </div>

      <div className="graph-visualization" ref={containerRef}>
        {edges.map((edge, index) => (
          <div
            key={index}
            className="edge-line"
            style={{
              ...calculateEdgeStyle(edge.from, edge.to),
              animation: 'drawEdge 0.8s ease-out forwards',
            }}
          ></div>
        ))}

        {nodes.map((node) => (
          <div
            key={node}
            className={`graph-node ${visited.includes(node) ? 'visited' : ''}`}
            style={{
              left: `${positions[node]?.x}px`,
              top: `${positions[node]?.y}px`,
            }}
          >
            {node}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphVisualizer;
