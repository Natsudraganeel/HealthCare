import { CSSProperties, useState, useContext } from "react";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext.js';
import { useEffect } from "react";

export default function Spinner() {
    const two = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",

    }
    const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
    const [count, setcount] = useState(3);
     let [color, setColor] = useState("#15a100ff");
    const { user } = useContext(UserContext);

    const nav = useNavigate();

        // var count=3;
    let timer = setInterval(() => {
       setcount(count-1)
       
    }, 1000)

     if (count === 0) {
        clearInterval(timer);
        if(user.authToken===""){
            nav("/signin")
        }
        else {
            if (user.isDoctor === false) {

                nav("/patient-dashboard");
            }
            else {

                nav("/doctor-dashboard");
            }
        }
        
    }


    return <>
        <div role="status">
            <div style={two}>
                
                 <FadeLoader
        color={color}
        loading={true}
        cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
            </div>
        </div>

    </>
}