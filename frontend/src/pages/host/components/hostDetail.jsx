

import React from 'react'

import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TiFlag } from "react-icons/ti";
import Card from '../modals/card';
import { SpecificUser, UserService } from '../../../connection/apis';
import { useAuth } from '../../../authContext';
import { apiConst } from '../../../constants/api.constants';



function HostDe() {
    const { id } = useParams();
    const { token } = useAuth();
    const [host, setHost] = useState({});
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    const GetVendor = async () => {
        try {
            const res = await SpecificUser(id);
            setHost(res);
            console.log("Vendor Data:", res);
        } catch (error) {
            console.error("Error fetching Vendor DATA:", error);
        }
    };

    const GetServices = async () => {
        try {
            const res = await UserService(id);
            setServices(res);
            console.log("Service Data:", res);
        } catch (error) {
            console.error("Error fetching Vendor DATA:", error);
        }
    };





    useEffect(() => {

        GetVendor();
        GetServices();

    }, []);



    return (
        <div className="p-6 mt-20 bg-gray-50 min-h-screen">
            <div className="bg-white flex flex-col md:flex-row ">

                <div className="w-full md:w-1/3 mr-0 md:mr-5 mb-6 md:mb-0">
                    <div className="pb-4 rounded-lg shadow-md flex justify-evenly items-center w-full mb-6">
                        <div className="text-center md:text-left">
                            <img
                                src={host.avatar ? `http://localhost:1234/${host.avatar}` : "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"}
                                alt={host.name}
                                className="h-24 w-24 rounded-full mb-4 mx-auto md:mx-0"
                            />
                            <h1 className="text-2xl font-bold">{host.name}</h1>
                            <span className="text-gray-500 flex items-center justify-center md:justify-start space-x-2">
                                <span>🏆</span>
                                <span>Host</span>
                            </span>
                            {token &&
                                <button
                                    onClick={() => navigate(apiConst.privateChat.replace(':id', id))}
                                    className="mt-4 px-4 py-2 bg-pink-600 text-white rounded"
                                >
                                    Chat with Host
                                </button>
                            }

                        </div>


                    </div>
                    <div className="pb-4 rounded-lg shadow-md flex flex-col justify-evenly items-center w-full mb-6">
                        <div>
                            <h1 className="text-xl font-medium mb-4">{host.name} Confirmed Information</h1>
                            <div className="flex justify-start">
                                {/* {host.identity ? <IoCheckmark className="text-2xl mt-1 m-2" /> : <RxCross1 className="text-2xl mt-1 m-2" />} */}
                                <p className="text-lg text-gray-600">{host.email}</p>
                            </div>
                            <div className="flex justify-start">
                                {/* {host.number ? <IoCheckmark className="text-2xl mt-1 m-2" /> : <RxCross1 className="text-2xl mt-1 m-2" />} */}
                                {/* <p className="text-lg text-gray-600">Number</p> */}
                            </div>

                        </div>
                    </div>
                    <p className="underline text-gray-900 font-medium inline-flex">
                        <TiFlag className="text-2xl mr-2" />
                        <span>Report this Profile</span>
                    </p>
                </div>

                <div className="w-full md:w-2/3">
                    <div className="pl-0 md:pl-6">
                        <h2 className="text-4xl font-semibold mb-4 text-left">About {host.name}</h2>
                        <p>{host.about}</p>
                    </div>
                    <h1 className="pl-0 md:pl-6 font-medium mt-5 text-2xl text-left">{host.name} Listings</h1>
                    <ul className="flex py-4 px-2 list-none mx-auto overflow-x-auto scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {services.map((location, index) => (
                            <li key={index}>
                                <Card location={location} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );

}



export default HostDe;
