import React from 'react';
import { Link } from 'react-router-dom';
// import './Footer.css';
const Footer = () => {
    return (
        <footer className="bg-light mt-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-3 mb-4 mb-md-0">
              <h3 className="h5 mb-3">LearnByDoing</h3>
              <p className="small text-muted">Empowering learners through hands-on experience and innovative education.</p>
            </div>
            <div className="col-md-3 mb-4 mb-md-0">
              <h3 className="h5 mb-3">Quick Links</h3>
              <ul className="list-unstyled">
                <li><a href="/courses" className="text-decoration-none">Courses</a></li>
                <li><a href="/about" className="text-decoration-none">About Us</a></li>
                <li><a href="/contact" className="text-decoration-none">Contact</a></li>
                {/* <li><a href="/faq" className="text-decoration-none">FAQ</a></li> */}
              </ul>
            </div>
            <div className="col-md-3 mb-4 mb-md-0">
              <h3 className="h5 mb-3">Legal</h3>
              <ul className="list-unstyled">
                <li><a href="/terms" className="text-decoration-none">Terms of Service</a></li>
                <li><a href="/privacy" className="text-decoration-none">Privacy Policy</a></li>
                {/* <li><a href="/cookies" className="text-decoration-none">Cookie Policy</a></li> */}
              </ul>
            </div>
            <div className="col-md-3">
              <h3 className="h5 mb-3">Connect With Us</h3>
              <div className="d-flex">
                <a href="#" className="me-3" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="me-3" aria-label="Twitter">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="me-3" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-top text-center small text-muted">
            © {new Date().getFullYear()} LearnByDoing. All rights reserved.
          </div>
        </div>
      </footer>  
        );
};

export default Footer;
