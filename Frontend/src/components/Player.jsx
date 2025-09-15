import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import '../styles/Player.css';
import ConnectionSuccess from './ConnectionSuccess';
import PcDesktop from "./PcDesktop";

// Function to manage player data and display the PC desktop interface
function Player({ userId, formRef }) {
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: ''
    });

    // Fetch player data when userId changes
    useEffect(() => {
        if (!userId) return;

        // Fetch player data from the backend
        const fetchPlayer = async () => {
            try {
                const res = await fetch(`https://as-backend.duckdns.org/api/Player/${userId}`);
                if (res.ok) {
                    const data = await res.json();
                    setPlayer(data);
                } else if (res.status === 404) {
                    setPlayer(null);
                } else {
                    console.error('Erreur fetch player', res.status);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlayer();
    }, [userId]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle player creation form submission
    const handleCreate = async (e) => {
        if (e) e.preventDefault();

        try {
            const bodyData = {
                firstName: formData.firstName || null,
                lastName: formData.lastName || null,
                age: formData.age ? parseInt(formData.age) : null
            };

            const res = await fetch(`https://as-backend.duckdns.org/api/Player/create/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
            });

            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`Erreur création: ${res.status} ${errText}`);
            }

            const newPlayer = await res.json();
            setPlayer(newPlayer);
            setCreating(false);

        } catch (err) {
            console.error(err);
            alert('Erreur lors de la création du joueur');
        }
    };

    // Display loading message while fetching data
    if (loading) return <p>Chargement...</p>;

    // If no player data, show creation form or prompt
    if (!player) {
        if (!creating) {
            return (
                <div className='no-mail'>
                    <h3 className='title-letter-1'>COMPUTER: Vous n'avez pas de session veuillez vous identifier...</h3>
                    <button onClick={() => setCreating(true)}>Créer une session</button>
                </div>
            );
        } else {
            return (
                <form className='form' onSubmit={handleCreate} ref={formRef}>
                    <label>
                        Prénom:
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </label>
                    <label>
                        Nom:
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </label>
                    <label>
                        Age:
                        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                    </label>

                    {/* Bouton invisible, submit uniquement via MainPage */}
                    <button type="submit" style={{ display: 'none' }}></button>
                </form>
            );
        }
    }

    // Render the PC desktop interface with player data
    return (
        <div className='game-mail-1'>
            <div className='screen-mail-1'>
                {showSuccess && (
                    <ConnectionSuccess 
                        message="Connexion réussie ..." 
                        onFinish={() => setShowSuccess(false)} 
                    />
                )}

                {!showSuccess && (
                    <>
                        <PcDesktop player={player} />
                    </>
                )}
            </div>
        </div>
    );
}

export default Player;
