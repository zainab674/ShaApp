import React, { useEffect, useState } from "react";
import { useAuth } from "../../authContext";
import { LoadingSpinner } from "../../constants/loadingSpinner";
import ServiceBookingsList from "../booking/components/serviceBookings";
import ShowAllServices from "../service/allServices";
import ContentDashboard from "./content";
import Navbar from "../home/Components/navbar";
import ChatLayout from "../privatechat/allChats";

const Dashboard = () => {
    const { me, loading, token, fetchUserProfile } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isBookingsOpen, setIsBookingsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Dashboard");

    useEffect(() => {
        if (!loading && me) {
            setIsLoading(false);
        }
    }, [loading, me]);

    if (isLoading || !me) {
        return <LoadingSpinner />;
    }

    const bookingCategories = [
        { name: "All", key: "all" },
        { name: "Pending", key: "pending" },
        { name: "Confirmed", key: "confirmed" },
        { name: "Paid", key: "paid" },
    ];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsMobileMenuOpen(false);
    };

    const SideMenu = () => (
        <div className={`
            fixed inset-y-0 left-0 z-49 w-64 bg-pink-700 text-white 
            transform transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="p-4 pt-20">
                <h3
                    className={`text-lg pt-5 font-bold cursor-pointer ${selectedOption === "Dashboard" ? "text-yellow-300" : ""}`}
                    onClick={() => handleOptionSelect("Dashboard")}
                >
                    Dashboard
                </h3>
                <div className="mt-6">
                    <div>
                        <h4
                            className="flex items-center justify-between text-sm font-semibold cursor-pointer"
                            onClick={() => setIsServicesOpen(!isServicesOpen)}
                        >
                            Services
                            <span>{isServicesOpen ? "▼" : "▶"}</span>
                        </h4>
                        {isServicesOpen && (
                            <ul className="mt-2 ml-4 text-sm">
                                <li
                                    key="all"
                                    className={`mt-1 cursor-pointer ${selectedOption === "All Services" ? "text-yellow-300" : ""}`}
                                    onClick={() => handleOptionSelect("All Services")}
                                >
                                    All Services
                                </li>
                            </ul>
                        )}
                    </div>
                    <div className="mt-6">
                        <h4
                            className="flex items-center justify-between text-sm font-semibold cursor-pointer"
                            onClick={() => setIsBookingsOpen(!isBookingsOpen)}
                        >
                            Bookings
                            <span>{isBookingsOpen ? "▼" : "▶"}</span>
                        </h4>
                        {isBookingsOpen && (
                            <ul className="mt-2 ml-4 text-sm">
                                {bookingCategories.map((category) => (
                                    <li
                                        key={category.key}
                                        className={`mt-1 cursor-pointer ${selectedOption === category.name ? "text-yellow-300" : ""}`}
                                        onClick={() => handleOptionSelect(category.name)}
                                    >
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <h4
                        className={`flex mt-6 items-center justify-between text-sm font-semibold cursor-pointer ${selectedOption === "Chats" ? "text-yellow-300" : ""}`}
                        onClick={() => handleOptionSelect("Chats")}
                    >
                        Chats
                        <span> ▶</span>
                    </h4>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Navbar />

            {/* Mobile Menu Toggle Button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-pink-700 text-white p-2 rounded"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? '✕' : '☰'}
            </button>

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black opacity-50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <div className="flex h-auto min-h-screen">

                <SideMenu />



                {/* Main Content */}
                <div className="flex-1 bg-gray-100 p-4 md:p-8 mt-16 md:mt-0">
                    <h2 className="text-2xl font-bold mb-4">{selectedOption}</h2>
                    <div className="mt-4">
                        {selectedOption === "Dashboard" && <ContentDashboard me={me} token={token} fetchUserProfile={fetchUserProfile} />}
                        {selectedOption === "Chats" && <ChatLayout />}
                        {selectedOption === "All Services" && <ShowAllServices me={me} token={token} fetchUserProfile={fetchUserProfile} />}

                        {bookingCategories.some((category) => category.name === selectedOption) && (
                            <div>
                                {selectedOption === "All" && <ServiceBookingsList me={me} all={selectedOption} />}
                                {selectedOption === "Pending" && <ServiceBookingsList me={me} pending={selectedOption} />}
                                {selectedOption === "Confirmed" && <ServiceBookingsList me={me} confirmed={selectedOption} />}
                                {selectedOption === "Paid" && <ServiceBookingsList me={me} paid={selectedOption} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;