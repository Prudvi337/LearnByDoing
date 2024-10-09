import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProfile = ({ admin }) => {
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <h2>Admin Profile</h2>
      <p>Email: {admin.email}</p>
      <p>Username: {admin.username}</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default AdminProfile;
