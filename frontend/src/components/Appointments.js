import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Appointments.css";

function Appointments() {

  const [editId, setEditId] = useState(null);

  const [appointment, setAppointment] = useState({
    patient_id: "",
    appointment_date: "",
    appointment_time: "",
    reason: "",
    status: "Pending"
  });

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getPatients();
    getAppointments();
  }, []);

  const getPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/patients");
      setPatients(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value
    });
  };

  const saveAppointment = async () => {
    try {

      if (editId) {

        await axios.put(
          `http://localhost:5000/appointments/${editId}`,
          appointment
        );

        alert("Appointment Updated Successfully");
        setEditId(null);

      } else {

        await axios.post(
          "http://localhost:5000/appointments",
          appointment
        );

        alert("Appointment Added Successfully");

      }

      setAppointment({
        patient_id: "",
        appointment_date: "",
        appointment_time: "",
        reason: "",
        status: "Pending"
      });

      getAppointments();

    } catch (err) {
      console.log(err);
      alert("Error Saving Appointment");
    }
  };

  const editAppointment = (data) => {

    setAppointment({
      patient_id: data.patient_id,
      appointment_date: data.appointment_date,
      appointment_time: data.appointment_time,
      reason: data.reason,
      status: data.status
    });

    setEditId(data.appointment_id);

  };

  const deleteAppointment = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/appointments/${id}`
      );

      alert("Appointment Deleted Successfully");

      getAppointments();

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="appointments-container">

      <h1>Appointment Management</h1>

      <div className="appointment-form">

        <select
          name="patient_id"
          value={appointment.patient_id}
          onChange={handleChange}
        >
          <option value="">Select Patient</option>

          {patients.map((p) => (
            <option
              key={p.patient_id}
              value={p.patient_id}
            >
              {p.patient_name}
            </option>
          ))}

        </select>

        <input
          type="date"
          name="appointment_date"
          value={appointment.appointment_date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="appointment_time"
          value={appointment.appointment_time}
          onChange={handleChange}
        />

        <input
          type="text"
          name="reason"
          placeholder="Reason"
          value={appointment.reason}
          onChange={handleChange}
          />

        <select
          name="status"
          value={appointment.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button
          className="save-btn"
          onClick={saveAppointment}
        >
          {editId ? "Update Appointment" : "Save Appointment"}
        </button>

      </div>

      <h2>Appointment List</h2>

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {appointments.map((a) => (

            <tr key={a.appointment_id}>

              <td>{a.appointment_id}</td>
              <td>{a.patient_name}</td>
              <td>{a.appointment_date}</td>
              <td>{a.appointment_time}</td>
              <td>{a.reason}</td>
              <td>{a.status}</td>

              <td>

                <button onClick={() => editAppointment(a)}>
                  Edit
                </button>

                <button onClick={() => deleteAppointment(a.appointment_id)}>
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default Appointments;