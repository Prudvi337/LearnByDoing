// src/pages/AddCourses.js
import React, { useState } from 'react';

const AddCourses = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save course data (e.g., API call)
    console.log('Course added:', { courseName, courseDescription });
    setCourseName('');
    setCourseDescription('');
  };

  return (
    <div className="container mt-4">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="courseName" className="form-label">Course Name</label>
          <input type="text" className="form-control" id="courseName" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="courseDescription" className="form-label">Course Description</label>
          <textarea className="form-control" id="courseDescription" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourses;
