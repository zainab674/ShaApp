import React, { useRef, useState, useEffect } from 'react';

import { FaRegHeart } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { IoIosHeart } from 'react-icons/io';


import Cards from '../../../objects/cards';
import ImageCarousel from '../modals/ImageCarousel';
import ShareModal from '../../common/modals/shareModal';
import { apiConst } from './../../../constants/api.constants';
import { AllServices } from '../../../connection/apis';





function CardsContainer({ selectedCategory }) {
    const navigate = useNavigate();
    const [services, setServices] = useState([])

    const fetchServices = async () => {
        try {
            const res = await AllServices();
            setServices(res);
            console.log("services", services)
        }
        catch (error) {
            console.error("Error fetching services", error)
        }


    };
    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        console.log("services updated:", services);
    }, [services]);






    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedservice, setSelectedservice] = useState(null);
    const openModal = (service) => {
        setSelectedservice(service);
        setModalOpen(true);
    };
    const closeModal = () => {
        setSelectedservice(null);
        setModalOpen(false);
    };


    const filteredServices = selectedCategory === "All"
        ? services // Show all services if "All" is selected
        : services.filter(service => service.category === selectedCategory);




    const handleClick = (id) => {
        console.log("iddd", id)
        navigate(apiConst.card.replace(':id', id));
    };



    return (
        <>


            <ul className="flex  flex-wrap justify-start items-start py-4 lg:px-16 mt-36 lg:mt-20 md:mt-24 list-none mx-auto hover:cursor-pointer">
                {filteredServices.map((service) => (
                    <li key={service._id} className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-2 mb-5 bg-white rounded-lg shadow-md">
                        {/* Image Carousel */}
                        <ImageCarousel


                            title={service.title}
                            id={service._id}
                            handleClick={handleClick}
                        />




                        <div className="absolute top-6 right-6 bg-white text-black rounded-full p-2 text-2xl" onClick={() => openModal(service)}>
                            <MdOutlineFileUpload />
                        </div>




                        {/* Content */}
                        <div className="mt-4">
                            <h3 className="font-medium text-gray-900 whitespace-nowrap text-sm text-left">{service.title}</h3>
                            {/* <p className="text-gray-600 text-left">Hosted by {service.host.name}</p> */}
                            <p className="text-gray-800 mt-2 font-medium text-left">
                                {service.price}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>

            {selectedservice && (
                <ShareModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    selectedservice={selectedservice}
                />


            )}





        </>
    );
}







export default CardsContainer;
// export { Menu, Cards };
