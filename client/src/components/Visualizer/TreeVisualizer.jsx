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
  const [treeHeight, setTreeHeight] = useState(0);

  const insertNode = (value) => {
    const newNode = new TreeNode(value);
    if (!root) {
      setRoot(newNode);
    } else {
      const insert = (node) => {
        if (value < node.value) {
          node.left ? insert(node.left) : (node.left = newNode);
        } else {
          node.right ? insert(node.right) : (node.right = newNode);
        }
      };
      insert(root);
      setRoot({ ...root });
    }

    setTraversalResult("");
    setTimeout(() => detectTreeType(), 0);
  };

  const handleInsert = () => {
    if (inputValue.trim() === "") return;
    insertNode(parseInt(inputValue));
    setInputValue("");
  };

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

  const handleTraversal = (type) => {
    let result = [];
    if (type === "inorder") result = inOrder(root);
    else if (type === "preorder") result = preOrder(root);
    else if (type === "postorder") result = postOrder(root);
    setTraversalResult(result.join(", "));
  };

  const detectTreeType = () => {
    if (!root) return setTreeType("");

    let isFull = true;
    let isComplete = true;
    let isBalanced = true;
    let foundNullChild = false;

    const height = (node) => {
      if (!node) return 0;
      return 1 + Math.max(height(node.left), height(node.right));
    };

    const check = (node) => {
      if (!node) return 0;
      const left = check(node.left);
      const right = check(node.right);

      if (Math.abs(left - right) > 1) isBalanced = false;
      if (node.left && !node.right) isComplete = isComplete && !foundNullChild;
      if (!node.left && node.right) isComplete = false;
      if (!node.left || !node.right) foundNullChild = true;
      if ((node.left && !node.right) || (!node.left && node.right)) isFull = false;

      return 1 + Math.max(left, right);
    };

    const finalHeight = height(root);
    check(root);
    setTreeHeight(finalHeight);

    let result = "Binary Tree";
    if (isFull) result = "Full Binary Tree";
    if (isComplete) result += " | Complete Binary Tree";
    if (isBalanced) result += " | Balanced Binary Tree";

    setTreeType(result);
  };

  const renderTree = (node, x = 700, y = 50, level = 1) => {
    if (!node) return null;
    const spacing = 150 / level;
    const leftX = x - spacing;
    const rightX = x + spacing;
    const nextY = y + 100;

    return (
      <React.Fragment key={node.value}>
        <div className="tree-node" style={{ left: `${x}px`, top: `${y}px` }}>
          {node.value}
        </div>

        {node.left && (
          <svg className="tree-line">
            <line
              x1={x + 25}
              y1={y + 25}
              x2={leftX + 25}
              y2={nextY + 25}
              stroke="#333"
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
              stroke="#333"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
          </svg>
        )}

        {renderTree(node.left, leftX, nextY, level + 1)}
        {renderTree(node.right, rightX, nextY, level + 1)}
      </React.Fragment>
    );
  };

  const handleBack = () => {
    window.history.back();
  };
const [treeInput, setTreeInput] = useState("");
const [message, setMessage] = useState('');
  return (
    <div className="tree-visualizer-container">
      <button className="back-button" onClick={handleBack}>
        ← Back to Dashboard
      </button>

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
      <div className="input-builder">
        <p className="status-message">{message}</p>
  <label>Tree Values (BST insert order):</label>
  <input
    type="text"
    value={treeInput}
    placeholder="e.g. 7,4,9,1,6"
    onChange={e => setTreeInput(e.target.value)}
  />
  <button onClick={() => {
    const values = treeInput.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    if (values.length) {
      setRoot(null);
      values.forEach(v => insertNode(v));
      setMessage("Tree loaded from input.");
    }
  }}>Load Tree</button>
</div>

      <div className="tree-canvas">{renderTree(root)}</div>

      <div className="output-section">
        <h3>Traversal Result:</h3>
        <p>{traversalResult}</p>

        <h3>Tree Type:</h3>
        <p>{treeType}</p>

        {treeHeight > 0 && (
          <>
            <h3>Tree Height:</h3>
            <p>{treeHeight}</p>
          </>
        )}
      </div>

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
            <path d="M0,0 L0,10 L10,5 z" fill="#333" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default TreeVisualizer;
