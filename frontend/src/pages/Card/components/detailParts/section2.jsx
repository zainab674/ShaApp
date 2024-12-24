import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaRegStar } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
import Cards from '../../../../objects/cards';
import { apiConst } from '../../../../constants/api.constants';


const Section2 = ({ service, vendor }) => {


    console.log("service", service)
    console.log("vendor", vendor)
    const Dservice = service;
    const Dvendor = vendor;




    const navigate = useNavigate();








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
                        <h1 className="text-xl md:text-2xl font-medium text-black mt-0 md:mt-7">{Dservice.city}, {Dservice.country}</h1>

                    </div>
                    <hr className='border border-t-1 border-gray-200 mt-10 mb-6' />
                    <div className="flex  md:flex-row items-left mb-4 mt-6">
                        <img src={Dvendor.avatar ? Dvendor.avatar : "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"} alt="Host Image" className="rounded-full mr-4 h-14 w-14" />
                        <div>
                            <h3 className="text-lg font-medium text-gray-800">Hosted by {Dvendor.name}</h3>

                        </div>
                    </div>
                    <hr className='border border-t-1 border-gray-200 mt-10 mb-6' />

                    <div className="w-full">
                        <p className="text-gray-800 mb-4">{Dservice.desc}</p>
                    </div>

                    <hr className='border border-t-1 border-gray-200 mt-10 mb-6' />
                    <div>
                        <h1 className='text-xl md:text-2xl font-medium'>Meet Your Host</h1>
                        <div className="bg-white p-4 w-full md:w-96 pb-6 text-center rounded-md shadow-2xl h-auto md:h-52 border border-gray-100 mt-2 mb-5">
                            <img src={Dvendor.avatar ? Dvendor.avatar : "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"}
                                alt=""
                                className='w-24 h-24 rounded-full mx-auto'
                                onClick={handleClick}
                            />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{Dvendor.name}</h2>
                            {/* <p className="font-medium text-sm text-black">Hosting From {Dvendor.totalYears} Years</p> */}
                        </div>
                        <p className='w-full md:w-3/4 '>{Dvendor.description}</p>
                    </div>
                </div>


                <div className="hidden md:block bg-white p-4 pb-6 text-center rounded-md shadow-md w-full md:w-96 h-40 border border-gray-300 mt-10">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">${Dservice.price} </h2>

                    <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-full"
                        onClick={() => payment(Dservice.id)}
                    >Request</button>
                </div>


            </div>








        </>
    );

}

export default Section2;
