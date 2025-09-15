import React, { useState, useRef } from 'react';
import '../styles/App.css';
import MainPage from './MainPage';
import Header from './Header';

function App() {
    // Initialize userId from localStorage if available
    const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
    // Ref to MainPage to call its methods
    const mainPageRef = useRef(null);

    // Handle user logout
    const handleLogout = async () => {
        try {
            await fetch('https://as-backend.duckdns.org/api/User/logout', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });
        } catch (err) {
        console.error(err);
        }

        // Clear localStorage
        localStorage.removeItem("userId");
        localStorage.removeItem("token");

        // Reset userId state
        setUserId(null);

        // Call MainPage method to reset its state
        if (mainPageRef.current) mainPageRef.current.handleLogoutReset();
    };

    // Render Header and MainPage components
    return (
        <>
            <Header userId={userId} onLogout={handleLogout} />
            <div className="app">
                <MainPage ref={mainPageRef} userId={userId} setUserId={setUserId} />
            </div>
        </>
    );
}

export default App;
