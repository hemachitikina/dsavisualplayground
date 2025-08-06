import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-brand">DSA Visual Playground</div>
      <ul className="navbar-menu">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/about" ? "active" : ""}>
          <Link to="/about">About</Link>
        </li>
        <li className={location.pathname === "/help" ? "active" : ""}>
          <Link to="/help">Help</Link>
        </li>
        <li className={location.pathname === "/contact" ? "active" : ""}>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <a
            href="https://github.com/hemachitikina/dsaplayble"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
