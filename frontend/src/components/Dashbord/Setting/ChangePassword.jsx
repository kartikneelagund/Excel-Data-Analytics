import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './ChangePassword.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Assume user ID is stored in localStorage or context after login
  const userId = localStorage.getItem('userId'); // or however you store it

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire('All fields are required');
      return;
    }

    try {
      const res = await axios.put(`http://localhost:8080/api/change-password/${userId}`, {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      Swal.fire('Success', res.data.message, 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Something went wrong', 'error');
    }
  };

  return (
    <div className="account-container">
      <h3>Change Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="form-footer">
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
