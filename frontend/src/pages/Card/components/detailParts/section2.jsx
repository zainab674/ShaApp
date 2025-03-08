import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaRegStar } from "react-icons/fa";
import React from 'react'


import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../authContext';
import { apiConst } from '../../../../constants/api.constants';
import RequestBookingForm from '../../../booking/components/request';
import { CheckBooking } from '../../../../connection/apis';


const Section2 = ({ service, vendor }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState("");
    const { token, socket } = useAuth();



    console.log("service", service)
    console.log("vendor", vendor)
    const Dservice = service;
    const Dvendor = vendor;

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        Check()
        setIsModalOpen(false);
    };
    const Check = async () => {
        if (!service || !service._id) {
            console.warn("Service or Service ID is not available");
            return;
        }

        const id = service._id;

        try {
            const res = await CheckBooking(id, token);
            if (res == null) {

            }
            else {

                console.log("res", res);
                setStatus(res.status)
            }
        } catch (error) {
            console.error("Error fetching Service DATA:", error);
        }
    };

    useEffect(() => {
        if (service && service._id) {
            Check();
        }
    }, [service]);



    const navigate = useNavigate();



    const categoryDetails = () => {
        switch (Dservice.category) {
            case "Venue":
                return JSON.parse(Dservice.venueDetails);
            case "Bridal Makeup":
                return JSON.parse(Dservice.bridalMakeupDetails);
            case "Catering":
                return JSON.parse(Dservice.cateringDetails);
            case "Car Rental":
                return JSON.parse(Dservice.carRentalDetails);
            case "Choreographer":
                return JSON.parse(Dservice.choreographerDetails);
            case "Decor":
                return JSON.parse(Dservice.decorDetails);
            case "Henna Artist":
                return JSON.parse(Dservice.hennaArtistDetails);
            case "Invitations":
                return JSON.parse(Dservice.invitationsDetails);
            case "Photographer":
                return JSON.parse(Dservice.photographerDetails);
            case "Singer":
                return JSON.parse(Dservice.singerDetails);
            default:
                return {};
        }
    };

    const details = categoryDetails();




    const payment = (id) => {
        console.log("iddd", id)
        navigate(apiConst.payment.replace(':id', id));
    };

    const handleClick = () => {
        console.log("hi")
        navigate(apiConst.host.replace(':id', Dservice.userId));
    };


    return (
        <>
            <div className="flex flex-col md:flex-row m-5 md:mx-16 justify-between text-left md:mb-8 mb-2">
                <div className='w-full md:w-3/4'>
                    <div>
                        <h1 className="text-xl md:text-2xl font-medium text-black mt-0 md:mt-7">{Dservice.title}</h1>
                        <p className="text-sm md:text-lg font-medium text-black mt-0 md:mt-2">{Dservice.city}, {Dservice.country}</p>

                    </div>

                    <div className="w-full">
                        <p className="text-gray-800 mb-4">{Dservice.desc}</p>
                        <hr className='border border-t-1 border-gray-200 mt-10 mb-6' />
                        <div>

                            <h1 className="text-xl md:text-2xl font-medium mb-4">Service Details</h1>
                            <div>
                                {Object.entries(details).map(([key, value]) => (
                                    <div key={key} className="mb-2">
                                        <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong> {Array.isArray(value) ? value.join(", ") : value.toString() || "N/A"}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr className='border border-t-1 border-gray-200 mt-10 mb-6' />

                    <div>
                        <h1 className='text-xl md:text-2xl font-medium'>Meet Your Host</h1>
                        <div className="bg-white p-4 w-full md:w-96 pb-6 text-center rounded-md shadow-2xl h-auto md:h-52 border border-gray-100 mt-2 mb-5">
                            <img src={Dvendor.avatar ? `http://localhost:1234/${Dvendor.avatar}` : "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"}
                                alt=""
                                className='w-24 h-24 rounded-full mx-auto'
                                onClick={handleClick}
                            />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{Dvendor.name}</h2>

                        </div>
                        <p className='w-full md:w-3/4 '>{Dvendor.description}</p>
                    </div>

                </div>


                <div className=" bg-white p-4 pb-6 text-center rounded-md shadow-md w-full md:w-96 h-40 border border-gray-300 mt-10">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Pkr {Dservice.price} </h2>
                    {token ?
                        <>
                            {status === "pending" ? (
                                <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-full">
                                    Requested For Booking
                                </button>
                            ) : status === "confirmed" ? (
                                <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-full">
                                    Booking Confirmed
                                </button>
                            ) : (
                                <button
                                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-full"
                                    onClick={handleOpenModal}
                                >
                                    Request
                                </button>
                            )}
                        </>
                        :
                        <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-full"
                            onClick={() => { navigate(apiConst.login); }}
                        >Login To Request Booking</button>
                    }

                </div>


            </div>



            <RequestBookingForm
                service={service}
                token={token}
                socket={socket}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />




        </>
    );

}

export default Section2;
