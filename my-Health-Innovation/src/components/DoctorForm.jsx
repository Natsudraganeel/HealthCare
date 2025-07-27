import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext.js';
import { toast,ToastContainer } from "react-toastify";
import DoctorContext from "../../context/DoctorContext.js";
import Spinner from "./spinner.jsx";
const outermost = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: "20px",
};

const form = {
  marginTop: "5%",
  marginBottom: "5%",
  border: "2px solid #e5e7eb",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "850px",
  padding: "30px",
  backgroundColor: "#f9fafb",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const h1 = {
  textAlign: "center",
  font: "normal 32px Arial, sans-serif",
  marginBottom: "30px",
};

const h2 = {
  fontSize: "20px",
  margin: "10px 0",
  fontWeight: "600",
  color: "#111827",
};

const section = {
  marginBottom: "30px",
};

const inputGroup = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
};

const inputContainer = {
  flex: "1 1 45%",
  minWidth: "250px",
};

const input = {
  width: "100%",
  padding: "10px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  boxSizing: "border-box",
  fontSize: "14px",
};

const label = {
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  fontWeight: "500",
  color: "#1f2937",
};

const btnContainer = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

const responsiveStyles = `
@media (max-width: 600px) {
  .input-container {
    flex: 1 1 100%;
    min-width: 100% !important;
  }
}
`;

export default function DoctorForm() {
  const { user } = useContext(UserContext);
    const { doctor, setdoctor } = useContext(DoctorContext);
  const [Credentials, setCredentials] = useState({
    name: "",
    contact: "",
    email: "",
    fees: "",
    experienceInYears: "",
    hospital: "",
    Appointment: [],
  });
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [spData, setSpData] = useState();
  const [qData, setQData] = useState();
  const [checked, setChecked] = useState([]);
  const [days, setDays] = useState("");

  const navigate = useNavigate();

  const spOptions = ["MBBS", "MBBS,MD", "MBBS,MS"];
  const qOptions = [
    "Dermatology",
    "ENT",
    "Ophthalmology",
    "Orthopedics",
    "Gastroenterology",
    "Pulmonology",
    "Hematology",
    "Nephrology",
    "Oncology",
    "Dentistry",
  ];

  const onOptionChangeHandlerSp = (event) => {
    setSpData(event.target.value);
  };

  const onOptionChangeHandlerQ = (event) => {
    setQData(event.target.value);
  };

  const onChange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };

  const handleFilter = (value) => {
    let all = [...checked];
    if (value.checked) {
      all.push(value.value);
    } else {
      all = all.filter((c) => c !== value.value);
    }
    setChecked(all);
    setDays(all.toString());
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    // console.log(start);
    // console.log(end);
    // console.log(start>end);
  const chosentime1 = new Date(`1970-01-01T${start}Z`);
 const chosentime2 = new Date(`1970-01-01T${end}Z`);
 const time1 = new Date(`1970-01-01T06:00Z`);
 const time2 = new Date(`1970-01-01T22:00Z`);
    if(chosentime1>chosentime2 ){
      return toast.error("Start time has to be before end time")
    }
    if(chosentime1<time1 || chosentime1>time2){
      return toast.error("Only start times between 6:00 and 22:00 is allowed" );
    }
    if( chosentime2<time1 || chosentime2>time2){
      return toast.error("Only end times between 6:00 and 22:00 is allowed" );
    }
    const { name, contact, email, fees, experienceInYears, hospital, Appointment } = Credentials;
    const response = await fetch("https://healthcare-backend-z0xu.onrender.com/api/doctors/update-doctor", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${user.authToken}`,
      },
      body: JSON.stringify({
        id:doctor._id,
        name,
        contact,
        email,
        fees,
        qualification: qData,
        experienceInYears,
        days: days,
        starttime:start,
        endtime:end,
        speciality: spData,
        hospital,
        Appointment,
      }),
    });

    const json = await response.json();
    // console.log(json);
    if (json.success) {
      
      setdoctor(json.result);
      localStorage.setItem("doctor", JSON.stringify(json.result))
      navigate("/doctor-dashboard");
    }
    else{
      alert(json.message);
    }
  }

  return (
    <>
   
      <style>{responsiveStyles}</style>
       {
     user.authToken ? (
      <div style={outermost}>
        <form style={form} onSubmit={handleSubmit}>
          <h1 style={h1}>Fill up your details</h1>

          <section style={section}>
            <h2 style={h2}>Personal Information</h2>
            <div style={inputGroup}>
              <div style={inputContainer} className="input-container">
                <label htmlFor="name" style={label}>Full Name</label>
                <input type="text" id="name" name="name" required style={input} onChange={onChange} />
              </div>
            </div>
          </section>

          <section style={section}>
            <h2 style={h2}>Contact Information</h2>
            <div style={inputGroup}>
              <div style={inputContainer} className="input-container">
                <label htmlFor="contact" style={label}>Phone Number</label>
                <input type="tel" id="contact" name="contact" minLength={10} maxLength={10} required style={input} onChange={onChange} />
              </div>
              <div style={inputContainer} className="input-container">
                <label htmlFor="email" style={label}>Email</label>
                <input type="email" id="email" name="email" required style={input} onChange={onChange} />
              </div>
            </div>
          </section>

          <section style={section}>
            <h2 style={h2}>Professional Information</h2>
            <div style={inputGroup}>
              <div style={inputContainer} className="input-container">
                <label htmlFor="qualification" style={label}>Qualification</label>
                <select id="qualification" name="qualification" required style={input} onChange={onOptionChangeHandlerSp}>
                  <option>Please choose one option</option>
                  {spOptions.map((option, index) => <option key={index}>{option}</option>)}
                </select>
              </div>
              <div style={inputContainer} className="input-container">
                <label htmlFor="speciality" style={label}>Speciality</label>
                <select id="speciality" name="speciality" required style={input} onChange={onOptionChangeHandlerQ}>
                  <option>Please choose one option</option>
                  {qOptions.map((option, index) => <option key={index}>{option}</option>)}
                </select>
              </div>
              <div style={inputContainer} className="input-container">
                <label htmlFor="experienceInYears" style={label}>Experience (in years)</label>
                <input type="number" id="experienceInYears" name="experienceInYears" required style={input} onChange={onChange} />
              </div>
              <div style={inputContainer} className="input-container">
                <label htmlFor="fees" style={label}>Fees</label>
                <input type="number" id="fees" name="fees" required style={input} onChange={onChange} />
              </div>
              <div style={inputContainer} className="input-container">
                <label htmlFor="hospital" style={label}>Hospital</label>
                <input type="text" id="hospital" name="hospital" required style={input} onChange={onChange} />
              </div>
            </div>
          </section>

          <section style={section}>
            <h2 style={h2}>Available Days</h2>
            <div style={inputGroup}>
              {["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"].map((day) => (
                <div key={day} style={inputContainer} className="input-container">
                  <label htmlFor={day} style={label}>{day}</label>
                  <input type="checkbox" value={day} onChange={(e) => handleFilter(e.target)} />
                </div>
              ))}
            </div>
          </section>

          <section style={section}>
            <h2 style={h2}>Available Time</h2>
            <div style={inputGroup}>
              <div style={inputContainer} className="input-container">
                <label htmlFor="start" style={label}>Start Time</label>
                <input type="time" id="start" name="start" required style={input} onChange={(e) => setStart(e.target.value)} />
              </div>
              <div style={inputContainer} className="input-container">
                <label htmlFor="end" style={label}>End Time</label>
                <input type="time" id="end" name="end" required style={input} onChange={(e) => setEnd(e.target.value)} />
              </div>
            </div>
          </section>

          <div style={btnContainer}>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Submit
            </button>
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
