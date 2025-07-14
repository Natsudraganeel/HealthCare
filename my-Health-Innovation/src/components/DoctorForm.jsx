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
    marginTop: "5%",
    marginBottom: "5%",
    border: "1px solid #ccc",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "900px",
    padding: "30px",
    backgroundColor: "#f9f9f9",
};

const h1 = {
    textAlign: 'center',
    font: 'normal 30px Arial, sans-serif',
    color: '#2c3e50'
};

const h2 = {
    fontSize: "20px",
    marginBottom: "10px",
    color: '#34495e'
};

const section = {
    marginBottom: "30px",
};

const inputGroup = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "20px"
};

const inputContainer = {
    flex: "1 1 45%",
    minWidth: "250px",
    display: "flex",
    flexDirection: "column"
};

const input = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box",
    backgroundColor: "white",
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
}`;

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

    const spOptions = ["MBBS", "MBBS,MD", "MBBS,MS"];

    const qOptions = [
        "Dermatology", "ENT", "Ophthalmology", "Orthopedics", "Gastroenterology",
        "Pulmonology", "Hematology", "Nephrology", "Oncology", "Dentistry"
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
            all = all.filter(c => c !== value.value);
        }
        setChecked(all);
        setDays(all.toString());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, contact, email, fees, experienceInYears, hospital, Appointment } = Credentials;
        const response = await fetch('https://healthcare-ioez.onrender.com/api/doctors/createdoctor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${user.authToken}`
            },
            body: JSON.stringify({
                name, contact, email, fees, experienceInYears,
                hospital, Appointment,
                schedule: days + ":" + start + "-" + end,
                qualification: qData,
                speciality: spData
            })
        });
        const json = await response.json();
        if (json.success) navigate('/doctor-dashboard');
    };

    return (
        <>
            <style>{responsiveStyles}</style>
            <div style={outermost}>
                <form style={form} onSubmit={handleSubmit}>
                    <h1 className="py-10" style={h1}>Fill up your details</h1>

                    {/* Sections here remain unchanged */}

                    {/* Submit button */}
                    <div className="py-5" style={btnContainer}>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
