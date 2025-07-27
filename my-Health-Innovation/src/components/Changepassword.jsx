import { React,useState,useRef, useContext} from "react";
import img1 from "../assets/img/images/signup_logo.png"
import { ToastContainer, toast } from 'react-toastify';
import UserContext from "../../context/UserContext"
import { useNavigate,NavLink,Link } from "react-router-dom";
import axios from "axios";
export default function Changepassword (){
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
      const emailRef = useRef()
      const passwordRef = useRef()
       const [oldpassword,setoldpassword]=useState("");
      const [password,setPassword]=useState("");
      const [confirmpassword,setconfirmPassword]=useState("");
      const [showPassword, setShowPassword] = useState("password");
      const [click, setclick] = useState("");
    
      
      const {user, setUser} = useContext(UserContext);
    
      const navigate = useNavigate();
    
const handlesubmit=async(e)=>{
e.preventDefault();
// console.log(password);
// console.log(confirmpassword);
if(password!==confirmpassword) {
    return setclick("Password and confirm password not matching.Try again!");
   
  }
  else{
  setclick("");
  }
  try{
    // if(!user.user){
    //   alert("login first")
    // }
    // console.log(user)
  const res = await axios.put(
  "http://localhost:8000/api/auth/changepassword",
  {
    
    id: user.user?._id,
    password: password,
    oldpassword:oldpassword
  },{
    headers:{
      'auth-token': `${user.authToken}`
    }
  }
);
if(res.data.success===false){
   toast.error(res.data.message);
}
    else{
    navigate("/");
    }
 
}
catch(err){
    console.log(err.message);
}


}
   
    return (
        <>
          {/* {
    
            } */}
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 hero" >
    
            <div className="mt-12  sm:mx-auto  sm:w-full sm:max-w-sm" style={formdiv}>
    
    
              <form className="space-y-6" action="#" method="POST" onSubmit={handlesubmit}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                 
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Change Password
                  </h2>
                </div>
                
                
                <div>
    
                  <div className="mt-2 eye" style={parent}>
                    <input
                      id="password"
                      name="password"
                      ref={passwordRef}
                      value={oldpassword}
                      onChange={(e)=>{setoldpassword(e.target.value)}}
                      type="password"
                      required
                      placeholder="Password(atleast 8 characters)"
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
                      value={password}
                      onChange={(e)=>{setPassword(e.target.value)}}
                      type="password"
                      required
                      placeholder="Password(atleast 8 characters)"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    />
                    
                  </div>
                </div>
                <div>
    
                  <div className="mt-2">
                    <input
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      value={confirmpassword}
                      ref={passwordRef}
                      onChange={(e)=>{setconfirmPassword(e.target.value)}}
                      required
                      placeholder="Confirm Password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    />
                  </div>
    
                </div>
                <h1 style={{ color: "red" }}>{click}</h1>
    
                <div>
     
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Change
                  </button>
                </div>
                
             
              </form>
             
            </div>
             <ToastContainer bodyClassName="toastBody" />
          </div>
    
        </>
      )
}
