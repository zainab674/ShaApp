import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../../constants/loadingSpinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";
import { DeleteNotifications } from "../../connection/apis";
import Navbar from "../home/Components/navbar";

const Notifications = () => {
    const { me, token, fetchUserProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (me) {
            console.log("me", me);
            setIsLoading(false);
        }
    }, [me]);

    if (isLoading || !me) {
        return <LoadingSpinner />;
    }

    const handleDelete = async (id) => {
        try {
            const result = await DeleteNotifications(id, token);
            console.log(result);
            fetchUserProfile();
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="space-y-6 mt-20">
                <div className="p-4">
                    {me.notify.length === 0 ? (
                        <p className="text-center text-gray-500">No notifications found.</p>
                    ) : (
                        me.notify.map((notification) => (
                            <div
                                key={notification.id}
                                className="border p-4 rounded-lg mb-4 shadow-md relative group hover:border-red-500"
                                onClick={() => {
                                    handleDelete(notification.id);
                                }}
                            >
                                <p className="text-md font-semibold">{notification.message}</p>
                                <p className="text-xs text-gray-400">
                                    Received at: {new Date(notification.createdAt).toLocaleString()}
                                </p>
                                <span className="absolute right-4 top-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Remove
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Notifications;
