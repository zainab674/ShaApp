import React, { useEffect, useState } from "react";
import { ServiceBookings } from "../../connection/apis";
import ModalForm from "../service/components";

const ContentDashboard = ({ me, token, fetchUserProfile }) => {
    const [totalBookings, setTotalBookings] = useState(0);
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState(0);
    const [totalServices, setTotalServices] = useState(0);
    const [isServiceModalOpen, setServiceModalOpen] = useState(false);

    const fetchDashboardData = async () => {
        try {
            const bookingsData = await Promise.all(
                me.services.map(async (service) => {
                    const bookings = await ServiceBookings(service._id);
                    return { service, bookings: bookings || [] };
                })
            );

            const allBookings = bookingsData.flatMap((item) => item.bookings);
            setTotalBookings(allBookings.length);

            const today = new Date();
            const upcoming = allBookings.filter((booking) => {
                const bookingDate = new Date(booking.startDate);
                return bookingDate > today;
            });
            setUpcomingBookings(upcoming);

            const past = allBookings.filter((booking) => {
                const bookingDate = new Date(booking.endDate);
                return bookingDate < today;
            });
            setPastBookings(past.length);

            setTotalServices(me.services.length);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {


        fetchDashboardData();
    }, [me.services]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                    onClick={() => setServiceModalOpen(true)}
                >
                    Add Service
                </button>
            </div>

            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-600">Total Bookings</h2>
                    <p className="text-3xl font-bold text-blue-600">{totalBookings}</p>
                </div>
                <div className="p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-600">Upcoming Bookings</h2>
                    <p className="text-3xl font-bold text-green-600">{upcomingBookings.length}</p>
                </div>
                <div className="p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-600">Past Bookings</h2>
                    <p className="text-3xl font-bold text-red-600">{pastBookings}</p>
                </div>
                <div className="p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-600">Total Services</h2>
                    <p className="text-3xl font-bold text-purple-600">{totalServices}</p>
                </div>
            </div>

            {/* Upcoming Bookings Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Upcoming Bookings</h2>
                {upcomingBookings.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {upcomingBookings.map((booking) => (
                            <li
                                key={booking._id}
                                className="flex items-center justify-between py-4"
                            >
                                <div className="flex items-center">
                                    <img
                                        src={booking.image || "https://via.placeholder.com/50"}
                                        alt={booking.title}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <p className="font-semibold">{booking.title}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(booking.startDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">${booking.price}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No upcoming bookings</p>
                )}
            </div>


            {isServiceModalOpen && (
                <ModalForm
                    isOpen={isServiceModalOpen}
                    onClose={() => {
                        setServiceModalOpen(false)
                        fetchDashboardData()
                    }}
                    token={token}
                    fetchUserProfile={fetchUserProfile}
                    fetchDashboardData={fetchDashboardData}
                />
            )}
        </div>
    );
};

export default ContentDashboard;
