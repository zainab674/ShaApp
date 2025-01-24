import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { apiConst } from './../../../constants/api.constants';
import { AllServices, SearchServiceByName } from '../../../connection/apis';


function CardsContainer({ selectedCategory }) {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchServices = async () => {
        try {
            const res = await AllServices();
            setServices(res);
        } catch (error) {
            console.error("Error fetching services", error);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        console.log("Services updated:", services);
    }, [services]);



    const handleSearch = async (query) => {
        if (query) {
            console.log("searchQuery", query);
            try {
                const results = await SearchServiceByName({ title: query });
                setSearchResults(results);
            } catch (error) {
                console.error("Error searching services:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleEmptySearch = () => {
        setSearchQuery(null);
        console.log("Search cleared");
        handleSearch(null);
    };

    const filteredServices = selectedCategory === "All"
        ? (searchResults.length > 0 ? searchResults : services)
        : (searchResults.length > 0
            ? searchResults.filter(service => service.category === selectedCategory)
            : services.filter(service => service.category === selectedCategory));

    const handleClick = (id) => {
        navigate(apiConst.card.replace(':id', id));
    };

    useEffect(() => {
        if (searchQuery !== null) {
            console.log("Searching for:", searchQuery);
            handleSearch(searchQuery);
        }
    }, [searchQuery]);

    return (
        <>
            <div className={`${scrolled ? 'hidden' : 'flex'} hidden md:flex mt-20 items-center justify-between bg-white shadow-md rounded-full p-1 py-1 px-2 w-full max-w-xl mx-auto text-left border border-gray-300`}>
                <input
                    type="text"
                    placeholder="Search services by name..."
                    className="flex-grow px-4 py-2 rounded-l-full outline-none"
                    value={searchQuery || ""}
                    onChange={(e) => {
                        const value = e.target.value
                        setSearchQuery(value)
                        value ? handleSearch(value) : handleEmptySearch();
                    }}
                />
                <button

                    className="bg-pink-600 text-white p-3 rounded-full ml-4"
                >
                    <AiOutlineSearch className="text-xl" />
                </button>
            </div>

            <ul className="flex flex-wrap justify-start items-start py-4 lg:px-16 mt-36 lg:mt-20 md:mt-24 list-none mx-auto hover:cursor-pointer">
                {filteredServices.map((service) => (
                    <li key={service._id} className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-2 mb-5 bg-white rounded-lg shadow-md">
                        <img
                            src={
                                service.image && (service.image).length > 0
                                    ? `http://localhost:1234/uploads/${service.image[0]}`
                                    : "https://media.istockphoto.com/id/1408146514/photo/minimalistic-modern-private-house-exterior-in-pink-with-flamingos.jpg?s=612x612&w=0&k=20&c=eBUQw8rdxo5bvxnl6EUcQWkJ0WwqTv6UNTcqrOI74Dg="
                            }
                            className="h-24 w-full object-cover rounded border"
                            onClick={() => handleClick(service._id)}

                        />
                        <div className="mt-4">
                            <h3 className="font-medium text-gray-900 whitespace-nowrap text-sm text-left">{service.title}</h3>
                            <p className="text-gray-800 mt-2 font-medium text-left">{service.price}</p>
                        </div>
                    </li>
                ))}
            </ul>

        </>
    );
}

export default CardsContainer;
