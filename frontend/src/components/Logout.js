import "./Logout.css";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged Out Successfully");
    navigate("/login");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="logout-container">
      <div className="logout-card">
        <div className="logout-icon">🚪</div>

        <h2>Logout</h2>

        <p>Are you sure you want to logout?</p>

        <div className="logout-buttons">
          <button className="yes-btn" onClick={handleLogout}>
            Yes, Logout
          </button>

          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;