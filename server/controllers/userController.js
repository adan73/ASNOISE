
const { dbConnection } = require('../db_connection');


const userController = {
    async addUser(req, res) {
        const {users_id, first_name, last_name, user_password, email, profile_image } = req.body;
    
        if (!users_id || !first_name || !last_name|| !user_password || !email || !profile_image) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const connection = await dbConnection.createConnection();

        try {
            // Check if a user with the same email already exists
            let [rows] = await connection.execute(`SELECT * FROM dbShnkr24stud.tbl_121_users WHERE users_id = '${users_id}'`);
            if (rows.length > 0) {
            // User with the same user_id exists
             return res.status(400).json({ error: "User already exists" });
            }
            const [result] = await connection.execute(
                `INSERT INTO dbShnkr24stud.tbl_121_users (users_id, first_name, last_name, user_password, email,profile_image) VALUES ('${users_id}', '${first_name}', '${last_name}', '${user_password}', '${email}', '${profile_image}')`,
            );
            if (result.affectedRows !== 0) {
                res.status(200).json({ message: "User added successfully" });
            }
        } catch (err) {
            console.error('Error inserting user into the database:', err.message);
            res.status(500).json({ error: "Error inserting user into the database" });
        }
    },
    async getUser(req, res) {
        const {email, user_password } = req.body;
    
        if (!user_password || !email) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const connection = await dbConnection.createConnection();

        try {
            let [rows] = await connection.execute('SELECT * FROM dbShnkr24stud.tbl_121_users WHERE email = ?', [email]);
        
            if (rows.length === 0) {
                return res.status(404).json({ error: "User not found" });
            }
    
            const user = rows[0];
    
            if (user.user_password !== user_password) {
                return res.status(401).json({ error: "Invalid password" });
            }
    
            res.status(200).json(rows);
        } catch (err) {
            console.error('Error retrieving user from the database:', err.message);
            res.status(500).json({ error: "Error retrieving data from the database" });
        } finally {
            connection.end();
        }
    }
};


module.exports = { userController };
