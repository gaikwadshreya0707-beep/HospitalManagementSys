import React from "react";
import "./Reports.css";

function Reports() {

  const reports = [
    { id: 1, name: "Patient Report", date: "05-08-2026" },
    { id: 2, name: "Doctor Report", date: "05-08-2026" },
    { id: 3, name: "Appointment Report", date: "05-08-2026" },
    { id: 4, name: "Medicine Report", date: "05-08-2026" },
    { id: 5, name: "Billing Report", date: "05-08-2026" }
  ];

  const downloadReport = (reportName) => {
    alert(reportName + " Downloaded Successfully");
  };
  return (
    <div className="reports-container">

      <h1>📊 Reports Dashboard</h1>

      <div className="report-cards">

        <div className="card">
          <h3>Total Patients</h3>
          <h2>120</h2>
        </div>

        <div className="card">
          <h3>Total Doctors</h3>
          <h2>25</h2>
        </div>

        <div className="card">
          <h3>Total Appointments</h3>
          <h2>80</h2>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <h2>₹1,25,000</h2>
        </div>

      </div>

      <h2 className="table-title">Generated Reports</h2>

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Report Name</th>
              <th>Date</th>
              <th>Download</th>
            </tr>

          </thead>

          <tbody>

            {reports.map((report) => (

              <tr key={report.id}>

                <td>{report.id}</td>
                <td>{report.name}</td>
                <td>{report.date}</td>

                <td>
                  <button className="download-btn"onClick={() => downloadReport(report.name)}>
                    Download
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Reports;