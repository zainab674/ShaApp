import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoPersonCircle, IoReorderThreeSharp } from "react-icons/io5";
import { AiOutlineFileSearch, AiOutlineSearch } from 'react-icons/ai';
import airbnb from './../../../assets/airbnb.png';

import NavModal from "./../modals/navModal"
import { apiConst } from './../../../constants/api.constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../authContext';
import { LogOut } from "./../../../connection/apiFunction";

function DesktopComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isRegion, setIsRegion] = useState(false);
    const [isGuest, setIsGuest] = useState(false);
    const [isStay, setIsStay] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const { token } = useAuth();
    const { setToken } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigate = useNavigate();
    const dropdownRef = useRef(null);


    const toggleSidebar = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 1);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownRef]);

    const logout = () => {

        LogOut(setToken, navigate);
    }

    return (
        <>
            <div className={` hidden md:flex space-x-2 lg:space-x-7  pr-4 pl-4 lg:pl-10 lg:pr-10 bg-white  justify-between items-center mt-0 top-0 pt-6 fixed w-full z-50`}>
                <div className="flex items-center pl-4">
                    <img src={airbnb} alt="Airbnb Logo" className="w-25 h-8 md:w-25 md:h-9 cursor-pointer" onClick={() => navigate(apiConst.home)} />
                </div>




                <div className="flex space-x-2 lg:space-x-6 items-center pr-2 lg:pr-5">
                    <div className="hidden md:block">
                        <button className="text-black font-medium py-2 rounded-md text-sm" onClick={() => navigate(apiConst.landing)}>
                            Airbnb your home
                        </button>
                    </div>
                    {token &&
                        <>
                            <div className="flex items-center" >
                                <button className="text-black hover:text-gray-700" onClick={() => navigate(apiConst.profileMe)}>
                                    Profile

                                </button>
                            </div>
                            <div className="flex items-center" >
                                <button className="text-black hover:text-gray-700" onClick={() => navigate(apiConst.notifications)}>
                                    Notifications

                                </button>
                            </div>


                        </>
                    }
                    {token &&
                        <>
                            <div className="flex items-center" >
                                <button className="text-black hover:text-gray-700" onClick={() => navigate(apiConst.dashboard)}>
                                    Dashboard

                                </button>
                            </div>

                        </>
                    }
                    <div className="relative">
                        <button
                            className="rounded-full px-3 py-1 flex items-center border border-gray-300 hover:shadow-2xl"
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
                                        <li className="mb-2">
                                            <a href="#" className="block text-sm py-2 px-4 rounded hover:bg-gray-200" onClick={logout}>
                                                Log Out
                                            </a>
                                        </li> :
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
                                    <li className="mb-2">
                                        <a href="#" className="block text-sm py-2 px-4 rounded hover:bg-gray-200">Gift Cards</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className="block text-sm py-2 px-4 rounded hover:bg-gray-200">Airbnb Your Home</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className="block text-sm py-2 px-4 rounded hover:bg-gray-200">Help Center</a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

            </div>


        </>

    );
}

function MobileComponent() {

    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <>
            <div className="md:hidden block  fixed z-30 top-0 bg-white w-full"
                onClick={openModal}
            >
                <div className=" flex items-center text-gray-700 border border-gray-300 rounded-3xl p-3 m-4 lg:mx-4 ">
                    <AiOutlineSearch className="text-3xl text-black mt-1 mr-2" />

                </div>
            </div>
            <NavModal
                isOpen={isModalOpen}
                onClose={closeModal}

            />
        </>
    )
};


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
            <MobileComponent />


        </>
    );
};

export default Navbar;
