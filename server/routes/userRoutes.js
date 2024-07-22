const express = require('express');
const { userController } = require('../controllers/userController'); // Ensure this path is correct
const user_router = express.Router();

user_router.get('/addUser', userController.addUser);

module.exports = user_router;
