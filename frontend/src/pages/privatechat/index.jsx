import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatComponent from './pchat';
import { useAuth } from '../../authContext';
import { SpecificUser } from '../../connection/apis';

const Private = () => {
    const { id: receiverId } = useParams(); // Get receiverId from the route params
    const { token, socket } = useAuth(); // Use the auth token for authentication
    const [messages, setMessages] = useState([]);
    const GetUser = async (userId) => {
        try {
            const res = await SpecificUser(userId);
            setHost(res);
            console.log("User Data:", res);
        } catch (error) {
            console.error("Error fetching Vendor DATA:", error);
        }
    };

    useEffect(() => {
        if (socket) {
            socket.emit('getChatHistory', { receiverId });

            socket.on('chatHistory', (chatMessages) => {
                const formattedMessages = chatMessages.map((msg) => ({
                    text: msg.content,
                    isSender: msg.senderId === receiverId,
                    timestamp: new Date(msg.timestamp),
                }));
                setMessages(formattedMessages);
            });

            socket.on('receiveMessage', (message) => {
                console.log("messgae", message)
                console.log("receiverId", receiverId)
                if (message.senderId === receiverId) {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            text: message.message,
                            isSender: false,
                            timestamp: new Date(message.timestamp),
                        },
                    ]);
                }
            })
        } else {
            console.error("Socket not initialized or not connected.");
        }
    }, [socket, receiverId]);



    const handleSendMessage = (text) => {
        if (socket && socket.connected) {
            console.log('Socket connected:', socket.id);  // Log the socket ID to confirm connection
            console.log('Emitting sendMessage:', { receiverId, message: text });

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
