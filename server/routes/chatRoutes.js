const express = require('express');
const { chatController } = require('../controllers/chatController'); // Ensure this path is correct
const chat_router = express.Router();

chat_router.post('/', chatController.addChat);
chat_router.get('/:patient_id', chatController.getPatientChat);

module.exports = chat_router;