import React from 'react';
import '../styles/Header.css';
import { usePlayerProgress } from './playerApi';

// Header component displaying title, progress, and logout button
function Header({ userId, onLogout }) {
    const { progress, loading } = usePlayerProgress(userId);

    // Render header with progress and logout button if user is logged in
    return (
        <div className="header">
            <h2 style={{textAlign: 'left'}}>Progression: {loading ? '...' :progress} / 15</h2>
            <h1 className='header-title'>Agent Secret</h1>
            {userId && (
                <button className="logout-button" onClick={onLogout}>
                  Se déconnecter
                </button>
            )}
        </div>
    );
}

export default Header;
