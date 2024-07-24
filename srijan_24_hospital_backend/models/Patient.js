const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // Personal Information
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Others'],
    required: true
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
  },

  // Contact Information

  phoneNumber: {
    type: Number,
  },

  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pinCode: {
    type: String,
  },


  // Medical History
  // medicalHistory: {
  //   allergies: [String],
  //   medications: [String],
  //   surgeries: [String],
  //   conditions: [String],
  // },

  // Reference to Medical Records
  medicalRecords: {
    type: Array,
    default: []
  },
  Appointment: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Patient', patientSchema);
