const express = require('express');
const { activityController } = require('../controllers/activityController'); // Ensure this path is correct
const activity_router = express.Router();

activity_router.post('/addActivity', activityController.addPatient);
activity_router.post('/getActivity', activityController.getPatients);

module.exports = activity_router;
