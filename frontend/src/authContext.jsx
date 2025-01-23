import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile } from './connection/apis';
import { io } from 'socket.io-client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('accessToken') || null);
    const [me, setMe] = useState(null); // Changed to null for clearer state management
    const [loading, setLoading] = useState(true); // To handle loading state

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (token) {
            const newSocket = io('http://localhost:1234', {
                withCredentials: true,
                extraHeaders: {
                    Authorization: token,
                },
            });

            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Connected to socket server');
            });

            newSocket.on('disconnect', () => {
                console.log('Disconnected from socket server');
            });


        }
    }, [token]);

    const fetchUserProfile = async () => {
        try {
            if (token) {
                const userProfile = await Profile(token);

                if (userProfile) {
                    setMe(userProfile);
                } else {
                    console.error("Profile response is empty or invalid.");
                    setMe(null);
                }
            }
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            setMe(null);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchUserProfile();

    }, [token]);



    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);




    return (
        <AuthContext.Provider value={{ token, setToken, me, loading, fetchUserProfile, socket }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
