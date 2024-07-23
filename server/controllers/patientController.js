const { dbConnection } = require("../db_connection");


const patientController = {

    async addPatient(req, res) {
        const {first_name, last_name,patient_id, hmo,  adhdStage, age,career, address,phone,email,photo} = req.body;
      
        if (!patient_id || !first_name || !last_name || !email || !photo || !career ||!adhdStage ||!address) {
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
            `INSERT INTO dbShnkr24stud.tbl_121_patients (first_name, last_name,patient_id, hmo,  adhdStage, age, career,  address,phone, email,photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
            [first_name, last_name,patient_id, hmo,  adhdStage, age, career,  address,phone, email,photo] );
    
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
  }
      


};

module.exports = { patientController };
