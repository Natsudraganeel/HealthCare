import React, { useState, useEffect, useContext } from 'react';
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

    useEffect(() => {
        if (menu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [menu]);

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
        setUser({...user, user: null, authToken: ""});
        navigate('/signin');
    }

    const handleDashboard = (e) => {
        e.preventDefault();
        if (user && localStorage.getItem('token')) {
            if (user.user.isDoctor) {
                navigate('/doctor-dashboard');
            } else {
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
                <div className='flex flex-row justify-between p-2 md:px-32 px-5 bg-backgroundColor shadow-green'>
                    <div className='flex flex-row items-center cursor-pointer'>
                        <Link to='home' duration={500}>
                            <h1 className='text-2xl font-semibold text-black'>HealthFirst</h1>
                        </Link>
                    </div>

                    <nav className='hidden lg:flex flex-row items-center text-lg font-medium gap-8'>
                        <Link to='/' duration={500} className='hover:text-hoverColor transition-all cursor-pointer'>Home</Link>
                        <Link to='nutrition' duration={500} className='hover:text-hoverColor transition-all cursor-pointer'>Nutrition</Link>
                        <Link to='workout' duration={500} className='hover:text-hoverColor transition-all cursor-pointer'>Workout</Link>
                        <Link to='/doctors' duration={500} className='hover:text-hoverColor transition-all cursor-pointer'>Doctors</Link>
                        <Link to='about' duration={500} className='hover:text-hoverColor transition-all cursor-pointer'>About us</Link>
                        <button className='hover:text-hoverColor transition-all cursor-pointer' onClick={openForm}>
                            Contact
                        </button>
                    </nav>

                    {!localStorage.getItem('token') ? (
                        <div className="hidden lg:flex">
                            <button className='bg-brightColor text-white px-4 py-2 m-4 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out'>
                                <Link to='/signup' role="button">Sign up</Link>
                            </button>
                            <button className='bg-brightColor text-white px-4 py-2 m-4 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out'>
                                <Link to='/signin' role='button'>Sign in</Link>
                            </button>
                        </div>
                    ) : (
                        <div className="relative">
                            <button onClick={handleDropdown} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                                {user.user && <span className='hover:text-hoverColor transition-all cursor-pointer mx-3 font-bold'>{user.user.username}</span>}
                                <svg height="40px" width="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-6.07 -6.07 72.81 72.81" xmlSpace="preserve" fill="#000000">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0">
                                        <rect x="-6.07" y="-6.07" width="72.81" height="72.81" rx="36.405" fill="#d3d4d4" strokeWidth="0"></rect>
                                    </g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <g>
                                            <g>
                                                <ellipse style={{ fill: '#2dbe4a' }} cx="30.336" cy="12.097" rx="11.997" ry="12.097"></ellipse>
                                                <path style={{ fill: '#2dbe4a' }} d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9C48.354,35.818,42.661,30.079,35.64,30.079z"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                            <div id="dropdownNavbar" className={`z-10 ${isHidden ? "hidden" : ""} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 lg:absolute right-0`}>
                                {/* <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                    <li>
                                        <a onClick={handleDashboard} href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black  w-full">Dashboard</a>
                                    </li>
                                </ul> */}

                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                    <li>
                                        <a
                                             onClick={handleDashboard}
                                             href="/"
                                            className="block px-4 py-2 w-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black"
                                         >
                                         Dashboard
                                         </a>
                                     </li>
                                </ul>


                                <div className="py-1">
                                    <button onClick={handleLogout} href="/" className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black w-full">Logout</button>
                                </div>
                                <div className="py-1">
                                    <button onClick={() => { navigate("/changepassword") }} href="/" className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black w-full">Change password</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showForm && <Contact closeForm={closeForm} />}

                    <div className="lg:hidden flex items-center">
                        {menu ? (
                            <AiOutlineClose size={28} onClick={handleChange} className="z-30" />
                        ) : (
                            <AiOutlineMenu size={28} onClick={handleChange} />
                        )}
                    </div>
                </div>
                {menu && (
                    <div className="fixed inset-0 z-20 bg-black bg-opacity-50" onClick={closeMenu}></div>
                )}
                <div className={`${menu ? "translate-x-0" : "translate-x-full"} lg:hidden flex flex-col fixed bg-backgroundColor text-white left-0 top-0 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-full transition-transform duration-300 ease-in-out z-20`}>
                    <Link to='home' duration={500} className='hover:text-hoverColor transition-all cursor-pointer' onClick={closeMenu}>Home</Link>
                    <Link to='nutrition' duration={500} className='hover:text-hoverColor transition-all cursor-pointer' onClick={closeMenu}>Nutrition</Link>
                    <Link to='workout' duration={500} className='hover:text-hoverColor transition-all cursor-pointer' onClick={closeMenu}>Workout</Link>
                    <Link to='/doctors' duration={500} className='hover:text-hoverColor transition-all cursor-pointer' onClick={closeMenu}>Doctors</Link>
                    <Link to='about' duration={500} className='hover:text-hoverColor transition-all cursor-pointer' onClick={closeMenu}>About us</Link>
                    <button className='hover:text-hoverColor transition-all cursor-pointer' onClick={openForm}>
                        Contact
                    </button>
                    {!localStorage.getItem('token') ? (
                        <div className='flex flex-col gap-4'>
                            <button className='bg-brightColor text-white py-2 ml-10 mr-10 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out'>
                                <Link to='/signup' role="button" onClick={closeMenu}>Sign up</Link>
                            </button>
                            <button className='bg-brightColor text-white py-2 ml-10 mr-10 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out'>
                                <Link to='/signin' role='button' onClick={closeMenu}>Sign in</Link>
                            </button>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-4'>
                            <button onClick={handleDashboard} href="/" className="bg-brightColor text-black py-2 ml-10 mr-10 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out">Dashboard</button>
                            <button onClick={handleLogout} href="/" className="bg-brightColor text-black py-2 ml-10 mr-10 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
