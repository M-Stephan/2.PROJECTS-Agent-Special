import Mail1 from "./Mail1"; 
import { usePlayerProgress } from "./playerApi";
import React, { useState } from "react";
import '../styles/MailBox.css'


function MailBox({ player, onBack }) {
    const { progress, loading } = usePlayerProgress(player.id);
    const [showMail1, setShowMail1] = useState(false);

    if (showMail1) {
        return <Mail1 player={player} onBack={() => setShowMail1(false)} />;
    }
    const mailList = [
        <li className={`mail`}><button onClick={() => setShowMail1(true)}>"Objet: Ouverture d'une enquête d'importance gouvernementale"</button></li>,
        <li className={`mail`}><button>"Objet: Billet d'avion!"</button></li>,
        <li className={`mail`}><button>"Objet: De nouvelles sources"</button></li>,
        <li className={`mail`}><button>"Objet: Logiciel suspect"</button></li>
    ];

    return (
        <div className="mailbox">
            <h4 className="title-mailbox">Boîte Mail - {player.lastName}.{player.firstName[0]}@cia.gvn</h4>
            <ul className="mail-list">
                {mailList.slice(0, progress + 1)}
            </ul>
            <button type='button' className='letter-button-2' onClick={onBack}>
                ⬅️ Retour au bureau
            </button>
        </div>
    );
}

export default MailBox;
