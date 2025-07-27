import React, { useState, useRef, useContext } from "react"
import { useNavigate } from "react-router-dom";

import img1 from "../assets/img/images/signup_logo.png"
import UserContext from "../../context/UserContext";
import PatientContext from '../../context/Patientcontext.js';
import DoctorContext from "../../context/DoctorContext.js";

const parent = {
  position: "relative"
};
const child = {
  position: "absolute",
  top: "5px",
  right: "10px",
  cursor: "pointer"
}
const formdiv = {
  border: "2px solid black",
  padding: "20px 20px 50px 20px",
  borderRadius: "5%",
  backdropFilter: "blur(10px)",

}
const sign = {
  color: "blue",
}
const key = {
  backgroundColor: "white"
}



export default function Signup() {

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [credentials, setcredentials] = useState({ username: "", email: "", password: "", cpassword: "" });
  const [click, setclick] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);
    const { patient, setpatient } = useContext(PatientContext);
  const {user, setUser} = useContext(UserContext);
  const { doctor, setdoctor } = useContext(DoctorContext);
  // used for navigating through pages
  const navigate = useNavigate()

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  // function check() {
  //   if (password !== cpassword) {
  //     setclick("Password and confirm password not matching.Try again!");
  //   }
  // }

  const handleChange = (event) => {
    setIsDoctor(!isDoctor);
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      setclick("Password and confirm password not matching.Try again!");
    }
    else{
    setclick("");
    // const { username, email, password } = credentials;
    const response = await fetch('http://localhost:8000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: credentials.username, email: credentials.email, password: credentials.password, isDoctor: isDoctor })
    });
    const json = await response.json();
    // console.log(json);
    setUser(json);

    // clearing the input fields
    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";

    // storing the authToken in the localStorage
    if (json.success && isDoctor === true) {
      // save the authToken and redirect
      // localStorage.setItem('token', json.authToken);
      setUser({...user, user: json.user, authToken: json.authToken})
       localStorage.setItem("token",json.authToken);
            localStorage.setItem('user',JSON.stringify(json.user));
      // console.log("successfully saved the token")
      setdoctor(json.doc);
      localStorage.setItem("doctor", JSON.stringify(json.doc))
      // console.log("successfully saved the token")
      navigate("/doctor-form");
    }
    else if (json.success && isDoctor === false){
      // localStorage.setItem('token', json.authToken)
      setUser({user: json.user, authToken: json.authToken})
       localStorage.setItem("token",json.authToken);
            localStorage.setItem('user',JSON.stringify(json.user));
              // console.log("the patient",json.pat,json.user,json.authToken)
      
        setpatient(json.pat);
        localStorage.setItem("patient", JSON.stringify(json.pat));
      // console.log("successfully saved the token")
      navigate("/patient-form")
    }
    else {
      alert(json.message);
    }
  } }

  return (
    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 hero"  >

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" style={formdiv}>


          <form className="space-y-6" action="/" onSubmit={handleOnSubmit}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-20 w-auto"
                src={img1}
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                Sign Up!
              </h2>
            </div>
            <div>

              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  ref={usernameRef}
                  onChange={onChange}
                  required
                  placeholder="Username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>

            </div>
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  ref={emailRef}
                  onChange={onChange}
                  required
                  placeholder="Email address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>

            </div>

            <div>

              <div className="mt-2 eye" style={parent}>
                <input
                  id="password"
                  name="password"
                  ref={passwordRef}
                  onChange={onChange}
                  type="password"
                  required
                  placeholder="Password (must atleast 8 characterslong)"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />

              </div>
            </div>
            <div>

              <div className="mt-2 eye" style={parent}>
                <input
                  id="cpassword"
                  name="cpassword"
                  onChange={onChange}
                  type="password"
                  required
                  placeholder="Confirm Password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
              <h1 style={{ color: "red" }}>{click}</h1>
            </div>

            <div className="flex items-center ml-4 mb-4">
              <input onChange={handleChange} id="default-checkbox" type="checkbox" value="test" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-100">Are you a doctor?</label>
            </div>
            {/* <div> */}
            <button
              // onClick={check}

              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
            {/* </div> */}
            <div className="text-center text-sm text-white mt-4">
              By signing up, you agree to the
              <a className="no-underline border-b border-grey-dark text-white px-1" href="/">
                Terms of Service
              </a> and
              <a className="no-underline border-b border-grey-dark text-white px-1" href="/">
                Privacy Policy
              </a>
            </div>
          </form>
          <div className="text-white mt-6">
            Already have an account?
            <a className="no-underline border-b border-blue text-blue font-bold px-1" href="/signin" style={sign}>
              Log in
            </a>
          </div>

        </div>
      </div>

    </>
  )
}
