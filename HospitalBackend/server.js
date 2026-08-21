const multer = require("multer");
const XLSX = require("xlsx");
const path = require("path");
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// ================== ADD PATIENT ==================

app.post("/patients", async (req, res) => {
  try {

    const {
      user_id,
      patient_name,
      gender,
      age,
      phone,
      address,
      disease,
      doctor_name,
      admission_date
    } = req.body;

    await db.query(
      `INSERT INTO patients
      (user_id, patient_name, gender, age, phone, address, disease, doctor_name, admission_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        patient_name,
        gender,
        age,
        phone,
        address,
        disease,
        doctor_name,
        admission_date
      ]
    );

    res.status(201).json({
      message: "Patient Added Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error Saving Patient"
    });
  }
});



// ================== GET ALL PATIENTS ==================

app.get("/patients", async (req, res) => {

  try {

    const [rows] = await db.query(
      "SELECT * FROM patients ORDER BY patient_id DESC"
    );

    res.json(rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error Fetching Patients"
    });

  }

});



// ================== UPDATE PATIENT ==================

app.put("/patients/:id", async (req, res) => {

  try {

    const id = req.params.id;

    const {
      patient_name,
      gender,
      age,
      phone,
      address,
      disease,
      doctor_name,
      admission_date
    } = req.body;

    await db.query(

      `UPDATE patients SET
      patient_name=?,
      gender=?,
      age=?,
      phone=?,
      address=?,
      disease=?,
      doctor_name=?,
      admission_date=?
      WHERE patient_id=?`,

      [
        patient_name,
        gender,
        age,
        phone,
        address,
        disease,
        doctor_name,
        admission_date,
        id
      ]

    );

    res.json({
      message: "Patient Updated Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error Updating Patient"
    });

  }

});



// ================== DELETE PATIENT ==================

app.delete("/patients/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM patients WHERE patient_id = ?", [id]);

    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Delete failed" });
  }
});

app.post("/appointments", async (req, res) => {
  try {
    const {
      patient_id,
      appointment_date,
      appointment_time,
      reason,
      status
    } = req.body;

    await db.query(
      `INSERT INTO appointments
      (patient_id, appointment_date, appointment_time, reason, status)
      VALUES (?, ?, ?, ?, ?)`,
      [patient_id, appointment_date, appointment_time, reason, status]
    );

    res.json({ message: "Appointment Added Successfully" });

  } catch (err) {
    console.error("Appointment Error:", err);
    res.status(500).json({ message: err.message,
      error:err
     });
  }
});
app.get("/appointments", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        a.appointment_id,
        p.patient_name,
        a.patient_id,
        a.appointment_date,
        a.appointment_time,
        a.reason,
        a.STATUS AS status
      FROM appointments a
      JOIN patients p
      ON a.patient_id = p.patient_id
      ORDER BY a.appointment_id DESC
    `);

    res.json(rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Fetching Appointments" });
  }
});

app.put("/appointments/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const {
      patient_id,
      appointment_date,
      appointment_time,
      reason,
      STATUS
    } = req.body;

    await db.query(
      `UPDATE appointments
       SET patient_id=?, appointment_date=?, appointment_time=?, reason=?, STATUS=?
       WHERE appointment_id=?`,
      [
        patient_id,
        appointment_date,
        appointment_time,
        reason,
        STATUS,
        id
      ]
    );

    res.json({ message: "Appointment Updated Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Updating Appointment" });
  }
});

app.delete("/appointments/:id", async (req, res) => {
  try {
    await db.query(
      "DELETE FROM appointments WHERE appointment_id=?",
      [req.params.id]
    );

    res.json({ message: "Appointment Deleted Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Deleting Appointment" });
  }
});

app.post("/doctors", async (req, res) => {
  try {
    const {
      doctor_name,
      specialization,
      phone,
      email,
      experience,
      available_days
    } = req.body;

    await db.query(
      `INSERT INTO doctors
      (doctor_name, specialization, phone, email, experience, available_days)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        doctor_name,
        specialization,
        phone,
        email,
        experience,
        available_days
      ]
    );

    res.STATUS(201).json({
      message: "Doctor Added Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error Adding Doctor"
    });
  }
});

app.get("/doctors", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM doctors");
    console.log("Doctors API:", rows);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Fetching Doctors" });
  }
});

// ================== GET ALL MEDICINES ==================

app.get("/medicines", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM medicines ORDER BY id DESC"
    );

    res.json(rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error Fetching Medicines"
    });
  }
});


// ================== ADD MEDICINE ==================

app.post("/medicines", async (req, res) => {
  try {

    const {
      medicine_name,
      category,
      company,
      price,
      stock,
      expiry_date
    } = req.body;

    await db.query(
      `INSERT INTO medicines
      (medicine_name, category, company, price, stock, expiry_date)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        medicine_name,
        category,
        company,
        price,
        stock,
        expiry_date
      ]
    );

    res.status(201).json({
      message: "Medicine Added Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error Saving Medicine"
    });
  }
});


// ================== UPDATE MEDICINE ==================

app.put("/medicines/:id", async (req, res) => {
  try {

    const id = req.params.id;

    const {
      medicine_name,
      category,
      company,
      price,
      stock,
      expiry_date
    } = req.body;

    await db.query(
      `UPDATE medicines SET
      medicine_name=?,
      category=?,
      company=?,
      price=?,
      stock=?,
      expiry_date=?
      WHERE id=?`,
      [
        medicine_name,
        category,
        company,
        price,
        stock,
        expiry_date,
        id
      ]
    );

    res.json({
      message: "Medicine Updated Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error Updating Medicine"
    });
  }
});


// ================== DELETE MEDICINE ==================

app.delete("/medicines/:id", async (req, res) => {
  try {

    await db.query(
      "DELETE FROM medicines WHERE id=?",
      [req.params.id]
    );

    res.json({
      message: "Medicine Deleted Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error Deleting Medicine"
    });
  }
});

app.get("/billing", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM billing");
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.post("/billing", async (req, res) => {
  try {
    const {
      patient_name,
      doctor_name,
      consultation_fee,
      medicine_fee,
      lab_fee,
      other_fee,
      total,
      bill_date
    } = req.body;

    await db.query(
      `INSERT INTO billing
      (patient_name, doctor_name, consultation_fee, medicine_fee, lab_fee, other_fee, total, bill_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        patient_name,
        doctor_name,
        consultation_fee,
        medicine_fee,
        lab_fee,
        other_fee,
        total,
        bill_date
      ]
    );

    res.json({ message: "Bill Added Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.put("/billing/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      patient_name,
      doctor_name,
      consultation_fee,
      medicine_fee,
      lab_fee,
      other_fee,
      total,
      bill_date
    } = req.body;

    await db.query(
      `UPDATE billing
       SET patient_name=?,
           doctor_name=?,
           consultation_fee=?,
           medicine_fee=?,
           lab_fee=?,
           other_fee=?,
           total=?,
           bill_date=?
       WHERE id=?`,
      [
        patient_name,
        doctor_name,
        consultation_fee,
        medicine_fee,
        lab_fee,
        other_fee,
        total,
        bill_date,
        id
      ]
    );

    res.json({
      message: "Bill Updated Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.delete("/billing/:id", async (req, res) => {
  try {

    await db.query(
      "DELETE FROM billing WHERE id=?",
      [req.params.id]
    );

    res.json({
      message: "Bill Deleted Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.post("/bulk-upload", upload.single("file"), async (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);

    const sheetName = workbook.SheetNames[0];

    const data = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );

    console.log(data);

    for (const row of data) {

      await db.query(
        `INSERT INTO patients
        (
          user_id,
          patient_name,
          gender,
          age,
          phone,
          address,
          disease,
          doctor_name,
          admission_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          1, // users table मधील existing user id
          row.patient_name,
          row.gender,
          row.age,
          row.phone,
          row.address,
          row.disease,
          row.doctor_name,
          row.admission_date
        ]
      );

    }

    res.json({
      message: "Bulk Upload Successful"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Bulk Upload Failed"
    });
  }
});
app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});