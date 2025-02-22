import React, { useState, useEffect } from 'react';
import { RequestBooking } from '../../../connection/apis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import this CSS for styling


const RequestBookingForm = ({ service, token, isOpen, onClose, socket }) => {

    const [formData, setFormData] = useState({

        serviceId: service._id,
        title: '',
        description: '',
        price: service.price, // Initialize with service price
        startDate: '',
        endDate: '',

    });
    console.log("service usrid", service)

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
        if (!startDate || !endDate) return service.price;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const daysDifference = (end - start) / (1000 * 3600 * 24) + 1; // Calculate days including both start and end dates

        return service.price * daysDifference;
    };

    // Handle start date and end date changes
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
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure the date format and price are correct
        const updatedData = {
            ...formData,
            serviceId: service._id,
            price: formData.price.toString(), // Convert price to string
            startDate: new Date(formData.startDate).toISOString(), // Format startDate as ISO 8601
            endDate: new Date(formData.endDate).toISOString(), // Format endDate as ISO 8601
        };

        console.log('Requesting booking with data:', updatedData);

        // Send the API request
        const response = await RequestBooking(updatedData, token);


        if (response) {
            console.log("i am response", response)
            const userId = response.userId;
            const title = response.title;
            const bookid = response._id; // Assuming response includes userId

            const info = {
                userId: userId,
                bookingId: bookid,

                message: ` booking has been requested `
            }
            const infoVendor = {
                userId: service.userId,
                bookingId: bookid,

                message: ` booking has been requested `
            }
            console.log("info", info)

            socket.emit('bookingStatusUpdated', info);
            socket.emit('bookingStatusUpdated', infoVendor);
            console.log("Booking created successfully:", response);
            toast.success("Booking created successfully!");

        } else {
            console.error("Error creating booking");
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-y-auto w-full max-w-2xl p-6 max-h-[90vh]">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="startDate" className="text-sm font-semibold">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                min={new Date().toISOString().split('T')[0]}
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
                                min={formData.startDate}
                                onChange={handleDateChange}
                                className="border p-2 rounded"
                                required
                            />
                        </div>
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

export default RequestBookingForm;
