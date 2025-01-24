import React, { useState, useEffect } from 'react';
import { UpdateBooking } from '../../../connection/apis';

const UpdateBookingForm = ({ booking, token, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0, // Initialize with a default value
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        status: '',
    });

    // Handle form data change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Calculate price based on dates
    const calculatePrice = (startDate, endDate) => {
        if (!startDate || !endDate) return booking.price;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const daysDifference = (end - start) / (1000 * 3600 * 24) + 1; // Calculate days including both start and end dates

        return booking.price * daysDifference;
    };



    const handleDateChange = (e) => {
        const { name, value } = e.target;

        // Set the new date value
        setFormData((prevData) => {
            const updatedData = {
                ...prevData,
                [name]: value,
            };

            // Recalculate price whenever the start or end date changes
            const updatedPrice = calculatePrice(updatedData.startDate, updatedData.endDate);
            updatedData.price = updatedPrice;

            return updatedData;
        });
    };

    useEffect(() => {
        if (booking) {
            setFormData({
                title: booking.title || '',
                description: booking.description || '',
                price: booking.price || 0,
                startDate: booking.startDate ? booking.startDate.split('T')[0] : '', // Ensure the date format is 'yyyy-MM-dd'
                endDate: booking.endDate ? booking.endDate.split('T')[0] : '', // Ensure the date format is 'yyyy-MM-dd'
                startTime: booking.startTime || '',
                endTime: booking.endTime || '',
                status: booking.status || '',
            });
        }
    }, [booking]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure the date format and price are correct
        const updatedData = {
            ...formData,

            price: formData.price.toString(), // Convert price to string
            startDate: new Date(formData.startDate).toISOString().split('T')[0], // Format startDate as 'yyyy-MM-dd'
            endDate: new Date(formData.endDate).toISOString().split('T')[0], // Format endDate as 'yyyy-MM-dd'
        };

        const id = booking._id
        console.log('Requesting booking with data:', updatedData);

        // Send the API request
        const response = await UpdateBooking(id, updatedData, token);

        if (response) {

            console.log("Booking updated successfully:", response);
            onClose()
        } else {
            console.error("Error updating booking");
        }

        onClose(); // Close the modal after submitting
    };


    // Disable past dates for start date and make sure end date cannot be earlier than start date
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        setFormData((prevData) => ({
            ...prevData,
            startDate: prevData.startDate ? prevData.startDate : today,
        }));
    }, [isOpen]);

    if (!isOpen) return null; // If the modal is not open, don't render anything

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg overflow-auto w-11/12 max-w-2xl p-6 mt-10 max-h-screen">
                <h2 className="text-xl font-semibold mb-4">Request a Booking</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-sm font-semibold">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter booking title"
                            value={formData.title}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-sm font-semibold">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Enter booking description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-sm font-semibold">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            className="border p-2 rounded"
                            disabled
                            readOnly
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="startDate" className="text-sm font-semibold">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
                            onChange={handleDateChange}
                            className="border p-2 rounded"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="endDate" className="text-sm font-semibold">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            min={formData.startDate} // End date must be greater than or equal to start date
                            onChange={handleDateChange}
                            className="border p-2 rounded"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="startTime" className="text-sm font-semibold">Start Time</label>
                        <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="endTime" className="text-sm font-semibold">End Time</label>
                        <input
                            type="time"
                            id="endTime"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-black rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBookingForm;
