import React, {useState, useEffect} from 'react';
import UserContext from './UserContext';

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({user: null, authToken: ""});
    // const getUser = async() => {
    //     const token = localStorage.getItem('token');
    //     const response = await fetch('http://localhost:8000/api/auth/getuser', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'auth-token': `${token}`
    //         }
    //     })
    //     const json = await response.json();
    //     console.log(json);
    //     setUser(json);
    useEffect(() => {
        // if(localStorage.getItem('token')){
        //     getUser();
        // }
        const data = localStorage.getItem('token')
        if(data){
            const parsed = JSON.parse(data);
            setUser({...user, user: parsed.user, authToken: parsed.authToken})
        }

    }, [])
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;