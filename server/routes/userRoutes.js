const express = require('express');
const { userController } = require('../controllers/userController'); // Ensure this path is correct
const user_router = express.Router();

user_router.post('/addUser', userController.addUser);
user_router.post('/getUser', userController.getUser);

module.exports = user_router;
