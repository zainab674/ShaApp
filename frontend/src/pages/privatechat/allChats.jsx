import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../authContext';
import { SpecificUser } from '../../connection/apis';

const ChatLayout = () => {
    const { token, socket, me } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentMessages, setCurrentMessages] = useState([]);
    const [userNames, setUserNames] = useState({});
    const [selectedUserName, setSelectedUserName] = useState('');
    const [isMobileConversationView, setIsMobileConversationView] = useState(true);
    const messagesEndRef = useRef(null);


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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [currentMessages]);
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
        setIsMobileConversationView(false);

        if (socket) {
            socket.emit('getChatHistory', { receiverId: userId });

            socket.on('chatHistory', (chatMessages) => {
                const formattedMessages = chatMessages.map((msg) => ({
                    text: msg.content,
                    isSender: msg.senderId === me.profile._id,
                    timestamp: new Date(msg.timestamp)
                }));

                setCurrentMessages(formattedMessages);
            });
        }
    };


    useEffect(() => {
        if (socket) {
            // Fetch all conversations
            socket.emit('getAllConversations');

            socket.on('conversationsList', async (conversations) => {
                console.log("Raw conversations:", conversations);

                const groupedConversations = conversations.reduce((acc, conversation) => {
                    // Handle different possible conversation structures
                    const otherUserId = conversation.userId ||
                        (conversation.participants &&
                            conversation.participants.find(id => id !== token.userId));

                    if (otherUserId && !acc.some(conv => conv.userId === otherUserId)) {
                        acc.push({
                            userId: otherUserId,
                            lastMessage: conversation.lastMessage || conversation.content,
                            timestamp: conversation.timestamp || new Date()
                        });
                    }
                    return acc;
                }, []);

                // Fetch names for each user
                const namesPromises = groupedConversations.map(async (conv) => {
                    try {
                        const userData = await SpecificUser(conv.userId);
                        return {
                            userId: conv.userId,
                            name: userData.name
                        };
                    } catch (error) {
                        console.error(`Error fetching name for user ${conv.userId}:`, error);
                        return {
                            userId: conv.userId,
                            name: conv.userId
                        };
                    }
                });

                const userNameResults = await Promise.all(namesPromises);

                // Create a map of userIds to names
                const namesMap = userNameResults.reduce((acc, result) => {
                    acc[result.userId] = result.name;
                    return acc;
                }, {});
                console.log("namesMap", namesMap)
                setUserNames(namesMap);
                setConversations(groupedConversations);
            });
        }
    }, [socket, token.userId, selectedUser]);

    const handleBackToConversations = () => {
        setIsMobileConversationView(true);
        setSelectedUser(null);
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
        <div className="flex flex-col md:flex-row h-[80vh]">
            {/* Conversations List - Mobile & Desktop */}
            <div className={`
            ${isMobileConversationView ? 'w-full' : 'hidden md:block'} 
            md:w-1/4 bg-gray-100 border-r border-pink-600 overflow-y-auto
        `}>
                <div className="p-4 bg-white border-b border-pink-600 shadow-sm">
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

            {/* Chat Window - Mobile & Desktop */}
            <div className={`
            ${isMobileConversationView ? 'hidden md:flex' : 'w-full'} 
            md:w-3/4 flex-col relative
        `}>
                {selectedUser ? (
                    <>
                        {/* Mobile Back Button */}
                        <button
                            onClick={handleBackToConversations}
                            className="md:hidden absolute top-2 left-2 z-10 bg-gray-200 p-2 rounded-full"
                        >
                            ← Back
                        </button>

                        {/* Chat Header */}
                        <div className="p-4 bg-gray-100 border-b border-pink-600 h-16">
                            <h3 className="text-lg font-semibold">
                                {selectedUserName || selectedUser}
                            </h3>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: "calc(100% - 116px)" }} >
                            {currentMessages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}
                                >
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
                            <div ref={messagesEndRef} /> {/* Scroll anchor */}
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
                                    className="bg-pink-500 text-white p-2 rounded-lg"
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