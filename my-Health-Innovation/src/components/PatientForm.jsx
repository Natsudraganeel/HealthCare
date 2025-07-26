import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext.js';
import PatientContext from "../../context/Patientcontext.js";
export default function PatientForm() {
  const { user } = useContext(UserContext);

  // used for navigating through pages
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ 
    firstName: "", lastName: "", dateOfBirth: "", phoneNumber: "", 
    street: "", city: "", state: "", pinCode: "", 
    medicalRecords: [], Appointment: [] 
  });
  const [genderData, setGenderData] = useState();
  const [bloodData, setBloodData] = useState();
  const { patient,setpatient } = useContext(PatientContext);
  const container = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10% 0",
    padding: "20px",
    border: "2px solid black",
    width: "90%",
    maxWidth: "800px",
  };

  const row = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "20px",
  };

  const column = {
    flex: "1 1 calc(50% - 20px)",
    margin: "10px",
    minWidth: "280px",
  };

  const input = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const btnContainer = {
    display: "flex",
    justifyContent: "center",
  };

  const btn = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(credentials);
    console.log(genderData);
    console.log(bloodData);
    console.log(patient);
    const time1 = new Date();
        const time2=new Date(`${credentials.dateOfBirth}T00:00:01Z`);
        console.log(time1);
        console.log(time2);
        if(time2>time1){
    return toast.error("enter valid dob");
        }
    const response = await fetch('http://localhost:8000/api/patients/update-patient', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({ 
        id:patient._id,
        firstName: credentials.firstName, lastName: credentials.lastName, 
        dateOfBirth: credentials.dateOfBirth, phoneNumber: credentials.phoneNumber, 
        street: credentials.street, city: credentials.city, state: credentials.state, 
        pinCode: credentials.pinCode, medicalRecords: credentials.medicalRecords, 
        Appointment: credentials.Appointment, gender: genderData, bloodGroup: bloodData 
      }),
    });

    const json = await response.json();
    console.log(json);
    if(json.success){
      setpatient(json.result);
      localStorage.setItem("patient", JSON.stringify(json.result));
      navigate('/patient-dashboard');
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

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form style={container} onSubmit={handleSubmit}>
        <h1 style={{ textAlign: 'center', font: 'normal 30px Arial, sans-serif' }}>Fill up your details</h1>
        
        <section>
          <h2 style={{ fontSize: '20px', marginLeft: '10px' }}>Personal information</h2>
          <div style={row}>
            <div style={column}>
              <label>First Name</label>
              <input onChange={handleChange} style={input} type="text" name="firstName" required />
            </div>
            <div style={column}>
              <label>Last Name</label>
              <input onChange={handleChange} style={input} type="text" name="lastName" required />
            </div>
            <div style={column}>
              <label>Gender</label>
              <select style={input} onChange={genderOptionChangeHandler} required>
                <option>Please choose one option</option>
                {genderOptions.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </select>
            </div>
            <div style={column}>
              <label>Blood Group</label>
              <select style={input} onChange={bloodOptionChangeHandler} required>
                <option>Please choose one option</option>
                {bloodOptions.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </select>
            </div>
            <div style={column}>
              <label>Date of Birth</label>
              <input onChange={handleChange} style={input} type="date" name="dateOfBirth" required />
            </div>
          </div>
        </section>
        
        <section>
          <h2 style={{ fontSize: '20px', marginLeft: '10px' }}>Contact information</h2>
          <div style={row}>
            <div style={column}>
              <label>Phone number</label>
              <input onChange={handleChange} style={input} type="tel" name="phoneNumber" minLength={10} maxLength={10} required />
            </div>
          </div>
        </section>
        
        <section>
          <h2 style={{ fontSize: '20px', marginLeft: '10px' }}>Address</h2>
          <div style={row}>
            <div style={column}>
              <label>Street</label>
              <input onChange={handleChange} style={input} type="text" name="street" required />
            </div>
            <div style={column}>
              <label>City</label>
              <input onChange={handleChange} style={input} type="text" name="city" required />
            </div>
            <div style={column}>
              <label>State</label>
              <input onChange={handleChange} style={input} type="text" name="state" required />
            </div>
            <div style={column}>
              <label>Pin Code</label>
              <input onChange={handleChange} style={input} type="tel" name="pinCode" minLength={6} maxLength={6} required />
            </div>
          </div>
        </section>
        
        <div style={btnContainer}>
          <button type="submit" style={btn}>Submit</button>
        </div>
      </form>
    </div>
  );
}
