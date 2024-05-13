"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter hook from Next.js
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../../firebase.config";

const Auth = () => {
    const [user, setUser] = useState(null);
    const router = useRouter(); // Initialize useRouter

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (typeof storedUser !== "undefined" && storedUser !== null) {
        // If user data is available, update the state
        setUser(JSON.parse(storedUser));
        } else {
        // If user data is not available, set default state
        localStorage.clear();
        setUser(null); // or whatever default value you want
        }
    }, []);
    
    useEffect(() => {
        if (user) {
            router.push('/');
        }       
    }, [user]); // Run only once on component mount

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const login = async () => {
        try {
            if (!user) {
                const {
                    user: { providerData },
                } = await signInWithPopup(firebaseAuth, provider);
                localStorage.setItem("user", JSON.stringify(providerData[0]));
                // Redirect to home page after login
                router.push('/');
            } else {
                // Redirect to home page if user is already logged in
                router.push('/');
            }
        } catch (error) {
            // Handle error when login fails
            console.error('Login error:', error);
            // You can show a message to the user indicating the failure, or handle it in another way
            // For example, you can set a state to display an error message on the UI
        }
    };

    const logout = () => {
        localStorage.clear();
        // Redirect to home page after logout
        router.push('/');
    };

    return (
        <div onClick={login}>Login</div>
    );
};

export default Auth;
