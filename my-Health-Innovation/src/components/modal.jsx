import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formdiv = {
  width: '90%',
  maxWidth: '500px',
  margin: 'auto',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const cross = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
};

const parent = {
  position: 'relative',
};

export default function PopupForm({ closeForm, handleSubmit, handleChange, nameRef, dateRef, timeRef }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
      <div className="popup-form" style={formdiv}>
        <svg style={cross} onClick={closeForm} className="h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-black">
              Fill up the following form
            </h2>
          </div>
          <div className="mt-2">
            <input
              onChange={handleChange}
              id="name"
              name="name"
              type="text"
              required
              ref={nameRef}
              placeholder="Patient Name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="date" className="block text-sm font-medium leading-6 text-black">
              Appointment Date
            </label>
            <input
              onChange={handleChange}
              id="date"
              name="date"
              type="date"
              required
              ref={dateRef}
              placeholder="Appointment Date"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="time" className="block text-sm font-medium leading-6 text-black">
              Time
            </label>
            <input
              onChange={handleChange}
              id="time"
              name="time"
              type="time"
              required
              ref={timeRef}
              placeholder="Time"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
      <ToastContainer bodyClassName="toastBody" />
    </div>
  );
}
