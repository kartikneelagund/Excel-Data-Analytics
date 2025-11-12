import React from 'react';
import './PersonalDetails.css';

const PersonalDetails = () => {
  return (
    <div className="details-container">
      {/* Left Column */}
      <div className="details-section">
        <h3>Personal Information</h3>
        <label>Name</label>
        <input type="text" value="Kartik" />

        <label>Location</label>
        <input type="text" value="India" />

        <label>Bio</label>
        <textarea rows="3" />

       
        
      </div>

      {/* Right Column */}
      <div className="details-section">
        <h3>Contact Information</h3>
        <label>Contact Phone</label>
        <input type="text" value="9199999999" />

        <label>Email</label>
        <input type="email" value="code@excelanalytics.com" />

        <label>Profile URL</label>
        <input type="text" value="https://code@excelanalytics.com" />

       
      </div>
    </div>
  );
};

export default PersonalDetails;
