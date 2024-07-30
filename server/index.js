// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');
const activityRoutes = require('./routes/activityRoutes');
const treatmentRoutes = require('./routes/treatmentRoutes');

const { dbConnection } = require('../server/db_connection');

const app = express();
const port = process.env.PORT || 8081;

app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/api/hospitals', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const apiUrl = process.env.API_URL; // Use environment variable
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});


app.use(cors());

app.get('http://www.communitybenefitinsight.org/api/get_hospitals.php?state=IL', (req, res) => {
  res.json({ message: 'This is CORS-enabled for all origins!' });
});


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

app.use("/images", express.static(`${__dirname}/public`));

app.use('/api/treatment', treatmentRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/users', userRoutes);
app.use(bodyParser.urlencoded({ extended: true })); 

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
