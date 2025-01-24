import React, { useEffect, useState } from "react";
import { ServiceBookings } from "../../connection/apis";
import ModalForm from "../service/components";

const ContentDashboard = ({ me, token, fetchUserProfile }) => {
    const [totalBookings, setTotalBookings] = useState(0);
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState(0);
    const [totalServices, setTotalServices] = useState(0);
    const [isServiceModalOpen, setServiceModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

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


    const openModal = (booking) => {
        setSelectedBooking(booking);
    };

    const closeModal = () => {
        setSelectedBooking(null);
    };

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
                                className="flex items-center justify-between py-4 cursor-pointer"
                                onClick={() => openModal(booking)}

                            >
                                <div className="flex items-center">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-600 text-lg font-bold text-white mr-4">
                                        {booking.title.charAt(0).toUpperCase()}
                                    </div>
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

            {selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-2/3 p-6 rounded-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={closeModal}
                        >
                            &times;
                        </button>

                        {selectedBooking.status === "confirmed" ? ""
                            :
                            <div className="absolute top-2 right-10 flex space-x-4">
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => handleUpdate(selectedBooking)}
                                >
                                    ✎
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(selectedBooking._id)}
                                >
                                    🗑
                                </button>
                            </div>
                        }

                        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
                        <p><strong>Booking ID:</strong> {selectedBooking._id}</p>
                        <p><strong>Title:</strong> {selectedBooking.title}</p>
                        <p><strong>Description:</strong> {selectedBooking.description}</p>
                        <p><strong>Price:</strong> ${selectedBooking.price}</p>
                        <p><strong>Start Date:</strong> {new Date(selectedBooking.startDate).toLocaleDateString()}</p>
                        <p><strong>End Date:</strong> {new Date(selectedBooking.endDate).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> {selectedBooking.status}</p>
                    </div>
                </div>
            )}

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
