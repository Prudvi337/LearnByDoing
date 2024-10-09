import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const CoursesPage = () => {
    const [openEnroll, setOpenEnroll] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [email, setEmail] = useState('');
    const [courses, setCourses] = useState([]);
    const [courseData, setCourseData] = useState({ title: '', duration: '', description: '', prereq: '' }); // State for course data

    // Fetch courses from the backend
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/courses');
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

    const handleClickOpenEnroll = (course) => {
        setSelectedCourse(course);
        setOpenEnroll(true);
    };

    const handleCloseEnroll = () => {
        setOpenEnroll(false);
        setSelectedCourse(null);
        setEmail('');
    };

    const handleEnroll = () => {
        const templateParams = {
            to_name: "Student",
            message: `You have successfully registered for the course:`,
            course_title: selectedCourse.title,
            course_duration: selectedCourse.duration,
            email: email,
        };

        emailjs.send('service_0zt6x89', 'template_oe1jicm', templateParams, 'A6EiiOCmBIte0AE5m')
            .then((response) => {
                console.log('Email successfully sent!', response.status, response.text);
                handleCloseEnroll();
                alert(`Redirecting to the learning path for ${selectedCourse.title}...`);
            }, (err) => {
                console.error('Failed to send email. Error: ', err);
            });
    };

    const handleClickOpenEdit = (course) => {
        setCourseData({ title: course.title, duration: course.duration, description: course.description, prereq: course.prereq });
        setSelectedCourse(course);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setSelectedCourse(null);
        setCourseData({ title: '', duration: '', description: '', prereq: '' });
    };

    const handleUpdateCourse = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/courses/${selectedCourse._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            });

            if (!response.ok) {
                throw new Error('Failed to update course');
            }

            const updatedCourse = await response.json();
            setCourses(courses.map(course => (course._id === updatedCourse._id ? updatedCourse : course)));
            handleCloseEdit();
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete course');
            }

            setCourses(courses.filter(course => course._id !== courseId));
            console.log('Course deleted successfully');
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    return (
        <div className="bg-light">
            <Navbar />
            <div className="container">
                <h4 className="mb-4">Courses</h4>
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
                                    <button className="btn btn-danger" onClick={() => handleClickOpenEnroll(course)}>Enroll</button>
                                    <button className="btn btn-warning" onClick={() => handleClickOpenEdit(course)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteCourse(course._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Enrollment Modal */}
            {openEnroll && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Enroll in Course</h5>
                                <button type="button" className="btn-close" onClick={handleCloseEnroll}></button>
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
                                <button type="button" className="btn btn-secondary" onClick={handleCloseEnroll}>
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

            {/* Edit Course Modal */}
            {openEdit && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Course</h5>
                                <button type="button" className="btn-close" onClick={handleCloseEdit}></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Course Title"
                                    value={courseData.title}
                                    onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Duration"
                                    value={courseData.duration}
                                    onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                                />
                                <textarea
                                    className="form-control mb-2"
                                    placeholder="Description"
                                    value={courseData.description}
                                    onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                                ></textarea>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Prerequisites"
                                    value={courseData.prereq}
                                    onChange={(e) => setCourseData({ ...courseData, prereq: e.target.value })}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseEdit}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleUpdateCourse}>
                                    Update
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
