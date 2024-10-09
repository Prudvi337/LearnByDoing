// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'
const Footer = () => {
  return (
    <footer className="py-4 foot">
    <div className="container text-center">
     <marquee> <p>© 2024 LearnByDoing. All rights reserved.</p></marquee>
      <p>
        <Link to="/terms" className="text-white">
          <i className="bi bi-file-earmark-text"></i> Terms of Service
        </Link> | 
        <Link to="/privacy" className="text-white">
          <i className="bi bi-shield-lock"></i> Privacy
        </Link>
      </p>
    </div>
  </footer>

  );
};

export default Footer;
