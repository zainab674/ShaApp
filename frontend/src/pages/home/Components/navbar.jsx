import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoPersonCircle, IoReorderThreeSharp } from "react-icons/io5";
import { AiOutlineFileSearch, AiOutlineSearch } from 'react-icons/ai';
import airbnb from './../../../assets/airbnb.png';
import AWPL from './../../../assets/AWPL.png';

import NavModal from "./../modals/navModal"
import { apiConst } from './../../../constants/api.constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../authContext';
import { LogOut } from "./../../../connection/apiFunction";

function DesktopComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const { token, me } = useAuth();
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const toggleSidebar = () => {
        setIsOpen((prevState) => !prevState);
    };


    const logout = () => {

        LogOut(setToken, navigate);
    }

    return (
        <>
            <div className={` flex space-x-2 lg:space-x-7  pr-4 pl-4 lg:pl-10 lg:pr-10 bg-white pt-2 justify-between items-center mt-0 top-0 fixed w-full z-50`}>
                <div className="flex items-center pl-4">
                    <img src={AWPL} alt="Airbnb Logo" className="w-40 h-12 cursor-pointer" onClick={() => navigate(apiConst.home)} />
                </div>




                <div className="flex space-x-2 lg:space-x-6 items-center pr-2 lg:pr-5">


                    {token &&
                        <>
                            <div className="flex items-center" >

                            </div>

                        </>
                    }
                    <div className="relative">
                        <button
                            ref={buttonRef}
                            className="rounded-full px-3 py-1 mb-2 flex items-center border border-gray-300 hover:shadow-2xl"
                            onClick={toggleSidebar}
                        >
                            <IoReorderThreeSharp className="text-2xl text-black pt-1" />
                            <IoPersonCircle className="text-4xl text-gray-500" />
                        </button>

                        {isOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute top-10 right-6 mt-2 bg-white border border-gray-300 shadow-lg text-black w-64 transition-transform duration-300 ease-in-out rounded-lg"
                            >
                                <ul className="text-left pt-0">
                                    {token ?

                                        <>
                                            <li className="mb-2">
                                                <a href="#" className="block text-sm py-2 px-4 rounded hover:bg-gray-200" onClick={logout}>
                                                    Log Out
                                                </a>
                                            </li>
                                        </>
                                        :
                                        <>
                                            <li className="mb-2">
                                                <a href="#" className="block text-sm py-2 px-4 rounded hover:bg-gray-200" onClick={() => navigate(apiConst.login)}>
                                                    Log in
                                                </a>
                                            </li>
                                            <li className="mb-2">
                                                <a href="#" className="block text-sm py-2 px-4 rounded hover:bg-gray-200" onClick={() => navigate(apiConst.signUp)}>
                                                    Sign up
                                                </a>
                                            </li>
                                        </>
                                    }

                                    <hr className="border-t border-gray-300" />
                                    {(me && me.profile.role == "VENDOR") ?
                                        <li className="mb-2">
                                            <button className="text-black hover:text-gray-700 block text-sm py-2 px-4 rounded" onClick={() => navigate(apiConst.dashboard)}>
                                                Dashboard

                                            </button>
                                        </li>
                                        :
                                        ""
                                    }
                                    {token && <>
                                        <li className="mb-2">
                                            <button className="text-black hover:text-gray-700 block text-sm py-2 px-4 rounded" onClick={() => {
                                                console.log('Current Location:', window.location.pathname);
                                                console.log('Navigating to:', apiConst.profileMe);
                                                navigate(apiConst.profileMe)
                                            }}>
                                                Profile

                                            </button>
                                        </li>
                                        <li className="mb-2">
                                            <button className="text-black hover:text-gray-700 block text-sm py-2 px-4 rounded" onClick={() => navigate(apiConst.notifications)}>
                                                Notifications

                                            </button>
                                        </li>
                                    </>}

                                </ul>
                            </div>
                        )}
                    </div>
                </div>

            </div>


        </>

    );
}

const Navbar = () => {
    const { socket } = useAuth();
    useEffect(() => {
        if (!socket) {
            console.warn('Socket not available');
            return;
        }

        const handleBookingStatusUpdated = (message) => {
            console.log('New booking status received:', message);
            toast.info(`New Notification: ${message}`, {
                position: "bottom-right",
                autoClose: false,
                closeOnClick: true,
            });
        };

        // Set up listener for booking status updates
        socket.on('bookingStatusUpdated', handleBookingStatusUpdated);

        // Cleanup listener on unmount
        return () => {
            socket.off('bookingStatusUpdated', handleBookingStatusUpdated);
        };
    }, [socket]);
    return (
        <>
            <ToastContainer />
            <DesktopComponent />


        </>
    );
};

export default Navbar;
