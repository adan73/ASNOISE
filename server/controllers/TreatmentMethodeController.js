const { dbConnection } = require("../db_connection");


const TreatmentMethodeController = {
    async addTreatment(req, res) {
      const {patient_id,method} = req.body;
  
      if (!patient_id||!method) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      
      const connection = await dbConnection.createConnection();
  
      try {
        let [rows1] = await connection.execute(
          `SELECT * FROM dbShnkr24stud.tbl_121_p_treatment_methods WHERE patient_id ='${patient_id}' AND method = '${method}'`
        );
        if (rows1.length > 0) {
          return res.status(400).json({ error: "Patient already have this method" });
        }
        const [result] = await connection.execute(
          `INSERT INTO dbShnkr24stud.tbl_121_p_treatment_methods (patient_id, method) VALUES ('${patient_id}' ,'${method}')`
      );
  
        if (result.affectedRows > 0) {
          res
            .status(200)
            .json({ success: true, message: "Method added successfully" });
        } else {
          res.status(500).json({ error: "Failed to add Method" });
        }
      } catch (err) {
        console.error("Error inserting Method into the database:", err.message);
        res.status(500).json({ error: "Error inserting Method into the database" });
      } finally {
        await connection.end();
      }
    },
    async getTreatment(req, res) {
    
      const connection = await dbConnection.createConnection();
  
      try {
        let [rows] = await connection.execute(
          `SELECT * FROM dbShnkr24stud.tbl_121_p_treatment_methods WHERE patient_id = '${req.params.patient_id}' `
        );
  
        if (rows.length > 0) {
          res.json({success: true,treatments: rows});
        }
        if (rows.length === 0) {
          return res
            .status(404)
            .json({ error: "method not found" });
        }
      } catch (err) {
        console.error("Error retrieving method from the database:", err.message);
        res
          .status(500)
          .json({ error: "Error retrieving data from the database" });
      } finally {
        connection.end();
      }
    },
};

module.exports = { TreatmentMethodeController };