import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🏥 HMS</h2>

      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        🏠 Dashboard
      </NavLink>

      <NavLink
        to="/dashboard/doctors"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        👨‍⚕️ Doctors
      </NavLink>

      <NavLink
        to="/dashboard/patients"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        🧑 Patients
      </NavLink>

      <NavLink
        to="/dashboard/appointments"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        📅 Appointments
      </NavLink>

      <NavLink
        to="/dashboard/medicines"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        💊 Medicines
      </NavLink>

      <NavLink
        to="/dashboard/billing"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        💳 Billing
      </NavLink>

      <NavLink
        to="/dashboard/reports"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        📊 Reports
      </NavLink>


  <NavLink to="/dashboard/bulk-upload" className="sidebar-link">
    📁 Bulk Upload
  </NavLink>

<NavLink
  to="/dashboard/logout"
  className={({ isActive }) => (isActive ? "active" : "")}
>
  🚪 Logout
</NavLink>
    </div>
  );
}

export default Sidebar;