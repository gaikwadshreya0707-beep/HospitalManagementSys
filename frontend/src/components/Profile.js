import React, { useState } from "react";
import profilePic from "../assets/shreya.jpg";
import "./Profile.css";

function Profile() {

  const [profile, setProfile] = useState({
    name: "Shreya Gaikwad",
    email: "shreya@gmail.com",
    phone: "+91 9876543210",
    role: "Administrator",
    college: "Jaihind Polytechnic Kuran",
    project: "Hospital Management System",
    technology: "React | Node.js | MySQL",
  });

  const [image, setImage] = useState(profilePic);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const saveProfile = () => {
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="profile-container">

      <div className="profile-card">

        <h1>👩‍💼 My Profile</h1>

        <div className="profile-image">

          <img src={image} alt="Profile" className="profile-img" />

          <h2 className="profile-name">{profile.name}</h2>

          <p className="profile-role">🟢 {profile.role}</p>

          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />

          <button
            className="change-btn"
            onClick={() =>
              document.getElementById("fileInput").click()
            }
          >
            📷 Change Photo
          </button>

        </div>

        <div className="profile-form">

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />

          <label>Role</label>
          <input
            type="text"
            name="role"
            value={profile.role}
            readOnly
          />

          <label>College</label>
          <input
            type="text"
            name="college"
            value={profile.college}
            onChange={handleChange}
          />

          <label>Project</label>
          <input
            type="text"
            name="project"
            value={profile.project}
            onChange={handleChange}
          />

          <label>Technology</label>
          <input
            type="text"
            name="technology"
            value={profile.technology}
            onChange={handleChange}
          />

          <div className="profile-buttons">

            <button
              className="save-btn"
              onClick={saveProfile}
            >
              💾 Save Changes
            </button>

            <button
              className="cancel-btn"
              onClick={() => window.history.back()}
            >
              ⬅ Back
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;