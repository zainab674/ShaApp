import React from "react";
import Navbar from "../home/Components/navbar";
const ContactSection = () => {
    return (
        <>
            <Navbar />
            <div className="max-w-md mx-auto mt-24 p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-semibold text-gray-900">Get in Touch</h2>
                <p className="text-gray-500 mt-2">
                    You need more information? Call us or Email us your queries We are happy to help
                </p>
                <div className="mt-4 space-y-3">
                    <div className="flex items-center space-x-3">
                        <span className="text-gray-700">
                            📞
                        </span>
                        <span className="text-gray-900 font-medium">+92 333 2325374</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="text-gray-700">
                            ✉️
                        </span>
                        <span className="text-gray-900 font-medium">imshiraz007@gmail.com</span>
                    </div>

                </div>
            </div>

        </>
    );
};

export default ContactSection;
