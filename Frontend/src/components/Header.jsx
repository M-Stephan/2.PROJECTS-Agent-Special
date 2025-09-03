import React from 'react';
import '../styles/Header.css';

function Header({ userId, onLogout }) {
  return (
    <div className="header">
      <h1>Agent Secret</h1>
      {userId && (
        <button className="logout-button" onClick={onLogout}>
          Se déconnecter
        </button>
      )}
    </div>
  );
}

export default Header;
