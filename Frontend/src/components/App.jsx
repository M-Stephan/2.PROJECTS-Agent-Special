import React, { useState, useRef } from 'react';
import '../styles/App.css';
import MainPage from './MainPage';
import Header from './Header';

function App() {
    const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
    const mainPageRef = useRef(null);

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

        localStorage.removeItem("userId");
        localStorage.removeItem("token");

        // on met à jour userId immédiatement
        setUserId(null);

        // on demande à MainPage de revenir à l'écran principal
        if (mainPageRef.current) mainPageRef.current.handleLogoutReset();
    };


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
