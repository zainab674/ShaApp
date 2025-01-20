import React, { useEffect, useState } from "react";
import { DeleteBooking, ServiceBookings, UpdateBooking } from "../../../connection/apis";
import { useAuth } from "../../../authContext";
import UpdateBookingForm from "./updateBooking";
import { useNavigate } from "react-router-dom";
import { apiConst } from "../../../constants/api.constants";

const ServiceBookingsList = ({ me, all, pending, confirmed, paid }) => {
    const [serviceBookings, setServiceBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateBooking, setUpdateBooking] = useState("");
    const { token, fetchUserProfile, socket } = useAuth();
    const [confirmedBookings, setConfirmedBookings] = useState([]);
    const [isPaid, setIsPaid] = useState([]);
    const [pendingBookings, setPendingBookings] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBookings = async () => {
            if (me.services && Array.isArray(me.services)) {  // Ensure me.services is an array before using map
                const bookingsData = await Promise.all(
                    me.services.map(async (service) => {
                        const bookings = await ServiceBookings(service.id);
                        return { service, bookings };
                    })
                );
                setServiceBookings(bookingsData);

                if (bookingsData) {
                    const confirmed = [];
                    const pending = [];
                    const paid = [];

                    bookingsData.forEach(({ service, bookings }) => {
                        bookings.forEach((booking) => {
                            if (booking.status === 'confirmed') {
                                confirmed.push({ service, booking });  // Push each booking instead of the whole bookings array
                            } else if (booking.status === 'pending') {
                                pending.push({ service, booking });  // Push each booking instead of the whole bookings array
                            }
                            if (booking.isPaid === true) {
                                paid.push({ service, booking });
                            }
                        });
                    });

                    setConfirmedBookings(confirmed);
                    setPendingBookings(pending);
                    setIsPaid(paid);
                }
            }
        };

        fetchBookings();
    }, [me.services]);




    const calculateDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    };

    const getStatusStyle = (status) => ({
        backgroundColor: status === "pending" ? "yellow" : status === "confirmed" ? "green" : "gray",
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        textAlign: "center",
    });

    const openModal = (booking) => {
        setSelectedBooking(booking);
    };

    const closeModal = () => {
        setSelectedBooking(null);
    };

    const handleDelete = async (id) => {
        try {
            const response = await DeleteBooking(id, token);
            if (response) {
                fetchUserProfile();
                console.log("Service deleted successfully", response);
            } else {
                console.error("Error deleting service");
            }
        } catch (err) {
            console.error("Error during service delete:", err);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const response = await UpdateBooking(id, { status: newStatus }, token);
            if (response) {
                fetchUserProfile();
                console.log("Booking status updated:", response);


                const userId = response.data.userId; // Assuming response includes userId
                const title = response.data.title; // Assuming response includes userId

                const info = {
                    userId: userId,
                    bookingId: id,
                    status: newStatus,
                    message: `Your booking ${title}'s status has been ${newStatus}`
                }
                console.log("info", info)
                socket.emit('bookingStatusUpdated', info);

            } else {
                console.error("Error updating status");
            }
        } catch (err) {
            console.error("Error updating booking status:", err);
        }
    };


    const handleUpdate = (booking) => {
        setUpdateBooking(booking);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        fetchUserProfile();
        setIsModalOpen(false);
    };
    const handleClick = (id) => {
        navigate(apiConst.card.replace(":id", id));
    };


    return (
        <>
            <table className="min-w-full border-collapse border border-gray-300">


                {all &&
                    <>
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Booking Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Service Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">No. of Days</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Confirm</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Reject</th>
                            </tr>
                        </thead>

                        <tbody>
                            {serviceBookings.map(({ service, bookings }) =>
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-gray-100 cursor-pointer">

                                        <td className="border border-gray-300 px-4 py-2"
                                            onClick={() => openModal(booking)}
                                        >{booking.title}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-blue-600 font-semibold"
                                            onClick={() => handleClick(service._id)}
                                        >
                                            {service.title}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">${booking.price}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {calculateDays(booking.startDate, booking.endDate)} days
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <span style={getStatusStyle(booking.status)}>{booking.status}</span>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <button
                                                className="bg-green-500 text-white px-4 py-2 rounded"
                                                disabled={booking.status === "confirmed"}
                                                onClick={() => handleUpdateStatus(booking._id, "confirmed")}
                                            >
                                                Confirm
                                            </button>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                                onClick={() => handleUpdateStatus(booking._id, "rejected")}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </>

                }
                {confirmed &&

                    <>
                        <thead>
                            <tr>

                                <th className="border border-gray-300 px-4 py-2 text-left">Booking Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Service Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">No. of Days</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Payment</th>

                            </tr>
                        </thead>



                        <tbody>
                            {console.log("confirmed", confirmedBookings)
                            }
                            {confirmedBookings.map(({ service, booking }) => (
                                <tr key={booking._id} className="hover:bg-gray-100 cursor-pointer">
                                    <td className="border border-gray-300 px-4 py-2"
                                        onClick={() => openModal(booking)}
                                    >
                                        {booking.title}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-blue-600 font-semibold"
                                        onClick={() => handleClick(service._id)}
                                    >
                                        {service.title}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">${booking.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {calculateDays(booking.startDate, booking.endDate)} days
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <span style={getStatusStyle(booking.status)}>{booking.status}</span>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <span >{booking.isPaid == true ? "Paid" : "NotPaid"}</span>
                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </>



                }
                {pending &&


                    <>
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Booking Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Service Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">No. of Days</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Confirm</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Reject</th>

                            </tr>
                        </thead>

                        <tbody>

                            {pendingBookings.map(({ service, booking }) => (
                                <tr key={booking._id} className="hover:bg-gray-100 cursor-pointer">

                                    <td className="border border-gray-300 px-4 py-2"
                                        onClick={() => openModal(booking)}
                                    >{booking.title}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-blue-600 font-semibold"
                                        onClick={() => handleClick(service._id)}
                                    >
                                        {service.title}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">${booking.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {calculateDays(booking.startDate, booking.endDate)} days
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <span style={getStatusStyle(booking.status)}>{booking.status}</span>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                            disabled={booking.status === "confirmed"}
                                            onClick={() => handleUpdateStatus(booking._id, "confirmed")}
                                        >
                                            Confirm
                                        </button>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleUpdateStatus(booking._id, "rejected")}
                                        >
                                            Reject
                                        </button>
                                    </td>

                                </tr>
                            ))
                            }
                        </tbody>
                    </>

                }


                {paid &&

                    <>
                        <thead>
                            <tr>

                                <th className="border border-gray-300 px-4 py-2 text-left">Booking Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Service Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">No. of Days</th>


                            </tr>
                        </thead>



                        <tbody>
                            {console.log("confirmed", confirmedBookings)
                            }
                            {confirmedBookings.map(({ service, booking }) => (
                                <tr key={booking._id} className="hover:bg-gray-100 cursor-pointer">
                                    <td className="border border-gray-300 px-4 py-2"
                                        onClick={() => openModal(booking)}
                                    >
                                        {booking.title}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-blue-600 font-semibold"
                                        onClick={() => handleClick(service._id)}
                                    >
                                        {service.title}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">${booking.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {calculateDays(booking.startDate, booking.endDate)} days
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </>



                }
            </table>

            {selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-2/3 p-6 rounded-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
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

            {isModalOpen && (
                <UpdateBookingForm
                    booking={updateBooking}
                    token={token}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default ServiceBookingsList;
