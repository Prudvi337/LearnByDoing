// src/pages/AddCourses.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import Toastify for notifications

const AddCourses = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseDuration, setCourseDuration] = useState(''); // For duration
  const [coursePrereq, setCoursePrereq] = useState(''); // For prerequisites
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null); // Track course for editing

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  // Handle form submission for both adding and updating
  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      title: courseName,
      description: courseDescription,
      duration: courseDuration,
      prereq: coursePrereq,
    };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/courses/${currentCourseId}`, courseData);
        toast.success('Course updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/courses', courseData);
        toast.success('Course added successfully!');
      }

      // Reset form fields and refresh courses
      setCourseName('');
      setCourseDescription('');
      setCourseDuration('');
      setCoursePrereq('');
      setIsEditing(false);
      setCurrentCourseId(null);

      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);

    } catch (error) {
      console.error('Error submitting course:', error);
      toast.error(isEditing ? 'Failed to update course.' : 'Failed to add course.');
    }
  };

  // Handle editing a course
  const handleEdit = (course) => {
    setCourseName(course.title);
    setCourseDescription(course.description);
    setCourseDuration(course.duration);
    setCoursePrereq(course.prereq);
    setCurrentCourseId(course._id);
    setIsEditing(true);
  };

  // Handle deleting a course
  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
      toast.success('Course deleted successfully!');
      setCourses(courses.filter(course => course._id !== courseId)); // Remove course from UI
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isEditing ? 'Edit Course' : 'Add New Course'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="courseName" className="form-label">Course Name</label>
          <input
            type="text"
            className="form-control"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="courseDescription" className="form-label">Course Description</label>
          <textarea
            className="form-control"
            id="courseDescription"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="courseDuration" className="form-label">Course Duration</label>
          <input
            type="text"
            className="form-control"
            id="courseDuration"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="coursePrereq" className="form-label">Course Prerequisites</label>
          <input
            type="text"
            className="form-control"
            id="coursePrereq"
            value={coursePrereq}
            onChange={(e) => setCoursePrereq(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update Course' : 'Add Course'}
        </button>
      </form>

      <h3 className="mt-5">Courses</h3>
      {courses.length > 0 ? (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Prerequisites</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>{course.duration}</td>
                <td>{course.prereq}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleEdit(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default AddCourses;
