// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8081;
const userRoutes = require('./routes/userRoutes');


app.use(bodyParser.json());
app.use('/api/users', userRoutes);


app.get('/test', (req, res) => {
    res.send('Server is working!');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
