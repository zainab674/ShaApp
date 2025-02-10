import React, { useEffect, useState, useMemo } from "react";
import { DeleteBooking, ServiceBookings, UpdateBooking } from "../../../connection/apis";
import { useAuth } from "../../../authContext";
import UpdateBookingForm from "./updateBooking";
import { useNavigate } from "react-router-dom";
import { apiConst } from "../../../constants/api.constants";
import { FaPen, FaTimes, FaTrash } from "react-icons/fa";

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
                                <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Booking Name</th>
                                <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Service Name</th>
                                <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Price</th>
                                <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">No. of Days</th>
                                <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Status</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm md:text-base">
                            {filteredBookings.map(({ service, bookings }) =>
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-gray-100 cursor-pointer">
                                        <td className="border border-gray-300 px-2 md:px-4 py-2" onClick={() => openModal(booking)}>
                                            {booking.title}
                                        </td>
                                        <td
                                            className="border border-gray-300 px-2 md:px-4 py-2 text-blue-600 font-semibold"
                                            onClick={() => handleClick(service._id)}
                                        >
                                            {service.title}
                                        </td>
                                        <td className="border border-gray-300 px-2 md:px-4 py-2">${booking.price}</td>
                                        <td className="border border-gray-300 px-2 md:px-4 py-2">
                                            {calculateDays(booking.startDate, booking.endDate)} days
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
            </table>
        </div>

    );
};

export default ServiceBookingsList;
