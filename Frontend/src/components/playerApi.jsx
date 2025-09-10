import { useState, useEffect } from 'react';


// playerApi.js
const API_BASE = 'https://as-backend.duckdns.org/api/Player';

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


export function usePlayerProgress(userId) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    setLoading(true);
    const prog = await getPlayerProgress(userId);
    setProgress(Number(prog) || 0);
    setLoading(false);
  };

  useEffect(() => {
    if (userId) fetchProgress();
  }, [userId]);

  const increment = async () => {
    const newProg = await incrementPlayerProgress(userId);
    setProgress(Number(newProg) || progress);
  };

  return { progress, loading, increment, refresh: fetchProgress };
}