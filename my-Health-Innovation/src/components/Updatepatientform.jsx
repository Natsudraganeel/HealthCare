import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext.js';
import PatientContext from "../../context/Patientcontext.js";
import axios from "axios";

export default function UpdatePatientForm() {
  const { user } = useContext(UserContext);
  const { patient } = useContext(PatientContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: patient.username,
    email: patient.email,
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put("https://healthcare-ioez.onrender.com/api/patients/update-patient", {
        id: patient._id,
        username: formData.username,
        email: formData.email
      });
      navigate("/patient-dashboard");
    } catch (err) {
      console.error("Error updating patient:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="border-2 border-black rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
          <input
            value={formData.username}
            onChange={handleChange}
            type="text"
            name="username"
            id="username"
            className="w-full border border-gray-300 rounded-lg p-2.5"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input
            value={formData.email}
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            className="w-full border border-gray-300 rounded-lg p-2.5"
          />
        </div>

        <div className="text-center">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
