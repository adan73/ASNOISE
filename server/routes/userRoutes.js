const express = require('express');
const { userController } = require('../controllers/userController'); // Ensure this path is correct
const user_router = express.Router();

user_router.post('/addUser', userController.addUser);
user_router.post('/getUser', userController.getUser);
user_router.post('/login', userController.handleLogin); // Map login endpoint to handleLogin

module.exports = user_router;
