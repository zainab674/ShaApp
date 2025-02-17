import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../authContext';
import { DeleteBooking, UserBookings } from '../../../connection/apis';
import { useNavigate } from 'react-router-dom';
import { apiConst } from '../../../constants/api.constants';
import { FaEdit, FaTrash } from 'react-icons/fa';
import UpdateBookingForm from './updateBooking';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import this CSS for styling


const MyBookings = () => {
    const [confirmedBookings, setConfirmedBookings] = useState([]);
    const [pendingBookings, setPendingBookings] = useState([]);
    const [Bookings, setBookings] = useState(false);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateBooking, setupdateBooking] = useState('');
    const fetchBookings = async () => {
        try {
            const bookings = await UserBookings(token);
            if (bookings) {
                // Separate confirmed and pending bookings
                const confirmed = bookings.filter((booking) => booking.status === 'confirmed');
                const pending = bookings.filter((booking) => booking.status === 'pending');

                setConfirmedBookings(confirmed);
                setBookings(true);
                setPendingBookings(pending);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {


        fetchBookings();
    }, [token]);


    const handleClick = (id) => {
        navigate(apiConst.card.replace(":id", id));
    };


    const handleDelete = async (id) => {
        try {
            const response = await DeleteBooking(id, token);
            if (response) {
                fetchBookings()
                console.log("booking deleted successfully", response);
                toast.error("booking deleted successfully!");



            } else {
                console.error("Error Deleting service");
            }
        } catch (err) {
            console.error("Error during service delete:", err);
        }
    }
    const handleupdate = (booking) => {
        console.log("Update button clicked for booking:", booking);  // Add this line
        setupdateBooking(booking);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        fetchBookings()
        setIsModalOpen(false);
    };
    // Loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="my-10 mt-10 px-4 md:px-6">
            <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>

            {/* Confirmed Bookings */}
            {Bookings == false ? <p>No bookings.</p> : ""}
            <div className="mb-8">
                <div className="space-y-4">
                    {confirmedBookings.length === 0 ? (
                        <p>No confirmed bookings.</p>
                    ) : (
                        confirmedBookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="p-4 bg-white rounded-md shadow-md border border-gray-200"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                                    <div>
                                        <h3
                                            className="text-lg font-semibold cursor-pointer"
                                            onClick={() => handleClick(booking.serviceId)}
                                        >
                                            {booking.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">{booking.description}</p>
                                        <p className="mt-2 text-green-500">Status: Confirmed</p>
                                    </div>
                                    <div>
                                        <p>
                                            <strong>Price:</strong> ${booking.price}
                                        </p>
                                        <p>
                                            <strong>Start Date:</strong>{" "}
                                            {new Date(booking.startDate).toLocaleDateString()}
                                        </p>
                                        <p>
                                            <strong>End Date:</strong>{" "}
                                            {new Date(booking.endDate).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div>
                                        {booking.isPaid ? (
                                            <button
                                                className="bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed"
                                                disabled
                                            >
                                                Paid
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    navigate(apiConst.payment.replace(":id", booking._id))
                                                }
                                                className="bg-pink-800 text-white py-2 px-4 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                                            >
                                                Make Payment
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Pending Bookings */}
            <div>
                <div className="space-y-4">
                    {pendingBookings.length === 0 ? (
                        <p>No pending bookings.</p>
                    ) : (
                        pendingBookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="p-4 bg-white rounded-md shadow-md border border-gray-200"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                                    <h3
                                        className="text-lg font-semibold cursor-pointer"
                                        onClick={() => handleClick(booking.serviceId)}
                                    >
                                        {booking.title}
                                    </h3>
                                    <div className="flex gap-2">
                                        <FaEdit
                                            className="text-gray-600 cursor-pointer hover:text-blue-600"
                                            onClick={() => handleupdate(booking)}
                                        />
                                        <FaTrash
                                            className="text-gray-600 cursor-pointer hover:text-red-600"
                                            onClick={() => handleDelete(booking._id)}
                                        />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500">{booking.description}</p>
                                <p className="mt-2 text-yellow-500">Status: Pending</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {isModalOpen && (
                <UpdateBookingForm
                    booking={updateBooking}
                    token={token}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </div>

    );



};

export default MyBookings;
