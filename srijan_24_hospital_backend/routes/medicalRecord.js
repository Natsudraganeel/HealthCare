const express = require('express');
const MedicalRecord = require('../models/MedicalRecord');
const Patient = require('../models/Patient')
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

// ROUTE 1 - get all medicalRecords using: GET "api/medical-records/getmedicalrecords". Login required
router.get('/getmedicalrecords', fetchuser, async(req, res) => {
    try {
        // get all the medical records of the user (patient)
        const medicalRecordData = await MedicalRecord.find({user: req.user.id})
        res.status(200).send(medicalRecordData)

    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error while getting the medical-record data"})
    }
})

// ROUTE 2 - add a new medicalRecord using: POST "api/medical-records/createmedicalrecord". Login required
router.post('/createmedicalrecord/:patientId', fetchuser, async(req, res) => {
    try {

        // pushing an element in the medicalRecords of the Patient model 
        const {doctorName, patientName, date, medicines, advice} = req.body;
        const patient = await Patient.findOne({_id: req.params.patientId})
        let patientMedicalRecord = patient.medicalRecords;
        patientMedicalRecord.push({
            id: Math.random().toString(),
            doctorName, patientName, date, medicines, advice
        })
        await patient.save()
        console.log(patientMedicalRecord)

        // create a new medical record
        let medicalRecord = await new MedicalRecord({...req.body, user: req.user.id})
        await medicalRecord.save()
        res.status(200).send(medicalRecord)

    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error while adding the medical-record data"})
    }
})

module.exports = router;