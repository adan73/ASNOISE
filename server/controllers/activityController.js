
const { dbConnection } = require("../db_connection");

const activityController = {
    async addActivity(req, res) {
      const {username ,time ,the_activity , date} = req.body;
  
      if (!the_activity ||!time ||!username || !date) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const connection = await dbConnection.createConnection();
  
      try {
        let [rows1] = await connection.execute(
          `SELECT * FROM dbShnkr24stud.tbl_121_user_activity WHERE username= '${username}' AND  date = '${date}' AND time = '${time}'`);
        if (rows1.length > 0) {
          return res.status(400).json({ error: "There is an activity in this time in this date for the username already" });
        }
  
        const [result] = await connection.execute(
          `INSERT INTO dbShnkr24stud.tbl_121_user_activity (username ,time ,the_activity , date ) 
          VALUES ( '${username}' ,  '${time}' ,  '${the_activity}' , '${date}')`);
  
        if (result.affectedRows > 0) {
          res
            .status(200)
            .json({ success: true, message: "Activity added successfully" });
        } else {
          res.status(500).json({ error: "Failed to add Activity" });
        }
      } catch (err) {
        console.error("Error inserting user into the database:", err.message);
        res.status(500).json({ error: "Error inserting user into the database" });
      } finally {
        await connection.end();
      }
    },
    async getAllActivity(req, res) {
      const connection = await dbConnection.createConnection();
  
      try {
        let [rows] = await connection.execute(
          `SELECT * FROM dbShnkr24stud.tbl_121_user_activity`
        );
  
        if (rows.length === 0) {
          return res.status(404).json({ error: "there no activity " });
        }

        res.status(200).json(rows);

      } catch (err) {
        console.error("Error retrieving user from the database:", err.message);
        res.status(500).json({ error: "Error retrieving data from the database" });
      } finally {
        connection.end();
      }
    },
    async  getActivityFor_Date(req, res) {
      const connection = await dbConnection.createConnection();
      try {
    
        let [rows] = await connection.execute(
          `SELECT * FROM dbShnkr24stud.tbl_121_user_activity WHERE username = '${req.params.username}' AND date ='${req.params.date}'` );
    
        if (rows.length === 0) {
          return res.status(404).json({message: "There is not a activity in this date" } );
        }
    
        res.status(200).json(rows);
    
      } catch (err) {
        console.error("Error retrieving user from the database:", err.message);
        res.status(500).json({ error: "Error retrieving data from the database" });
      } finally {
        connection.end();
      }
    }
    

};

module.exports = { activityController };