import ActionProvider from "./chatAction";
import config from "./chatbotConfig";
import MessageParser from "./chatParser";
import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css"; // Import styles


const FloatingChatbot = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="fixed bottom-20 right-5 z-50 w-1/4 flex justify-end">
            {/* Chatbot Toggle Button */}

            {isOpen ? <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-red-500 text-white p-1 px-2 rounded-full shadow-lg"
            >
                X

            </button>
                : <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-pink-600 text-white p-3 rounded-full shadow-lg"
                >
                    Chat With Support

                </button>
            }

            {/* Chatbot Window */}
            {isOpen && (
                <div className="w-full h-96 bg-white shadow-lg rounded-lg p-4">
                    <Chatbot
                        config={config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                    />
                </div>
            )}
        </div>
    );
};

export default FloatingChatbot;
