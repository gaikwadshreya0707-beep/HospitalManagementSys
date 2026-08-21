import React from "react";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "./assets/shreya.jpg";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="main">

      {/* Header */}
      <div className="header">
        <h1>🏥 Hospital Management System</h1>

        <div
          className="top-profile"
          onClick={() => navigate("/dashboard/profile")}
        >
          <img src={profilePic} alt="Profile" className="top-profile-img" />

          <div>
            <h4>Shreya Gaikwad</h4>
            <p>Administrator</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats">

        <div className="stat-card">
          <h2>25</h2>
          <p>Doctors</p>
        </div>

        <div className="stat-card">
          <h2>180</h2>
          <p>Patients</p>
        </div>

        <div className="stat-card">
          <h2>35</h2>
          <p>Appointments</p>
        </div>

        <div className="stat-card">
          <h2>₹1,25,000</h2>
          <p>Revenue</p>
        </div>

      </div>

      {/* Cards */}
      <div className="cards">

        <div className="card">
          <h2>👨‍⚕️ Doctors</h2>
          <p>Manage Doctor Details</p>
          <Link to="/dashboard/doctors">
            <button>View</button>
          </Link>
        </div>

        <div className="card">
          <h2>🧑 Patients</h2>
          <p>Manage Patient Records</p>
          <Link to="/dashboard/patients">
            <button>View</button>
          </Link>
        </div>

        <div className="card">
          <h2>📅 Appointments</h2>
          <p>Manage Appointments</p>
          <Link to="/dashboard/appointments">
            <button>View</button>
          </Link>
        </div>

        <div className="card">
          <h2>💊 Medicines</h2>
          <p>Medicine Inventory</p>
          <Link to="/dashboard/medicines">
            <button>View</button>
          </Link>
        </div>

        <div className="card">
          <h2>💳 Billing</h2>
          <p>Patient Billing Details</p>
          <Link to="/dashboard/billing">
            <button>View</button>
          </Link>
        </div>

        <div className="card">
          <h2>📊 Reports</h2>
          <p>Hospital Reports</p>
          <Link to="/dashboard/reports">
            <button>View</button>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;