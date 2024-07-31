const { dbConnection } = require("../db_connection");

const chatController = {
  async addChat(req, res) {
    const { patient_id, sender, chat } = req.body;
    if (!patient_id || !sender || !chat) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const connection = await dbConnection.createConnection();
    try {
      const [result] = await connection.execute(
        `INSERT INTO dbShnkr24stud.tbl_121_chat ( patient_id, sender, chat) 
        VALUES ('${patient_id}', '${sender}', '${chat}') `
      );
      if (result.affectedRows > 0) {
        res.status(200).json({ success: true, message: "message added successfully" });
      } else {
        res.status(500).json({ error: "Failed to add message" });
      }
    } catch (err) {
      console.error("Error inserting message into the database:", err.message);
      res.status(500).json({ error: "Error inserting message into the database" });
    } finally {
      await connection.end();
    }
  },
  async getPatientChat(req, res) {
    const connection = await dbConnection.createConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM dbShnkr24stud.tbl_121_chat WHERE patient_id = '${req.params.patient_id}'`
      );
      if (rows.length === 0) {
        return res.status(400).json({ error: "There are no chat history for this patient" });
      }
      res.status(200).json({ messages: rows });
    } catch (err) {
      console.error("Error inserting message into the database:", err.message);
      res.status(500).json({ error: "Error inserting message into the database" });
    } finally {
      await connection.end();
    }
  },
};

module.exports = { chatController };
