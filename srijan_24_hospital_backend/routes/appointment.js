const express = require('express');
const Appointment = require('../models/Appointment')
const Doctor = require('../models/Doctor')
const Patient = require('../models/Patient')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');


// ROUTE 1 - get all the appointment using: GET '/api/appointment/getallappointments'. Login required
router.get('/getallappointments', fetchuser, async (req, res) => {
    try {
        // getting all the appointment data
        const appointmentData = await Appointment.find({ user: req.user.id });
        res.status(200).send(appointmentData);
    } catch (error) {
        console.log(error);
        res.status(500).send({ success, message: "500: Internal Server Error" })
    }
})

// ROUTE 2 - add a new appoinment using: POST '/api/appointment/book-appintment'. Login required
router.post('/book-appointment/:doctorId', fetchuser, [
    body('name').exists(),
    body('date').exists(),
    body('time').exists()
], async (req, res) => {

    let success = false;

    // if there exist error then send bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // added a new appointment
        const { name, date, time } = req.body;

        // finding a patientUser using an "UserId"
        const patientUser = await Patient.findOne({ user: req.user.id })
        const patientId = patientUser._id.toString();
        console.log(patientId)

        // finding patient using their "doctorId(passed as a parameter)"
        const doctor = await Doctor.findOne({ _id: req.params.doctorId })
        const doctorAppointments = doctor.Appointment;
        doctorAppointments.push({
            id: Math.random().toString(),
            user: req.user.id,
            patient: patientId,
            doctor: req.params.doctorId,
            name, date, time
        })
        await doctor.save()
        //console.log(doctorAppointments)

        // finding patient using their "patientId"
        const patient = await Patient.findOne({ _id: patientId })
        const patientAppointments = patient.Appointment;
        patientAppointments.push({
            id: Math.random().toString(),
            user: req.user.id,
            patient: patientId,
            doctor: req.params.doctorId, name, date, time
        })
        await patient.save()

        // to Delete this code snippet ********
        const newAppointment = new Appointment({
            name, date, time, user: req.user.id, doctor: req.params.doctorId
        })
        await newAppointment.save();
        success = true;
        res.status(200).send({ success, message: "Appointment Booked Successfully" })
        success = false;

    } catch (error) {
        console.log(error);
        res.status(500).send({ success, error: "500: Internal Server Error" })
    }
})

// ROUTE 3 - delete an appoinment(with id) using: POST '/api/appointment/delete-appintment'. Login required
router.post('/delete-appintment/:cardId', fetchuser, async (req, res) => {

    try {

        // finding a patientUser using an "UserId"
        const patientUser = await Patient.findOne({ user: req.user.id })
       // console.log(patientUser)
        if (patientUser!==null) {
            const patientId = patientUser._id.toString();
            //console.log(patientId)

            // const patient = await Patient.findOne({ _id: patientId })
            // let patientAppointments = patient.Appointment;
            // const newPatientAppointments = patientAppointments.filter((patientAppointment) => {
            //     return patientAppointment.id !== req.params.cardId
            // })
            // patientAppointments = []
            // patientAppointments.push({newPatientAppointments})
            // await patient.save()

            const patient = await Patient.findOneAndUpdate({ _id: patientId }, { $pull: { Appointment: { id: { $in: [`${req.params.cardId}`] } } } })
           //console.log(patient);
            // console.log("Patients Appintment (backend):",patientAppointments)
            res.status(200).send({ success: true, message: "Appointment Deleted Successfully" })
        }
        else if(patientUser===null){
            const doctorUser = await Doctor.findOne({ user: req.user.id })
            const doctorId = doctorUser._id;
          //  console.log(doctorId)
            const doctor = await Doctor.findOneAndUpdate({ _id: doctorId }, { $pull: { Appointment: { id: { $in: [`${req.params.cardId}`] } } } })
           // console.log(doctor.Appointment);
            res.status(200).send({ success: true, message: "Appointment Deleted Successfully" })
        }
        else{
            res.send({});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error: "Error in Deleting an appointment from the array" })
    }

})

module.exports = router;