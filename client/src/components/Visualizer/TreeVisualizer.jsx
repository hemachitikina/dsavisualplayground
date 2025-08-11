import React, { useState, useMemo, useRef, useEffect } from "react";
import "./TreeVisualizer.css";

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const TreeVisualizer = () => {
  const [tree, setTree] = useState(null);
  const [treeInput, setTreeInput] = useState("");
  const [traversalResult, setTraversalResult] = useState("");
  const [treeType, setTreeType] = useState("");
  const [treeHeight, setTreeHeight] = useState(0);
  const [message, setMessage] = useState('');
  const [activeTraversal, setActiveTraversal] = useState(null);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const treeContainerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  
  // New features state
  const [showTutorial, setShowTutorial] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(800);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [showNodeValues, setShowNodeValues] = useState(true);
  const [showBalanceInfo, setShowBalanceInfo] = useState(false);
  const [showNodePath, setShowNodePath] = useState(false);
  const [nodePath, setNodePath] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const updateSize = () => {
      if (treeContainerRef.current) {
        setContainerSize({
          width: treeContainerRef.current.offsetWidth,
          height: treeContainerRef.current.offsetHeight
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const insertNode = (value, node) => {
    if (!node) return new TreeNode(value);
    
    if (value < node.value) {
      node.left = insertNode(value, node.left);
    } else if (value > node.value) {
      node.right = insertNode(value, node.right);
    } else {
      return node;
    }
    
    return node;
  };

  const loadTree = () => {
    if (!treeInput.trim()) {
      setMessage("Please enter values");
      return;
    }
    
    const values = treeInput.split(",")
      .map(s => s.trim())
      .filter(s => s !== "")
      .map(s => parseInt(s))
      .filter(n => !isNaN(n));
    
    if (!values.length) {
      setMessage("No valid numbers found");
      return;
    }

    let newTree = null;
    let duplicates = 0;
    values.forEach(v => {
      const prevSize = JSON.stringify(newTree)?.length || 0;
      newTree = insertNode(v, newTree);
      const newSize = JSON.stringify(newTree)?.length || 0;
      if (newSize === prevSize) duplicates++;
    });

    setTree(newTree);
    setMessage(duplicates > 0 
      ? `Loaded ${values.length - duplicates} nodes (${duplicates} duplicates ignored)`
      : `Loaded ${values.length} nodes`);
    setTraversalResult("");
    setActiveTraversal(null);
    setSearchResult("");
    setNodePath([]);
    detectTreeType(newTree);
  };

  const clearInput = () => {
    setTreeInput("");
    setMessage("Input cleared");
  };

  const resetTree = () => {
    setTree(null);
    setTreeInput("");
    setTraversalResult("");
    setTreeType("");
    setTreeHeight(0);
    setMessage("Tree has been reset");
    setActiveTraversal(null);
    setHighlightedNodes([]);
    setSearchResult("");
    setNodePath([]);
  };

  // Traversal methods remain the same
  const inOrder = (node, res = []) => {
    if (!node) return;
    inOrder(node.left, res);
    res.push(node.value);
    inOrder(node.right, res);
    return res;
  };

  const preOrder = (node, res = []) => {
    if (!node) return;
    res.push(node.value);
    preOrder(node.left, res);
    preOrder(node.right, res);
    return res;
  };

  const postOrder = (node, res = []) => {
    if (!node) return;
    postOrder(node.left, res);
    postOrder(node.right, res);
    res.push(node.value);
    return res;
  };

  const animateTraversal = (nodes, traversalType) => {
    setHighlightedNodes([]);
    setActiveTraversal(traversalType);
    
    nodes.forEach((node, index) => {
      setTimeout(() => {
        setHighlightedNodes(prev => [...prev, node]);
      }, index * (1000 - animationSpeed));
    });
  };

  const handleTraversal = (type) => {
    if (!tree) {
      setMessage("Tree is empty");
      return;
    }
    
    let result = [];
    if (type === "inorder") result = inOrder(tree);
    else if (type === "preorder") result = preOrder(tree);
    else if (type === "postorder") result = postOrder(tree);
    
    setTraversalResult(result.join(", "));
    animateTraversal(result, type);
  };

  // New feature: Search for a value in the tree
  const searchTree = () => {
    if (!tree) {
      setMessage("Tree is empty");
      return;
    }
    
    const value = parseInt(searchValue);
    if (isNaN(value)) {
      setMessage("Please enter a valid number to search");
      return;
    }

    const path = [];
    let current = tree;
    let found = false;

    while (current) {
      path.push(current.value);
      if (value === current.value) {
        found = true;
        break;
      } else if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (found) {
      setSearchResult(`Found ${value} in ${path.length} steps`);
      setNodePath(path);
      animateTraversal(path, "search");
    } else {
      setSearchResult(`Value ${value} not found in tree`);
      setNodePath([]);
    }
  };

  // // New feature: Get path to a node
  // const getNodePath = (value) => {
  //   const path = [];
  //   let current = tree;
    
  //   while (current) {
  //     path.push(current.value);
  //     if (value === current.value) {
  //       return path;
  //     } else if (value < current.value) {
  //       current = current.left;
  //     } else {
  //       current = current.right;
  //     }
  //   }
  //   return [];
  // };

  // Enhanced tree type detection
  const detectTreeType = (currentTree) => {
    if (!currentTree) {
      setTreeType("");
      setTreeHeight(0);
      return;
    }

    let isFull = true;
    let isComplete = true;
    let isPerfect = true;
    let isBalanced = true;
    let leafLevel = -1;

    const height = (node) => {
      if (!node) return 0;
      return 1 + Math.max(height(node.left), height(node.right));
    };

    const checkProperties = (node, level = 0) => {
      if (!node) return true;

      if (!node.left && !node.right) {
        if (leafLevel === -1) {
          leafLevel = level;
        } else if (level !== leafLevel) {
          isPerfect = false;
        }
      }

      if ((node.left && !node.right) || (!node.left && node.right)) {
        isFull = false;
      }

      if ((node.left && !node.right) && level < leafLevel - 1) {
        isComplete = false;
      }
      if (!node.left && node.right) {
        isComplete = false;
      }

      const left = checkProperties(node.left, level + 1);
      const right = checkProperties(node.right, level + 1);

      if (Math.abs(height(node.left) - height(node.right)) > 1) {
        isBalanced = false;
      }

      return left && right;
    };

    const finalHeight = height(currentTree);
    checkProperties(currentTree);
    setTreeHeight(finalHeight);

    let result = [];
    if (isFull) result.push("Full");
    if (isComplete) result.push("Complete");
    if (isPerfect) result.push("Perfect");
    if (isBalanced) result.push("Balanced");

    setTreeType(result.length ? result.join(" | ") : "Basic Binary Tree");
    setShowBalanceInfo(!isBalanced);
  };

  const calculateTreeLayout = useMemo(() => {
    if (!tree) return { positions: [], connections: [], width: containerSize.width, height: containerSize.height };

    const calculatePositions = (node, level = 0, pos = 0, minPos = 0) => {
      if (!node) return { positions: [], connections: [], width: 0, height: 0, minPos };

      const left = calculatePositions(node.left, level + 1, pos - 1.5, minPos);
      const right = calculatePositions(node.right, level + 1, pos + 1.5, left.minPos);

      const x = (pos - left.minPos) * 80 * zoomLevel + containerSize.width / 2;
      const y = level * 100 * zoomLevel + 50;

      const connections = [];
      if (node.left) {
        connections.push({
          x1: x + 25,
          y1: y + 25,
          x2: left.positions[0].x + 25,
          y2: left.positions[0].y + 25,
          value: node.value
        });
      }
      if (node.right) {
        connections.push({
          x1: x + 25,
          y1: y + 25,
          x2: right.positions[0].x + 25,
          y2: right.positions[0].y + 25,
          value: node.value
        });
      }

      return {
        positions: [
          { value: node.value, x, y },
          ...left.positions,
          ...right.positions
        ],
        connections: [
          ...connections,
          ...left.connections,
          ...right.connections
        ],
        width: Math.max(left.width, right.width, x + 50),
        height: Math.max(left.height, right.height, y + 50),
        minPos: right.minPos
      };
    };

    const layout = calculatePositions(tree);

    const minX = Math.min(...layout.positions.map(p => p.x));
    const maxX = Math.max(...layout.positions.map(p => p.x));
    const minY = Math.min(...layout.positions.map(p => p.y));
    const maxY = Math.max(...layout.positions.map(p => p.y));

    layout.width = Math.max(maxX - minX + 200, containerSize.width);
    layout.height = Math.max(maxY - minY + 200, containerSize.height);

    const xOffset = (layout.width - (maxX - minX)) / 2 - minX;
    layout.positions.forEach(pos => {
      pos.x += xOffset;
    });
    layout.connections.forEach(conn => {
      conn.x1 += xOffset;
      conn.x2 += xOffset;
    });

    return layout;
  }, [tree, containerSize, zoomLevel]);

  const renderTree = () => {
    if (!tree) return (
      <div className="empty-tree-message">
        Tree is empty. Add nodes to visualize.
      </div>
    );

    return (
      <div className="tree-canvas-container" ref={treeContainerRef}>
        <div 
          className="tree-canvas" 
          style={{
            width: `${calculateTreeLayout.width}px`,
            height: `${calculateTreeLayout.height}px`,
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top left'
          }}
        >
          <svg 
            className="tree-svg" 
            width={calculateTreeLayout.width}
            height={calculateTreeLayout.height}
          >
            {calculateTreeLayout.connections.map((conn, index) => {
              const isPath = showNodePath && nodePath.includes(conn.value);
              return (
                <line
                  key={`conn-${index}`}
                  x1={conn.x1}
                  y1={conn.y1}
                  x2={conn.x2}
                  y2={conn.y2}
                  stroke={isPath ? "#ff5722" : "#6c757d"}
                  strokeWidth={isPath ? "3" : "2"}
                  strokeDasharray={isPath ? "5,3" : "none"}
                />
              );
            })}
          </svg>
          
          {calculateTreeLayout.positions.map((node, index) => {
            const isHighlighted = highlightedNodes.includes(node.value);
            const isPathNode = showNodePath && nodePath.includes(node.value);
            let highlightClass = "";
            
            if (isHighlighted) {
              highlightClass = activeTraversal === "inorder" ? "inorder-highlight" :
                            activeTraversal === "preorder" ? "preorder-highlight" :
                            activeTraversal === "postorder" ? "postorder-highlight" :
                            activeTraversal === "search" ? "search-highlight" : "";
            }

            return (
              <div
                key={`node-${index}`}
                className={`tree-node ${highlightClass} ${isPathNode ? "path-node" : ""}`}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  display: showNodeValues ? "flex" : "none"
                }}
                title={`Value: ${node.value}`}
              >
                {node.value}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="tree-visualizer-container">
      <div className="header-section">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back to Dashboard
        </button>
        <h2>Binary Tree Visualizer</h2>
        <button className="reset-button" onClick={resetTree}>
          Reset Tree
        </button>
      </div>

      {showTutorial && (
        <div className="tutorial-section">
          <h3>How to use this visualizer:</h3>
          <ol>
            <li>Enter comma-separated numbers (e.g., "5,3,7,2,4,6,8")</li>
            <li>Click "Load Tree" to build your binary search tree</li>
            <li>Use traversal buttons to see different tree traversals</li>
            <li>Search for specific values in the tree</li>
            <li>Explore tree properties and characteristics</li>
          </ol>
          <button onClick={() => setShowTutorial(false)}>Got it! Hide tutorial</button>
        </div>
      )}

      <div className="controls-container">
        <div className="input-builder">
          <p className="status-message">{message}</p>
          <div className="input-group">
            <label>Load Tree (comma separated):</label>
            <input
              type="text"
              value={treeInput}
              placeholder="e.g. 3,6,7"
              onChange={e => setTreeInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && loadTree()}
            />
          </div>
          <div className="button-group">
            <button onClick={loadTree}>Load Tree</button>
            <button onClick={clearInput}>Clear Input</button>
          </div>
        </div>

        <div className="feature-buttons">
          <div className="traversal-buttons">
            <button onClick={() => handleTraversal("inorder")}>In-order</button>
            <button onClick={() => handleTraversal("preorder")}>Pre-order</button>
            <button onClick={() => handleTraversal("postorder")}>Post-order</button>
          </div>

          <div className="search-group">
            <input
              type="number"
              value={searchValue}
              placeholder="Search value"
              onChange={e => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchTree()}
            />
            <button onClick={searchTree}>Search</button>
          </div>
        </div>

        <div className="settings-panel">
          <div className="setting">
            <label>Animation Speed:</label>
            <input
              type="range"
              min="100"
              max="1000"
              value={1000 - animationSpeed}
              onChange={(e) => setAnimationSpeed(1000 - e.target.value)}
            />
            <span>{Math.round((1000 - animationSpeed)/100)}x</span>
          </div>

          <div className="setting">
            <label>Zoom:</label>
            <input
              type="range"
              min="50"
              max="150"
              value={zoomLevel * 100}
              onChange={(e) => setZoomLevel(e.target.value / 100)}
            />
            <span>{zoomLevel.toFixed(1)}x</span>
          </div>

          <div className="toggle-buttons">
            <button 
              onClick={() => setShowNodeValues(!showNodeValues)}
              className={showNodeValues ? "active" : ""}
            >
              {showNodeValues ? "Hide Values" : "Show Values"}
            </button>
            <button 
              onClick={() => setShowNodePath(!showNodePath)}
              className={showNodePath ? "active" : ""}
            >
              {showNodePath ? "Hide Path" : "Show Path"}
            </button>
            {showBalanceInfo && (
              <button 
                onClick={() => setShowBalanceInfo(false)}
                className="warning"
              >
                Balance Warning
              </button>
            )}
          </div>
        </div>
      </div>

      {renderTree()}

      <div className="output-section">
        <div className="output-item">
          <h3>Traversal Result:</h3>
          <p>{traversalResult || "No traversal performed yet"}</p>
        </div>
        
        <div className="output-item">
          <h3>Search Result:</h3>
          <p>{searchResult || "No search performed yet"}</p>
          {nodePath.length > 0 && (
            <p className="path-display">Path: {nodePath.join(" → ")}</p>
          )}
        </div>

        <div className="output-item">
          <h3>Tree Properties:</h3>
          <p><strong>Type:</strong> {treeType || "No tree created yet"}</p>
          <p><strong>Height:</strong> {treeHeight || "0"}</p>
          {showBalanceInfo && (
            <p className="warning-text">Warning: This tree is not balanced</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreeVisualizer;