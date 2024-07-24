import {useState,createContext, useEffect} from 'react';  
import DoctorContext from './DoctorContext';

const DoctorProvider = ({children}) => {
    const [doctor,setdoctor] = useState({});
   useEffect(()=>{                                       

        const data=localStorage.getItem("doctor");
        if(data){
            const parsed=JSON.parse(data);

            setdoctor(parsed)
        }
   },[])  


    return (
        <DoctorContext.Provider value={{doctor,setdoctor}}>
            {children}
        </DoctorContext.Provider>
    )
}


export  default DoctorProvider;