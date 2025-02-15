import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConst } from "../../constants/api.constants";
import { DeleteService, UpdateUser } from "../../connection/apis";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateModalForm from "../service/updateServiceModal";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import this CSS for styling

const ShowAllServices = ({ me, token, fetchUserProfile }) => {
    const navigate = useNavigate();
    const [updateServiceModalOpen, setUpdateServiceModalOpen] = useState(false);
    const [UpService, setUpService] = useState({});

    const handleClick = (id) => {
        navigate(apiConst.card.replace(":id", id));
    };

    const handleDelete = async (id) => {
        try {
            const response = await DeleteService(id, token);
            if (response) {
                fetchUserProfile();
                console.log("Service deleted successfully", response);
                toast.success("Service deleted successfully!");

            } else {
                console.error("Error Deleting service");
            }
        } catch (err) {
            console.error("Error during service delete:", err);
        }
    };

    const handleupdate = (service) => {
        setUpService(service);
        setUpdateServiceModalOpen(true);
    };

    return (
        <div className="mt-8">
            {me.services.length === 0 ? (
                <p className="text-center text-gray-500">
                    You have no services to display.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {me.services.map((service) => (
                        <div key={service.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <img
                                src={
                                    service.image[0]
                                        ? `http://localhost:1234/uploads/${service.image[0]}`
                                        : "https://media.istockphoto.com/id/1408146514/photo/minimalistic-modern-private-house-exterior-in-pink-with-flamingos.jpg?s=612x612&w=0&k=20&c=eBUQw8rdxo5bvxnl6EUcQWkJ0WwqTv6UNTcqrOI74Dg="
                                }
                                alt={service.title}
                                className="w-full h-36 object-cover rounded-lg mb-4"
                                onClick={() => handleClick(service._id)}
                            />
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">{service.title}</h3>
                                <div className="flex gap-2">
                                    <FaEdit
                                        className="text-gray-600 cursor-pointer hover:text-blue-600"
                                        onClick={() => handleupdate(service)}
                                    />
                                    <FaTrash
                                        className="text-gray-600 cursor-pointer hover:text-red-600"
                                        onClick={() => handleDelete(service._id)}
                                    />
                                </div>
                            </div>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {updateServiceModalOpen && (
                <UpdateModalForm
                    isOpen={updateServiceModalOpen}
                    onClose={() => setUpdateServiceModalOpen(false)}
                    token={token}
                    service={UpService}
                    fetchUserProfile={fetchUserProfile}
                />
            )}
        </div>
    );
};

export default ShowAllServices;
