const express = require('express');
const { activityController } = require('../controllers/activityController');
const activity_router = express.Router();

activity_router.post('/addActivity', activityController.addActivity);
activity_router.get('/getAllActivity', activityController.getAllActivity);
activity_router.post('/getDateActivity', activityController.getActivityFor_Date);

module.exports = activity_router;
