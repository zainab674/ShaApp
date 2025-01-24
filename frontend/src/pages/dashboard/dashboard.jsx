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

    return (
        <>

            <Navbar />

            <div className="flex h-auto min-h-screen">
                {/* Left-side Panel */}
                <div className="w-64 bg-pink-700 border-r text-white border-pink-300 p-4 pt-20">
                    <h3
                        className={`text-lg font-bold cursor-pointer ${selectedOption === "Dashboard" ? "text-yellow-300" : ""
                            }`}
                        onClick={() => setSelectedOption("Dashboard")}
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
                                        className={`mt-1 cursor-pointer ${selectedOption === "All Services" ? "text-yellow-300" : ""
                                            }`}
                                        onClick={() => setSelectedOption("All Services")}
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
                                            className={`mt-1 cursor-pointer ${selectedOption === category.name ? "text-yellow-300" : ""
                                                }`}
                                            onClick={() => setSelectedOption(category.name)}
                                        >
                                            {category.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <h4
                            className={`flex mt-6 items-center justify-between text-sm font-semibold cursor-pointer ${selectedOption === "Chats" ? "text-yellow-300" : ""
                                }`}
                            onClick={() => setSelectedOption("Chats")}
                        >
                            Chats
                            <span> ▶</span>
                        </h4>

                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-gray-100 p-8">
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
