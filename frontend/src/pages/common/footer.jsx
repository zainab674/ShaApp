import React from "react";
import { RiGlobalLine } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <hr className="w-full border border-t-gray-200 mb-4 mt-10" />
            <footer className="bg-gray-100 px-6 sm:px-8 md:px-16 py-6">
                <div className="container mx-auto">
                    {/* Footer Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                        <div className="col-span-1 text-left">
                            <h3 className="text-sm font-medium mb-2">Support</h3>
                            <ul className="text-sm space-y-2">
                                <li>Help Center</li>
                                <li>Cancellation options</li>
                                <li>Community forum</li>
                            </ul>
                        </div>
                        <div className="col-span-1 text-left">
                            <h3 className="text-sm font-medium mb-2">Hosting</h3>
                            <ul className="text-sm space-y-2">
                                <li>Newsroom</li>
                                <li>New features</li>
                                <li>Careers</li>
                            </ul>
                        </div>
                        <div className="col-span-1 text-left">
                            <h3 className="text-sm font-medium mb-2">AWP</h3>
                            <ul className="text-sm space-y-2">
                                <li>Investors</li>
                                <li>Gift cards</li>
                                <li>Emergency</li>
                            </ul>
                        </div>
                    </div>

                    <hr className="w-full border border-t-gray-200 my-4" />

                    {/* Footer Bottom */}
                    <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-sm">
                        {/* Left Links */}
                        <div className="flex flex-wrap justify-center md:justify-start space-x-3 text-gray-800 mb-4 md:mb-0">
                            <p>&copy; 2025 AWP, Inc.</p>
                            <a href="#" className="hover:text-gray-900">Terms</a>
                            <a href="#" className="hover:text-gray-900">Sitemap</a>
                            <a href="#" className="hover:text-gray-900">Privacy</a>
                            <a href="#" className="hover:text-gray-900">Your Privacy Choices</a>
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-wrap justify-center md:justify-end space-x-4">
                            <div className="flex items-center space-x-2">
                                <RiGlobalLine className="text-xl" />
                                <span>English (US)</span>
                            </div>
                            <span>PKR</span>
                            <FaFacebookSquare className="text-xl hover:text-gray-700" />
                            <FaTwitterSquare className="text-xl hover:text-gray-700" />
                            <FaInstagramSquare className="text-xl hover:text-gray-700" />
                        </div>
                    </div>
                </div>
            </footer>
        </>


    );
};

export default Footer;