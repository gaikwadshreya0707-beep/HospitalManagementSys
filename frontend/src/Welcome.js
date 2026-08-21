import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome-container">
      <div className="overlay">
        <div className="welcome-box">
          <h1>🏥 Hospital Management System</h1>

          <p>
            <b>👋 Welcome Back,
             Shreya Gaikwad</b>
          <br></br>
          <br></br>
             <i>Hospital Management System Dashboard
             Have a great day! 🏥</i>
          </p>

          <p className="subtitle">
            Manage Patients, Doctors, Appointments, Billing and Pharmacy
            efficiently.
          </p>

          <div className="btn-group">
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>

            <Link to="/register">
              <button className="register-btn">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;