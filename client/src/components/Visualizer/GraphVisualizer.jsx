import React, { useState, useRef, useEffect } from 'react';
import './GraphVisualizer.css';

const GraphVisualizer = () => {
  // State management
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [visited, setVisited] = useState([]);
  const [fromNode, setFromNode] = useState('');
  const [toNode, setToNode] = useState('');
  const [startNode, setStartNode] = useState('');
  const [message, setMessage] = useState('');
  const [newNodeValue, setNewNodeValue] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragNode, setDragNode] = useState(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  
  // New state for features
  const [isDirected, setIsDirected] = useState(false);
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTraversing, setIsTraversing] = useState(false);
  const [traversalInterval, setTraversalInterval] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [traversalLevels, setTraversalLevels] = useState({});
  const [edgeTraversalOrder, setEdgeTraversalOrder] = useState({});

  // Refs
  const graphAreaRef = useRef(null);

  // Tutorial content
  const tutorialSteps = [
    {
      title: "Welcome to Graph Visualizer",
      content: "This tool helps you visualize graph algorithms like BFS and DFS with custom nodes."
    },
    {
      title: "Adding Nodes",
      content: "Enter a number or text (up to 20 nodes) and click 'Add Node' to create nodes."
    },
    {
      title: "Adding Edges",
      content: "Connect nodes by selecting them in the 'From' and 'To' dropdowns and clicking 'Add Edge'."
    },
    {
      title: "Directed Graphs",
      content: "Toggle between directed and undirected graphs using the switch. Directed edges show arrowheads."
    },
    {
      title: "Traversal Algorithms",
      content: "Select a start node and run BFS or DFS to see the traversal order."
    },
    {
      title: "Ready to Go!",
      content: "That's it! You're ready to explore graph algorithms with your custom nodes."
    }
  ];

  // Improved node positioning algorithm
  const calculateNodePositions = (nodeCount) => {
    if (nodeCount === 0) return [];
    
    const containerWidth = graphAreaRef.current?.clientWidth || 1000;
    const containerHeight = graphAreaRef.current?.clientHeight || 600;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    const nodeSize = 50;
   
    
    // For 1 node, place it in the center
    if (nodeCount === 1) {
      return [{ x: centerX, y: centerY }];
    }
    
    const positions = [];
    const radius = Math.min(containerWidth, containerHeight) * 0.35;
    
    // Different layout strategies based on node count
    if (nodeCount <= 5) {
      // Circular layout for small number of nodes
      const angleStep = (2 * Math.PI) / nodeCount;
      for (let i = 0; i < nodeCount; i++) {
        const angle = i * angleStep;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        positions.push({
          x: Math.max(nodeSize, Math.min(containerWidth - nodeSize, x)),
          y: Math.max(nodeSize, Math.min(containerHeight - nodeSize, y))
        });
      }
    } else if (nodeCount <= 12) {
      // Two concentric circles for medium number of nodes
      const innerCount = Math.ceil(nodeCount / 2);
      const outerCount = nodeCount - innerCount;
      
      // Inner circle
      const innerAngleStep = (2 * Math.PI) / innerCount;
      for (let i = 0; i < innerCount; i++) {
        const angle = i * innerAngleStep;
        const x = centerX + (radius * 0.6) * Math.cos(angle);
        const y = centerY + (radius * 0.6) * Math.sin(angle);
        positions.push({
          x: Math.max(nodeSize, Math.min(containerWidth - nodeSize, x)),
          y: Math.max(nodeSize, Math.min(containerHeight - nodeSize, y))
        });
      }
      
      // Outer circle
      const outerAngleStep = (2 * Math.PI) / outerCount;
      for (let i = 0; i < outerCount; i++) {
        const angle = i * outerAngleStep;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        positions.push({
          x: Math.max(nodeSize, Math.min(containerWidth - nodeSize, x)),
          y: Math.max(nodeSize, Math.min(containerHeight - nodeSize, y))
        });
      }
    } else {
      // Spiral layout for larger number of nodes
      for (let i = 0; i < nodeCount; i++) {
        const angle = i * (Math.PI * (3 - Math.sqrt(5))); // Golden angle
        const distance = radius * Math.sqrt(i / nodeCount);
        const x = centerX + distance * Math.cos(angle);
        const y = centerY + distance * Math.sin(angle);
        positions.push({
          x: Math.max(nodeSize, Math.min(containerWidth - nodeSize, x)),
          y: Math.max(nodeSize, Math.min(containerHeight - nodeSize, y))
        });
      }
    }
    
    return positions;
  };

  // Add a new node with the given value
  const handleAddNode = () => {
    if (!newNodeValue) {
      setMessage('Please enter a value for the node');
      return;
    }

    if (nodes.length >= 20) {
      setMessage('Maximum limit of 20 nodes reached');
      return;
    }

    if (nodes.some(node => node.id === newNodeValue)) {
      setMessage(`Node with value ${newNodeValue} already exists`);
      return;
    }

    const nodeSize = 50;
    const newPositions = calculateNodePositions(nodes.length + 1);
    
    const updatedNodes = nodes.map((node, index) => ({
      ...node,
      x: newPositions[index].x,
      y: newPositions[index].y
    }));

    const newNode = {
      id: newNodeValue,
      x: newPositions[nodes.length].x,
      y: newPositions[nodes.length].y,
      width: nodeSize,
      height: nodeSize
    };

    setNodes([...updatedNodes, newNode]);
    setMessage(`Added node ${newNodeValue}`);
    setNewNodeValue('');
  };

  // Rearrange nodes when container resizes
  useEffect(() => {
    const handleResize = () => {
      if (nodes.length > 0) {
        const newPositions = calculateNodePositions(nodes.length);
        const updatedNodes = nodes.map((node, index) => ({
          ...node,
          x: newPositions[index].x,
          y: newPositions[index].y
        }));
        setNodes(updatedNodes);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [nodes.length,nodes]);
  // Add a new edge
  const handleAddEdge = () => {
    if (!fromNode || !toNode) {
      setMessage('Please select both from and to nodes');
      return;
    }
    
    if (fromNode === toNode) {
      setMessage('Cannot create edge from a node to itself');
      return;
    }
    
    const edgeExists = edges.some(edge => 
      (edge.from === fromNode && edge.to === toNode) ||
      (!isDirected && edge.from === toNode && edge.to === fromNode)
    );
    
    if (edgeExists) {
      setMessage(`Edge between ${fromNode} and ${toNode} already exists`);
      return;
    }
    
    setEdges([...edges, { from: fromNode, to: toNode }]);
    setMessage(`Added ${isDirected ? 'directed' : 'undirected'} edge between ${fromNode} and ${toNode}`);
    setFromNode('');
    setToNode('');
  };

  // Build adjacency list for traversal
  const buildAdjList = () => {
    const adjList = {};
    nodes.forEach(node => {
      adjList[node.id] = [];
    });
    edges.forEach(edge => {
      adjList[edge.from].push(edge.to);
      if (!isDirected) {
        adjList[edge.to].push(edge.from);
      }
    });
    return adjList;
  };

  // Reset traversal visualization
  const resetTraversal = () => {
    setVisited([]);
    setTraversalOrder([]);
    setCurrentStep(0);
    setTraversalLevels({});
    setEdgeTraversalOrder({});
    if (traversalInterval) {
      clearInterval(traversalInterval);
      setTraversalInterval(null);
    }
    setIsTraversing(false);
  };

  // Step through traversal
  const stepTraversal = (forward = true) => {
    if (traversalOrder.length === 0) return;
    
    let newStep = forward ? currentStep + 1 : currentStep - 1;
    newStep = Math.max(0, Math.min(newStep, traversalOrder.length));
    
    setCurrentStep(newStep);
    setVisited(traversalOrder.slice(0, newStep));
  };

  // Start/pause traversal animation
  const toggleTraversal = () => {
    if (isTraversing) {
      clearInterval(traversalInterval);
      setTraversalInterval(null);
      setIsTraversing(false);
    } else {
      if (currentStep >= traversalOrder.length) {
        setCurrentStep(0);
        setVisited([]);
      }
      
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= traversalOrder.length) {
            clearInterval(interval);
            setIsTraversing(false);
            return prev;
          }
          setVisited(traversalOrder.slice(0, prev + 1));
          return prev + 1;
        });
      }, 500);
      
      setTraversalInterval(interval);
      setIsTraversing(true);
    }
  };

  // Animate traversal
  const animateTraversal = (order, levels = {}, edgeOrder = {}) => {
    resetTraversal();
    setTraversalOrder(order);
    setTraversalLevels(levels);
    setEdgeTraversalOrder(edgeOrder);
    setMessage(`Running ${Object.keys(edgeOrder).length > 0 ? 'BFS' : 'DFS'} starting from ${startNode}`);
    
    // Start the traversal automatically
    toggleTraversal();
  };

  // Depth-first search
  const handleDFS = () => {
    if (!startNode) {
      setMessage('Please select a start node for DFS');
      return;
    }
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

  // Breadth-first search
  const handleBFS = () => {
    if (!startNode) {
      setMessage('Please select a start node for BFS');
      return;
    }
    const adjList = buildAdjList();
    const visitedSet = new Set();
    const order = [];
    const queue = [startNode];
    const levels = { [startNode]: 0 };
    const edgeOrder = {};
    let orderCounter = 1;
    
    visitedSet.add(startNode);
    
    while (queue.length) {
      const node = queue.shift();
      order.push(node);
      
      for (let neighbor of adjList[node]) {
        if (!visitedSet.has(neighbor)) {
          visitedSet.add(neighbor);
          queue.push(neighbor);
          levels[neighbor] = levels[node] + 1;
          const edgeKey = isDirected ? `${node}-${neighbor}` : 
            [node, neighbor].sort().join('-');
          edgeOrder[edgeKey] = orderCounter++;
        }
      }
    }
    
    animateTraversal(order, levels, edgeOrder);
  };

  // Handle mouse down on node
  const handleNodeMouseDown = (node, e) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragNode(node);
    setStartPos({
      x: e.clientX - node.x,
      y: e.clientY - node.y
    });
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (!isDragging || !dragNode) return;
    
    const updatedNodes = nodes.map(n => {
      if (n.id === dragNode.id) {
        return {
          ...n,
          x: e.clientX - startPos.x,
          y: e.clientY - startPos.y
        };
      }
      return n;
    });
    
    setNodes(updatedNodes);
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    setDragNode(null);
  };

  // Clear the graph
  const handleClearGraph = () => {
    setNodes([]);
    setEdges([]);
    resetTraversal();
    setMessage('Graph cleared');
  };

  // Toggle directed/undirected graph
  const toggleDirected = () => {
    setIsDirected(!isDirected);
    setMessage(`Graph is now ${!isDirected ? 'directed' : 'undirected'}`);
  };

  // Get current node (for highlighting during traversal)
  const getCurrentNode = () => {
    if (currentStep > 0 && currentStep <= traversalOrder.length) {
      return traversalOrder[currentStep - 1];
    }
    return null;
  };

  // Check if an edge is in the traversal path
  const isEdgeTraversed = (from, to) => {
    const edgeKey = isDirected ? `${from}-${to}` : [from, to].sort().join('-');
    return edgeTraversalOrder[edgeKey] !== undefined;
  };

  // Get edge traversal order number
  const getEdgeOrderNumber = (from, to) => {
    const edgeKey = isDirected ? `${from}-${to}` : [from, to].sort().join('-');
    return edgeTraversalOrder[edgeKey];
  };

  // Tutorial navigation
  const nextTutorialStep = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setShowTutorial(false);
    }
  };

  const prevTutorialStep = () => {
    if (tutorialStep > 0) {
      setTutorialStep(tutorialStep - 1);
    }
  };

  return (
    <div className="graph-container">
      {showTutorial && (
        <div className="tutorial-overlay">
          <div className="tutorial-content">
            <h3>{tutorialSteps[tutorialStep].title}</h3>
            <p>{tutorialSteps[tutorialStep].content}</p>
            <div className="tutorial-nav">
              <button onClick={prevTutorialStep} disabled={tutorialStep === 0}>
                Previous
              </button>
              <button onClick={nextTutorialStep}>
                {tutorialStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}

      <a href="/" className="back-button">← Back to Dashboard</a>
      <h2 className="graph-title">Graph Visualizer (Max 20 Nodes)</h2>

      <div className="controls">
        <div className="tooltip">
          <button onClick={() => setShowTutorial(true)}>Show Tutorial</button>
          <span className="tooltiptext">Interactive walkthrough of all features</span>
        </div>

        <div className="tooltip">
          <label>
            <input 
              type="checkbox" 
              checked={isDirected} 
              onChange={toggleDirected} 
            />
            Directed Graph
          </label>
          <span className="tooltiptext">Toggle between directed and undirected graphs</span>
        </div>

        <input
          type="text"
          value={newNodeValue}
          onChange={(e) => setNewNodeValue(e.target.value)}
          placeholder="Node value"
          maxLength="10"
        />

        <button 
          onClick={handleAddNode}
          disabled={!newNodeValue || nodes.length >= 20}
        >
          Add Node
        </button>

        <select 
          id="fromNode"
          value={fromNode} 
          onChange={e => setFromNode(e.target.value)}
          disabled={nodes.length === 0}
        >
          <option value="">From Node</option>
          {nodes.map(node => (
            <option key={`from-${node.id}`} value={node.id}>{node.id}</option>
          ))}
        </select>

        <select 
          id="toNode"
          value={toNode} 
          onChange={e => setToNode(e.target.value)}
          disabled={nodes.length === 0}
        >
          <option value="">To Node</option>
          {nodes.map(node => (
            <option key={`to-${node.id}`} value={node.id}>{node.id}</option>
          ))}
        </select>

        <button 
          id="addEdge"
          onClick={handleAddEdge}
          disabled={!fromNode || !toNode}
        >
          Add Edge
        </button>

        <select 
          id="startNode"
          value={startNode} 
          onChange={e => setStartNode(e.target.value)}
          disabled={nodes.length === 0}
        >
          <option value="">Start Node</option>
          {nodes.map(node => (
            <option key={`start-${node.id}`} value={node.id}>{node.id}</option>
          ))}
        </select>

        <button 
          id="runDFS"
          onClick={handleDFS}
          disabled={!startNode}
        >
          Run DFS
        </button>

        <button 
          id="runBFS"
          onClick={handleBFS}
          disabled={!startNode}
        >
          Run BFS
        </button>

        <button 
          onClick={handleClearGraph}
          disabled={nodes.length === 0}
        >
          Clear Graph
        </button>
      </div>

      {traversalOrder.length > 0 && (
        <div className="algorithm-controls">
          <button onClick={() => stepTraversal(false)} disabled={currentStep <= 0}>
            Step Back
          </button>
          <button onClick={toggleTraversal}>
            {isTraversing ? 'Pause' : currentStep >= traversalOrder.length ? 'Restart' : 'Play'}
          </button>
          <button onClick={() => stepTraversal(true)} disabled={currentStep >= traversalOrder.length}>
            Step Forward
          </button>
          <button onClick={resetTraversal}>Reset</button>
          <span>Step: {currentStep}/{traversalOrder.length}</span>
        </div>
      )}

      <div className="input-builder">
        <p id="statusMessage" className="status-message">{message}</p>
      </div>

      <div className="zoom-controls">
        <span>Nodes: {nodes.length}/20 | Edges: {edges.length}</span>
      </div>

      <div 
        className="graph-area" 
        id="graphArea"
        ref={graphAreaRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="graph-content">
          {edges.map((edge, index) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            
            if (!fromNode || !toNode) return null;
            
            // Calculate positions for the line to connect the node borders exactly
            const fromRadius = fromNode.width / 2;
            const toRadius = toNode.width / 2;
            
            // Calculate the angle between the nodes
            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            const angle = Math.atan2(dy, dx);
            
            // Calculate start and end points on the node borders
            const startX = fromNode.x + fromRadius * Math.cos(angle);
            const startY = fromNode.y + fromRadius * Math.sin(angle);
            const endX = toNode.x - toRadius * Math.cos(angle);
            const endY = toNode.y - toRadius * Math.sin(angle);
            
            // Calculate line length and angle for styling
            const lineLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            const lineAngle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
            
            // Check if edge is traversed
            const isTraversed = isEdgeTraversed(edge.from, edge.to);
            const edgeOrder = getEdgeOrderNumber(edge.from, edge.to);
            
            return (
              <React.Fragment key={`edge-${edge.from}-${edge.to}-${index}`}>
                <div
                  className={`edge-line ${isDirected ? 'directed' : ''} ${isTraversed ? 'traversed' : ''}`}
                  style={{
                    position: 'absolute',
                    left: `${startX}px`,
                    top: `${startY}px`,
                    width: `${lineLength}px`,
                    height: '2px',
                    transform: `rotate(${lineAngle}deg)`,
                    transformOrigin: '0 0',
                    backgroundColor: isTraversed ? '#4CAF50' : 
                                      isDirected ? '#6c757d' : '#9ca3af',
                    zIndex: 1
                  }}
                />
                {isTraversed && (
                  <div 
                    className="traversal-level"
                    style={{
                      left: `${(startX + endX) / 2}px`,
                      top: `${(startY + endY) / 2}px`,
                    }}
                  >
                    {edgeOrder}
                  </div>
                )}
              </React.Fragment>
            );
          })}
          
          {nodes.map(node => {
            const isVisited = visited.includes(node.id);
            const isCurrent = getCurrentNode() === node.id;
            const level = traversalLevels[node.id];
            
            return (
              <React.Fragment key={`node-${node.id}`}>
                <div
                  className={`graph-node ${isVisited ? 'visited' : ''} ${isCurrent ? 'current' : ''}`}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: `${node.width}px`,
                    height: `${node.height}px`,
                    fontSize: `${Math.min(18, node.width * 0.4)}px`,
                    lineHeight: `${node.height}px`,
                    transform: `translate(-50%, -50%)`,
                    backgroundColor: isCurrent ? '#FFC107' : 
                                      isVisited ? '#4CAF50' : '#6c757d',
                    zIndex: isDragging && dragNode?.id === node.id ? 100 : 2
                  }}
                  onMouseDown={(e) => handleNodeMouseDown(node, e)}
                >
                  {node.id}
                </div>
                {level !== undefined && (
                  <div 
                    className="traversal-level"
                    style={{
                      left: `${node.x}px`,
                      top: `${node.y - node.height / 2 - 15}px`,
                    }}
                  >
                    L{level}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GraphVisualizer;