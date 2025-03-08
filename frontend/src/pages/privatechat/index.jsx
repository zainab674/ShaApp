import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../authContext';
import { SpecificUser } from '../../connection/apis';
import { toast } from 'react-toastify';

const ChatComponent = ({ messages, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef(null);
    const navigate = useNavigate(); // For back navigation

    // Scroll to the bottom of the chat whenever messages change
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);



    const handleSendMessage = () => {
        if (newMessage.trim()) {
            onSendMessage(newMessage.trim());
            setNewMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (

        <div className="fixed inset-0 flex flex-col bg-white h-full w-full sm:w-[90%] md:w-[80%] lg:w-[60%] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-pink-600 text-white">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 text-white bg-transparent rounded hover:bg-pink-700"
                >
                    ← Back
                </button>
                <h1 className="text-lg font-bold">Chat </h1>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`p-3 max-w-[80%] sm:max-w-[70%] md:max-w-xs text-sm rounded-lg shadow-md ${msg.isSender
                                ? 'bg-green-500 text-white rounded-tr-none'
                                : 'bg-gray-200 text-gray-800 rounded-tl-none'
                                }`}
                        >
                            {msg.text}
                            <span className="block mt-1 text-xs text-gray-500">
                                {new Date(msg.timestamp).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Input Box */}
            <div className="flex items-center p-4 bg-white border border-pink-600 fixed bottom-0 w-full sm:w-[90%] md:w-[80%] lg:w-[60%] mx-auto">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-2 px-4 py-2 text-white bg-pink-500 rounded-lg shadow hover:bg-pink-600 focus:outline-none focus:ring focus:ring-green-300"
                >
                    Send
                </button>
            </div>
        </div>


    );
};


const Private = () => {
    const { id: receiverId } = useParams(); // Get receiverId from the route params
    const { token, socket, me } = useAuth(); // Use the auth token and logged-in user profile
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchChatHistory = async () => {
            if (socket) {
                socket.emit('getChatHistory', { receiverId });

                socket.on('chatHistory', (chatMessages) => {
                    const formattedMessages = chatMessages.map((msg) => ({
                        text: msg.content,
                        isSender: msg.senderId === me.profile._id, // Compare senderId with logged-in user's ID
                        timestamp: new Date(msg.timestamp),
                    }));
                    setMessages(formattedMessages);
                });



                socket.on('receiveMessage', (message) => {

                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            text: message.message,
                            isSender: message.senderId === me.profile._id,
                            timestamp: new Date(message.timestamp),
                        },
                    ]);
                });
            }
            else {
                console.error("Socket not initialized or not connected.");
            }
        };

        fetchChatHistory();

        return () => {
            if (socket) {
                socket.off('chatHistory');
                socket.off('receiveMessage');
            }
        };
    }, [socket, receiverId, me.profile._id]);

    const handleSendMessage = (text) => {
        if (socket && socket.connected) {
            socket.emit('sendMessage', { receiverId, message: text });

            // Add message locally for the sender
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text,
                    isSender: true,
                    timestamp: new Date(),
                },
            ]);
        } else {
            console.error('Socket is not connected. Cannot send message.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <ChatComponent messages={messages} onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default Private;