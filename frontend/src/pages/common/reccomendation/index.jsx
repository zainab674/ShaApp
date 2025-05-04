import React, { useState, useEffect } from "react";
import { AllBookings, AllServices } from "../../../connection/apis";
import { apiConst } from "../../../constants/api.constants";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../../constants/loadingSpinner";

const serviceCategories = [
    // { id: 1, type: "All" },
    { id: 2, type: "Venue" },
    { id: 3, type: "Catering" },
    { id: 4, type: "Photographer" },
    { id: 5, type: "BridalMakeup" },
    { id: 6, type: "Decor" },
    { id: 7, type: "HennaArtist" },
    { id: 8, type: "BridalWear" },
    { id: 9, type: "Invitations" },
    { id: 10, type: "Singers" },
    { id: 11, type: "Choreographers" },
    { id: 12, type: "CarRental" },
];

const AiRecomendation = () => {
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [userInput, setUserInput] = useState({
        serviceType: "Venue",
        budget: "",
        startDate: "",
        endDate: "",
    });
    const [filteredServices, setFilteredServices] = useState([]);
    const [recommendation, setRecommendation] = useState(null);
    const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchServices = async () => {
        try {
            const res = await AllServices();
            setServices(res);
        } catch (error) {
            console.error("Error fetching services", error);
        }
    };

    const fetchBookings = async () => {
        try {
            const res = await AllBookings();
            const confirmedBookings = res.filter((booking) => booking.status === "confirmed");

            // Set the filtered bookings
            setBookings(confirmedBookings);
        } catch (error) {
            console.error("Error fetching bookings", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput({ ...userInput, [name]: value });
    };

    const filterServices = () => {
        const { serviceType, startDate, endDate } = userInput;
        console.log("userinput", userInput)

        if (!startDate || !endDate) {
            setFilteredServices([]); // No filtering if dates are not provided
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        // Filter services by category
        let filtered = services.filter((service) => service.category === serviceType);

        console.log("Services before filtering by bookings:", filtered);
        console.log("confirmed bookings:", bookings);

        filtered = filtered.filter((service) => {
            console.log(`Checking service: ${service.title}, ID: ${service._id}`);

            const hasConflict = bookings.some((booking) => {
                if (booking.serviceId !== service._id) {
                    return false;
                }

                const bookingStart = new Date(booking.startDate);
                const bookingEnd = new Date(booking.endDate);

                const conflict =
                    (start <= bookingEnd && end >= bookingStart) ||
                    (bookingStart <= end && bookingEnd >= start);

                console.log(
                    `Booking conflict check for service ID ${service._id}:`,
                    conflict ? "CONFLICT" : "NO CONFLICT",
                    { bookingStart, bookingEnd, start, end }
                );

                return conflict;
            });

            return !hasConflict;
        });


        console.log("Filtered services after applying booking constraints:", filtered);
        setFilteredServices(filtered);
    };







    const getRecommendation = async () => {
        setLoading(true);
        filterServices();

        const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyADAuBQ6GEFPOf6Dep1Gvm9joYTDFU2oN8";
        const requestBody = {

            contents: [
                {
                    parts: [
                        {
                            "text": `User Details: ${JSON.stringify(userInput)}. Based on these services: ${JSON.stringify(
                                filteredServices
                            )}, recommend the best service considering the user's requirements. Output data in object "output" with keys id title email price description and reason and their info only`
                        }
                    ]
                }
            ]

        };

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Add this if required
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            console.log("result", data)
            setUserInput({
                serviceType: "Venue",
                budget: "",
                startDate: "",
                endDate: "",
            });
            if (data.candidates && data.candidates.length > 0) {
                const recommendationText = data.candidates[0].content.parts[0].text;

                setRecommendation(recommendationText);

                setIsFirstModalOpen(false);
                setIsSecondModalOpen(true);

            } else {
                setRecommendation("No recommendation available.");
                setIsFirstModalOpen(false);
                setIsSecondModalOpen(true);
            }
        } catch (error) {
            console.error("Error fetching recommendation", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
        fetchBookings();
    }, []);

    useEffect(() => {
        filterServices();
    }, [userInput, services, bookings]);

    return (
        <div>
            {/* Fixed Button for Opening Modal */}
            <div className="fixed bottom-36 right-2 sm:right-5 z-49 w-1/2 sm:w-1/3 lg:w-1/4 flex justify-end">
                <button
                    onClick={() => setIsFirstModalOpen(true)}
                    className="bg-pink-600 text-white p-2 sm:p-3 rounded-full shadow-lg text-sm sm:text-base"
                >
                    Get Recommendation
                </button>
            </div>

            {/* First Modal */}
            {isFirstModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-[90%] sm:w-3/4 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold">AI Service Recommendation</h2>
                            <button onClick={() => setIsFirstModalOpen(false)} className="text-red-600 hover:text-gray-900">
                                ✕
                            </button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                getRecommendation();
                            }}
                        >
                            <label className="block mb-2">
                                Select Service Category:
                                <select
                                    name="serviceType"
                                    value={userInput.serviceType}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md p-2 mt-1"
                                    required
                                >
                                    {serviceCategories.map((category) => (
                                        <option key={category.id} value={category.type}>
                                            {category.type}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="block mb-2">
                                Budget:
                                <input
                                    type="number"
                                    name="budget"
                                    value={userInput.budget}
                                    onChange={handleInputChange}
                                    placeholder="Enter your budget"
                                    className="w-full border border-gray-300 rounded-md p-2 mt-1"
                                    required
                                />
                            </label>

                            <label className="block mb-2">
                                Start Date:
                                <input
                                    type="date"
                                    name="startDate"
                                    value={userInput.startDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md p-2 mt-1"
                                    required
                                />
                            </label>

                            <label className="block mb-4">
                                End Date:
                                <input
                                    type="date"
                                    name="endDate"
                                    value={userInput.endDate}
                                    onChange={handleInputChange}
                                    min={userInput.startDate}
                                    className="w-full border border-gray-300 rounded-md p-2 mt-1"
                                    required
                                />
                            </label>

                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                                Get Recommendation
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Loading Spinner */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <LoadingSpinner />
                </div>
            )}

            {/* Second Modal (Recommendation Result) */}
            {isSecondModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-[90%] sm:w-3/4 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center">
                            <button onClick={() => setIsSecondModalOpen(false)} className="text-red-600 hover:text-gray-900">
                                ✕
                            </button>
                        </div>

                        {/* Display Recommendation Data */}
                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <div className="mt-4">
                                {recommendation ? (
                                    (() => {
                                        try {
                                            const cleanedRecommendation = recommendation
                                                .replace(/^\s*```json\s*/, '')
                                                .replace(/```[\s\S]*$/, '')
                                                .trim();

                                            const parsedRecommendation = JSON.parse(cleanedRecommendation);
                                            const id = parsedRecommendation?.output?.id;

                                            return id ? (
                                                <>
                                                    {Object.entries(parsedRecommendation.output).map(([key, value]) => (
                                                        <div key={key} className="mb-4">
                                                            <h3 className="font-bold">{key}</h3>
                                                            {typeof value === "object" && value !== null ? (
                                                                <ul className="list-disc list-inside">
                                                                    {Object.entries(value).map(([subKey, subValue]) => (
                                                                        <li key={subKey}>
                                                                            <strong>{subKey}:</strong> {subValue}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <p>{value}</p>
                                                            )}
                                                        </div>
                                                    ))}

                                                    <button
                                                        onClick={() => navigate(apiConst.card.replace(':id', parsedRecommendation?.output?.id))}
                                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                                                    >
                                                        View Service Details
                                                    </button>
                                                </>
                                            ) : (
                                                <p>No services available.</p>
                                            );
                                        } catch (error) {
                                            console.error("Error parsing recommendation:", error.message);
                                            return <p>Unable to parse recommendation data.</p>;
                                        }
                                    })()
                                ) : null}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>

    );
};

export default AiRecomendation;
