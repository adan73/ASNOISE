const { dbConnection } = require("../db_connection");


const patientController = {

    async addPatient(req, res) {
        const {first_name, last_name,patient_id, hmo,  adhdStage, age,career, address,phone,email,photo, doctor , doctor_photo} = req.body;
        
        if (!patient_id || !first_name || !last_name || !email || !photo || !career ||!adhdStage ||!address ||!doctor ||!doctor_photo) {
          return res.status(400).json({ error: "Missing required fields" });
        }
        
        const connection = await dbConnection.createConnection();
      
        try {
            let [rows] = await connection.execute(
                `SELECT * FROM dbShnkr24stud.tbl_121_patients WHERE patient_id = ?`,
                [patient_id]
              );
              if (rows.length > 0) {
                return res.status(400).json({ error: "patient already exists" });
              }
              const [result] = await connection.execute(
            `INSERT INTO dbShnkr24stud.tbl_121_patients (first_name, last_name,patient_id, hmo,  adhdStage, age, career,  address,phone, email,photo , doctor , doctor_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`,
            [first_name, last_name,patient_id, hmo,  adhdStage, age, career,  address,phone, email,photo, doctor , doctor_photo] );
    
      if (result.affectedRows > 0) {
        res.status(200).json({ success: true, message: "Patient added successfully" });
      } else {
        res.status(500).json({ error: "Failed to add Patient" });
      }
    } catch (err) {
      console.error("Error inserting user into the database:", err.message);
      res.status(500).json({ error: "Error inserting user into the database" });
    } finally {
      await connection.end();
    }
    },

    async  getPatients(req, res) {
    const connection = await dbConnection.createConnection();
    try {
      const [rows] = await connection.execute('SELECT * FROM dbShnkr24stud.tbl_121_patients '); 
      if (rows.length === 0) {
        return res.status(400).json({ error: "There are no patients" });
      }
      res.status(200).json({ patients: rows });
    } catch (err) {
      console.error('Error fetching patients from database:', err);
      res.status(500).json({ error: 'Error fetching patients from database' });
    } finally {
      await connection.end();
    }
  },
  async  getDoctorPatients(req, res) {
    const{username,photo} = req.body;
    
    if (!username || !photo) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const connection = await dbConnection.createConnection();
    try {
      const [rows] = await connection.execute( `SELECT * FROM dbShnkr24stud.tbl_121_patients WHERE doctor = '${username}' AND doctor_photo = '${photo}' `); 
      if (rows.length === 0) {
        return res.status(400).json({ error: "There are no patients" });
      }
      res.status(200).json({ patients: rows });
    } catch (err) {
      console.error('Error fetching patients from database:', err);
      res.status(500).json({ error: 'Error fetching patients from database' });
    } finally {
      await connection.end();
    }
  },
  async  getDoctor(req, res) {
    const{patient_id} = req.body;
    
    if (!patient_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const connection = await dbConnection.createConnection();
    try {
      const [rows] = await connection.execute( `SELECT * FROM dbShnkr24stud.tbl_121_patients WHERE patient_id = '${patient_id}' `); 
      if (rows.length === 0) {
        return res.status(400).json({ error: "There are no patient with this id" });
      }
      if (rows.length > 0) {
        const patient = rows[0];
        res.json({ doctor: patient.doctor , doctor_photo: patient.doctor_photo});
      }
    } catch (err) {
      console.error('Error fetching patients from database:', err);
      res.status(500).json({ error: 'Error fetching patients from database' });
    } finally {
      await connection.end();
    }
  },
  async  deletePatient(req, res) {
    const { patient_id } = req.body;
  
    if (!patient_id) {
      return res.status(400).json({ error: "Missing patient_id" });
    }
  
    const connection = await dbConnection.createConnection();
  
    try {
      const [result] = await connection.execute(
        `DELETE FROM dbShnkr24stud.tbl_121_patients WHERE patient_id = '${patient_id}'`);
  
      if (result.affectedRows > 0) {
        res.status(200).json({ success: true, message: "Patient deleted successfully" });
      } else {
        res.status(404).json({ error: "Patient not found" });
      }
    } catch (err) {
      console.error("Error deleting patient from the database:", err.message);
      res.status(500).json({ error: "Error deleting patient from the database" });
    } finally {
      connection.end();
    }
  }
};    

module.exports = { patientController };
