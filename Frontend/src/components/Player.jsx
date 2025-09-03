import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import '../styles/Player.css';


function Player({ userId }) {
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: ''
    });

    useEffect(() => {
        if (!userId) return;

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
        const res = await fetch(`https://as-backend.duckdns.org/api/Player/create/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            firstName: formData.firstName || null,
            lastName: formData.lastName || null,
            age: formData.age ? parseInt(formData.age) : null
            })
        });
        if (!res.ok) throw new Error(`Erreur création: ${res.status}`);
        const newPlayer = await res.json();
        setPlayer(newPlayer);
        setCreating(false);
            } catch (err) {
                console.error(err);
                alert('Erreur lors de la création du joueur');
            }
        };

    if (loading) return <p>Chargement...</p>;

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
                <form onSubmit={handleCreate} className='form'>
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
                <button type="submit">Créer</button>
                </form>
            );
        }
    }

    return (
        <div className='game-mail-1'>
            <div className='screen-mail-1'>
                <h3 className='title-letter-1'>📧 Vous avez reçu un mail ! 📧</h3>
                <h4 className='game-letter-1'>Objet: ouverture d'une enquête d'importance gouvernementale</h4>
                <h4 className='game-letter-1'>Destinataire: {player.lastName}.{player.firstName[0]}@cia.gvn</h4>
                <p className='parag-letter-1'>
                    Bonjour, Agent {player.firstName} {player.lastName}.<br /><br />
                    
                    nous vous contactons pour une affaire des plus importantes au sein de la C.I.A, `directement commandé par le gouvernement.
                    Un hacker s'est infiltré dans un programme classé secret défense. Ce programme arrivait sur la fin de son développement, malheurement
                    le hacker a réussi à intercepter et voler une grande partie des données et du code source du programme..<br /><br />

                    Il est impératif de retrouver l'auteur de ces faits! Nous comptons sur vous pour nous aider à faire ce que nous faisont de mieux, arrêter les criminels!
                    Si ce code se retrouve dans de mauvaises mains, l'avenir d'une bonne partie de la planête pourraît être en grave danger.<br /><br />
                    
                    Nous avons tenté de retracer la piste grâce au réseau le localisateur indique La ville de Jumet en Belgique C.P: 6040 -- Province: Hainaut. -- 
                    Latitude : 50.4412° N - Longitude : 4.4398° E<br /><br />

                    Vous pourrez retrouver, en pièce-jointe les seuls indices que nous avons pu récolter.

                    Les informations découvertes pourront être retrouvées dans la section Information de votre ordinateur.

                    Cordialement, Commandant Jones.


                </p>
                <button type='button' className='letter-button-1'>Pièces-Jointes - ✉️</button>
            </div>
        </div>
    );
}

export default Player;
