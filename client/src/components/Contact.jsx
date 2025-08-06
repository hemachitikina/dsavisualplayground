import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

function Contact() {
  return (
    <div className="page-container">
      <Link to="/" className="back-button">← Back to Dashboard</Link>
      <h1>Contact</h1>
      <p>If you’d like to get in touch, feel free to reach out:</p>
      <ul className="contact-list">
        <li><strong>Email:</strong> hemasrichitikina123@gmail.com</li>
        <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/hema-sri-chitikina-226686250/" target="_blank" rel="noopener noreferrer">click here </a></li>
        <li><strong>GitHub:</strong> <a href="https://github.com/hemachitikina" target="_blank" rel="noopener noreferrer">click here</a></li>
      </ul>
      <p>Thanks for using DSA Visual Playground—I’d love to hear your feedback or suggestions!</p>
    </div>
  );
}

export default Contact;
