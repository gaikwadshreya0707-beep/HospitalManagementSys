import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Medicines.css";

function Medicines() {

  const [editId, setEditId] = useState(null);

  const [medicine, setMedicine] = useState({
    medicine_name: "",
    category: "",
    company: "",
    price: "",
    stock: "",
    expiry_date: ""
  });

  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    getMedicines();
  }, []);

  const getMedicines = async () => {
    try {
      const res = await axios.get("http://localhost:5000/medicines");
      setMedicines(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setMedicine({
      ...medicine,
      [e.target.name]: e.target.value,
    });
  };

  const saveMedicine = async () => {
    try {

      if (editId) {

        await axios.put(
          `http://localhost:5000/medicines/${editId}`,
          medicine
        );

        alert("Medicine Updated Successfully");
        setEditId(null);

      } else {

        await axios.post(
          "http://localhost:5000/medicines",
          medicine
        );

        alert("Medicine Added Successfully");
      }

      setMedicine({
        medicine_name: "",
        category: "",
        company: "",
        price: "",
        stock: "",
        expiry_date: ""
      });

      getMedicines();

    } catch (err) {
      console.log(err);
      alert("Error Saving Medicine");
    }
  };

  const editMedicine = (data) => {

    setMedicine({
      medicine_name: data.medicine_name,
      category: data.category,
      company: data.company,
      price: data.price,
      stock: data.stock,
      expiry_date: data.expiry_date
    });

    setEditId(data.id);
  };

  const deleteMedicine = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/medicines/${id}`
      );

      alert("Medicine Deleted Successfully");

      getMedicines();

    } catch (err) {
      console.log(err);
    }
  };

return (
  <div className="medicine-container">

    <h1>💊 Medicine Management</h1>

    <div className="patient-form">

      <input
        type="text"
        name="medicine_name"
        placeholder="Medicine Name"
        value={medicine.medicine_name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={medicine.category}
        onChange={handleChange}
      />

      <input
        type="text"
        name="company"
        placeholder="Company"
        value={medicine.company}
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={medicine.price}
        onChange={handleChange}
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={medicine.stock}
        onChange={handleChange}
      />

      <input
        type="date"
        name="expiry_date"
        value={medicine.expiry_date}
        onChange={handleChange}
      />

      <button className="save-btn" onClick={saveMedicine}>
        {editId ? "Update Medicine" : "Save Medicine"}
      </button>

    </div>

    <h2>Medicine List</h2>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Medicine Name</th>
          <th>Category</th>
          <th>Company</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Expiry Date</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {medicines.map((medicine) => (
          <tr key={medicine.id}>
            <td>{medicine.id}</td>
            <td>{medicine.medicine_name}</td>
            <td>{medicine.category}</td>
            <td>{medicine.company}</td>
            <td>₹{medicine.price}</td>
            <td>{medicine.stock}</td>

            <td>
              {new Date(medicine.expiry_date).toLocaleDateString("en-GB")}
            </td>

            <td>
              <button
                className="edit-btn"
                onClick={() => editMedicine(medicine)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteMedicine(medicine.id)}
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

export default Medicines;