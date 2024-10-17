// src/components/Terms.js
import React from 'react';
import './Term.css';
import img1 from '../images/contact.jpg'; // Replace with actual image paths
 import img2 from '../images/pic1.jpg'; 
 import img3 from '../images/pic2.jpg';// Example of another image
import Footer from './Footer';
const Terms = () => {
    return (
        <>
            <div className='container'>
                <h1 className='text-center my-4'>Terms and Conditions</h1>

                {/* Section 1 - Image Left */}
                <div className='row align-items-center my-4'>
                    <div className='col-md-4'>
                        <img src={img2} alt='Introduction' className='img-fluid rounded-2' />
                    </div>
                    <div className='col-md-8'>
                        <h2>1. Introduction</h2>
                        <p>LearnByDoing is an educational platform aimed at helping users engage in hands-on learning through project-based activities.</p>
                    </div>
                </div>

                {/* Section 2 - Image Right */}
                <div className='row align-items-center my-4'>
                    <div className='col-md-8'>
                        <h2>2. Eligibility</h2>
                        <p>LearnByDoing is open to users who are at least 18 years of age or have parental/guardian consent to participate. By accessing the platform, you affirm that you meet these eligibility requirements.</p>
                    </div>
                    <div className='col-md-4'>
                        <img src={img3} alt='Eligibility' className='img-fluid rounded-2' />
                    </div>
                </div>

                {/* Section 3 - Image Left */}
                <div className='row align-items-center my-4'>
                    <div className='col-md-4'>
                        <img src={img1} alt='Personal Responsibility' className='img-fluid rounded-2' />
                    </div>
                    <div className='col-md-8'>
                        <h2>3. Personal Responsibility</h2>
                        <p>Users are solely responsible for the projects they choose to undertake, including the identification of learning goals, project topics, and outcomes. LearnByDoing provides guidance, resources, and mentorship, but users must take full ownership of their projects and learning experiences.</p>
                    </div>
                </div>

                {/* Section 4 - Image Right */}
                <div className='row align-items-center my-4'>
                    <div className='col-md-8'>
                        <h2>4. Learning Goals and Objectives</h2>
                        <p>LearnByDoing encourages users to define their own learning goals and outcomes. However, the platform does not guarantee any specific results, such as job placement, certifications, or academic achievements, upon completion of projects.</p>
                    </div>
                    <div className='col-md-4'>
                        <img src={img1} alt='Learning Goals' className='img-fluid rounded-2' />
                    </div>
                </div>

                {/* Continue alternating for other sections... */}

                {/* Section 5 - Image Left */}
                <div className='row align-items-center my-4'>
                    <div className='col-md-4'>
                        <img src={img1} alt='Project Content' className='img-fluid rounded-2' />
                    </div>
                    <div className='col-md-8'>
                        <h2>5. Project Content</h2>
                        <p>When developing and sharing project work, users agree that:</p>
                        <ul>
                            <li>All project content is their own original work or properly credited to sources where necessary.</li>
                            <li>The content does not infringe on any intellectual property rights, privacy rights, or other legal rights of third parties.</li>
                            <li>Projects should adhere to ethical standards and promote a positive and respectful learning environment.</li>
                        </ul>
                    </div>
                </div>

                {/* Section 6 - Image Right */}
                <div className='row align-items-center my-4'>
                    <div className='col-md-8'>
                        <h2>6. Resources and Mentorship</h2>
                        <p>LearnByDoing provides access to resources, courses, and mentorship programs to support users in their learning journey. These resources are for informational and educational purposes only, and users are encouraged to independently verify the accuracy and relevance of all information provided.</p>
                    </div>
                    <div className='col-md-4'>
                        <img src={img1} alt='Resources and Mentorship' className='img-fluid rounded-2' />
                    </div>
                </div>

                {/* Add more sections as needed... */}
            </div>
            <Footer/>
        </>
        
    );
};

export default Terms;
