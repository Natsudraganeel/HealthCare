import React, { useState, useEffect, useContext } from 'react';
// import {Link} from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Contact from "../models/Contact.jsx";
import UserContext from '../../context/UserContext.js';

const Navbar = () => {

    const [menu, setMenu] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const navigate = useNavigate();

    // context
    const { user, setUser } = useContext(UserContext);

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         getUser();
    //         console.log(user);
    //     }
    // }, [])

    const handleChange = () => {
        setMenu(!menu);
    }

    const closeMenu = () => {
        setMenu(false);
    }

    const openForm = () => {
        setShowForm(true);
        setMenu(false);
    }

    const closeForm = () => {
        setShowForm(false);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('patient');
        localStorage.removeItem("doctor");
        setUser({...user, user: null, authToken: ""})
        navigate('/signin');
    }

    const handleDashboard = (e) => {
        e.preventDefault();
        if (user && localStorage.getItem('token')) {
            if (user.user.isDoctor) {
                navigate('/doctor-dashboard');
            }
            else {
                navigate('/patient-dashboard');
            }
        }
    }

    const handleDropdown = (e) => {
        e.preventDefault();
        setIsHidden(!isHidden);
    }

    return (
        <div className='sticky w-full z-10 text-white'>
            <div>
                <div className=' flex flex-row justify-between p-2 md:px-32 px-5 bg-backgroundColor shadow-green'>
                    <div className=' flex flex-row items-center cursor-pointer'>
                        <Link to='home' duration={500}>
                            <h1 className=' text-2xl font-semibold text-black'>HealthFirst</h1>
                        </Link>
                    </div>

                    <nav className=' hidden lg:flex flex-row items-center  text-lg font-medium gap-8'>
                        <Link to='/' duration={500} className=' hover:text-hoverColor transition-all cursor-pointer'>Home</Link>
                        <Link to='nutrition' duration={500} className='hover:text-hoverColor transition-all cursor-pointer'>Nutrition</Link>
                        <Link to='workout' duration={500} className='hover:text-hoverColor transition-all cursor-pointer'>Workout</Link>
                        <Link to='/doctors' duration={500} className='hover:text-hoverColor transition-all cursor-pointer'>Doctors</Link>
                        <Link to='about' duration={500} className='hover:text-hoverColor transition-all cursor-pointer'>About us</Link>
                        <button className='hover:text-hoverColor transition-all cursor-pointer' onClick={openForm}>
                            Contact
                        </button>
                    </nav>

                    {/* {user && <span className='hover:text-hoverColor transition-all cursor-pointer'>{user.username}</span>} */}

                    {!localStorage.getItem('token') ? <div className="hidden lg:flex">
                        {/* {user && <span>{user.username}</span>} */}
                        <button className=' bg-brightColor text-white px-4 py-2 m-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out'>
                            <Link to='/signup' role="button">Sign up</Link>
                        </button>
                        <button className=' bg-brightColor text-white px-4 py-2 m-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out'>
                            <Link to='/signin' role='button'>Sign in</Link>
                        </button>
                    </div> : <div className="relative">
                        {/* {user && <span className='hover:text-hoverColor transition-all cursor-pointer mx-2'>{user.username}</span>} */}
                        <button onClick={handleDropdown} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">{user.user && <span className='hover:text-hoverColor transition-all cursor-pointer mx-3 font-bold'>{user.user.username}</span>}
                            {/* <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg> */}
                            <svg height="40px" width="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-6.07 -6.07 72.81 72.81" xmlSpace="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"><rect x="-6.07" y="-6.07" width="72.81" height="72.81" rx="36.405" fill="#d3d4d4" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <ellipse style={{ fill: '#2dbe4a' }} cx="30.336" cy="12.097" rx="11.997" ry="12.097"></ellipse> <path style={{ fill: '#2dbe4a' }} d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9 C48.354,35.818,42.661,30.079,35.64,30.079z"></path> </g> </g> </g></svg>
                        </button>
                        <div id="dropdownNavbar" className={`z-10 ${isHidden ? "hidden" : ""} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 lg:absolute right-0`}>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                <li>
                                    <a onClick={handleDashboard} href="/" className="text-black block px-4 py-2 hover:bg-gray-100">Dashboard</a>
                                </li>
                                <li>
                                    
                                </li>
                            </ul>
                            <div className="py-1">
                                <button onClick={handleLogout} href="/" className=" text-black block px-4 py-2 hover:bg-gray-100 ">Logout</button>
                            </div>
                            <div className="py-1">
                         <button onClick={()=>{navigate("/changepassword")}} href="/" className=" text-black block px-4 py-2 hover:bg-gray-100 ">Change password</button>
                            </div>
                        </div>
                    </div>}

                    {showForm && <Contact closeForm={closeForm} />}

                    <div className="lg:hidden flex items-center">
                        {menu ? (
                            <AiOutlineClose size={28} onClick={handleChange} />
                        ) : (
                            <AiOutlineMenu size={28} onClick={handleChange} />
                        )}

                    </div>
                </div>
                <div className={`${menu ? "translate-x-0" : " translate-x-full"} lg:hidden flex flex-col absolute bg-backgroundColor text-white left-0 top-16 fond-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-400 ease-in-out`}>
                    <Link to='home' duration={500} className=' hover:text-hoverColor transition-all cursor-pointer' onClick={closeMenu}>Home</Link>
                    <Link to='nutrition' duration={500} className='hover:text-hoverColor transition-all cursor-pointer' onClick={closeMenu}>Nutrition</Link>
                    <Link to='workout' duration={500} className='hover:text-hoverColor transition-all cursor-pointer' onClick={closeMenu}>Workout</Link>
                    <Link to='/doctors' duration={500} className='hover:text-hoverColor transition-all cursor-pointer' onClick={closeMenu}>Doctors</Link>
                    <Link to='appointments' duration={500} className='hover:text-hoverColor transition-all cursor-pointer' onClick={closeMenu}>Appointments</Link>
                    <Link to='about' duration={500} className='hover:text-hoverColor transition-all cursor-pointer' onClick={closeMenu}>About us</Link>
                    <button className='hover:text-hoverColor transition-all cursor-pointer' onClick={openForm}>
                        Contact
                    </button>

                    {user.user && <span className='hover:text-hoverColor transition-all cursor-pointer'>{user.user.username}</span>}

                    {!localStorage.getItem('token') ? <div className="lg:hidden">
                        {/* {user && <span>{user.username}</span>} */}
                        <button className=' bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor cursor-pointer transition duration-300 ease-in-out'>
                            <Link to='/signup' role="button">Sign up</Link>
                        </button>

                        <button className=' bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor cursor-pointer transition duration-300 ease-in-out'>
                            <Link to='/signin' role="button">Sign in</Link>
                        </button>
                    </div> : <div className="relative">
                        {/* {user && <span className='hover:text-hoverColor transition-all cursor-pointer mx-2'>{user.username}</span>} */}
                        <button onClick={handleDropdown} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">{user && <span className='hover:text-hoverColor transition-all cursor-pointer mx-3 font-bold'>{user.username}</span>}
                            {/* <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg> */}
                            <svg height="40px" width="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-6.07 -6.07 72.81 72.81" xmlSpace="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"><rect x="-6.07" y="-6.07" width="72.81" height="72.81" rx="36.405" fill="#d3d4d4" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <ellipse style={{ fill: '#2dbe4a' }} cx="30.336" cy="12.097" rx="11.997" ry="12.097"></ellipse> <path style={{ fill: '#2dbe4a' }} d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9 C48.354,35.818,42.661,30.079,35.64,30.079z"></path> </g> </g> </g></svg>
                        </button>
                        <div id="dropdownNavbar" className={`z-10 ${isHidden ? "hidden" : ""} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 lg:absolute right-0`}>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                <li>
                                    <a onClick={handleDashboard} href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                </li>
                            </ul>
                            <div className="py-1">
                                <button onClick={handleLogout} href="/" className="block px-4 py-2 text-sm text-black-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full">Logout</button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Navbar

// spy={true}
// #010002
{/* <div>
                        {user && <span className='hover:text-hoverColor transition-all cursor-pointer mx-2'>{user.username}</span>}
                        <button onClick={handleLogout} className=' bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor cursor-pointer transition duration-300 ease-in-out'>Logout</button></div> */}