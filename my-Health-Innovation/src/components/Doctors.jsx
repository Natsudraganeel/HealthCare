import React, { useEffect, useState, useContext } from "react"
// import contacts from "./listofdoctors";
import Card from "./card"
import UserContext from '../../context/UserContext.js';
import axios from 'axios'
const API_URL = 'https://health-first-0qsn.onrender.com/api/doctors/getalldoctors'

const parent = {
  position: "relative",
};
const child = {
  backgroundColor: "#007C9D",
  width: "35px",
  height: "36px",
  position: "absolute",
  top: "0px",
  right: "0px",
  cursor: "pointer",
  borderRadius: "4px"
}
const icon = {
  color: "white"
}
const head = {
  fontSize: "40px",
  textAlign: "center",
  marginTop: "40px",
  marginBottom: "40px"

}
// const doc={
// marginTop:"40px",
// }

// function createCard(contacts) {
//   return (
//     <Card
//       key={doctors.id}
//       name={doctors.name}
//       contact={doctors.contact}
//       email={doctors.email}
//       fees={doctors.fees}
//       qualification={doctors.qualification}
//       experienceInYears={doctors.experienceInYears}
//       speciality={doctors.speciality}
//       hospital_name={doctors.hospital_name}
//       schedule={doctors.schedule}
//     />
//   );
// }
export default function Doctor() {

  const {user} = useContext(UserContext)

  const [doctors, setDoctors] = useState([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const getAllDoctors = async (API_URL) => {
    // const token = localStorage.getItem('token')
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${user.authToken}`
        // 'auth-token': localStorage.getItem('token')
        // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlOGNlOTE2Y2U4OWQ4NjE5YTMxMjVlIn0sImlhdCI6MTcwOTc5OTA4OX0.Xaigg3iTtDlJlUXCsjAUg5rvcjrR9TGkCVqNJsuMFeM'
      }
    });
    const json = await response.json();
    setDoctors(json);
  }

  useEffect(() => {
    getAllDoctors(`${API_URL}`);
  }, [query])

  const handleChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  }

  // const handleSearchClick = () => {
  //   const filteredDoctors = doctors.filter((doctor) =>
  //     doctor.name.toLowerCase().includes(query) ||
  //     doctor.speciality.toLowerCase().includes(query) ||
  //     doctor.hospital.toLowerCase().includes(query) ||
  //     doctor.email.toLowerCase().includes(query))
  //   setDoctors(filteredDoctors);
  //   console.log(doctors);
  // }
  const handleSearchClick=async()=>{
  try{
const res=await axios.get(`https://health-first-0qsn.onrender.com/api/doctors/filtereddoctors/${query}`);
console.log(res.data.doctors);
setDoctors(res.data.doctors);
  }
  catch(err){
    console.log(err);
  }
  }

  return (
    <div className="doc">
      <div className="doctor">
        <div style={parent} >
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
            placeholder="Search by doctor name, hospital name or speciality " onChange={handleChange} />
          <button style={child}><i className="fa fa-search" style={icon} onClick={handleSearchClick}></i></button>
        </div>
        <button  onClick={()=>{window.location.reload()}} className=" doctor my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">All</button>
      </div>
      <h1 style={head}>Consult Top Doctors By Speciality For Any Health Concern </h1>
      <div className="allcard ml-4">
        {doctors.map((doctor) => {
          return <Card
            key={doctor._id}
            doctorId={doctor._id}      // passing the doctorId as the props
            name={doctor.name}
            contact={doctor.contact}
            email={doctor.email}
            fees={doctor.fees}
            qualification={doctor.qualification}
            experienceInYears={doctor.experienceInYears}
            speciality={doctor.speciality}
            hospital={doctor.hospital}
            schedule={doctor.schedule}
          />
        })}
      </div>

    </div>
  )
}
