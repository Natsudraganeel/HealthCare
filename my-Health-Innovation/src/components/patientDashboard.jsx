import React, { useState, useEffect, useContext,useRef } from 'react';
import UserContext from '../../context/UserContext.js';
import { useNavigate } from "react-router-dom"
import PatientContext from '../../context/Patientcontext.js';
import Spinner from './spinner'


const cross = {
    // border: "1px solid black",
    border: "none",
    position: "absolute",
    right: "5px",
    cursor: "pointer"
  }
  const btn = {

    justifyContent: "center",
  }

const PatientDashboard = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate()
     const {patient,setpatient}=useContext(PatientContext);
    const [users, setUsers] = useState({});
    const [appointments, setAppointments] = useState([]);
    const [hasAppointment, setHasAppointment] = useState(false);
    const [medicalRecords, setMedicalRecords] = useState([])
    const [hasMedicalRecords, setHasMedicalRecords] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null)
    // const [isDeleted, setIsDeleted] = useState(false);

    
    const testRef = useRef();

    const getPatient = async () => {
        // console.log(user);
        try {
            // console.log(localStorage.getItem('token'));
            // const token = localStorage.getItem('token');
            // console.log(token);
            // console.log(user.authToken)
            if (user) {
                //console.log(user+"hello")
                const response = await fetch('https://healthcare-ioez.onrender.com/api/patients/getpatient', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': `${user.authToken}`
                        // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlOGNlOTE2Y2U4OWQ4NjE5YTMxMjVlIn0sImlhdCI6MTcwOTc5OTA4OX0.Xaigg3iTtDlJlUXCsjAUg5rvcjrR9TGkCVqNJsuMFeM'
                    }
                });
                const json = await response.json()
                if (json.success) {
                    // console.log(json)
                   // console.log(json.patientData)
                    setUsers(json.patientData);
                   
                   
                }
                // console.log(json)
                // setUsers(json);
                setpatient(json.patientData);
        
                // setting the array of medicalRecords
                let medical_records = json.patientData.medicalRecords;
                 //console.log(medical_records)
                if (medical_records) {
                    setHasMedicalRecords(!hasMedicalRecords);
                    setMedicalRecords(medical_records)
                }
               

                // setting the array of appointments 
                let patient_appointments = json.patientData.Appointment;
                if (patient_appointments.length > 0) {
                    setHasAppointment(!hasAppointment);
                }
                setAppointments(patient_appointments)
                localStorage.setItem("patient",JSON.stringify(json.patientData));
            }
        } catch (error) {
            console.log(error)
        }
    }

    // const getAppointments = async () => {
    //     const response = await fetch('https://healthcare-ioez.onrender.com/api/appointment/getallappointments', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'auth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlOGNlOTE2Y2U4OWQ4NjE5YTMxMjVlIn0sImlhdCI6MTcwOTc5OTA4OX0.Xaigg3iTtDlJlUXCsjAUg5rvcjrR9TGkCVqNJsuMFeM'
    //         }
    //     });
    //     const json = await response.json();
    //     // console.log(json);
    //     // console.log(json[0].doctor);
    //     setAppointments(json);
    // }

    const getDoctorById = async (doctorId) => {
        // const doctorId = appointments.doctor;
        // console.log(doctorId)
        const response = await fetch(`https://healthcare-ioez.onrender.com/api/doctors/getdoctorbyid/${doctorId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        if(json){
            // console.log(json);
            setSelectedDoctor(json)
        }
    }

    // const getMedicalRecords = async () => {
    //     try {
    //         const response = await fetch('https://healthcare-ioez.onrender.com/api/medicalrecords/getmedicalrecords', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'auth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlOGNlOTE2Y2U4OWQ4NjE5YTMxMjVlIn0sImlhdCI6MTcwOTc5OTA4OX0.Xaigg3iTtDlJlUXCsjAUg5rvcjrR9TGkCVqNJsuMFeM'
    //             }
    //         });
    //         const json = await response.json()
    //         setMedicalRecords(json)

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getPatient();
        }
        // getPatient();
        // getAppointments();
        // getMedicalRecords();
    }, [user])

    const handleFileChange = async (event) => {
        if (user) {
            const file = event.target.files[0];
            const formData = await new FormData();
            formData.append('profile_picture', file);
        }
        // const response = await axios.post('/api/user/upload', formData);
        // setUser(response.data);
    };

    const handleImageChange = (event) => {
        setSelectedImage(URL.createObjectURL(event.target.files[0]));
    };

    const handleOnClick = (appointment) => {
        // event.preventDefault();
        setSelectedAppointment(appointment);
        getDoctorById(appointment.doctor);
    }

    const deleteCard = async (event, id) => {
        event.preventDefault();
        // event.stopPropagation();
        // const newAppointments = appointments.filter((appointment) => {
        //     return appointment.id !== id
        // })
        // // setAppointments(appointments.filter((appointment) => {
        // //         return appointment.id !== id
        // //     }))
        // // setIsDeleted(!isDeleted)
        // setAppointments(newAppointments);
        // console.log(newAppointments)
        // console.log(appointments)
        try {
            // console.log(localStorage.getItem('token'));
            // const token = localStorage.getItem('token');
            // console.log(token);
            // console.log(user.authToken)
            if (user) {
                const ans=[...appointments];
                console.log(ans);
               // const item=ans.find((item=> item.id===id));
                const index=ans.findIndex((item=> item.id===id));
                ans.splice(index,1);
                setAppointments(ans);
                setSelectedDoctor(null);
                setSelectedAppointment(null);
              
                
                const response = await fetch(`https://healthcare-ioez.onrender.com/api/appointment/delete-appintment/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': `${user.authToken}`
                        // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlOGNlOTE2Y2U4OWQ4NjE5YTMxMjVlIn0sImlhdCI6MTcwOTc5OTA4OX0.Xaigg3iTtDlJlUXCsjAUg5rvcjrR9TGkCVqNJsuMFeM'
                    }
                });
                const json = await response.json()
                console.log(json)
                window.location.reload();
                // if (json.success) {
                //     // console.log(json)
                //     console.log(json.patientData)
                //     setUsers(json.patientData);
                // }
                // // console.log(json)
                // // setUsers(json);

                // // setting the array of medicalRecords
                // // let medical_records = json.patientData.medicalRecords;
                // // // console.log(medical_records)
                // // if (medical_records) {
                // //     setHasMedicalRecords(!hasMedicalRecords);
                // // }
                // // setMedicalRecords(medical_records)

                // // setting the array of appointments 
                // let patient_appointments = json.patientData.Appointment;
                // if (patient_appointments.length > 0) {
                //     setHasAppointment(!hasAppointment);
                // }
                // setAppointments(patient_appointments)
                // setIsDeleted(!isDeleted)
                
            }
        } catch (error) {
            console.log(error)
        }
    } 
 function handledate(p){
    let ans=p.slice(0,9)
    return ans;
 }

 const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid date' : date.toISOString().split('T')[0];
  };

    return (<>
         {/*{user !== null && user.user.isDoctor === false ? ( */}
        <div className="min-h-screen flex flex-col   items-center" style={{ backgroundColor: "#a3f0bd" }}>
            <h1 className="text-4xl text-center mt-32 mb-8"> Your Health Care Dashboard</h1>
            <div className="flex flex-row items-center justify-center mb-8 w-full max-w-2xl mx-auto">
  {/* <img
    src={selectedImage || users.profile_picture}
    alt="_____profilePic______"
    className="w-48 h-48 rounded-full mr-4 border-black border-2"
  /> */}
  <div className="flex flex-col items-center space-y-2 mx-10">
    {/* console.log(users); */}
    <p className="text-xl"><b>Username: </b>{users.username}</p>
<p className="text-xl"><b>Email:</b> {users.email}</p>
    <div style={btn}>
      <button 
        onClick={() => { navigate("/update-patient"); }} 
        className="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto sm:w-auto px-4 py-2.5 sm:px-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Update
      </button>
    </div>
  </div>
</div>

            <hr />
            <h2 className="text-3xl text-center mb-3 w-full max-w-2xl">Appointments</h2>
            <div className="flex flex-wrap w-full max-w-2xl">
                {appointments.length != 0 ? appointments.map((appointment) => (
                    <div 
                        key={appointment.id}
                        className=" mb-8 px-4"
                        onClick={() => handleOnClick(appointment)}
                    >
                        <div style={{width:"15rem",height:"14rem"}} className="bg-white rounded-lg shadow-md p-4 cursor-pointer max-w-2xl relative">
                            {/* <p className="text-xl font-semibold mb-2">{appointment.doctor}</p> */}
                            <svg style={cross} ref={testRef} onClick={async() => await deleteCard(event, appointment.id)} className="h-8 w-8 text-red-500 absolute" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="15" y1="5" x2="5" y2="15" />  <line x1="5" y1="5" x2="15" y2="15" /></svg>
                            <p><b>Name:</b> {appointment.name}</p>
                            <p><b>Date:</b> {appointment.date}</p>
                            <p><b>Time:</b> {appointment.time}</p>
                        </div>
                    </div>
                )) : <p className='pb-3 m-auto'>No Appointments</p>}
            </div>
            {
                selectedAppointment && (
                    <div className="mt-8">
                        <h2 className="text-3xl text-center mb-8 w-full max-w-2xl">Appointment Details</h2>
                        <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-full max-w-2xl cursor-pointer">
                            {selectedDoctor && (<p className="text-xl font-semibold mb-2">Doctor: {selectedDoctor.name}</p>)}
                            <p><b>Name:</b> {selectedAppointment.name}</p>
                            <p><b>Date:</b> {selectedAppointment.date}</p>
                            <p><b>Time:</b> {selectedAppointment.time}</p>
                        </div>
                    </div>
                )
            }
            <h2 className="text-3xl text-center mb-3 w-full max-w-2xl">Medical Records</h2>
            <div className="flex flex-wrap w-full max-w-2xl">
                {medicalRecords.length != 0 ? medicalRecords.map((medicalRecord) => (
                    <div
                        key={medicalRecord.id}
                        className="w-1/2 mb-8 px-4"
                    >
                        <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer w-full max-w-2xl">
                            <p><b>Doctor:</b> {medicalRecord.doctorName}</p>
                            <p><b>Patient:</b> {medicalRecord.patientName}</p>
                            <p><b>Medicines:</b> {medicalRecord.medicines}</p>
                            <p><b>Advice:</b> {medicalRecord.advice}</p>
                            <p><b>Time:</b> {medicalRecord.date}</p>
                        </div>
                    </div>
                )) : <p className='pb-3 m-auto'>No Medical Records</p>}
            </div>
        </div>
         { /*)  : (<Spinner />)} */}
    </>
    )

    //     <div div className="min-h-screen flex flex-col   items-center" style={{ backgroundColor: "#a3f0bd" }}>
    //         <h1 className="text-4xl text-center mt-32 mb-8">Health Care NewDashboard</h1>
    //         <div className="flex flex-row items-center mb-8 w-full max-w-2xl">
    //             <img
    //                 src={selectedImage || users.profile_picture}
    //                 alt="_____profilePic______"
    //                 className="w-48 h-48 rounded-full mr-4 border-black border-2"
    //             />
    //             <div>
    //                 <input type="file" name="profile_picture" className="block w-full mt-4 mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
    //                 <p className="text-xl">First Name: {users.firstName}</p>
    //                 <p className="text-xl">Last Name: {users.lastName}</p>
    //                 <p className="text-xl">Date of Birth: {users.dateOfBirth}</p>
    //                 <p className="text-xl">Gender: {users.gender}</p>
    //                 <p className="text-xl">Blood Group: {users.bloodGroup}</p>
    //                 <input
    //                     type="file"
    //                     name="profile_picture"
    //                     onChange={handleFileChange}
    //                     className="hidden"
    //                 />
    //             </div>
    //         </div>
    //         <hr />
    //         <h2 className="text-3xl text-center mb-3 w-full max-w-2xl">Appointments</h2>
    //         <div className="flex flex-wrap w-full max-w-2xl">
    //             {hasAppointment ? appointments.map((appointment) => (
    //                 <div
    //                     key={appointment.time && appointment.date}
    //                     className="w-1/3 mb-8 px-4"
    //                     onClick={() => setSelectedAppointment(appointment)}
    //                 >
    //                     <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer w-full max-w-2xl">
    //                         {/* <p className="text-xl font-semibold mb-2">{appointment.doctor}</p> */}
    //                         <p>Name: {appointment.name}</p>
    //                         <p>Date: {appointment.date}</p>
    //                         <p>Time: {appointment.time}</p>
    //                     </div>
    //                 </div>
    //             )) : <p className='pb-3 m-auto'>No Appointments</p>}
    //         </div>
    //         {
    //             selectedAppointment && (
    //                 <div className="mt-8">
    //                     <h2 className="text-3xl text-center mb-8 w-full max-w-2xl">Appointment Details</h2>
    //                     <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-full max-w-2xl cursor-pointer">
    //                         <p className="text-xl font-semibold mb-2">{selectedAppointment.doctor}</p>
    //                         <p>Name: {selectedAppointment.name}</p>
    //                         <p>Date: {selectedAppointment.date}</p>
    //                         <p>Time: {selectedAppointment.time}</p>
    //                     </div>
    //                 </div>
    //             )
    //         }
    //         <h2 className="text-3xl text-center mb-3 w-full max-w-2xl">Medical Records</h2>
    //         <div className="flex flex-wrap w-full max-w-2xl">
    //             {!medicalRecords ? medicalRecords.map((medicalRecord) => (
    //                 <div
    //                     key={medicalRecord.date}
    //                     className="w-1/2 mb-8 px-4"
    //                 >
    //                     <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer w-full max-w-2xl">
    //                         <p>Doctor: {medicalRecord.doctorName}</p>
    //                         <p>Patient: {medicalRecord.patientName}</p>
    //                         <p>Medicines: {medicalRecord.medicines}</p>
    //                         <p>Advice: {medicalRecord.advice}</p>
    //                         <p>Time: {medicalRecord.date}</p>
    //                     </div>
    //                 </div>
    //             )) : <p className='pb-3 m-auto'>No Medical Records</p>}
    //         </div>
    //     </div>
    // );
};

export default PatientDashboard;

// {medicalRecords && (
//     <div className="mt-8">
//         <h2 className="text-3xl text-center mb-8 w-full max-w-2xl">Medical Records</h2>
//         <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-full max-w-2xl cursor-pointer">
//             {/* <p className="text-xl font-semibold mb-2">{medicalRecords.doctor}</p> */}
//             <p>Doctor: {medicalRecords.doctorName}</p>
//             <p>Patient: {medicalRecords.patientName}</p>
//             <p>Medicines: {medicalRecords.medicines}</p>
//             <p>Advice: {medicalRecords.advice}</p>
//             <p>Time: {medicalRecords.date}</p>
//         </div>
//     </div>
// )}
