import React, { useState } from "react";
import axios from "axios";
import "./BulkUpload.css";

function BulkUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an Excel file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/bulk-upload",
        formData
      );

      alert(res.data.message);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      console.log(err.response.data);
      alert(err.response.data.message || "Error uploading file");
    }
  };

return (
  <div className="bulk-container">

    <h2>📁 Bulk Upload Patients</h2>

    <div className="upload-box">

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => setFile(e.target.files[0])}
      />

    </div>

    <button
      className="upload-btn"
      onClick={handleUpload}
    >
      Upload Excel
    </button>

    <p className="note">
      Upload only Excel (.xlsx or .xls) files.
    </p>

  </div>
);
}

export default BulkUpload;