const express = require('express');
const { improvementController } = require('../controllers/improvementController');
const improvement_router = express.Router();

improvement_router.post('/', improvementController.addImprovement);
improvement_router.get('/:patient_id', improvementController.getImprovement);

module.exports = improvement_router;