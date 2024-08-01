const express = require('express');
const { userController } = require('../controllers/userController'); // Ensure this path is correct
const user_router = express.Router();

user_router.get('/', userController.getAllUsers);
user_router.post('/addUser', userController.addUser);
user_router.get('/:username/:user_password', userController.getUser);
user_router.post('/', userController.handleLogin); 
user_router.get('/:username', userController.getUserFirstNameAndPhotoAndId); 

module.exports = user_router;
