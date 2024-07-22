// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const { dbConnection } = require('../server/db_connection');

const app = express();
const port = process.env.PORT || 8081;


app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.set('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE");
    res.set('Content-Type', 'application/json');
    next();
});

app.use('/api/user', userRoutes);
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.get('/test', (req, res) => {
    res.send('Server is working!');
});


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const connection = await dbConnection.createConnection();

    try {
        const [rows] = await connection.execute('SELECT * FROM dbShnkr24stud.tbl_121_users WHERE username = ? AND user_password = ?', [username, password]);

        if (rows.length > 0) {
            // User found and password matches
            res.json({ success: true });
        } else {
            // User not found or password incorrect
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await connection.end();
    }
});



app.listen(port, '127.0.0.1', (err) => {
    if (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
    console.log(`Server is running on http://127.0.0.1:${port}`);
});
