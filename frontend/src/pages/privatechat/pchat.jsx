import React, { useState, useEffect, useRef } from 'react';

const ChatComponent = ({ messages, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef(null);

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
        <div className="flex flex-col h-full max-h-screen bg-gray-100">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 bg-green-500 text-white">
                <h1 className="text-lg font-bold">Chat</h1>

            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        <div
                            className={`p-3 max-w-xs text-sm rounded-lg shadow-md ${msg.isSender
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
            <div className="flex items-center p-4 bg-white border-t">
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
                    className="ml-2 px-4 py-2 text-white bg-green-500 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatComponent;
