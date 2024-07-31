const { dbConnection } = require("../db_connection");

const improvementController = {
  async addImprovement(req, res) {
    const { patient_id, current, target } = req.body;
    if (!patient_id || !current || !target) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const connection = await dbConnection.createConnection();
    try {
        let [rows1] = await connection.execute(`SELECT * FROM dbShnkr24stud.tbl_121_p_treatment_improvement WHERE patient_id = '${patient_id}'`);
          if (rows1.length > 0) {
            return res.status(400).json({ error: "Patient already have improvement and goal exists" });
        }
      const [result] = await connection.execute(
        `INSERT INTO dbShnkr24stud.tbl_121_p_treatment_improvement (patient_id, current, target) 
        VALUES ('${patient_id}', '${current}', '${target}') `
      );
      if (result.affectedRows > 0) {
        res.status(200).json({ success: true, message: "improvement added successfully" });
      } else {
        res.status(500).json({ error: "Failed to add improvement" });
      }
    } catch (err) {
      console.error("Error inserting improvement into the database:", err.message);
      res.status(500).json({ error: "Error inserting improvement into the database" });
    } finally {
      await connection.end();
    }
  },
  async getImprovement(req, res) {
    const connection = await dbConnection.createConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM dbShnkr24stud.tbl_121_p_treatment_improvement WHERE patient_id = '${req.params.patient_id}'`
      );
      if (rows.length === 0) {
        return res.status(400).json({ error: "There are no improvement and goal for this patient" });
      }
      res.status(200).json({ success: true, improvement: rows});
    } catch (err) {
        console.error("Error inserting improvement into the database:", err.message);
        res.status(500).json({ error: "Error inserting improvement into the database" });
    } finally {
      await connection.end();
    }
  },
};

module.exports = { improvementController };
