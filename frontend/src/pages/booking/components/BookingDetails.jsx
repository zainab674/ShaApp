import React from 'react';

const BookingDetail = ({ booking, isOpen, onClose }) => {
    if (!isOpen || !booking) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg overflow-auto w-11/12 max-w-2xl p-6 mt-10 max-h-screen">
                <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
                <div className="space-y-2">
                    <p><strong>Title:</strong> {booking.title}</p>
                    <p><strong>Description:</strong> {booking.description}</p>
                    <p><strong>Price:</strong> ${booking.price}</p>
                    <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {booking.status}</p>
                </div>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default BookingDetail;
