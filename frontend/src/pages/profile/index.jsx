import React, { useEffect, useState } from "react";
import { useAuth } from "../../authContext";
import { useNavigate } from "react-router-dom";
import { apiConst } from "../../constants/api.constants";
import { DeleteService, UpdateUser } from "../../connection/apis";
import ModalForm from "../service/components";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateModalForm from "../service/updateServiceModal";
import { LoadingSpinner } from "../../constants/loadingSpinner";

const ProfilePage = () => {
    const { me, token, fetchUserProfile, loading } = useAuth();
    const navigate = useNavigate();

    // State Hooks
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState("service");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isServiceModalOpen, setServiceModalOpen] = useState(false);
    const [updateServiceModalOpen, setUpdateServiceModalOpen] = useState(false);
    const [UpService, setUpService] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        about: "",
        avatar: null,
        phone: "",
    });

    // Effect Hooks
    useEffect(() => {
        if (!loading && me) {
            setIsLoading(false);
            setFormData({
                name: me.profile.name || "",
                email: me.profile.email || "",
                about: me.profile.about || "",
                phone: me.profile.phone || "",
                avatar: null,
            });
        }
    }, [loading, me]);

    // Handle Loading State
    if (isLoading || !me) {
        return <LoadingSpinner />;
    }

    // Return early if `me` is not available
    if (!me || !me.profile) {
        console.error("Error: Unable to load profile data", me);
        return <div>Error: Unable to load profile</div>;
    }




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Update the formData with the original file name and file itself
            setFormData((prevData) => ({
                ...prevData,
                avatar: file     // Store the file object

            }));
        }
    };




    const handleupdate = (service) => {
        setUpService(service);
        setUpdateServiceModalOpen(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = { ...formData };


        // Update user profile
        try {
            const response = await UpdateUser(updatedData, token);
            if (response) {
                fetchUserProfile();
                setPage(response.role)
                console.log("Profile updated successfully", response);
                setModalOpen(false); // Close modal
            } else {
                console.error("Error updating profile");
            }
        } catch (err) {
            console.error("Error during profile update:", err);
        }
    };

    const handleClick = (id) => {
        navigate(apiConst.card.replace(":id", id));
    };




    const handleDelete = async (id) => {
        try {
            const response = await DeleteService(id, token);
            if (response) {
                fetchUserProfile()
                console.log("Service deleted successfully", response);

            } else {
                console.error("Error Deleting service");
            }
        } catch (err) {
            console.error("Error during service delete:", err);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-8">
            <div className="max-w-6xl w-full bg-white rounded-lg shadow-md p-8">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8">

                    <img
                        src={
                            me.profile.avatar
                                ? `http://localhost:1234/${me.profile.avatar}`
                                : "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                        }
                        alt={me.profile.name}
                        className="w-28 h-28 rounded-full object-cover"
                    />

                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">{me.profile.name}</h1>
                        <p className="text-gray-500">{me.profile.about || "About section here"}</p>
                        <div className="mt-4 flex space-x-4">

                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                onClick={() => setModalOpen(true)}
                            >
                                Edit Profile
                            </button>
                            {me.profile.role === "VENDOR" &&
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                    onClick={() => setServiceModalOpen(true)}
                                >
                                    Add Service
                                </button>
                            }
                            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                                Get in Touch
                            </button>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-gray-600">Followers</p>
                        <h2 className="text-xl font-bold">2,985</h2>
                        <p className="text-gray-600 mt-2">Likes</p>
                        <h2 className="text-xl font-bold">548</h2>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-8">
                    <div className="flex space-x-8 border-b">
                        {me.profile.role === "VENDOR" && (
                            <>
                                <button
                                    className={`pb-2 border-b-2 ${page === "service" ? "border-blue-600" : ""}`}
                                    onClick={() => setPage("service")}
                                >
                                    Services
                                </button>
                                <button
                                    className={`pb-2 border-b-2 ${page === "dashboard" ? "border-blue-600" : ""}`}
                                    onClick={() => setPage("dashboard")}
                                >
                                    Dashboard
                                </button>
                            </>
                        )}
                        <button
                            className={`pb-2 border-b-2 ${page === "bookings" ? "border-blue-600" : ""}`}
                            onClick={() => setPage("bookings")}
                        >
                            My Bookings
                        </button>
                        <button
                            className={`pb-2 border-b-2 ${page === "myActivity" ? "border-blue-600" : ""}`}
                            onClick={() => setPage("myActivity")}
                        >
                            My Activity
                        </button>
                    </div>
                </div>

                {/* Page Content */}
                {page === "service" && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {page === "bookings" && <div className="mt-8">My Bookings</div>}
                {page === "dashboard" && <div className="mt-8">Dashboard</div>}
                {page === "myActivity" && <div className="mt-8">My Activity</div>}



            </div>

            {/* Edit Profile Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center w-full z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg min-w-[90vw] max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-gray-700">Name*</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-gray-700">Email*</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4 flex space-x-4">

                                <div className="flex-1">
                                    <label className="block text-gray-700">About*</label>
                                    <textarea
                                        name="about"
                                        value={formData.about}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />

                                </div>
                            </div>
                            <div className="mb-4 flex space-x-4">



                                <div className="flex-1">
                                    <label className="block text-gray-700">Avatar*</label>
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="w-full p-2 border rounded-lg"

                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {isServiceModalOpen && (
                <ModalForm
                    isOpen={isServiceModalOpen}
                    onClose={() => setServiceModalOpen(false)}
                    token={token}
                    fetchUserProfile={fetchUserProfile}
                />
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

export default ProfilePage;
