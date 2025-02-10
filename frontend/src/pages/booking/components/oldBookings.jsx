import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../authContext';
import { UserBookings } from '../../../connection/apis';
import { useNavigate } from 'react-router-dom';
import { apiConst } from '../../../constants/api.constants';
import UpdateBookingForm from './updateBooking';
import BookingDetail from './BookingDetails';
import CreateReview from '../../review/createReviewModal';


const OldBookings = () => {
    const [pastBookings, setPastBookings] = useState([]);
    const [hasBookings, setHasBookings] = useState(false);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); // State to control review modal

    const navigate = useNavigate();

    const fetchBookings = async () => {
        try {
            const bookings = await UserBookings(token);
            if (bookings) {
                // Filter bookings where endDate is older than today
                const past = bookings.filter(
                    (booking) => new Date(booking.endDate) < new Date() && booking.status === 'confirmed'
                );


                setPastBookings(past);
                setHasBookings(true);
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



    const handleTitleClick = (booking) => {
        setSelectedBooking(booking);
        setIsDetailModalOpen(true);
    };

    const closeModal = () => {
        setSelectedBooking(null);
        setIsDetailModalOpen(false);
    };

    const handleReviewClick = (booking) => {
        setSelectedBooking(booking); // Set the selected booking for review
        setIsReviewModalOpen(true);   // Open the review modal
    };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false); // Close the review modal
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="my-10 mt-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
                My Past Bookings
            </h1>

            {hasBookings === false ? <p className="text-center sm:text-left">No bookings found.</p> : ""}

            <div className="mb-8">
                <div className="space-y-4">
                    {pastBookings.length === 0 ? (
                        <p className="text-center sm:text-left">No past bookings.</p>
                    ) : (
                        pastBookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="p-4 bg-white rounded-md shadow-md border border-gray-200 transition hover:shadow-lg cursor-pointer"
                                onClick={() => handleTitleClick(booking)}
                            >
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                    <h3 className="text-lg font-semibold">{booking.title}</h3>
                                    <button
                                        className="text-blue-500 text-sm mt-2 sm:mt-0"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevents click bubbling
                                            handleReviewClick(booking);
                                        }}
                                    >
                                        Add Review
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500">{booking.description}</p>
                                <p className="mt-2 text-red-500">
                                    Ended on: {new Date(booking.endDate).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Booking Details Modal */}
            {isDetailModalOpen && (
                <BookingDetail
                    booking={selectedBooking}
                    isOpen={isDetailModalOpen}
                    onClose={closeModal}
                />
            )}

            {/* Create Review Modal */}
            {isReviewModalOpen && (
                <CreateReview
                    booking={selectedBooking}
                    token={token}
                    isOpen={isReviewModalOpen}
                    onClose={closeReviewModal}
                />
            )}
        </div>

    );
};

export default OldBookings;
