const express = require('express');
const { TreatmentMethodController } = require('../controllers/TreatmentMethodController'); 
const treatment_router = express.Router();


treatment_router.get('/:patient_id', TreatmentMethodController.getTreatment); 
treatment_router.post('/', TreatmentMethodController.addTreatment); 


module.exports = treatment_router;