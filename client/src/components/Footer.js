import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
const Footer = () => {
    return (
        <footer className="foot">
            <marquee behavior="alternate">
                <p>&copy; 2024 LearnByDoing. All rights reserved.</p>
            </marquee>
            <div className="container text-center">
                <p>
                    <Link to="/terms" className="text-black link-hover">
                        <i className="bi bi-file-earmark-text"></i> Terms & Conditions
                    </Link> |
                    <Link to="/privacy" className="text-black link-hover">
                        <i className="bi bi-shield-lock"></i> Privacy Policy
                    </Link>
                </p><div className="contact-form d-flex justify-content-end">
                    <input type="email" placeholder="Enter your email address" className='email-input mx-1' />
                    <button type="submit" className='send-button'>Send</button>
                </div>
                <div className="social-icons my-2">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-google"></i>
                    <i className="fab fa-linkedin"></i>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
