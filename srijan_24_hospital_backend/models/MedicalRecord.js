const mongoose = require('mongoose')

const medicalRecordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // patient: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Patient'
    // },
    // doctor: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Doctor'
    // },
    doctorName: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    medicines: {
        type: String,
        required: true
    },
    advice: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema)