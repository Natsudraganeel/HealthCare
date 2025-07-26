import React, { useState, useEffect, useContext, useRef } from 'react';
import UserContext from '../../context/UserContext.js';
import { useNavigate } from "react-router-dom"
import PatientContext from '../../context/Patientcontext.js';

const cross = {
  border: "none",
  position: "absolute",
  right: "5px",
  cursor: "pointer"
};

const btn = {
  justifyContent: "center",
};


export default function PatientDashboard  () {
  // const lekh=JSON.parse(localStorage.getItem("patient"))
  const { user } = useContext(UserContext);
    const { patient, setpatient } = useContext(PatientContext);
   useEffect(() => {
      if (localStorage.getItem('token')) {
        getPatient()
      }
    }, [user])
  const navigate = useNavigate();

  const [users, setUsers] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const testRef = useRef();

  const getPatient = async () => {
    try {
      console.log(user);
      if (user) {
        const response = await fetch('http://localhost:8000/api/patients/getpatient', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': `${user.authToken}`
          }
        });
        const json = await response.json();
        if (json.success) {
          setUsers(json.patientData);
          setpatient(json.patientData);
          let medical_records = json.patientData.medicalRecords;
          console.log(medical_records);
          if (medical_records) setMedicalRecords(medical_records);
          let patient_appointments = json.patientData.Appointment;
          setAppointments(patient_appointments);
          localStorage.setItem("patient", JSON.stringify(json.patientData));
          console.log(patient);
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  const getDoctorById = async (doctorId) => {
    const response = await fetch(`http://localhost:8000/api/doctors/getdoctorbyid/${doctorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    if (json) setSelectedDoctor(json);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) getPatient();
  }, []);

  const handleOnClick = (appointment) => {
    setSelectedAppointment(appointment);
    getDoctorById(appointment.doctor);
  };

  const deleteCard = async (event, id) => {
    event.preventDefault();
    try {
      if (user) {
        const ans = [...appointments];
        const index = ans.findIndex((item => item.id === id));
        ans.splice(index, 1);
        setAppointments(ans);
        setSelectedDoctor(null);
        setSelectedAppointment(null);
        const response = await fetch(`http://localhost:8000/api/appointment/delete-appintment/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': `${user.authToken}`
          }
        });
        const json = await response.json();
        console.log(json);
        // window.location.reload();
        getPatient();
        setSelectedAppointment(null)
      }
    } catch (error) {
      console.log(error)
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid date' : date.toISOString().split('T')[0];
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: "#a3f0bd" }}>
        <h1 className="text-4xl text-center mt-32 mb-8">Your Health Care Dashboard</h1>

        {/* Patient Details */}
        <div className="w-full flex justify-center mb-8">
          <section className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
            <h1 className="text-2xl mb-4 font-semibold text-center">Patient Details</h1>
            <ul className="text-lg space-y-2">
              <li><b>First Name:</b> {patient.firstName}</li>
              <li><b>Last Name:</b> {patient.lastName}</li>
              <li><b>Gender:</b> {patient.gender}</li>
              <li><b>Date of Birth:</b> {formatDate(patient.dateOfBirth)}</li>
              <li><b>Blood Group:</b> {patient.bloodGroup}</li>
              <li><b>Phone Number:</b> {patient.phoneNumber}</li>
              <li><b>Street:</b> {patient.street}</li>
              <li><b>City:</b> {patient.city}</li>
              <li><b>State:</b> {patient.state}</li>
              <li><b>Pin Code:</b> {patient.pinCode}</li>
            </ul>
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate("/update-patient")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
              >
                Update
              </button>
            </div>
          </section>
        </div>

        {/* Appointments */}
        <h2 className="text-3xl text-center mb-3 w-full max-w-2xl">Appointments</h2>
        <div className="flex flex-wrap w-full max-w-2xl">
          {appointments.length !== 0 ? appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="mb-8 px-4"
              onClick={() => handleOnClick(appointment)}
            >
              <div style={{ width: "15rem", height: "14rem" }} className="bg-white rounded-lg shadow-md p-4 cursor-pointer relative">
                <svg style={cross} ref={testRef} onClick={async (e) => await deleteCard(e, appointment.id)} className="h-8 w-8 text-red-500 absolute" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="15" y1="5" x2="5" y2="15" />  <line x1="5" y1="5" x2="15" y2="15" /></svg>
                <p><b>Name:</b> {appointment.name}</p>
                <p><b>Date:</b> {appointment.date}</p>
                <p><b>Time:</b> {appointment.time}</p>
              </div>
            </div>
          )) : <p className='pb-3 m-auto'>No Appointments</p>}
        </div>

        {/* Appointment Details */}
        {selectedAppointment && (
          <div className="mt-8">
            <h2 className="text-3xl text-center mb-8 w-full max-w-2xl">Appointment Details</h2>
            <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-full max-w-2xl cursor-pointer">
              {selectedDoctor && (<p className="text-xl font-semibold mb-2">Doctor: {selectedDoctor.name}</p>)}
              <p><b>Name:</b> {selectedAppointment.name}</p>
              <p><b>Date:</b> {selectedAppointment.date}</p>
              <p><b>Time:</b> {selectedAppointment.time}</p>
            </div>
          </div>
        )}

        {/* Medical Records */}
        <h2 className="text-3xl text-center mb-3 w-full max-w-2xl">Medical Records</h2>
        <div className="flex flex-wrap w-full max-w-2xl">
          {medicalRecords.length !== 0 ?medicalRecords.map((medicalRecord) => (
            <div
              key={medicalRecord.id}
              className="w-1/2 mb-8 px-4"
            >
              <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer w-full max-w-2xl">
                <p><b>Doctor:</b> {medicalRecord.doctorName}</p>
                <p><b>Patient:</b> {medicalRecord.patientName}</p>
                <p><b>Medicines:</b> {medicalRecord.medicines}</p>
                <p><b>Advice:</b> {medicalRecord.advice}</p>
                <p><b>Date:</b> {medicalRecord.date}</p>
              </div>
            </div>
          )) : <p className='pb-3 m-auto'>No Medical Records</p>}
        </div>
      </div>
    </>
  );
};

