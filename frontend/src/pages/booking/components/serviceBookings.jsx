import React, { useEffect, useState, useMemo } from "react";
import { DeleteBooking, ServiceBookings, SpecificUser, UpdateBooking } from "../../../connection/apis";
import { useAuth } from "../../../authContext";
import UpdateBookingForm from "./updateBooking";
import { useNavigate } from "react-router-dom";
import { apiConst } from "../../../constants/api.constants";
import { FaPen, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import this CSS for stylings

const ServiceBookingsList = ({ me, all, pending, confirmed, paid }) => {
    const [serviceBookings, setServiceBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateBooking, setUpdateBooking] = useState("");
    const { token, fetchUserProfile, socket } = useAuth();
    const [confirmedBookings, setConfirmedBookings] = useState([]);
    const [isPaid, setIsPaid] = useState([]);
    const [pendingBookings, setPendingBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // For search input
    const navigate = useNavigate();
    const [users, setUsers] = useState({}); // To store user data by their userId


    useEffect(() => {
        const fetchBookings = async () => {
            if (me.services && Array.isArray(me.services)) {
                const bookingsData = await Promise.all(
                    me.services.map(async (service) => {
                        const bookings = await ServiceBookings(service.id);
                        return { service, bookings };
                    })
                );

                setServiceBookings(bookingsData);

                const confirmed = [];
                const pending = [];
                const paid = [];

                bookingsData.forEach(({ service, bookings }) => {
                    bookings.forEach((booking) => {
                        if (booking.status === "confirmed") {
                            confirmed.push({ service, booking });
                        } else if (booking.status === "pending") {
                            pending.push({ service, booking });
                        }
                        if (booking.isPaid) {
                            paid.push({ service, booking });
                        }
                    });
                });

                setConfirmedBookings(confirmed);
                setPendingBookings(pending);
                setIsPaid(paid);
            }
        };

        fetchBookings();
    }, [me.services]);

    useEffect(() => {
        const fetchUserData = async () => {
            // Create a set of unique userIds from all booking types
            const userIdsSet = new Set();

            // Add userIds from all booking categories
            const addUserIds = (bookingsList) => {
                bookingsList.forEach(({ booking }) => {
                    if (booking.userId) {
                        userIdsSet.add(booking.userId);
                    }
                });
            };

            addUserIds(confirmedBookings);
            addUserIds(pendingBookings);
            addUserIds(isPaid);

            // Fetch user data for each unique userId that hasn't been fetched yet
            const uniqueUserIds = [...userIdsSet];
            for (const userId of uniqueUserIds) {
                if (!users[userId]) {
                    await GetUser(userId);
                }
            }
        };

        fetchUserData();
    }, [confirmedBookings, pendingBookings, isPaid, users]);

    const GetUser = async (id) => {
        try {
            const res = await SpecificUser(id);
            setUsers((prevUsers) => ({
                ...prevUsers,
                [id]: {
                    name: res?.name || 'Anonymous',

                }
            }));
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUsers((prevUsers) => ({
                ...prevUsers,
                [id]: {
                    name: 'Anonymous',
                    avatar: null
                }
            }));
        }
    };

    // Function to get username from userId
    const getUserName = (userId) => {
        return users[userId]?.name || 'Loading...';
    };

    const handleClickUser = (id) => {

        navigate(apiConst.profileUser.replace(':id', id));
    };



    const calculateDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const ans = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        // return ans === 0 ? "Half Day" : ans + " days";
        return ans

    };

    const getStatusStyle = (status) => ({
        backgroundColor: status === "pending" ? "yellow" : status === "confirmed" ? "green" : "gray",
        color: status === "pending" ? "black" : status === "confirmed" ? "white" : "white",
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
                setSelectedBooking(null)
                toast.success("booking deleted successfully!");

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

                const { userId, title } = response.data;

                const info = {
                    userId,
                    bookingId: id,
                    status: newStatus,
                    message: `Your booking "${title}"'s status has been updated to "${newStatus}".`,
                };
                console.log("info", info);
                socket.emit("bookingStatusUpdated", info);
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
        closeModal();
    };

    const handleClick = (id) => {
        navigate(apiConst.card.replace(":id", id));
    };

    const overlappingBookings = useMemo(() => {
        const isOverlapping = (startDate1, endDate1, startDate2, endDate2) => {
            const start1 = new Date(startDate1);
            const end1 = new Date(endDate1);
            const start2 = new Date(startDate2);
            const end2 = new Date(endDate2);
            return start1 <= end2 && start2 <= end1;
        };

        const overlapping = new Set();

        // Check pending bookings against confirmed bookings
        pendingBookings.forEach(({ booking: pendingBooking, service }) => {
            confirmedBookings.forEach(({ booking: confirmedBooking }) => {
                if (
                    pendingBooking.serviceId === confirmedBooking.serviceId &&
                    isOverlapping(
                        pendingBooking.startDate,
                        pendingBooking.endDate,
                        confirmedBooking.startDate,
                        confirmedBooking.endDate
                    )
                ) {
                    overlapping.add(pendingBooking._id);
                }
            });
        });

        // Check overlapping within pending bookings
        const sortedPending = [...pendingBookings].sort(
            ({ booking: a }, { booking: b }) => new Date(a.startDate) - new Date(b.startDate)
        );

        for (let i = 0; i < sortedPending.length - 1; i++) {
            const { booking: current } = sortedPending[i];
            const { booking: next } = sortedPending[i + 1];

            if (
                current.serviceId === next.serviceId &&
                isOverlapping(
                    current.startDate,
                    current.endDate,
                    next.startDate,
                    next.endDate
                )
            ) {
                overlapping.add(current._id);
                overlapping.add(next._id);
            }
        }

        return overlapping;
    }, [pendingBookings, confirmedBookings]);
    const overlappingWithConfirmed = useMemo(() => {
        const isOverlapping = (startDate1, endDate1, startDate2, endDate2) => {
            const start1 = new Date(startDate1);
            const end1 = new Date(endDate1);
            const start2 = new Date(startDate2);
            const end2 = new Date(endDate2);
            return start1 <= end2 && start2 <= end1;
        };

        const overlapping = new Set();

        // Check pending bookings against confirmed bookings
        pendingBookings.forEach(({ booking: pendingBooking }) => {
            confirmedBookings.forEach(({ booking: confirmedBooking }) => {
                if (
                    pendingBooking.serviceId === confirmedBooking.serviceId &&
                    isOverlapping(
                        pendingBooking.startDate,
                        pendingBooking.endDate,
                        confirmedBooking.startDate,
                        confirmedBooking.endDate
                    )
                ) {
                    overlapping.add(pendingBooking._id);
                }
            });
        });

        return overlapping;
    }, [pendingBookings, confirmedBookings]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    // Filter bookings based on the search query
    const filteredBookings = useMemo(() => {
        return serviceBookings.map(({ service, bookings }) => ({
            service,
            bookings: bookings.filter(
                (booking) =>
                    booking.title.toLowerCase().includes(searchQuery) ||
                    service.title.toLowerCase().includes(searchQuery)
            ),
        }));
    }, [serviceBookings, searchQuery]);

    return (
        <div className="overflow-x-auto mt-10">
            {all && (
                <div className="flex items-center mb-4 px-4">
                    <input
                        type="text"
                        placeholder="Search bookings..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="border border-pink-500 rounded px-4 py-2 w-full"
                    />
                </div>
            )}

            <table className="min-w-full border-collapse border border-gray-300">
                {all && (
                    <>
                        <thead className="bg-gray-100 text-sm md:text-base">
                            <tr>
                                <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Booking Title</th>
                                <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Booking User</th>
                                <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Service Name</th>
                                <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Price</th>
                                <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">No. of Days</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Start Date</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">End Date</th>
                                <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Status</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm md:text-base">
                            {filteredBookings.map(({ service, bookings }) =>
                                bookings.map((booking) => (

                                    <tr key={booking._id} className="hover:bg-gray-100 cursor-pointer">
                                        {console.log("booking", booking)}
                                        <td className="border border-gray-300 px-2 md:px-4 py-2" onClick={() => openModal(booking)}>
                                            {booking.title}
                                        </td>
                                        <td className="border border-gray-300 px-2 md:px-4 py-2" onClick={() => handleClickUser(booking.userId)}>
                                            {getUserName(booking.userId)}

                                        </td>
                                        <td
                                            className="border border-gray-300 px-2 md:px-4 py-2 text-blue-600 font-semibold"
                                            onClick={() => handleClick(service._id)}
                                        >
                                            {service.title}
                                        </td>
                                        <td className="border border-gray-300 px-2 md:px-4 py-2">${booking.price}</td>
                                        <td className="border border-gray-300 px-2 md:px-4 py-2">
                                            {calculateDays(booking.startDate, booking.endDate)}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {new Date(booking.startDate).toLocaleDateString()}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {new Date(booking.endDate).toLocaleDateString()}
                                        </td>
                                        <td className="border border-gray-300 px-2 md:px-4 py-2">
                                            <span style={getStatusStyle(booking.status)}>{booking.status}</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </>
                )}

                {confirmed &&
                    <>
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Booking Title</th>
                                <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Booking User</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Service Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">No. of Days</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Start Date</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">End Date</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {confirmedBookings.map(({ service, booking }) => (
                                <tr key={booking._id} className="hover:bg-gray-100 cursor-pointer">
                                    <td className="border border-gray-300 px-4 py-2"
                                        onClick={() => openModal(booking)}
                                    >
                                        {booking.title}
                                    </td>
                                    <td className="border border-gray-300 px-2 md:px-4 py-2" onClick={() => handleClickUser(booking.userId)}>
                                        {getUserName(booking.userId)}

                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-blue-600 font-semibold"
                                        onClick={() => handleClick(service._id)}
                                    >
                                        {service.title}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">${booking.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {calculateDays(booking.startDate, booking.endDate)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {new Date(booking.startDate).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {new Date(booking.endDate).toLocaleDateString()}
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
                                <th className="border border-gray-300 px-4 py-2 text-left">Booking Title</th>
                                <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Booking User</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Service Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">No. of Days</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Start Date</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">End Date</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Confirm</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingBookings.map(({ service, booking }) => (
                                <tr
                                    key={booking._id}
                                    className={`hover:bg-gray-100 cursor-pointer ${overlappingBookings.has(booking._id) ? "bg-red-100" : ""}`}
                                >
                                    <td
                                        className="border border-gray-300 px-4 py-2"
                                        onClick={() => openModal(booking)}
                                    >
                                        {booking.title}
                                        {overlappingBookings.has(booking._id) && (
                                            <span className="text-red-500 ml-2">⚠️</span>
                                        )}
                                    </td>
                                    <td className="border border-gray-300 px-2 md:px-4 py-2" onClick={() => handleClickUser(booking.userId)}>
                                        {getUserName(booking.userId)}

                                    </td>
                                    <td
                                        className="border border-gray-300 px-4 py-2 text-blue-600 font-semibold"
                                        onClick={() => handleClick(service._id)}
                                    >
                                        {service.title}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">${booking.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {calculateDays(booking.startDate, booking.endDate)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {new Date(booking.startDate).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {new Date(booking.endDate).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <span style={getStatusStyle(booking.status)}>{booking.status}</span>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            className={`px-4 py-2 rounded text-white ${overlappingWithConfirmed.has(booking._id) || booking.status === "confirmed"
                                                ? "bg-gray-500 cursor-not-allowed"
                                                : "bg-green-500 hover:bg-green-600"
                                                }`}
                                            disabled={
                                                overlappingWithConfirmed.has(booking._id) || booking.status === "confirmed"
                                            }
                                            onClick={() => handleUpdateStatus(booking._id, "confirmed")}
                                        >
                                            Confirm
                                        </button>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleUpdateStatus(booking._id, "rejected")}   >    Reject  </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                }
                {paid &&
                    <>
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Booking Title</th>
                                <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Booking User</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Service Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">No. of Days</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Start Date</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isPaid.map(({ service, booking }) => (
                                <tr key={booking._id} className="hover:bg-gray-100 cursor-pointer">
                                    <td className="border border-gray-300 px-4 py-2" onClick={() => openModal(booking)} >  {booking.title} </td>
                                    <td className="border border-gray-300 px-2 md:px-4 py-2" onClick={() => handleClickUser(booking.userId)}>
                                        {getUserName(booking.userId)}

                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-blue-600 font-semibold" onClick={() => handleClick(service._id)} > {service.title} </td>
                                    <td className="border border-gray-300 px-4 py-2">${booking.price}</td>
                                    <td className="border border-gray-300 px-4 py-2"> {calculateDays(booking.startDate, booking.endDate)}  </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {new Date(booking.startDate).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {new Date(booking.endDate).toLocaleDateString()}
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
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={closeModal} >  <FaTimes style={{ color: 'red', fontSize: '24px' }} /> </button>
                        {selectedBooking.status === "confirmed" ? ""
                            :
                            <div className="absolute top-2 right-10 flex space-x-4">
                                <button className="text-blue-500 hover:text-blue-700" onClick={() => handleUpdate(selectedBooking)} >   <FaPen style={{ color: 'blue', fontSize: '15px' }} /> </button>
                                <button className="text-red-500 hover:text-red-700" onClick={() => {
                                    handleDelete(selectedBooking._id)

                                }
                                } >   <FaTrash style={{ color: 'red', fontSize: '15px' }} /> </button>
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
            {isModalOpen && (
                <UpdateBookingForm booking={updateBooking} token={token} isOpen={isModalOpen} onClose={handleCloseModal} />
            )}

        </div >

    );
};

export default ServiceBookingsList;
