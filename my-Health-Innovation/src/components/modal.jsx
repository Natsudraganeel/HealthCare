import React, { useState, useRef, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../../context/UserContext.js';
 
 
export default function Modal({ doctorId,name,days,starttime,endtime,closeForm }) {
 
  const {user} = useContext(UserContext)
 
  const [credentials, setCredentials] = useState({ name: "", date: "", time: "" })
  const weekday = ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"];
  const nameRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
 
  const parent = {
    position: "relative"
  };
  const formdiv = {
  border: "2px solid black",
  padding: "20px 20px 50px 20px",
  borderRadius: "5%",
  backdropFilter: "blur(10px)",
  margin: "20% 30% 20% 30%" // Added margin here
};

  const cross = {
    // border: "1px solid black",
    border: "none",
    position: "absolute",
    right: "5px",
    cursor: "pointer"
  }
  const sendEmail = (event) => {
    // console.log(user.user.email);
    // console.log(import.meta.env.VITE_PASSWORD)
    //  console.log(import.meta.env.VITE_USERNAME)
    //   console.log(import.meta.env.VITE_PORT)
    event.preventDefault();
    const config = {
                    Username: `${import.meta.env.VITE_USERNAME}`,
                    Password: `${import.meta.env.VITE_PASSWORD}`,
                    Host: "smtp.elasticemail.com",
                    Port: `${import.meta.env.VITE_PORT}`,
                    To: user.user.email,
                    From: `${import.meta.env.VITE_USERNAME}`,
                    Subject: "Email Verifiaction",
                    Body: `Your Appointment has been booked with Dr. ${name}`,
 
    };
    if (window.Email) {
      window.Email.send(config).then(
        () => toast.success('Appointment Successful.Check your Mail!', {
          position: "top-right",
 
        })
      );
    }
 
  }
 
  const handleChange = (event) => {
    event.preventDefault();
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
    //console.log(typeof(credentials.time));

}
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(doctorId);
    const { name, date, time } = credentials;
    //console.log(date);
var possible="";
    const end=endtime;
    const start=starttime;
    //     console.log(start);
    // console.log(end);
    // let days=schedule.substring(0,schedule.length-12);
 
     const array=days.split(",");
     const selectday=new Date(`${date}T${"13:45"}Z`);
     const y=selectday.getDay();
     const today=new Date();
    //  console.log("today",today.toLocaleString());
    //  console.log("selectday",selectday.toLocaleString());
     if(selectday.toLocaleDateString()<today.toLocaleDateString()){
      return toast.error(`Choose a valid date`, {
      position: "top-right",
    })
     }
    
 
    //  console.log(weekday[y]);
    //  console.log(typeof(weekday[y]));
  
   let bool=array.find((c)=>{return weekday[y]===c});
 
   if(bool===undefined){
    return toast.error(`Doctor is not available on this weekday.Please see the schedule`, {
      position: "top-right",
 
    })
   }
 
   
else{
    let time1,time2;
    let chosentime;
    // console.log(start);
    // console.log(end);

 time1 = new Date(`1970-01-01T${start}Z`);
 time2 = new Date(`1970-01-01T${end}Z`);
 chosentime= new  Date(`1970-01-01T${time}Z`);
 if (time1 <= chosentime && chosentime<=time2) {
  possible="fine";
}  
else {
 // console.log("out of range");
 return  toast.error('Timings not matching with doctor', {
    position: "top-right",
 
  })
}
         if(selectday.toLocaleDateString().substring(0,10)===today.toLocaleDateString().substring(0,10)){
          const options = {
  timeZone: "Asia/Kolkata",
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
 
};
      const timepart=new Intl.DateTimeFormat("en-GB",options).format(today);
       const  chosentime= new Date(`1970-01-01T${time}Z`);
 const currtime = new Date(`1970-01-01T${timepart}Z`);
  const time1 = new Date(`1970-01-01T${start}Z`);
 const time2 = new Date(`1970-01-01T${end}Z`);
 
      if(chosentime<=currtime || (chosentime<=time1 || chosentime>=time2)){
        return toast.error("You are too late!!")
      }
      //  console.log(timepart);

     }
 
  }
 
  if(possible==="fine"){
   try{
    const token = localStorage.getItem('token')
    const response = await fetch(`https://healthcare-backend-z0xu.onrender.com/api/appointment/book-appointment/${doctorId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${user.authToken}`
        // 'auth-Token': localStorage.getItem('token')
        // 'auth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlOGNlOTE2Y2U4OWQ4NjE5YTMxMjVlIn0sImlhdCI6MTcwOTc5OTA4OX0.Xaigg3iTtDlJlUXCsjAUg5rvcjrR9TGkCVqNJsuMFeM'
      },
      body: JSON.stringify({ name, date, time })
    })
    const json = await response.json();
    if(json.success){
    // console.log(credentials)
    nameRef.current.value = ""
    dateRef.current.value = ""
    timeRef.current.value = ""
    sendEmail(event);
    }
    else{
      alert(json.message);
    }
   }
   catch(err){
       console.log(err.message);
   }
  }
}
 
  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-opacity-50" >
 
      <div className="popup-form absolute mt-12 text-black" style={formdiv}>
        <svg style={cross} onClick={closeForm} className="h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
 
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
 
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-black">
              Fill up the following form
            </h2>
          </div>
          <div>
 
            <div className="mt-2">
              <input
                onChange={handleChange}
                id="name"
                name="name"
                type="text"
                required
                ref={nameRef}
                placeholder="Patient Name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              />
            </div>
 
          </div>
 
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="date" className="block text-sm font-medium leading-6 text-black">
                Appointment Date
              </label>
 
            </div>
            <div className="mt-2 eye" style={parent}>
              <input
                onChange={handleChange}
                id="date"
                name="date"
                type="date"
                required
                ref={dateRef}
                placeholder=" Appointment Date" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              />
 
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="time" className="block text-sm font-medium leading-6 text-black">
                Time
              </label>
 
            </div>
            <div className="mt-2 eye" style={parent}>
              <input
                onChange={handleChange}
                id="time"
                name="time"
                type="time"
                required
                ref={timeRef}
                placeholder="Time " className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              />
 
            </div>
          </div>
 
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
      <ToastContainer bodyClassName="toastBody" />
    </div>
 
  )
 
 
}
