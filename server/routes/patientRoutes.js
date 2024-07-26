const express = require('express');
const { patientController } = require('../controllers/patientController'); // Ensure this path is correct
const patient_router = express.Router();

patient_router.post('/addPatient', patientController.addPatient);
patient_router.get('/Allpatients', patientController.getPatients);
patient_router.get('/:first_name/:photo', patientController.getDoctorPatients);
patient_router.get('/:patient_id', patientController.getDoctor);
patient_router.delete('/:patient_id', patientController.deletePatient);
patient_router.put('/', patientController.updatePatient);
module.exports = patient_router;
