const express = require('express');
const { patientController } = require('../controllers/patientController'); // Ensure this path is correct
const patient_router = express.Router();

patient_router.post('/addPatient', patientController.addPatient);
patient_router.get('/Allpatients', patientController.getPatients);
patient_router.post('/getDoctorPatients', patientController.getDoctorPatients);
patient_router.post('/getDoctor', patientController.getDoctor);
patient_router.delete('/deletePatient', patientController.deletePatient);
patient_router.put('/updatePatient', patientController.updatePatient);
module.exports = patient_router;
