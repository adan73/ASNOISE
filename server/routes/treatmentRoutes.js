const express = require('express');
const { TreatmentMethodeController } = require('../controllers/TreatmentMethodeController'); 
const treatment_router = express.Router();


treatment_router.get('/:patient_id', TreatmentMethodeController.getTreatment); 
treatment_router.post('/:patient_id/:method', TreatmentMethodeController.addTreatment); 


module.exports = treatment_router;