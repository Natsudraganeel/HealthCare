const mongoose = require('mongoose');
const Appointment = require('./Appointment');

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    fees: {
        type: Number,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    experienceInYears: {
        type: Number,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    Appointment: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('Doctor', doctorSchema);