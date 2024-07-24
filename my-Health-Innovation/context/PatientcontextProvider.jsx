import {useState,createContext, useEffect} from 'react';  
import PatientContext from './Patientcontext';
//const PatientContext = createContext();
const PatientProvider = ({children}) => {
    const [patient,setpatient] = useState({});
   useEffect(()=>{                                       

        const data=localStorage.getItem("patient");
        if(data){
            const parsed=JSON.parse(data);

            setpatient(parsed)
        }
   },[])  


    return (
        <PatientContext.Provider value={{patient,setpatient}}>
            {children}
        </PatientContext.Provider>
    )
}


export  default PatientProvider;