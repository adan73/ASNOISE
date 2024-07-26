// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');
const activityRoutes = require('./routes/activityRoutes');

const { dbConnection } = require('../server/db_connection');

const app = express();
const port = process.env.PORT || 8081;


app.use('/images', express.static(path.join(__dirname, 'public/images')));




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
app.use(express.static('client'));


app.use('/api/activity', activityRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/users', userRoutes);
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.get('/test', (req, res) => {
    res.send('Server is working!');
});





app.listen(port ,(err) => {
    if (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
    console.log(`Server is running on ${port}`);
});
