import { useState, useEffect } from 'react';


// playerApi.js
const API_BASE = 'https://as-backend.duckdns.org/api/Player';

// Function to get the current progress of a player by userId
export async function getPlayerProgress(userId) {
    try {
        const res = await fetch(`${API_BASE}/progression/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (!res.ok) throw new Error(`Erreur API: ${res.status}`);

        const text = await res.text(); // on récupère la réponse brute
        return Number(text); // on la convertit en nombre
    } catch (err) {
        console.error('Erreur getPlayerProgress:', err);
        return null;
    }
}

// Function to increment the player's progress by userId
export async function incrementPlayerProgress(userId) {
    try {
        const res = await fetch(`${API_BASE}/progression/increment/${userId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (!res.ok) throw new Error(`Erreur API: ${res.status}`);

        const text = await res.text();
        return Number(text);
    } catch (err) {
        console.error('Erreur incrementPlayerProgress:', err);
        return null;
    }
}

// Custom hook to manage player progress state
export function usePlayerProgress(userId) {
    // Global state for player progress
    const [progress, setProgress] = useState(0);
    // State to indicate if the data is loading
    const [loading, setLoading] = useState(true);

    // Function to fetch and update player progress
    const fetchProgress = async () => {
        setLoading(true);
        const prog = await getPlayerProgress(userId);
        setProgress(Number(prog) || 0);
        setLoading(false);
    };

    // Fetch progress when userId changes
    useEffect(() => {
        if (userId) fetchProgress();
    }, [userId]);

    // Function to increment player progress and update state
    const increment = async () => {
        const newProg = await incrementPlayerProgress(userId);
        setProgress(Number(newProg) || progress);
    };

    // Return the progress, loading state, increment function, and refresh function
    return { progress, loading, increment, refresh: fetchProgress };
}