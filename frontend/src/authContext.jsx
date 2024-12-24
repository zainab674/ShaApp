import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile } from './connection/apis';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('accessToken') || null);
    const [me, setMe] = useState(null); // Changed to null for clearer state management
    const [loading, setLoading] = useState(true); // To handle loading state



    const fetchUserProfile = async () => {
        try {
            if (token) {
                const userProfile = await Profile(token);
                console.log("API Response (Profile):", userProfile);
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
        if (token) {
            fetchUserProfile();
        }
    }, [token]);



    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        console.log("AuthContext State Update:", { token, me, loading });
    }, [me, loading, token]);


    return (
        <AuthContext.Provider value={{ token, setToken, me, loading, fetchUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
