// TreeVisualizer.jsx
import React, { useState } from "react";
import "./TreeVisualizer.css";

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const TreeVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [traversalResult, setTraversalResult] = useState("");
  const [treeType, setTreeType] = useState("");

  const insertNode = (value) => {
    const newNode = new TreeNode(value);
    if (!root) {
      setRoot(newNode);
    } else {
      const insert = (node) => {
        if (value < node.value) {
          if (!node.left) node.left = newNode;
          else insert(node.left);
        } else {
          if (!node.right) node.right = newNode;
          else insert(node.right);
        }
      };
      insert(root);
      setRoot({ ...root });
    }

    // After insert, check tree type
    setTimeout(() => {
      detectTreeType();
    }, 0);
  };

  const handleInsert = () => {
    if (inputValue === "") return;
    insertNode(parseInt(inputValue));
    setInputValue("");
  };

  // Traversals
  const inOrder = (node, result = []) => {
    if (!node) return;
    inOrder(node.left, result);
    result.push(node.value);
    inOrder(node.right, result);
    return result;
  };

  const preOrder = (node, result = []) => {
    if (!node) return;
    result.push(node.value);
    preOrder(node.left, result);
    preOrder(node.right, result);
    return result;
  };

  const postOrder = (node, result = []) => {
    if (!node) return;
    postOrder(node.left, result);
    postOrder(node.right, result);
    result.push(node.value);
    return result;
  };

  const handleTraversal = (type) => {
    let result = [];
    if (type === "inorder") result = inOrder(root);
    else if (type === "preorder") result = preOrder(root);
    else if (type === "postorder") result = postOrder(root);
    setTraversalResult(result.join(", "));
  };

  // Tree Type Detection
  const detectTreeType = () => {
    if (!root) {
      setTreeType("");
      return;
    }

    let isFull = true;
    let isComplete = true;
    let isBalanced = true;
    let queue = [];
    queue.push(root);
    let foundNullChild = false;

    const height = (node) => {
      if (!node) return 0;
      return 1 + Math.max(height(node.left), height(node.right));
    };

    const getHeight = height(root);

    const check = (node) => {
      if (!node) return 0;
      let leftHeight = check(node.left);
      let rightHeight = check(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) isBalanced = false;
      if (node.left && !node.right) isComplete = isComplete && !foundNullChild;
      if (!node.left && node.right) isComplete = false;
      if ((node.left && !node.right) || (!node.left && node.right))
        isFull = false;
      if (!node.left || !node.right) foundNullChild = true;

      return 1 + Math.max(leftHeight, rightHeight);
    };

    check(root);

    let result = "Binary Tree";
    if (isFull) result = "Full Binary Tree";
    if (isComplete) result = result + " | Complete Binary Tree";
    if (isBalanced) result = result + " | Balanced Binary Tree";

    setTreeType(result);
  };

  // Render tree recursively
  const renderTree = (node, x = 700, y = 50, level = 1) => {
    if (!node) return null;

    const leftX = x - 150 / level;
    const rightX = x + 150 / level;
    const nextY = y + 100;

    return (
      <React.Fragment key={node.value}>
        {/* Node */}
        <div
          className="tree-node"
          style={{
            left: `${x}px`,
            top: `${y}px`,
          }}
        >
          {node.value}
        </div>

        {/* Lines */}
        {node.left && (
          <svg className="tree-line">
            <line
              x1={x + 25}
              y1={y + 25}
              x2={leftX + 25}
              y2={nextY + 25}
              stroke="#555"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
          </svg>
        )}

        {node.right && (
          <svg className="tree-line">
            <line
              x1={x + 25}
              y1={y + 25}
              x2={rightX + 25}
              y2={nextY + 25}
              stroke="#555"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
          </svg>
        )}

        {/* Children */}
        {renderTree(node.left, leftX, nextY, level + 1)}
        {renderTree(node.right, rightX, nextY, level + 1)}
      </React.Fragment>
    );
  };

  return (
    <div className="tree-visualizer-container">
      <div className="controls">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
        />
        <button onClick={handleInsert}>Insert</button>
        <button onClick={() => handleTraversal("inorder")}>In-order</button>
        <button onClick={() => handleTraversal("preorder")}>Pre-order</button>
        <button onClick={() => handleTraversal("postorder")}>Post-order</button>
      </div>

      <div className="tree-canvas">{renderTree(root)}</div>

      <div className="output-section">
        <h3>Traversal Result:</h3>
        <p>{traversalResult}</p>

        <h3>Tree Type:</h3>
        <p>{treeType}</p>
      </div>

      {/* SVG marker for arrow */}
      <svg style={{ height: 0 }}>
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,10 L10,5 z" fill="#555" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default TreeVisualizer;
