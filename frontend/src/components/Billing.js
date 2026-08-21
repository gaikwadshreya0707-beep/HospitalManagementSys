import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Billing.css";

function Billing() {

  const [editId, setEditId] = useState(null);

  const [bill, setBill] = useState({
    patient_name: "",
    doctor_name: "",
    consultation_fee: "",
    medicine_fee: "",
    lab_fee: "",
    other_fee: "",
    total: 0,
    bill_date: ""
  });

  const [bills, setBills] = useState([]);

  useEffect(() => {
    getBills();
  }, []);

  const getBills = async () => {
    try {
      const res = await axios.get("http://localhost:5000/billing");
      setBills(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    const updatedBill = {
      ...bill,
      [name]: value
    };

    updatedBill.total =
      Number(updatedBill.consultation_fee || 0) +
      Number(updatedBill.medicine_fee || 0) +
      Number(updatedBill.lab_fee || 0) +
      Number(updatedBill.other_fee || 0);

    setBill(updatedBill);
  };

  const saveBill = async () => {

    try {

      if (editId) {

        await axios.put(
          `http://localhost:5000/billing/${editId}`,
          bill
        );

        alert("Bill Updated Successfully");
        setEditId(null);

      } else {

        await axios.post(
          "http://localhost:5000/billing",
          bill
        );

        alert("Bill Added Successfully");
      }

      setBill({
        patient_name: "",
        doctor_name: "",
        consultation_fee: "",
        medicine_fee: "",
        lab_fee: "",
        other_fee: "",
        total: 0,
        bill_date: ""
      });

      getBills();

    } catch (err) {

      console.log(err);
      alert("Error Saving Bill");

    }

  };
const editBill = (data) => {

    setBill({
      patient_name: data.patient_name,
      doctor_name: data.doctor_name,
      consultation_fee: data.consultation_fee,
      medicine_fee: data.medicine_fee,
      lab_fee: data.lab_fee,
      other_fee: data.other_fee,
      total: data.total,
      bill_date: data.bill_date
    });

    setEditId(data.id);

  };


  const deleteBill = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/billing/${id}`
      );

      alert("Bill Deleted Successfully");

      getBills();

    } catch (err) {
      console.log(err);
    }

  };


  return (

    <div className="patients-container">

      <h1>💳 Billing Management</h1>

      <div className="patient-form">

        <input
          type="text"
          name="patient_name"
          placeholder="Patient Name"
          value={bill.patient_name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="doctor_name"
          placeholder="Doctor Name"
          value={bill.doctor_name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="consultation_fee"
          placeholder="Consultation Fee"
          value={bill.consultation_fee}
          onChange={handleChange}
        />

        <input
          type="number"
          name="medicine_fee"
          placeholder="Medicine Fee"
          value={bill.medicine_fee}
          onChange={handleChange}
        />

        <input
          type="number"
          name="lab_fee"
          placeholder="Lab Fee"
          value={bill.lab_fee}
          onChange={handleChange}
        />

        <input
          type="number"
          name="other_fee"
          placeholder="Other Charges"
          value={bill.other_fee}
          onChange={handleChange}
        />

        <input
          type="number"
          name="total"
          placeholder="Total"
          value={bill.total}
          readOnly
        />

        <input
          type="date"
          name="bill_date"
          value={bill.bill_date}
          onChange={handleChange}
        />

        <button
          className="save-btn"
          onClick={saveBill}
        >
          {editId ? "Update Bill" : "Generate Bill"}
        </button>

      </div>

      <h2>Billing List</h2>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Total</th>
            <th>Bill Date</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {bills.map((b) => (

            <tr key={b.id}>

              <td>{b.id}</td>
              <td>{b.patient_name}</td>
              <td>{b.doctor_name}</td>
              <td>₹ {b.total}</td>
              <td>{b.bill_date}</td>

              <td>

                <button
                  onClick={() => editBill(b)}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteBill(b.id)}
                >
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

export default Billing;