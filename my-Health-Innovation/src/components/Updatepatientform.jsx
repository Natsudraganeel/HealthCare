import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./spinner.jsx";
import UserContext from '../../context/UserContext.js';
import { ToastContainer, toast } from 'react-toastify';
import PatientContext from "../../context/Patientcontext.js";
import axios from "axios";

export default function UpdatePatientForm() {
  const { user } = useContext(UserContext);
  const { patient } = useContext(PatientContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    firstName: patient.firstName,
    lastName: patient.lastName,
    phoneNumber: patient.phoneNumber,
    street: patient.street,
    city: patient.city,
    state: patient.state,
    pinCode: patient.pinCode
  });
  const [genderData, setGenderData] = useState(patient.genderData);
  const [bloodData, setBloodData] = useState(patient.bloodData);
  const [dateOfBirth, setDateOfBirth] = useState(patient.dateOfBirth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const time1 = new Date();
    const time2=new Date(`${dateOfBirth}T00:00:01Z`);
    // console.log(time1);
    // console.log(time2);
    if(time2>time1){
return toast.error("enter valid dob");
    }
        try{
      const res = await axios.put("https://healthcare-backend-z0xu.onrender.com/api/patients/update-patient", {
        id: patient._id,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        dateOfBirth: dateOfBirth,
        phoneNumber: credentials.phoneNumber,
        street: credentials.street,
        city: credentials.city,
        state: credentials.state,
        pinCode: credentials.pinCode,
        medicalRecords: patient.medicalRecords,
        Appointment: patient.Appointment,
        gender: genderData,
        bloodGroup: bloodData
      },{
        headers:{
          'auth-token':`${user.authToken}`
        }
      });
      if(res.data.success){
      // console.log(res.data.result);
      navigate('/patient-dashboard');
      }
      else{
        alert(res.data.message)
      }
        }
    catch(err){
      console.log(err.message);
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const genderOptions = ["Male", "Female", "Others"];
  const bloodOptions = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const genderOptionChangeHandler = (event) => {
    setGenderData(event.target.value);
  };

  const bloodOptionChangeHandler = (event) => {
    setBloodData(event.target.value);
  };

  const DateOptionChangeHandler = (event) => {
    setDateOfBirth(event.target.value);
  };

  return (
    <>
            {
     user.authToken ? (
    <div className="max-w-4xl mx-auto p-4">
      <form className="border-2 border-black rounded-lg p-6" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center mb-6">Fill up your details</h1>
        
        <section>
          <h2 className="text-xl mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
              <input 
                value={credentials.firstName} 
                onChange={handleChange} 
                type="text" 
                name="firstName" 
                id="firstName" 
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
              <input 
                value={credentials.lastName} 
                onChange={handleChange} 
                type="text" 
                name="lastName" 
                id="lastName" 
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
              <select 
                value={genderData} 
                onChange={genderOptionChangeHandler} 
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Please choose one option</option>
                {genderOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="bloodGroup" className="block mb-2 text-sm font-medium text-gray-900">Blood Group</label>
              <select 
                value={bloodData} 
                onChange={bloodOptionChangeHandler} 
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Please choose one option</option>
                {bloodOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900">Date of Birth</label>
              <input 
                value={dateOfBirth} 
                onChange={DateOptionChangeHandler} 
                type="date" 
                name="dateOfBirth" 
                id="dateOfBirth" 
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-xl mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
              <input 
                value={credentials.phoneNumber} 
                onChange={handleChange} 
                type="tel" 
                name="phoneNumber" 
                id="phoneNumber" 
                minLength={10} maxLength={10}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-xl mb-4">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-900">Street</label>
              <input 
                value={credentials.street} 
                onChange={handleChange} 
                type="text" 
                name="street" 
                id="street" 
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
              <input 
                value={credentials.city} 
                onChange={handleChange} 
                type="text" 
                name="city" 
                id="city" 
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900">State</label>
              <input 
                value={credentials.state} 
                onChange={handleChange} 
                type="text" 
                name="state" 
                id="state" 
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pinCode" className="block mb-2 text-sm font-medium text-gray-900">Pin Code</label>
              <input 
                value={credentials.pinCode} 
                onChange={handleChange} 
                type="tel" 
                name="pinCode" 
                id="pinCode" 
                minLength={6} maxLength={6}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </section>
        
        <div className="text-center mt-6">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Update</button>
        </div>
      </form>
        <ToastContainer bodyClassName="toastBody" />
    </div>
    )
    :(
      <Spinner/>
          )
    }
    </>
  );
}
