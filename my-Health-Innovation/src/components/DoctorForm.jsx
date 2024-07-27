import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext.js';

const outermost = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: "20px",
};

const form = {
    marginTop: "10%",
    marginBottom: "10%",
    border: "2px solid black",
    width: "80%",
    maxWidth: "800px",
    padding: "20px",
    boxSizing: "border-box",
};

const h1 = {
    textAlign: 'center',
    font: 'normal 30px Arial, sans-serif',
};

const h2 = {
    fontSize: "20px",
    marginLeft: "10px",
};

const section = {
    marginBottom: "20px",
};

const inputGroup = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
};

const inputContainer = {
    flex: "1 1 45%",
    marginBottom: "10px",
};

const input = {
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
};

const btnContainer = {
    display: "flex",
    justifyContent: "center",
};

const responsiveStyles = `
@media (max-width: 600px) {
    .input-container {
        flex: 1 1 100%;
    }
}
`;

export default function DoctorForm() {
    const { user } = useContext(UserContext);

    const [Credentials, setCredentials] = useState({ name: "", contact: "", email: "", fees: "", experienceInYears: "", hospital: "", Appointment: [] });
    const [start, setStart] = useState("");
    const [days, setDays] = useState("");
    const [end, setEnd] = useState("");
    const [spData, setSpData] = useState();
    const [qData, setQData] = useState();
    const [checked, setChecked] = useState([]);

    const navigate = useNavigate();

    const spOptions = [
        "MBBS",
        "MBBS,MD",
        "MBBS,MS"
    ];

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
        console.log("User Selected Value - ", event.target.value);
    };

    const onOptionChangeHandlerQ = (event) => {
        setQData(event.target.value);
        console.log("User Selected Value - ", event.target.value);
    };

    const onChange = (e) => {
        setCredentials({ ...Credentials, [e.target.name]: e.target.value });
        console.log(Credentials);
    };

    const handleFilter = (value) => {
        let all = [...checked];
        if (value.checked) {
            all.push(value.value);
        } else {
            all = all.filter(c => c !== value.value);
        }
        setChecked(all);
        let x = all.toString();
        setDays(x);
        console.log(x);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("hello");
        console.log(Credentials);
        const { name, contact, email, fees, experienceInYears, hospital, Appointment } = Credentials;
        const response = await fetch('https://health-first-0qsn.onrender.com/api/doctors/createdoctor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${user.authToken}`
            },
            body: JSON.stringify({ name: Credentials.name, contact: Credentials.contact, email: Credentials.email, fees: Credentials.fees, qualification: qData, experienceInYears: Credentials.experienceInYears, schedule: days + ":" + start + "-" + end, speciality: spData, hospital: Credentials.hospital, Appointment: Credentials.Appointment })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            navigate('/doctor-dashboard');
        }
    };

    return (
        <>
            <style>{responsiveStyles}</style>
            <div style={outermost}>
                <form style={form} onSubmit={handleSubmit}>
                    <h1 className="py-10" style={h1}>Fill up your details</h1>
                    <section style={section}>
                        <h2 className="py-2 block" style={h2}>Personal information</h2>
                        <div style={inputGroup}>
                            <div style={inputContainer} className="input-container">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                                <input onChange={onChange} style={input} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="name" id="name" required />
                            </div>
                        </div>
                    </section>
                    <section style={section}>
                        <h2 className="py-2 block" style={h2}>Contact information</h2>
                        <div style={inputGroup}>
                            <div style={inputContainer} className="input-container">
                                <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                <input onChange={onChange} style={input} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" name="contact" id="contact" required />
                            </div>
                            <div style={inputContainer} className="input-container">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input onChange={onChange} style={input} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" name="email" id="email" required />
                            </div>
                        </div>
                    </section>
                    <section style={section}>
                        <h2 className="py-2 block" style={h2}>Professional Information</h2>
                        <div style={inputGroup}>
                            <div style={inputContainer} className="input-container">
                                <label htmlFor="qualification" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Qualification</label>
                                <select onChange={onOptionChangeHandlerSp} style={input} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="qualification" id="qualification">
                                    <option>Please choose one option</option>
                                    {spOptions.map((option, index) => (
                                        <option key={index}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={inputContainer} className="input-container">
                                <label htmlFor="speciality" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Speciality</label>
                                <select onChange={onOptionChangeHandlerQ} style={input} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="speciality" id="speciality">
                                    <option>Please choose one option</option>
                                    {qOptions.map((option, index) => (
                                        <option key={index}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={inputContainer} className="input-container">
                                <label htmlFor="experienceInYears" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experience</label>
                                <input onChange={onChange} style={input} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" name="experienceInYears" id="experienceInYears" required />
                            </div>
                            <div style={inputContainer} className="input-container">
                                <label htmlFor="fees" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fees</label>
                                <input onChange={onChange} style={input} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" name="fees" id="fees" required />
                            </div>
                            <div style={inputContainer} className="input-container">
                                <label htmlFor="hospital" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hospital</label>
                                <input onChange={onChange} style={input} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="hospital" id="hospital" required />
                            </div>
                        </div>
                    </section>
                    <section style={section}>
                        <h2 className="py-2 block" style={h2}>Available Days</h2>
                        <div style={inputGroup}>
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                                <div style={inputContainer} className="input-container" key={day}>
                                    <label htmlFor={day} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{day}</label>
                                    <input type="checkbox" value={day} onChange={(e) => handleFilter(e.target)} />
                                </div>
                            ))}
                        </div>
                    </section>
                    <section style={section}>
                        <h2 className="py-2 block" style={h2}>Available Time</h2>
                        <div style={inputGroup}>
                            <div style={inputContainer} className="input-container">
                                <label htmlFor="start" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Time</label>
                                <input onChange={(e) => setStart(e.target.value)} style={input} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="time" name="start" id="start" required />
                            </div>
                            <div style={inputContainer} className="input-container">
                                <label htmlFor="end" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Time</label>
                                <input onChange={(e) => setEnd(e.target.value)} style={input} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="time" name="end" id="end" required />
                            </div>
                        </div>
                    </section>
                    <div className="py-5" style={btnContainer}>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}
