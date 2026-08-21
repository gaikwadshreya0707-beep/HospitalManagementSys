import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Patients.css";

function Patients() {

  const [editId, setEditId] = useState(null);

  const [patient, setPatient] = useState({
    patient_name: "",
    gender: "Male",
    age: "",
    phone: "",
    address: "",
    disease: "",
    doctor_name: "",
    admission_date: ""
  });

  const [patients, setPatients] = useState([]);


  useEffect(() => {
    getPatients();
  }, []);


  const getPatients = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/patients"
      );
      console.log(res.data);
      setPatients(res.data);

    } catch(err) {
      console.log(err);
    }
  };


  const handleChange = (e) => {

    setPatient({
      ...patient,
      [e.target.name]: e.target.value
    });

  };


  const savePatient = async () => {

    try {

      if(editId){

        await axios.put(
          `http://localhost:5000/patients/${editId}`,
          patient
        );

        alert("Patient Updated Successfully");

        setEditId(null);

      }
      else{

        await axios.post(
          "http://localhost:5000/patients",
          {
            user_id:1,
            ...patient
          }
        );

        alert("Patient Added Successfully");

      }


      setPatient({
        patient_name:"",
        gender:"Male",
        age:"",
        phone:"",
        address:"",
        disease:"",
        doctor_name:"",
        admission_date:""
      });


      getPatients();


    } catch(err){

      console.log(err);
      alert("Error Saving Patient");

    }

  };


  const editPatient = (data)=>{

    setPatient({
      patient_name:data.patient_name,
      gender:data.gender,
      age:data.age,
      phone:data.phone,
      address:data.address,
      disease:data.disease,
      doctor_name:data.doctor_name,
      admission_date:data.admission_date
    });


    setEditId(data.patient_id);

  };


  const deletePatient = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/patients/${id}`
      );

      alert("Patient Deleted Successfully");

      getPatients();

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="patients-container">

      <h1>🏥 Patient Management</h1>


      <div className="patient-form">

        {Object.keys(patient).map((key)=>(
          
          key === "gender" ?

          <select
            key={key}
            name={key}
            value={patient[key]}
            onChange={handleChange}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>

          </select>


          :

          <input
            key={key}
            type={key==="admission_date" ? "date" : "text"}
            name={key}
            placeholder={key.replace("_"," ")}
            value={patient[key]}
            onChange={handleChange}
          />

        ))}


        <button 
        className="save-btn"
        onClick={savePatient}>

          {editId ? "Update Patient" : "Save Patient"}

        </button>


      </div>



      <h2>Patient List</h2>


      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Disease</th>
            <th>Doctor</th>
            <th>Action</th>
          </tr>
        </thead>


        <tbody>

        {
          patients.map((p)=>(

            <tr key={p.patient_id}>

              <td>{p.patient_id}</td>
              <td>{p.patient_name}</td>
              <td>{p.gender}</td>
              <td>{p.age}</td>
              <td>{p.phone}</td>
              <td>{p.disease}</td>
              <td>{p.doctor_name}</td>

              <td>

              <button onClick={()=>editPatient(p)}>
                Edit
              </button>

              <button onClick={()=>deletePatient(p.patient_id)}>
                Delete
              </button>

              </td>

            </tr>

          ))
        }

        </tbody>


      </table>


    </div>

  );

}

export default Patients;