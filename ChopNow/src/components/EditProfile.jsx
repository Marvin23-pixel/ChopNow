import React, { useState } from "react";
import {
  ArrowLeft,
  Camera,
  User,
  Mail,
  Phone,
  ChevronDown,
} from "lucide-react";
import "../styles/editprofile.css";

const EditProfile = () => {
  const [fullName, setFullName] = useState("Marvellous Solomon");
  const [email, setEmail] = useState("marvellous@example.com");
  const [phone, setPhone] = useState("801 234 5678");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle save logic here
  };

  return (
    <div className="edit-profile-page">
      {/* Top App Bar */}
      <header className="edit-header">
        <button
          className="back-button"
          type="button"
          aria-label="Go back"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={24} strokeWidth={2} />
        </button>
        <h1 className="edit-title">Edit Profile</h1>
        <div className="header-spacer" />
      </header>

      {/* Main Content */}
      <main className="edit-main">
        {/* Profile Photo Section */}
        <section className="photo-section">
          <div className="photo-wrapper">
            <div className="photo-circle">
              <img
                className="profile-img"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0w6W87RjV3dUtSBaBwHa8vM_kl82yrhYdOh7YWY-GIPReCdP1UBvg7iHzNYDk2MEwlpEqA12HT9xIe5qDOA1E-V_jtHuu-4i4kCjuCKgR2of6phSgJdBD-zbDuMiVrwWk2FNpUxhgho-NO3D0VW0sW8ZqjWHFdp2qjZ41IYe3qpuaomX-7ysphCvrU5mTRdsWBEcXqoEOQ8w64ZWTmEkYQlWeUbk5ezO9GjDmNMapQm1HOzxNVUqD8A"
                alt="Profile"
              />
              <div className="photo-overlay" />
            </div>
            <button className="camera-button" type="button" aria-label="Change photo">
              <Camera size={20} strokeWidth={2.2} />
            </button>
          </div>
          <button className="change-photo-text" type="button">
            Change Photo
          </button>
        </section>

        {/* Form Fields */}
        <form className="edit-form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">
              Full Name
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <User size={22} strokeWidth={2} />
              </div>
              <input
                className="form-input"
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <Mail size={22} strokeWidth={2} />
              </div>
              <input
                className="form-input"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Phone Number
            </label>
            <div className="input-wrapper phone-wrapper">
              <div className="country-selector">
                <img
                  src="https://flagcdn.com/w40/ng.png"
                  alt="NG"
                  className="flag-img"
                />
                <span className="country-code">+234</span>
                <ChevronDown size={18} strokeWidth={2.2} className="chevron-icon" />
                <div className="divider" />
              </div>
              <input
                className="form-input phone-input"
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="actions">
            <button className="cancel-button" type="button">
              Cancel
            </button>
            <button className="save-button" type="submit">
              <span className="save-text">Save Changes</span>
              <div className="save-shine" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;