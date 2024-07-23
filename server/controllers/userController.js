const { dbConnection } = require("../db_connection");

const userController = {
  async addUser(req, res) {
    const {users_id,first_name,last_name,user_password,email,profile_image,username,user_type} = req.body;

    if (!users_id ||!first_name ||!last_name ||!user_password ||!email ||!profile_image ||!username || !user_type) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const connection = await dbConnection.createConnection();

    try {
      let [rows1] = await connection.execute(
        `SELECT * FROM dbShnkr24stud.tbl_121_users WHERE users_id = ?`,
        [users_id]
      );
      if (rows1.length > 0) {
        return res.status(400).json({ error: "User ID already exists" });
      }

      let [rows2] = await connection.execute(
        `SELECT * FROM dbShnkr24stud.tbl_121_users WHERE username = ?`,
        [username]
      );
      if (rows2.length > 0) {
        return res.status(400).json({ error: "Username already exists" });
      }

      let [rows3] = await connection.execute(
        `SELECT * FROM dbShnkr24stud.tbl_121_users WHERE email = ?`,
        [email]
      );
      if (rows3.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }
      const [result] = await connection.execute(
        `INSERT INTO dbShnkr24stud.tbl_121_users (users_id, first_name, last_name, user_password, email, profile_image, username, user_type) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [users_id, first_name, last_name, user_password, email, profile_image, username, user_type]
    );

      if (result.affectedRows > 0) {
        res
          .status(200)
          .json({ success: true, message: "User added successfully" });
      } else {
        res.status(500).json({ error: "Failed to add user" });
      }
    } catch (err) {
      console.error("Error inserting user into the database:", err.message);
      res.status(500).json({ error: "Error inserting user into the database" });
    } finally {
      await connection.end();
    }
  },
  async getUser(req, res) {
    const { username, user_password } = req.body;

    if (!user_password || !username) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const connection = await dbConnection.createConnection();

    try {
      let [rows] = await connection.execute(
        `SELECT * FROM dbShnkr24stud.tbl_121_users WHERE username = '${username}'`
      );

      if (rows.length === 0) {
        return res
          .status(404)
          .json({ error: "User not found , username is invalid" });
      }

      const user = rows[0];

      if (user.user_password !== user_password) {
        return res.status(401).json({ error: "Invalid password" });
      }

      res.status(200).json(rows);
    } catch (err) {
      console.error("Error retrieving user from the database:", err.message);
      res
        .status(500)
        .json({ error: "Error retrieving data from the database" });
    } finally {
      connection.end();
    }
  },

  async handleLogin(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const connection = await dbConnection.createConnection();

    try {
      const [rows] = await connection.execute(
        `SELECT * FROM dbShnkr24stud.tbl_121_users WHERE username = '${username}' AND user_password = '${password}'`
      );
      if (rows.length > 0) {
        res.json({ success: true });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await connection.end();
    }
  },
};

module.exports = { userController };
