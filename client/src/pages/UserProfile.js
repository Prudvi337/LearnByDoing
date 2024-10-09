import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="profile-container">
        <h2>Error: User not logged in</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default UserProfile;
