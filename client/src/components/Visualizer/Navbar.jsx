import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">DSA Visual Playground</h2>
      <ul className="navbar-links">
        <li><NavLink to="/array" className={({ isActive }) => isActive ? "active" : ""}>Array</NavLink></li>
        <li><NavLink to="/stack" className={({ isActive }) => isActive ? "active" : ""}>Stack</NavLink></li>
        <li><NavLink to="/queue" className={({ isActive }) => isActive ? "active" : ""}>Queue</NavLink></li>
        <li><NavLink to="/linkedlist" className={({ isActive }) => isActive ? "active" : ""}>Linked List</NavLink></li>
        <li><NavLink to="/graph" className={({ isActive }) => isActive ? "active" : ""}>Graph</NavLink></li>
        <li><NavLink to="/tree" className={({ isActive }) => isActive ? "active" : ""}>Tree</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
