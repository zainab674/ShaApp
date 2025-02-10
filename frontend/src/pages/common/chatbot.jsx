import ActionProvider from "./chatAction";
import config from "./chatbotConfig";
import MessageParser from "./chatParser";
import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css"; // Import styles


const FloatingChatbot = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="fixed bottom-20 sm:right-5 z-50 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-end">
            {/* Chatbot Toggle Button */}
            {isOpen ? (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-red-500 text-white p-2 sm:p-3 rounded-full shadow-lg"
                >
                    X
                </button>
            ) : (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-pink-600 text-white p-2 sm:p-3 rounded-full shadow-lg"
                >
                    Chat With Support
                </button>
            )}

            {/* Chatbot Window */}
            {isOpen && (
                <div className="w-full max-w-sm sm:max-w-md md:max-w-lg h-[70vh] sm:h-96 bg-white shadow-lg rounded-lg p-4">
                    <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
                </div>
            )}
        </div>

    );
};

export default FloatingChatbot;
