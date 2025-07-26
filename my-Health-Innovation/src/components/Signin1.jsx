import React, { useState, useRef, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import img1 from "../assets/img/images/signup_logo.png"
import PatientContext from '../../context/Patientcontext.js';
import UserContext from "../../context/UserContext"

/* <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                  Email
                </label>*/
/*<div className="flex items-center justify-between">
  <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
    Password
  </label>
 
</div> */
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
const login = {
  color: "blue",

}
export default function Signin() {

  const emailRef = useRef()
  const passwordRef = useRef()

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState("password");
  const [click, setclick] = useState("");
  
  
  const {user, setUser} = useContext(UserContext);
    const { patient, setpatient } = useContext(PatientContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {email, password} = credentials;
    const response = await fetch('http://localhost:8000/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email, password: password})
    });
    const json = await response.json();
    console.log(json);
    // setUser(json);
    // console.log(credentials);
    // clearing the input fields
    emailRef.current.value = "";
    passwordRef.current.value = "";

    // storing the authToken in the localStorage
    if(json.success){
      // save the token and redirect
      setUser({...user, user: json.user, authToken: json.authToken})
      localStorage.setItem("token",json.authToken);
      localStorage.setItem('user',JSON.stringify(json.user));
      console.log("the patient",json.pat,json.user,json.authToken)
      
        setpatient(json.pat);
        localStorage.setItem("patient", JSON.stringify(json.pat));
      
      console.log("successfully saved the token");
      setclick("");
      navigate("/");
    }
    else{
      setclick(json.message);
      console.log("Error in saving the authToken")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  /*style="background-image: radial-gradient(rgba(66, 99, 24, 0.375),
rgba(6, 68, 33, 0.259)), url(doctorbg.jpg);background-size:cover;  background-repeat: no-repeat;background-attachment: fixed 
" */
  return (
    <>
      {/* {

        } */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 hero" >

        <div className="mt-12  sm:mx-auto  sm:w-full sm:max-w-sm" style={formdiv}>


          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-20 w-auto"
                src={img1}
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                Sign in to your account
              </h2>
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
                  placeholder="Email"
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
                  type={showPassword}
                  required
                  placeholder="Password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
                
              </div>
            </div>
            <div className="flex flex-wrap items-center">
              <Link className="text-sm font-medium text-white hover:underline" to="/forget-password">Forgot Password?</Link>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <h1 style={{ color: "red" }}>{click}</h1>
          <div className="text-white mt-6">
            Haven't registred yet? Register here -
            <a className="no-underline border-b border-blue text-blue font-bold px-1" href="../signup/" style={login}>
              Sign Up
            </a>
          </div>
        </div>
      </div>

    </>
  )
}
