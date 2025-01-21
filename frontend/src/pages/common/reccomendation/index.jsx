import React, { useState, useEffect } from "react";
import { AllBookings, AllServices } from "../../../connection/apis";

const serviceCategories = [
    { id: 1, type: "All" },
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
        serviceType: "All",
        budget: "",
        startDate: "",
        endDate: "",
    });
    const [filteredServices, setFilteredServices] = useState([]);
    const [recommendation, setRecommendation] = useState(null);
    const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

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
            setBookings(res);
        } catch (error) {
            console.error("Error fetching bookings", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput({ ...userInput, [name]: value });
    };

    const filterServices = () => {
        const { serviceType, budget, startDate, endDate } = userInput;

        let filtered = services.filter((service) =>
            (serviceType === "All" || service.type === serviceType) &&
            (!budget || service.price <= parseFloat(budget))
        );

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            filtered = filtered.filter((service) => {
                const bookedDates = bookings
                    .filter((booking) => booking.serviceId === service.id)
                    .map((booking) => ({
                        start: new Date(booking.startDate),
                        end: new Date(booking.endDate),
                    }));

                return bookedDates.every(
                    (date) => end < date.start || start > date.end
                );
            });
        }

        setFilteredServices(filtered);
    };



    const getRecommendation = async () => {
        setLoading(true);

        const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyADAuBQ6GEFPOf6Dep1Gvm9joYTDFU2oN8";
        const requestBody = {

            contents: [
                {
                    parts: [
                        {
                            "text": `User Details: ${JSON.stringify(userInput)}. Based on these services: ${JSON.stringify(
                                services
                            )}, recommend the best service considering the user's requirements. Output data in object "output" with headings as keys and their info`
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
            <button
                onClick={() => setIsFirstModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
                Open Recommendation Modal
            </button>

            {isFirstModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                        <button
                            onClick={() => setIsFirstModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                        >
                            ✕
                        </button>
                        <h2 className="text-lg font-bold mb-4">AI Service Recommendation</h2>
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
                                />
                            </label>

                            <label className="block mb-2">
                                Start Date:
                                <input
                                    type="date"
                                    name="startDate"
                                    value={userInput.startDate}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md p-2 mt-1"
                                />
                            </label>

                            <label className="block mb-4">
                                End Date:
                                <input
                                    type="date"
                                    name="endDate"
                                    value={userInput.endDate}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md p-2 mt-1"
                                />
                            </label>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-md"
                            >
                                Get Recommendation
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isSecondModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold"> </h2>
                            <button
                                onClick={() => setIsSecondModalOpen(false)}
                                className="text-red-600 hover:text-gray-900"
                            >
                                ✕
                            </button>
                        </div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="mt-4">
                                {console.log("recoooo", recommendation)
                                }
                                {recommendation && (
                                    <div>
                                        {(() => {
                                            try {
                                                // Log raw recommendation for debugging
                                                console.log("Raw recommendation:", recommendation);

                                                // Remove unwanted formatting (` ```json` and ` ``` `) using more advanced regex
                                                const cleanedRecommendation = recommendation
                                                    .replace(/^\s*```json\s*/, '') // Remove starting ```json and leading whitespace
                                                    .replace(/```[\s\S]*$/, '')   // Remove ending ``` with any content after
                                                    .trim();                      // Trim extra spaces/newlines

                                                console.log("Cleaned Recommendation:", cleanedRecommendation);
                                                console.log("Cleaned Recommendation Length:", cleanedRecommendation.length);

                                                // Parse the cleaned JSON string
                                                const parsedRecommendation = JSON.parse(cleanedRecommendation);

                                                console.log("Parsed Recommendation:", parsedRecommendation);

                                                // Dynamically display the data
                                                return Object.entries(parsedRecommendation.output).map(([key, value]) => (
                                                    <div key={key} className="mb-4">
                                                        <h3 className="font-bold text-lg">{key}</h3>
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
                                                ));
                                            } catch (error) {
                                                console.error("Error parsing recommendation:", error.message);
                                                console.error("Problematic JSON string:", recommendation);
                                                return <p>Unable to parse recommendation data.</p>;
                                            }
                                        })()}
                                    </div>
                                )}
                                <button
                                    onClick={() => navigate(`/service-details/${parsedRecommendation.output['Recommended Service']._id}`)}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    View Service Details
                                </button>

                            </div>

                        )}
                    </div>
                </div>
            )
            }

        </div >
    );
};

export default AiRecomendation;
