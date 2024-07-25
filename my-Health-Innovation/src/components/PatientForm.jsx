import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from '../../context/UserContext.js';

export default function PatientForm() {

  const {user} = useContext(UserContext)

  // used for navigating through pages
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ firstName: "", lastName: "", dateOfBirth: "", phoneNumber: "", street: "", city: "", state: "", pinCode: "", medicalRecords: [], Appointment: [] })
  const [genderData, setGenderData] = useState()
  const [bloodData, setBloodData] = useState()

  const thing = {
    display: "flex",
    flexWrap: "wrap",
  }
  const outermost = {
    display: "flex",
    justifyContent: "center",
  }
  const span = {
    marginRight: "30px",
    marginLeft: "30px",
  }
  const input = {
    width: "300px"
  }
  const btn = {
    display: "flex",
    justifyContent: "center",
  }
  const form = {
    marginTop: "10%",
    marginBottom: "10%",
    border: "2px solid black",
    width: "80%",
  }
  const h1 = {
    textAlign: 'center',
    font: 'normal 30px Arial, sans-serif',
  }
  const h2 = {
    fontSize: "20px",
    marginLeft: "10px"
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // navigate('/patient-dashboard');
    console.log(credentials);
    console.log(genderData)
    console.log(bloodData)
    // const token = localStorage.getItem('token')
    const response = await fetch('https://health-first-0qsn.onrender.com/api/patients/create-patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${user.authToken}`
        // 'auth-Token': localStorage.getItem('token')
        // 'auth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlOGNlOTE2Y2U4OWQ4NjE5YTMxMjVlIn0sImlhdCI6MTcwOTc5OTA4OX0.Xaigg3iTtDlJlUXCsjAUg5rvcjrR9TGkCVqNJsuMFeM'
      },
      body: JSON.stringify({firstName: credentials.firstName, lastName: credentials.lastName, dateOfBirth: credentials.dateOfBirth, phoneNumber: credentials.phoneNumber, street: credentials.street, city: credentials.city, state: credentials.state, pinCode: credentials.pinCode, medicalRecords: credentials.medicalRecords, Appointment: credentials.Appointment, gender: genderData, bloodGroup: bloodData})
    })
    const json = await response.json();
    console.log(json);
    // if(json.success){
      navigate('/patient-dashboard');
    // }
  }
  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
    // console.log(credentials);
  }

  const genderOptions = [
    "Male",
    "Female",
    "Others"
  ];

  const bloodOptions = [
    "A+",
    "A-",
    "B+",
    "B-",
    "O+",
    "O-",
    "AB+",
    "AB-",
  ];

  const genderOptionChangeHandler = (event) => {
    setGenderData(event.target.value);
    console.log(event.target.value)
    console.log(genderData);
  };

  const bloodOptionChangeHandler = (event) => {
    setBloodData(event.target.value);
    console.log(bloodData);
  };

  return (
    <>

      <div style={outermost} >
        <form style={form} onSubmit={handleSubmit}>
          <h1 className="py-10 " style={h1}>Fill up your details</h1>
          <section >
            <h2 className="py-2 block" style={h2}>Personal information</h2>
            <div style={thing}>
              <div style={span} className="mb-5 ">
                <label htmlFor=" First Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                <input onChange={handleChange} style={input} type="text" name="firstName" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div style={span} className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input onChange={handleChange} style={input} type="text" name="lastName" id="lname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div style={span} className="mb-5">
                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                <select style={input} onChange={genderOptionChangeHandler}>
                  <option>Please choose one option</option>
                  {genderOptions.map((option, index) => {
                    return (
                      <option key={index}>
                        {option}
                      </option>
                    );
                  })}
                </select> 
              </div>
              <div style={span} className="mb-5">
                <label htmlFor="Bgroup" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blood Group</label>
                <select style={input} onChange={bloodOptionChangeHandler}>
                  <option>Please choose one option</option>
                  {bloodOptions.map((option, index) => {
                    return (
                      <option key={index}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div style={span} className="mb-5">
                <div className="flex items-center justify-between">
                  <label htmlFor="date" className="block text-sm font-medium leading-6 text-black">
                    Date of birth
                  </label>

                </div>
                <div className="mb-2" >
                  <input onChange={handleChange} style={input}
                    id="date"
                    name="dateOfBirth"
                    type="date"
                    autoComplete="date"
                    required
                    placeholder=" Appointment Date" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />

                </div>
              </div>
            </div>
          </section>
          <section>
            <h2 className="py-2 block" style={h2}>Contact information</h2>
            <div style={thing}>
              <div style={span} className="mb-5 ">
                <label htmlFor=" First Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                <input onChange={handleChange} style={input} type="number" name="phoneNumber" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
            </div>
          </section>
          <section>
            <h2 className="py-2 block" style={h2}>Address</h2>
            <div style={thing}>
              <div style={span} className="mb-5 ">
                <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street</label>
                <input onChange={handleChange} style={input} type="text" name="street" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div style={span} className="mb-5 ">
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                <input onChange={handleChange} style={input} type="text" name="city" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div style={span} className="mb-5 ">
                <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                <input onChange={handleChange} style={input} type="text" name="state" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div style={span} className="mb-5 ">
                <label htmlFor="pinCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">pinCode</label>
                <input onChange={handleChange} style={input} type="text" name="pinCode" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
            </div>
          </section>




          <div style={btn}>
            <button type="submit" className=" my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>
        </form>
      </div>

    </>
  )
}


{/* <select style={input} name="gender" id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

<option>Male</option>
<option>Female</option>
<option>Others</option>

</select> */}

{/* <select style={input} name="bloodGroup" id="Bgroup" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

<option>O-</option>
<option>O+</option>
<option>A-</option>
<option>A+</option>
<option>B-</option>
<option>B+</option>
<option>AB-</option>
<option>AB+</option>

</select> */}
