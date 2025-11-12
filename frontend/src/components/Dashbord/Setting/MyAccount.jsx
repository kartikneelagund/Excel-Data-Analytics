import React, { useState } from "react";
import "./MyAccount.css";

const MyAccount = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    language: "",
    timezone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can connect this to your backend via axios.post or axios.put
    console.log("Submitted:", formData);
  };

  return (
    <div className="account-container">
      <h2>General Settings</h2>
      <form onSubmit={handleSubmit} className="account-form">
        <div className="form-row">
          <div className="form-group">
          <label>First Name</label>
            <input
          name="name"
          type="text"
          placeholder="Enter your firstname"
          value={formData.username}
          onChange={handleChange}
          />
          </div>

          <div className="form-group">
          <label>Last Name</label>
            <input
            name="name"
            type="text"
            placeholder="Enter your lastname"
            value={formData.email}
            onChange={handleChange}
          />
          </div>
        </div>
       

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        

        <div className="form-group">
          <label className="languge">Language</label>
          <div></div>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
          >
            <option value="">Select Language</option>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
          </select>
        </div>

        <div className="form-group">
          <label>Timezone</label>
          <input
            name="timezone"
            type="text"
            placeholder="Asia/Kolkata"
            value={formData.timezone}
            onChange={handleChange}
          />
        </div>

        <div className="form-footer">
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default MyAccount;
