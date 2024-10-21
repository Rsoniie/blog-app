import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div className="profile-options">
        <span>...</span>
        <div className="dropdown">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
