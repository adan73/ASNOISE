const express = require('express');
const { activityController } = require('../controllers/activityController'); // Ensure this path is correct
const activity_router = express.Router();

activity_router.post('/addActivity', activityController.addActivity);
activity_router.get('/getActivity', activityController.getActivity);

module.exports = activity_router;
