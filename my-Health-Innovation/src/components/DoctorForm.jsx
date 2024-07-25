import React, { useState, useContext } from "react"
import { GiConsoleController } from "react-icons/gi"
import { useNavigate } from "react-router-dom"
import UserContext from '../../context/UserContext.js';


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
export default function DoctorForm() {

    const {user} = useContext(UserContext)

    const [Credentials, setCredentials] = useState({ name: "", contact: "", email: "", fees: "", experienceInYears: "",  hospital: "", Appointment: [] });
    const [start,setstart]=useState("");
    const [days,setdays]=useState("");
    const [end,setend]=useState("");
    const [spData, setspData] = useState();
    const [qData, setqData] = useState();
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
    const handlefilter=(value)=>{
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
        console.log("hello")
        console.log(Credentials);
        const { name, contact, email, fees, experienceInYears, hospital, Appointment } = Credentials;
        // const token = localStorage.getItem('token')
        const response = await fetch('https://health-first-0qsn.onrender.com/api/doctors/createdoctor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${user.authToken}`
                // 'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ name: Credentials.name, contact: Credentials.contact, email: Credentials.email, fees: Credentials.fees, qualification: qData, experienceInYears: Credentials.experienceInYears, schedule: days+":"+start+"-"+end, speciality: spData, hospital: Credentials.hospital, Appointment: Credentials.Appointment })
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            navigate('/doctor-dashboard');
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
                                <input onChange={onChange} style={input} type="text" name="name" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>


                    </section>
                    <section>
                        <h2 className="py-2 block" style={h2}>Contact information</h2>
                        <div style={thing}>
                            <div style={span} className="mb-5 ">
                                <label htmlFor=" contact" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                <input onChange={onChange} style={input} type="number" name="contact" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div style={span} className="mb-5 ">
                                <label htmlFor=" email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input onChange={onChange} style={input} type="email" name="email" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
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
                                <input onChange={onChange} style={input} type="text" name="experienceInYears" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div style={span} className="mb-5 ">
                                <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fees</label>
                                <input onChange={onChange} style={input} type="number" name="fees" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div style={span} className="mb-5 ">
                                <label htmlFor="hospital" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hospital</label>
                                <input onChange={onChange} style={input} type="text" name="hospital" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            
                        </div>
                        <div className="flex wrap">
                            <div style={span} className="mb-5 ">
                                <label htmlFor="schedule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Time</label>
                                <input onChange={(e)=>{setstart(e.target.value)}} style={input} id="time" name="time" type="time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div style={span} className="mb-5 ">
                                <label htmlFor="schedule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Time</label>
                                <input onChange={(e)=>{setend(e.target.value)}} style={input} id="time" name="time" type="time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            </div>
                            <div style={span} className="mb-5 ">
                            <label for="schedule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Days</label>
                           <div className="flex wrap">
                           <div className="mr-4"><input className = "ml-1 mr-1" type="checkbox" value="Mon" onChange={(e)=>{
                  handlefilter(e.target )
                        }}/>
                    <label for="scales">Mon</label>
                    </div> 
                    <div  className="mr-4"><input className = "ml-1 mr-1" type="checkbox" value="Tue" onChange={(e)=>{
                  handlefilter(e.target )
                        }}/>
                    <label for="scales">Tue</label>
                    </div> 
                    <div className="mr-4"><input className = "ml-1 mr-1" type="checkbox" value="Wed" onChange={(e)=>{
                  handlefilter(e.target )
                        }}/>
                    <label for="scales">Wed</label>
                    </div> 
                    <div className="mr-4"><input className = "ml-1 mr-1"  type="checkbox" value="Thurs" onChange={(e)=>{
                  handlefilter(e.target )
                        }}/>
                    <label for="scales">Thurs</label>
                    </div> 
                    <div className="mr-4"><input className = "ml-1 mr-1" type="checkbox" value="Fri" onChange={(e)=>{
                  handlefilter(e.target )
                        }}/>
                    <label for="scales">Fri</label>
                    </div> 
                    <div className="mr-4"><input className = "ml-1 mr-1" type="checkbox" value="Sat" onChange={(e)=>{
                  handlefilter(e.target )
                        }}/>
                    <label for="scales">Sat</label>
                    </div> 
                    <div className="mr-4"><input className = "ml-1 mr-1" type="checkbox" value="Sun" onChange={(e)=>{
                  handlefilter(e.target )
                        }}/>
                    <label for="scales">Sun</label>
                    </div> 
</div>
        </div>
                          
                            <div>

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
