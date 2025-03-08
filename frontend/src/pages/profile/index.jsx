import React, { useEffect, useState } from "react";
import { useAuth } from "../../authContext";
import { useNavigate, useParams } from "react-router-dom";
import { SpecificUser, UpdateUser } from "../../connection/apis";
import ModalForm from "../service/components";
import { LoadingSpinner } from "../../constants/loadingSpinner";
import MyBookings from "../booking/components/myBookings";
import Navbar from "../home/Components/navbar";
import OldBookings from "../booking/components/oldBookings";
import UserReviews from "../review/UserReviews";
import ChatLayout from "../privatechat/allChats";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import this CSS for styling
import { apiConst } from "../../constants/api.constants";

const ProfilePage = () => {
    const { me, token, fetchUserProfile, loading } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState("bookings");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isServiceModalOpen, setServiceModalOpen] = useState(false);
    const [user, setUser] = useState({});


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        about: "",
        avatar: null,
        phone: "",
    });

    const GetUser = async (id) => {
        try {
            const res = await SpecificUser(id);
            setUser(res);
        } catch (error) {
            console.error("Error fetching user data:", error);

        }
    };
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

    useEffect(() => {
        GetUser(id)
    }, [id]);

    if (isLoading || !me) {
        return <LoadingSpinner />;
    }

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

            setFormData((prevData) => ({
                ...prevData,
                avatar: file

            }));
        }
    };





    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = { ...formData };



        try {
            const response = await UpdateUser(updatedData, token);
            if (response) {
                fetchUserProfile();
                setPage(response.role)
                console.log("Profile updated successfully", response);
                toast.success("Profile updated successfully");

                setModalOpen(false);
            } else {
                console.error("Error updating profile");
            }
        } catch (err) {
            console.error("Error during profile update:", err);
        }
    };







    return (


        <>
            <Navbar />


            {id ?
                <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
                    <div className=" bg-white rounded-lg shadow-md p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                            <img
                                src={
                                    user.avatar
                                        ? `http://localhost:1234/${user.avatar}`
                                        : "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                                }
                                alt={user.name}
                                className="w-28 h-28 rounded-full object-cover"
                            />

                            <div className="flex-1">
                                <h1 className="text-2xl font-bold">{user.name}</h1>
                                <p className="text-gray-500">{user.about}</p>
                                <div className="mt-4 flex space-x-4">
                                    <button
                                        className="bg-pink-600 text-white px-4 py-2 rounded-lg"
                                        onClick={() => navigate(apiConst.privateChat.replace(':id', id))}
                                    >
                                        Chat with User
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="min-h-screen bg-gray-100 flex justify-center p-8 mt-14">
                    <div className="max-w-6xl w-full bg-white rounded-lg shadow-md p-8">
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
                                <p className="text-gray-500">{me.profile.about}</p>
                                <div className="mt-4 flex space-x-4">

                                    <button
                                        className="bg-pink-600 text-white px-4 py-2 rounded-lg"
                                        onClick={() => setModalOpen(true)}
                                    >
                                        Edit Profile
                                    </button>
                                    {me.profile.role === "VENDOR" &&
                                        <button
                                            className="bg-pink-600 text-white px-4 py-2 rounded-lg"
                                            onClick={() => setServiceModalOpen(true)}
                                        >
                                            Add Service
                                        </button>
                                    }

                                </div>
                            </div>
                            <div className="text-center md:text-right">

                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="mt-8">
                            <div className="flex space-x-8 border-b">

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
                                <button
                                    className={`pb-2 border-b-2 ${page === "chats" ? "border-blue-600" : ""}`}
                                    onClick={() => setPage("chats")}
                                >
                                    My Chats
                                </button>
                            </div>
                        </div>

                        {/* Page Content */}

                        {page === "bookings" && <div className="mt-8"><MyBookings /></div>}
                        {page === "chats" && <div className="mt-8"><ChatLayout /></div>}

                        {page === "myActivity" && <div className="mt-8">
                            <OldBookings />
                            <UserReviews />

                        </div>}



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


                </div>
            }

        </>
    );
};

export default ProfilePage;
