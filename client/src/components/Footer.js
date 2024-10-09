import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Terms from './Terms.js'; 
import Privacy from './Privacy.js'; 

const Footer = () => {
    return (
        <footer className="foot h-25">
            <div className="container text-center">
                <p>
                    <Link to="/terms" className="text-white">
                        <i className="bi bi-file-earmark-text"></i> Terms & Conditions
                    </Link> | 
                    <Link to="/privacy" className="text-white">
                        <i className="bi bi-shield-lock"></i> Privacy Policy
                    </Link>
                </p>
                <div className="contact-form d-flex justify-content-end">
                    <input type="email" placeholder="Enter your email address" className='email-input mx-1' />
                    <button type="submit" className='send-button'>Send</button>
                </div>
                <div className="social-icons my-2">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-google"></i>
                    <i className="fab fa-linkedin"></i>
                </div>
                <marquee behavior="alternate">
                    <p>&copy; 2024 LearnByDoing. All rights reserved.</p>
                </marquee>
            </div>
        </footer>
    );
};

export default Footer;
