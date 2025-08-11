import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

function Contact() {
  return (
    <div className="page-container">
      <Link to="/" className="back-button">← Back to Dashboard</Link>
      <h1>Contact & Feedback</h1>
      
      <div className="contact-content">
        <section>
          <h2>About the Developer</h2>
          <p>
            DSA Visual Playground was created to help students and developers 
            understand data structures and algorithms through interactive visualization.
          </p>
        </section>
        
        <section>
          <h2>Get In Touch</h2>
          <p>
            I welcome your feedback, suggestions, or questions about this project.
          </p>
          <ul className="contact-list">
            <li><strong>Email:</strong> hemasrichitikina123@gmail.com</li>
            <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/hema-sri-chitikina-226686250/" target="_blank" rel="noopener noreferrer">Hema Sri Chitikina</a></li>
            <li><strong>GitHub:</strong> <a href="https://github.com/hemachitikina" target="_blank" rel="noopener noreferrer">hemachitikina</a></li>
          </ul>
        </section>
        
        <section>
          <h2>Contribute</h2>
          <p>
            This project is open to contributions! If you'd like to:
          </p>
          <ul>
            <li>Report a bug or issue</li>
            <li>Suggest a new feature or improvement</li>
            <li>Contribute code or documentation</li>
          </ul>
          <p>
            Please reach out via GitHub or email.
          </p>
        </section>
        
        <section className="acknowledgement">
          <p>
            Thank you for using DSA Visual Playground! Your feedback helps improve 
            this learning tool for everyone.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Contact;