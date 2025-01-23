import React, { useState, useEffect } from 'react';
import { useAuth } from '../../authContext';
import { SpecificUser } from '../../connection/apis';

const ChatLayout = () => {
    const { token, socket, me } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentMessages, setCurrentMessages] = useState([]);
    const [userNames, setUserNames] = useState({});
    const [selectedUserName, setSelectedUserName] = useState('');

    const fetchUserName = async (userId) => {
        try {
            const userData = await SpecificUser(userId);
            const name = userData.username || userData.name || userId;

            // Update user names map
            setUserNames(prev => ({
                ...prev,
                [userId]: name
            }));

            // Set name for selected user
            setSelectedUserName(name);
            return name;
        } catch (error) {
            console.error(`Error fetching name for user ${userId}:`, error);
            setSelectedUserName(userId);
            return userId;
        }
    };




    useEffect(() => {
        if (!socket) return;

        // Listener for receiving new messages
        const handleReceiveMessage = (message) => {
            console.log("Received message:", message);

            // Check if the message is from the currently selected user or for the current user
            if (message.senderId === selectedUser || message.receiverId === selectedUser) {
                setCurrentMessages(prevMessages => [
                    ...prevMessages,
                    {
                        text: message.message,
                        isSender: message.senderId === me.profile._id,
                        timestamp: new Date(message.timestamp)
                    }
                ]);
            }
        };

        // Add the listener
        socket.on('receiveMessage', handleReceiveMessage);

        // Cleanup listener on component unmount
        return () => {
            socket.off('receiveMessage', handleReceiveMessage);
        };
    }, [socket, selectedUser, me]);

    const handleUserSelect = (userId) => {
        setSelectedUser(userId);
        fetchUserName(userId);

        if (socket) {
            socket.emit('getChatHistory', { receiverId: userId });

            // Use a one-time listener for chat history
            const chatHistoryHandler = (chatMessages) => {
                const formattedMessages = chatMessages.map((msg) => ({
                    text: msg.content,
                    isSender: msg.senderId === me.profile._id,
                    timestamp: new Date(msg.timestamp)
                }));

                setCurrentMessages(formattedMessages);

                // Remove the listener after processing
                socket.off('chatHistory', chatHistoryHandler);
            };

            socket.on('chatHistory', chatHistoryHandler);
        }
    };


    const handleSendMessage = (text) => {
        if (socket && selectedUser) {
            socket.emit('sendMessage', {
                receiverId: selectedUser,
                message: text
            });

            setCurrentMessages(prev => [...prev, {
                text,
                isSender: true,
                timestamp: new Date()
            }]);
        }
    };

    return (
        <div className="flex h-[85vh] border border-pink-600">
            {/* Conversations List */}
            <div className="w-1/4 bg-gray-100 border-r border-pink-600 overflow-y-auto">
                <div className="p-4 bg-white border-b border-pink-600  shadow-sm">
                    <h2 className="text-xl font-semibold text-pink-600">Chats</h2>
                </div>
                {conversations.map((conversation) => (
                    <div
                        key={conversation.userId}
                        className={`p-4 hover:bg-gray-200 border-b border-pink-600 cursor-pointer ${selectedUser === conversation.userId ? 'bg-gray-200' : ''}`}
                        onClick={() => handleUserSelect(conversation.userId)}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-medium">
                                {userNames[conversation.userId] || conversation.userId}
                            </span>
                            <span className="text-xs text-gray-500">
                                {new Date(conversation.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                            {conversation.lastMessage}
                        </p>
                    </div>
                ))}
            </div>

            {/* Chat Window */}
            <div className="w-3/4 flex flex-col">
                {selectedUser ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 bg-gray-100 border-b border-pink-600 ">
                            <h3 className="text-lg font-semibold">{selectedUserName || selectedUser}</h3>
                        </div>

                        {/* Messages */}
                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            {currentMessages.map((message, index) => (

                                <div
                                    key={index}
                                    className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}
                                >
                                    {console.log("message.isSender", message.isSender, message)}
                                    {console.log("me", me)}
                                    <div
                                        className={`max-w-xs p-3 rounded-lg ${message.isSender
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-black'
                                            }`}
                                    >
                                        <p>{message.text}</p>
                                        <span className="text-xs opacity-70 block text-right">
                                            {message.timestamp.toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 bg-gray-100 border-t">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const input = e.target.elements.messageInput;
                                    if (input.value.trim()) {
                                        handleSendMessage(input.value);
                                        input.value = '';
                                    }
                                }}
                                className="flex space-x-2"
                            >
                                <input
                                    type="text"
                                    name="messageInput"
                                    placeholder="Type a message"
                                    className="flex-grow p-2 border rounded-lg"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white p-2 rounded-lg"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-gray-500">
                        Select a chat to start messaging
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatLayout;