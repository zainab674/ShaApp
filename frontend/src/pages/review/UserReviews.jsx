import { useEffect, useState } from 'react';
import React from 'react';
import { DeleteRating, SpecificService, UserRatings } from '../../connection/apis';
import { useAuth } from '../../authContext';
import UpdateReview from './updateReviewModal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import this CSS for styling

const UserReviews = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState({});
    const [ratings, setRatings] = useState([]);
    const [hasRatings, setHasRatings] = useState(false);
    const [updateRating, setUpdateRating] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    // Fetch all reviews
    const fetchReviews = async () => {
        try {
            const reviews = await UserRatings(token);
            if (reviews && reviews.length > 0) {
                setRatings(reviews);
                setHasRatings(true);
            } else {
                setHasRatings(false);
            }
        } catch (error) {
            console.error("Error fetching ratings:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        try {
            const response = await DeleteRating(id, token);
            if (response) {
                fetchReviews()
                toast.success("rating deleted successfully");

                console.log("rating deleted successfully", response);

            } else {
                console.error("Error Deleting service");
            }
        } catch (err) {
            console.error("Error during rating delete:", err);
        }
    }
    // Fetch service details by ID
    const fetchServiceDetails = async (id) => {
        try {
            const res = await SpecificService(id);
            setServices((prevServices) => ({
                ...prevServices,
                [id]: res?.title || 'Service Name Not Available',
            }));
        } catch (error) {
            console.error(`Error fetching service details for ID ${id}:`, error);
            setServices((prevServices) => ({
                ...prevServices,
                [id]: 'Service Name Not Available',
            }));
        }
    };

    // Fetch reviews on component mount
    useEffect(() => {
        fetchReviews();
    }, [token]);

    // Fetch services for each review
    useEffect(() => {
        if (ratings.length > 0) {
            ratings.forEach((review) => {
                if (review.serviceId && !services[review.serviceId]) {
                    fetchServiceDetails(review.serviceId);
                }
            });
        }
    }, [ratings, services]);

    // Format date to a readable string
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };


    const handleupdate = (review) => {
        console.log("Update button clicked for review:", review);  // Add this line
        setUpdateRating(review);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        fetchReviews()
        setIsModalOpen(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mx-auto p-4 mb-16" id="reviews">
            <h1 className="text-2xl font-semibold mb-4">My Reviews</h1>
            {!hasRatings && <p>No Ratings Done.</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ratings.map((review, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-lg p-4"
                    >
                        {/* Service Name */}
                        <h2 className="text-lg font-semibold">
                            {services[review.serviceId] || 'Service Name Not Available'}
                        </h2>

                        {/* Rating and Date */}
                        <div className="flex items-center mt-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, starIndex) => (
                                    <svg
                                        key={starIndex}
                                        className={`w-5 h-5 ${starIndex < review.rating
                                            ? 'text-yellow-500'
                                            : 'text-gray-300'
                                            }`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2.7l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 2.7z" />
                                    </svg>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <FaEdit
                                    className="text-gray-600 cursor-pointer hover:text-blue-600"
                                    onClick={() => handleupdate(review)}
                                />
                                <FaTrash
                                    className="text-gray-600 cursor-pointer hover:text-red-600"
                                    onClick={() => handleDelete(review._id)}
                                />
                            </div>
                        </div>
                        <p className="ml-2 text-gray-600 text-sm">
                            {formatDate(review.updatedAt)}
                        </p>

                        {/* Comment */}
                        <div className="mt-4">
                            <p className="text-gray-700 text-sm">
                                {review.comment || 'No comment provided.'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <UpdateReview
                    review={updateRating}
                    token={token}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default UserReviews;
