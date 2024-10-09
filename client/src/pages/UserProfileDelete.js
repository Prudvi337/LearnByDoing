// src/pages/UserProfileDelete.js
import React from 'react';

const UserProfileDelete = () => {
  const handleDelete = (userId) => {
    // Logic to delete the user (e.g., API call)
    console.log('User deleted:', userId);
  };

  return (
    <div className="container mt-4">
      <h2>Delete User Profile</h2>
      <p>Select a user to delete their profile:</p>
      {/* Replace the hardcoded user list with actual user data from your backend */}
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          User 1
          <button className="btn btn-danger" onClick={() => handleDelete(1)}>Delete</button>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          User 2
          <button className="btn btn-danger" onClick={() => handleDelete(2)}>Delete</button>
        </li>
        {/* Add more users as needed */}
      </ul>
    </div>
  );
};

export default UserProfileDelete;
