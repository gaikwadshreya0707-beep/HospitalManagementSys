import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Doctors.css";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("All");

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/doctors");
      console.log(res.data);
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchName = doctor.doctor_name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchSpecialization =
      specialization === "All" ||
      doctor.specialization === specialization;

    return matchName && matchSpecialization;
  });

  return (
    <div className="doctors-container">

      <h1>Doctors Directory</h1>

      <div className="search-box">

        <input
          type="text"
          placeholder="Search Doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Orthopedic">Orthopedic</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Gynecologist">Gynecologist</option>
        </select>

      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Doctor Name</th>
            <th>Specialization</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Experience</th>
            <th>Available Days</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredDoctors.map((doctor) => (
            <tr key={doctor.doctor_id}>
              <td>{doctor.doctor_id}</td>
              <td>{doctor.doctor_name}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.email}</td>
              <td>{doctor.experience} Years</td>
              <td>{doctor.available_days}</td>

            <td>
  <span
    className={`STATUS-badge ${
      doctor.STATUS === "Available"
        ? "available"
        : doctor.STATUS === "On Leave"
        ? "leave"
        : "busy"
    }`}
  >
    {doctor.STATUS}
  </span>
</td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Doctors;