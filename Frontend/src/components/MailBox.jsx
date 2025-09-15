import Mail1 from "./Mail1"; 
import { usePlayerProgress } from "./playerApi";
import React, { useState } from "react";
import '../styles/MailBox.css'

// Composant to display the mailbox and list of emails
function MailBox({ player, onBack }) {
    // Function to fetch player progress saved into the variable 'progress'
    const { progress, loading } = usePlayerProgress(player.id);
    // State to manage the display of the first email
    const [showMail1, setShowMail1] = useState(false);

    // If the data is still loading, display a loading message
    if (showMail1) {
        return <Mail1 player={player} onBack={() => setShowMail1(false)} />;
    }
    // If the data is still loading, display a loading message
    const mailList = [
        <li className={`mail`}><button onClick={() => setShowMail1(true)}>"Objet: Ouverture d'une enquête d'importance gouvernementale"</button></li>,
        <li className={`mail`}><button>"Objet: Billet d'avion!"</button></li>,
        <li className={`mail`}><button>"Objet: De nouvelles sources"</button></li>,
        <li className={`mail`}><button>"Objet: Logiciel suspect"</button></li>
    ];

    // Render the mailbox with the list of emails based on player progress
    return (
        <div className="mailbox">
            <h4 className="title-mailbox">Boîte Mail - {player.lastName}.{player.firstName[0]}@cia.gvn</h4>
            <ul className="mail-list">
                {mailList.slice(0, progress + 4)}
            </ul>
            <button type='button' className='letter-button-2' onClick={onBack}>⬅️ Retour</button>
        </div>
    );
}

export default MailBox;
