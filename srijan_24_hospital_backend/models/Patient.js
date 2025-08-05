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
    enum: ['Male', 'Female', 'Others',"Not filled"],
    required: true
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+","Not filled"],
  },

  // Contact Information

  phoneNumber: {
    type: Number,
    require:true
  },

  street: {
    type: String,
    require:true
  },
  city: {
    type: String,
    require:true
  },
  state: {
    type: String,
    require:true
  },
  pinCode: {
    type: Number,
    require:true
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
