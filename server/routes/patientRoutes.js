const express = require('express');
const { patientController } = require('../controllers/patientController'); // Ensure this path is correct
const patient_router = express.Router();

patient_router.post('/addPatient', patientController.addPatient);

module.exports = patient_router;
