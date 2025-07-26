import React , {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact=({closeForm})=>{
const [email,setemail]=useState("");
const [phone,setphone]=useState("");
const [query,setquery]=useState("");
const sendEmail = (event) => {
  
    event.preventDefault();
    console.log(email +" "+phone+" "+query)
    const config = {
                    Username: `${import.meta.env.VITE_USERNAME}`,
                    Password: `${import.meta.env.VITE_PASSWORD}`,
                    Host: "smtp.elasticemail.com",
                    Port: `${import.meta.env.VITE_PORT}`,
                    To: email,
                    From: `${import.meta.env.VITE_USERNAME}`,
                    Subject: "",
                    Body: query+".My phone number is "+phone,

    };
    if (window.Email) {
      window.Email.send(config).then(
        () => toast.success('We got your query!', {
          position: "top-right",

        })
      );
    }

  }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className="popup-form absolute mt-12 text-black">
                <form className='w=80 md:w-96  space-y-5 bg-white p-5 rounded-xl border-2 border-green-500 '>
                    <h1 className="text-4xl font-semibold text-center">Contact Us!</h1>
                    

                    <div className="flex flex-col">
                        <input onChange={(e)=>{setemail(e.target.value)}} type="email" name="userEmail" id="userEmail" placeholder="Your Email" className="py-3 px-2 bg-[#c8f2c6] rounded-lg"/>
                    </div>

                    <div className="flex flex-col">
                        <input onChange={(e)=>{setphone(e.target.value)}} type="number" name="userNumber" id="userNumber" placeholder="Phone No." className="py-3 px-2 bg-[#c8f2c6] rounded-lg"/>
                    </div>
                    <div className="flex flex-col">
                        <textarea  onChange={(e)=>{setquery(e.target.value)}} type="number" name="userNumber" id="userNumber" placeholder="Your Queries" className="py-3 px-2 bg-[#c8f2c6] rounded-lg"/>
                    </div>

                    <div className='bg-brightColor text-white h-8 text-center rounded-md hover:bg-hoverColor cursor-pointer transition duration-300 ease-in-out flex items-center justify-center' onClick={sendEmail}>
                    Submit
                    </div>

                    <div className="bg-backgroundColor text-white px-10 h-8 rounded-md active:bg-green-500 cursor-pointer text-center flex items-center justify-center" onClick={closeForm}>
                    Close
                    </div>


                </form>
            </div>
            <ToastContainer bodyClassName="toastBody" />
        </div>
    )
}

export default Contact;
