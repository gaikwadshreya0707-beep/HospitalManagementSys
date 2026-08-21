import React, { useState } from "react";
import axios from "axios";

function AddDoctor() {
  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/addDoctor",
        doctor
      );

      alert(res.data.message);

      setDoctor({
        name: "",
        specialization: "",
        email: "",
        phone: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding doctor");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Doctor</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={doctor.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={doctor.specialization}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={doctor.email}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={doctor.phone}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <button type="submit">Save Doctor</button>
      </form>
    </div>
  );
}

export default AddDoctor;