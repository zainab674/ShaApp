import React, { useEffect, useState } from 'react';
import { AddReview, UpdateRating } from '../../connection/apis';
import { apiConst } from '../../constants/api.constants';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import this CSS for styling

const UpdateReview = ({ review, token, isOpen, onClose, }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({

        comment: "",
        rating: 0,

    });

    // Handle form data change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRatingChange = (ratingValue) => {
        setFormData((prevData) => ({
            ...prevData,
            rating: String(ratingValue),
        }));
    };

    // Calculate price based on dates
    useEffect(() => {
        if (review) {
            setFormData({
                comment: review.comment || '',

                rating: review.rating || 0,

            });
        }
    }, [review]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure the date format and price are correct
        const updatedData = {
            ...formData,


        };
        const id = review._id


        // Send the API request
        const response = await UpdateRating(id, updatedData, token);

        if (response) {
            console.log("Rating updated successfully:", response);
            toast.success("Rating updated successfully!");

            navigate(apiConst.card.replace(":id", review.serviceId));
        } else {
            console.error("Error updating rating");
        }

        onClose();
    };






    if (!isOpen) return null; // If the modal is not open, don't render anything

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg overflow-auto w-11/12 max-w-2xl p-6 mt-10 max-h-screen">
                <h2 className="text-xl font-semibold mb-4">Submit Your Review</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Star Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating:
                        </label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => handleRatingChange(star)}
                                    className={`cursor-pointer text-2xl ${formData.rating >= star ? "text-yellow-500" : "text-gray-300"
                                        }`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Comment Field */}
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                            Comment:
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            rows="4"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Write your review here..."
                        ></textarea>
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
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateReview;
