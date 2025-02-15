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
            <div className="flex items-center justify-between fixed top-0 w-full bg-white p-3 lg:p-5 z-50  ">
                {/* Logo */}
                <div className="pl-2 lg:pl-10">
                    <img
                        src={AWPL}
                        alt="Logo"
                        className="w-28 h-10 lg:w-40 lg:h-12 cursor-pointer"
                        onClick={() => navigate(apiConst.home)}
                    />
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-2 lg:space-x-6 pr-2 lg:pr-5">
                    {token && <div className="hidden lg:flex items-center"></div>}

                    {/* Hamburger & Profile Icon */}
                    <div className="relative">
                        <button
                            ref={buttonRef}
                            className="flex items-center space-x-2 px-3 py-1 rounded-full border border-gray-300 hover:shadow-lg"
                            onClick={toggleSidebar}
                        >
                            <IoReorderThreeSharp className="text-2xl text-black" />
                            <img
                                src={
                                    me?.profile?.avatar
                                        ? `http://localhost:1234/${me.profile.avatar}`
                                        : "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                                }
                                alt="Logo"
                                className="w-12 h-10 rounded-full cursor-pointer"

                            />
                        </button>

                        {/* Dropdown */}
                        {isOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute right-0 top-12 mt-2 w-64 bg-white border border-gray-300 shadow-lg rounded-lg transition-transform duration-300 ease-in-out"
                            >
                                <ul className="text-left">
                                    {token ? (
                                        <>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block text-sm py-2 px-4 hover:bg-gray-200"
                                                    onClick={logout}
                                                >
                                                    Log Out
                                                </a>
                                            </li>
                                            <li>
                                                <button
                                                    className="block text-sm py-2 px-4 hover:bg-gray-200 w-full text-left"
                                                    onClick={() => navigate(apiConst.profileMe)}
                                                >
                                                    Profile
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="block text-sm py-2 px-4 hover:bg-gray-200 w-full text-left"
                                                    onClick={() => navigate(apiConst.notifications)}
                                                >
                                                    Notifications
                                                </button>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block text-sm py-2 px-4 hover:bg-gray-200"
                                                    onClick={() => navigate(apiConst.login)}
                                                >
                                                    Log In
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block text-sm py-2 px-4 hover:bg-gray-200"
                                                    onClick={() => navigate(apiConst.signUp)}
                                                >
                                                    Sign Up
                                                </a>
                                            </li>
                                        </>
                                    )}
                                    {me?.profile?.role === "VENDOR" && (
                                        <li>
                                            <button
                                                className="block text-sm py-2 px-4 hover:bg-gray-200 w-full text-left"
                                                onClick={() => navigate(apiConst.dashboard)}
                                            >
                                                Dashboard
                                            </button>
                                        </li>
                                    )}
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
