

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineArrowDown } from 'react-icons/ai';
import { IoMdArrowDropdown } from 'react-icons/io'; // Downward triangle icon
import { apiConst } from './../../../constants/api.constants';
import { AllServices, FilterService, SearchServiceByName, ServiceReviews } from '../../../connection/apis';

const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const totalRating = ratings.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / ratings.length).toFixed(1);
};

function CardsContainer({ selectedCategory }) {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null);
    const [filterQuery, setFilterQuery] = useState(null);
    const [filterResults, setFilterResults] = useState([]);
    const [scrolled, setScrolled] = useState(false);
    const [serviceReviews, setServiceReviews] = useState({});
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 1);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchServiceReviews = async (serviceId) => {
        try {
            const reviews = await ServiceReviews(serviceId);
            setServiceReviews(prev => ({
                ...prev,
                [serviceId]: reviews
            }));
        } catch (error) {
            console.error("Error fetching reviews for service:", serviceId, error);
        }
    };

    const fetchServices = async () => {
        try {
            const res = await AllServices();
            setServices(res);
            // Extract unique cities from services
            const uniqueCities = [...new Set(res.map(service => service.city))];
            setCities(uniqueCities);
            // Fetch reviews for each service
            res.forEach(service => fetchServiceReviews(service._id));
        } catch (error) {
            console.error("Error fetching services", error);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleSearch = async (query) => {
        if (query) {
            try {
                const results = await SearchServiceByName({ title: query });
                setSearchResults(results);
                results.forEach(service => {
                    if (!serviceReviews[service._id]) {
                        fetchServiceReviews(service._id);
                    }
                });
            } catch (error) {
                console.error("Error searching services:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleCityFilter = async (city) => {
        setSelectedCity(city);
        if (city) {
            try {
                const results = await FilterService({ city });
                setFilterResults(results);
                results.forEach(service => {
                    if (!serviceReviews[service._id]) {
                        fetchServiceReviews(service._id);
                    }
                });
            } catch (error) {
                console.error("Error Filtering services:", error);
            }
        } else {
            setFilterResults([]);
        }
        setShowCityDropdown(false);
    };

    const handleEmptySearch = () => {
        setSearchQuery(null);
        handleSearch(null);
    };

    const getFilteredServices = () => {
        let filtered = selectedCategory === "All"
            ? (searchResults.length > 0 ? searchResults : services)
            : (searchResults.length > 0
                ? searchResults.filter(service => service.category === selectedCategory)
                : services.filter(service => service.category === selectedCategory));

        if (filterResults.length > 0) {
            filtered = filterResults;
        }

        return filtered;
    };

    const handleClick = (id) => {
        navigate(apiConst.card.replace(':id', id));
    };

    useEffect(() => {
        if (searchQuery !== null) {
            handleSearch(searchQuery);
        }
    }, [searchQuery]);

    return (
        <>
            <div className='flex justify-between relative'>
                <div className={`${scrolled ? 'hidden' : 'flex'} hidden md:flex mt-24 items-center justify-between bg-white shadow-md rounded-full p-1 py-1 px-2 w-full max-w-xl mx-auto text-left border border-gray-300`}>
                    <input
                        type="text"
                        placeholder="Search services by name..."
                        className="flex-grow px-4 py-1 rounded-l-full outline-none"
                        value={searchQuery || ""}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchQuery(value);
                            value ? handleSearch(value) : handleEmptySearch();
                        }}
                    />
                    <button className="bg-pink-600 text-white p-3 rounded-full ml-4">
                        <AiOutlineSearch className="text-xl" />
                    </button>
                </div>
                <div className="relative right-10">
                    <button
                        onClick={() => setShowCityDropdown(!showCityDropdown)}
                        className={`${scrolled ? 'hidden' : 'flex'} hidden md:flex mt-28 items-center justify-between bg-white shadow-md rounded-md px-3 mx-auto text-left border border-pink-600 py-1`}
                    >
                        {selectedCity || "Filter"} <IoMdArrowDropdown className="text-xl ml-2" />
                    </button>

                    {showCityDropdown && (
                        <div className="absolute right-10 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                            <div
                                className="py-2 px-4 hover:bg-gray-100 cursor-pointer border-b"
                                onClick={() => handleCityFilter(null)}
                            >
                                All Cities
                            </div>
                            {cities.map((city, index) => (
                                <div
                                    key={index}
                                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleCityFilter(city)}
                                >
                                    {city}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <ul className="flex flex-wrap justify-start items-start py-4 lg:px-16 mt-36 lg:mt-20 md:mt-24 list-none mx-auto hover:cursor-pointer">
                {getFilteredServices().map((service) => {
                    const avgRating = calculateAverageRating(serviceReviews[service._id]);
                    return (
                        <li key={service._id} className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-2 mb-5 bg-white rounded-lg shadow-md">
                            <img
                                src={
                                    service.image && service.image.length > 0
                                        ? `http://localhost:1234/uploads/${service.image[0]}`
                                        : "https://media.istockphoto.com/id/1408146514/photo/minimalistic-modern-private-house-exterior-in-pink-with-flamingos.jpg?s=612x612&w=0&k=20&c=eBUQw8rdxo5bvnl6EUcQWkJ0WwqTv6UNTcqrOI74Dg="
                                }
                                className="h-24 w-full object-cover rounded border"
                                onClick={() => handleClick(service._id)}
                            />
                            <div className="mt-2 space-y-1">
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-gray-900 whitespace-nowrap text-sm text-left">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-800 font-medium text-sm text-left">
                                        Pkr {service.price}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg
                                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2.7l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 2.7z" />
                                    </svg>
                                    <span className="text-sm text-gray-600">
                                        {avgRating}
                                    </span>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default CardsContainer;