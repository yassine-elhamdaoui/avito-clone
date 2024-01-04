import React from "react";
import "./settings.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Settings() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="edit-profile">
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="first-part">
          <div className="first-name">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="email">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="second-part">
          <h3>Password Changes</h3>
          <div>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="repeatNewPassword"
              placeholder="Confirm New Password "
              value={formData.repeatNewPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="btn-setting">
          <button type="submit">Cancel</button>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
export default Settings;
