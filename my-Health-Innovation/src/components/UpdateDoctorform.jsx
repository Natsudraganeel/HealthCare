import {React,useState, useContext } from "react"

import { useNavigate } from "react-router-dom"
import UserContext from '../../context/UserContext.js';
import DoctorContext from "../../context/DoctorContext.js";
import axios from "axios";


const thing = {
    display: "flex",
    flexWrap: "wrap",
}

const outermost = {
    display: "flex",
    flexWrap: "wrap",
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
export default function UpdateDoctorForm() {

    const {user} = useContext(UserContext)
const {doctor}=useContext(DoctorContext);
    const [Credentials, setCredentials] = useState({ name: doctor.name, contact: doctor.contact, email: doctor.email, fees: doctor.fees, experienceInYears: doctor.experienceInYears, hospital: doctor.hospital, Appointment: doctor.Appointment });
    const [start,setstart]=useState("");
    const [days,setdays]=useState("");
    const [end,setend]=useState("");
    const [spData, setspData] = useState(doctor.speciality);
    const [qData, setqData] = useState(doctor.qualification);
    const [checked,setchecked]=useState([]);

    const navigate = useNavigate();

    const spoptions = [
        "MBBS",
        "MBBS,MD",
        "MBBS,MS"]

    const qoptions = [
        "Dermatology",
        "ENT",
        "Opthamology",
        "Orthopedics",
        "Gastroenterology",
        "Pulmonology",
        "Hematology",
        "Nephrology",
        "Oncology",
        "Dentistry",
    ]
    const onOptionChangeHandlersp = (event) => {
        setspData(event.target.value);
        console.log(
            "User Selected Value - ",
            event.target.value
        );
    };
    const onOptionChangeHandlerq = (event) => {
        setqData(event.target.value);
        console.log(
            "User Selected Value - ",
            event.target.value
        );
    };
    const onChange = (e) => {
        setCredentials({ ...Credentials, [e.target.name]: e.target.value });
        console.log(Credentials);
    }
       const handledays=(value)=>{
        let all=[...checked];
        if(value.checked){
           
       all.push(value.value);
       //console.log(typeof(all));
        }
        else{
        all=all.filter(c => c!==value.value);
        }
        setchecked(all);
// const array=['hello','kol'];
// const xi=array.toString();
        // console.log(xi);
        console.log(all);
       let x=all.toString();
        setdays(x);
     
        console.log(x);
      }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
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
        console.log("hello")
        console.log(Credentials);
        console.log(spData);
        console.log(qData);
        const { name, contact, email, fees, experienceInYears, hospital, Appointment } = Credentials;
        // const token = localStorage.getItem('token')
        try{
        const response = await axios.put("http://localhost:8000/api/doctors/update-doctor",{
            id:doctor._id,contact:Credentials.contact,email:Credentials.email,experienceInYears:Credentials.experienceInYears,fees:Credentials.fees,hospital:Credentials.hospital,name:Credentials.name,qualification:qData,days:days,starttime:start,endtime:end,speciality:spData,Appointment:doctor.Appointment
        })

        console.log(response.data);
        if (response.data.success) {
            navigate('/doctor-dashboard');
        }
        else{
            console.log(response.data.success);
        }
    }
    catch(err){
        console.log(err.message);
    }
    }

    return (
        <>

            <div style={outermost} >
                <form style={form} onSubmit={handleSubmit}>
                    <h1 className="py-10 " style={h1}>Fill up your details</h1>
                    <section >
                        <h2 className="py-2 block" style={h2}>Personal information</h2>
                        <div style={thing}>
                            <div style={span} className="mb-5 ">
                                <label htmlFor=" Full Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                                <input value={Credentials.name} onChange={onChange} style={input} type="text" name="name" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                            </div>
                        </div>


                    </section>
                    <section>
                        <h2 className="py-2 block" style={h2}>Contact information</h2>
                        <div style={thing}>
                            <div style={span} className="mb-5 ">
                                <label htmlFor=" contact" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                <input value={Credentials.contact} minLength={10} maxLength={10} onChange={onChange} style={input} type="tel" name="contact" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                            </div>
                            <div style={span} className="mb-5 ">
                                <label htmlFor=" email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input value={Credentials.email} onChange={onChange} style={input} type="email" name="email" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                            </div>
                        </div>
                    </section>
                    <section>
                        <h2 className="py-2 block" style={h2}>Professional Information</h2>
                        <div style={thing}>
                            <div style={span} className="mb-5 ">
                                <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Qualification</label>

                                <select onChange={onOptionChangeHandlersp} style={input} type="text" name="qualification" id="Bgroup" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Please choose one option</option>
                                    {spoptions.map((option, index) => {
                                        return (
                                            <option key={index}>
                                                {option}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div style={span} className="mb-5 ">
                                <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Speciality</label>

                                <select onChange={onOptionChangeHandlerq} style={input} type="text" name="speciality" id="Bgroup" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                    <option>Please choose one option</option>
                                    {qoptions.map((option, index) => {
                                        return (
                                            <option key={index}>
                                                {option}
                                            </option>
                                        );
                                    })}

                                </select>
                            </div>

                            <div style={span} className="mb-5 ">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experience(in years)</label>
                                <input value={Credentials.experienceInYears} onChange={onChange} style={input} type="text" name="experienceInYears" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                            </div>
                            <div style={span} className="mb-5 ">
                                <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fees</label>
                                <input value={Credentials.fees} onChange={onChange} style={input} type="number" name="fees" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                            </div>
                            <div style={span} className="mb-5 ">
                                <label htmlFor="hospital" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hospital</label>
                                <input value={Credentials.hospital} onChange={onChange} style={input} type="text" name="hospital" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                            </div>
                            
                        </div>
                        <div className="flex wrap">
                            <div style={span} className="mb-5 ">
                                <label htmlFor="schedule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Time</label>
                                <input onChange={(e)=>{setstart(e.target.value )}} style={input} id="time" name="time" type="time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                            </div>
                            <div style={span} className="mb-5 ">
                                <label htmlFor="schedule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Time</label>
                                <input onChange={(e)=>{setend(e.target.value)}} style={input} id="time" name="time" type="time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                            </div>
                            </div>
                            <div style={span} className="mb-5 ">
                            <label for="schedule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Days</label>
                           <div className="flex wrap">
                           <div className="mr-4"><input className = "ml-1 mr-1" type="checkbox" value="Mon" onChange={(e)=>{
                  handledays(e.target )
                        }}/>
                    <label for="scales">Mon</label>
                    </div> 
                    <div  className="mr-4"><input className = "ml-1 mr-1" type="checkbox" value="Tue" onChange={(e)=>{
                  handledays(e.target )
                        }}/>
                    <label for="scales">Tue</label>
                    </div> 
                    <div className="mr-4"><input className = "ml-1 mr-1" type="checkbox" value="Wed" onChange={(e)=>{
                  handledays(e.target )
                        }}/>
                    <label for="scales">Wed</label>
                    </div> 
                    <div className="mr-4"><input className = "ml-1 mr-1"  type="checkbox" value="Thurs" onChange={(e)=>{
                  handledays(e.target )
                        }}/>
                    <label for="scales">Thurs</label>
                    </div> 
                    <div className="mr-4"><input className = "ml-1 mr-1" type="checkbox" value="Fri" onChange={(e)=>{
                  handledays(e.target )
                        }}/>
                    <label for="scales">Fri</label>
                    </div> 
                    <div className="mr-4"><input className = "ml-1 mr-1" type="checkbox" value="Sat" onChange={(e)=>{
                  handledays(e.target )
                        }}/>
                    <label for="scales">Sat</label>
                    </div> 
                    <div className="mr-4"><input className = "ml-1 mr-1" type="checkbox" value="Sun" onChange={(e)=>{
                  handledays(e.target )
                        }}/>
                    <label for="scales">Sun</label>
                    </div> 
</div>
        </div>
                    </section>

                    <div style={btn}>
                        <button type="submit" className=" my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                    </div>
                </form>
            </div>

        </>
    )



}
