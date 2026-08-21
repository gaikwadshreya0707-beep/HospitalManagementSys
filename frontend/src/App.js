import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Patients from "./components/Patients";
import Appointments from "./components/Appointments";
import Doctors from "./components/Doctors";
import Profile from "./components/Profile";
import Medicine from "./components/Medicines";
import Billing from "./components/Billing";
import Reports from "./components/Reports";
import BulkUpload from "./components/BulkUpload";
import Logout from "./components/Logout";
import Welcome from "./Welcome";
import "./Welcome.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard with Sidebar */}
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<Dashboard />} />
  <Route path="doctors" element={<Doctors />} />
  <Route path="patients" element={<Patients />} />
  <Route path="appointments" element={<Appointments />} />
  <Route path="profile" element={<Profile />} />
  <Route path="medicines" element={<Medicine />} />
  <Route path="billing" element={<Billing />} />
  <Route path="reports" element={<Reports />} />
  <Route path="bulk-upload" element={<BulkUpload />} />
  <Route path="logout" element={<Logout />} />
</Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;