import React, { useState, useRef, useEffect, useContext } from "react";
import UserContext from '../../context/UserContext.js';
import Spinner from "./spinner.jsx";
import { useNavigate } from "react-router-dom"
import DoctorContext from "../../context/DoctorContext.js";

const thing = { display: "flex", flexWrap: "wrap", justifyContent: "center", width: "100%" };
const outermost = { display: "flex", justifyContent: "center" };
const span = { marginRight: "30px", marginLeft: "30px", width: "100%" };
const btn = { justifyContent: "center" };
const textarea = { width: "90%", height: "100px" };
const input = { width: "300px" };
const h1 = { textAlign: 'center', font: 'normal 30px Arial, sans-serif' };
const h2 = { fontSize: "20px", marginLeft: "10px" };
const cross = { border: "none", position: "absolute", right: "5px", cursor: "pointer" };

export default function DoctorDashboard() {
  const { user } = useContext(UserContext)
  const { doctor, setdoctor } = useContext(DoctorContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getDoctor()
    }
  }, [user])

  const [credentials, setCredentials] = useState({ doctorName: "", patientName: "", date: "", medicines: "", advice: "" })
  const [doctors, setDoctor] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patientId, setPatientId] = useState("")

  const handleChange = (event) => {
    event.preventDefault();
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const getDoctor = async () => {
    const response = await fetch(`https://healthcare-ioez.onrender.com/api/doctors/getdoctorbyuserid`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${user.authToken}`
      }
    });
    const json = await response.json()
    if (json) {
      setDoctor(json);
      setdoctor(json);
      localStorage.setItem("doctor", JSON.stringify(json))
      let doctor_appointment = json.Appointment;
      if (doctor_appointment) {
        setAppointments(doctor_appointment)
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getDoctor();
    }
  }, [user])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { doctorName, patientName, date, medicines, advice } = credentials;
    const response = await fetch(`https://healthcare-ioez.onrender.com/api/medicalrecords/createmedicalrecord/${patientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${user.authToken}`
      },
      body: JSON.stringify({ doctorName, patientName, date, medicines, advice })
    })
    deleteCard(event, selectedAppointment.id);
    window.location.reload();
  }

  const deleteCard = async (name, id) => {
    try {
      if (user) {
        const ans = [...appointments];
        const index = ans.findIndex((item => item.id === id));
        ans.splice(index, 1);
        setAppointments(ans);
        const response = await fetch(`https://healthcare-ioez.onrender.com/api/appointment/delete-appintment/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': `${user.authToken}`
          }
        });
        const json = await response.json()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: "#a3f0bd" }}>
        <div style={{ width: "50%", display: "flex", justifyContent: "center", marginBottom: "10px" }} >
          <section>
            <h1 className="my-3" style={{ fontSize: "30px" }}>Doctors's details</h1>
            <ul>
              <li>Name: {doctors.name}</li>
              <li>Contact: {doctors.contact}</li>
              <li>Email: {doctors.email}</li>
              <li>Fees: {doctors.fees}</li>
              <li>Qualification: {doctors.qualification}</li>
              <li>Experience in years: {doctors.experienceInYears}</li>
              <li>Schedule: {doctors.schedule}</li>
              <li>Speciality: {doctors.speciality}</li>
              <li>Hospital: {doctors.hospital}</li>
            </ul>
            <div style={btn}>
              <button onClick={() => { navigate("/update-doctor") }} className=" my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update</button>
            </div>
          </section>
        </div>

        <hr className="my-3" style={{ margin: "auto", borderTop: "2px dashed black", width: "80%" }}></hr>
        <h2 className="text-3xl text-center mb-8 w-full max-w-2xl">Appointments</h2>
        <div className="flex flex-wrap w-full max-w-2xl justify-center">
          {appointments.length !== 0 ? appointments.map((appointment) => (
            <div
              key={appointment.time + appointment.date}
              className="w-1/3 ml-3 mr-3 mb-8 px-4"
              onClick={() => {
                setSelectedAppointment(appointment)
                setPatientId(appointment.patient)
              }}
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out p-4 relative border border-gray-200" style={{ width: "15rem", height: "14rem" }}>
                <svg
                  style={cross}
                  onClick={async () => await deleteCard(appointment.name, appointment.id)}
                  className="h-6 w-6 text-red-600 absolute top-2 right-2 hover:scale-105 transition-transform duration-200"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="15" y1="5" x2="5" y2="15" />
                  <line x1="5" y1="5" x2="15" y2="15" />
                </svg>
                <div className="text-gray-800 text-sm space-y-2 mt-4">
                  <p><span className="font-semibold">Patient:</span> {appointment.name}</p>
                  <p><span className="font-semibold">Date:</span> {appointment.date}</p>
                  <p><span className="font-semibold">Time:</span> {appointment.time}</p>
                </div>
              </div>
            </div>
          )) : <p className='pb-3 m-auto'>No Appointments</p>}
        </div>

        {selectedAppointment && (
          <>
            <hr className="my-3" style={{ margin: "auto", borderTop: "2px dashed black", width: "80%" }}></hr>
            <div style={outermost}>
              <form className="dashform" onSubmit={handleSubmit}>
                <div style={{ display: "flex", alignItems: "center", height: "15vh", justifyContent: "center" }}>
                  <h1 style={h1}>  Presciption</h1>
                </div>

                <div style={thing}>
                  <div style={span} className="mb-5 ">
                    <label htmlFor="doctorName" className="block mb-2 text-sm font-medium text-gray-900">Doctor's Name</label>
                    <input onChange={handleChange} style={input} type="text" name="doctorName" id="doctorName" className="input" required />
                  </div>
                  <div style={span} className="mb-5 ">
                    <label htmlFor="patientName" className="block mb-2 text-sm font-medium text-gray-900">Patient's Name</label>
                    <input onChange={handleChange} style={input} type="text" name="patientName" id="patientName" className="input" required />
                  </div>
                  <div style={span} className="mb-5">
                    <label htmlFor="date" className="block text-sm font-medium text-black">Today's Date</label>
                    <input style={input} onChange={handleChange} id="date" name="date" type="date" required className="input" />
                  </div>
                </div>

                <div style={thing}>
                  <div style={span} className="mb-5 ">
                    <label htmlFor="medicines" className="block mb-2 text-sm font-medium text-gray-900">Medicines</label>
                    <textarea onChange={handleChange} style={textarea} name="medicines" id="medicines" className="textarea" required />
                  </div>
                </div>

                <div style={thing}>
                  <div style={span} className="mb-5 ">
                    <label htmlFor="advice" className="block mb-2 text-sm font-medium text-gray-900">Other Advices</label>
                    <textarea onChange={handleChange} style={textarea} name="advice" id="advice" className="textarea" />
                  </div>
                </div>

                <div style={btn}>
                  <button style={{ backgroundColor: " #007C9D" }} type="submit" className="text-white rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update</button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  )
}
