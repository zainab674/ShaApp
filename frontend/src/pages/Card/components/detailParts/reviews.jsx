import { useEffect, useState } from 'react';
import { SpecificUser } from '../../../../connection/apis';
import React from 'react'


const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const totalRating = ratings.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / ratings.length).toFixed(1);
};

const Reviews = ({ service, rating }) => {
    const [users, setUsers] = useState({}); // To store user data by their userId

    // Fetch user data by userId and update the state
    const GetUser = async (id) => {
        try {
            const res = await SpecificUser(id);
            setUsers((prevUsers) => ({
                ...prevUsers,
                [id]: {
                    name: res?.name || 'Anonymous',
                    avatar: res?.avatar || null // Store avatar URL if available
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

    // Calculate average rating
    const averageRating = calculateAverageRating(rating);

    // Fetch all user data when the component mounts
    useEffect(() => {
        rating.forEach((review) => {
            if (review.userId && !users[review.userId]) {
                GetUser(review.userId); // Fetch user data for each unique userId
            }
        });
    }, [rating, users]); // Only refetch if rating or users changes

    // Format the date without using moment.js
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Format date as "MM/DD/YYYY"
    };

    return (
        <div className="mx-auto p-4 mb-16" id="reviews">
            {/* Heading */}
            <div className="mb-6 text-left md:ml-16">
                <h1 className="text-xl md:text-2xl font-bold flex items-center space-x-2">
                    <svg
                        className="w-6 h-6 md:w-9 md:h-9 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2.7l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 2.7z" />
                    </svg>
                    <span>{averageRating} - {rating?.length || 0} Reviews</span>
                </h1>
            </div>

            {/* Cards */}
            <div className="flex md:flex-wrap overflow-x-auto -mx-2 md:px-16">
                {rating && rating.map((review, index) => (
                    <div
                        key={index}
                        className="w-full md:w-1/2 lg:w-1/2 px-2 mb-4"
                    >
                        <div className="bg-white shadow-lg rounded-lg p-4">
                            {/* First Row */}
                            <div className="flex flex-col sm:flex-row items-center">
                                {/* User Avatar - Now displays image if available, fallback to initials */}
                                <div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden mr-4">
                                    {users[review.userId]?.avatar ? (
                                        <img
                                            src={`http://localhost:1234/${users[review.userId].avatar}`}
                                            alt={`${users[review.userId]?.name || 'User'} avatar`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-pink-600 text-lg font-bold text-white">
                                            {(users[review.userId]?.name || 'A').charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-4">
                                    <h2 className="text-lg font-semibold whitespace-nowrap">
                                        {users[review.userId]?.name || 'Anonymous'}
                                    </h2>
                                </div>
                            </div>

                            {/* Second Row */}
                            <div className="md:flex items-center mt-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <svg
                                            key={starIndex}
                                            className={`w-5 h-5 ${starIndex < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2.7l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 2.7z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="ml-2 text-gray-600 text-sm">
                                    {formatDate(review.updatedAt)}
                                </p>
                            </div>

                            {/* Third Row */}
                            <div className="mt-4">
                                <p className="text-gray-700 text-sm md:text-base">
                                    {review.comment || 'No comment provided.'}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;