import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const CoursesPage = () => {
    const [open, setOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [email, setEmail] = useState('');
    const [courses, setCourses] = useState([]); // State to store fetched courses

    // Fetch courses from the backend using fetch API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/courses'); // Adjust the URL as needed
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleClickOpen = (course) => {
        setSelectedCourse(course);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCourse(null);
        setEmail(''); // Reset email input
    };

    const handleEnroll = () => {
        const templateParams = {
            to_name: "Student",
            message: `You have successfully registered for the course:`,
            course_title: selectedCourse.title,
            course_duration: selectedCourse.duration,
            email: email, // Include email for reference
        };

        emailjs.send('service_0zt6x89', 'template_oe1jicm', templateParams, 'A6EiiOCmBIte0AE5m')
            .then((response) => {
                console.log('Email successfully sent!', response.status, response.text);
                handleClose();
                alert(`Redirecting to the learning path for ${selectedCourse.title}...`);
            }, (err) => {
                console.error('Failed to send email. Error: ', err);
            });
    };

    return (
        <div className="bg-light">
            <Navbar /> {/* Use the Navbar here */}
            <div className="container mt-4">
                {/* <h4 className="mb-4">Courses</h4> */}
                <div className="row">
                    {courses.map((course, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{course.title}</h5>
                                    <p className="card-text"><small>{course.duration}</small></p>
                                    <p className="card-text">{course.description}</p>
                                    <p className="card-text"><small className="text-muted">Prerequisites: {course.prereq}</small></p>
                                </div>
                                <div className="card-footer text-center">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleClickOpen(course)}
                                    >
                                        Enroll
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Enrollment Modal */}
            {open && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Enroll in Course</h5>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <p>You are about to enroll in: <strong>{selectedCourse?.title}</strong></p>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleEnroll} disabled={!email}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoursesPage;
