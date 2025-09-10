import { useState } from 'react';
import '../styles/PcDesktop.css'
import Mails from './Mails';



function PcDesktop({ player }) {
    const [showMails, setShowMails] = useState(false)

    if (showMails) {
        return <Mails player={player} onBack={() => setShowMails(false)} />;
    }

    return (
        <>
            <div className='desktop-div'>
                <button className="desktop-folders">
                    <h3>📁</h3>
                    <p>Informations d'enquête</p>
                </button>

                <button className="desktop-folders1">
                    <h3>🙍</h3>
                    <p>Espace Personnel</p>
                </button>

                <button onClick={() => setShowMails(true)} className="desktop-folders2">
                    <h3>📧</h3>
                    <p>Mails</p>
                </button>

                <button className="desktop-folders3">
                    <h3>📁</h3>
                    <p>Fiche Suspect</p>
                </button>

                <button className="desktop-folders4">
                    <h3>🗑️</h3>
                    <p>Corbeille</p>
                </button>
            </div>

            <div className="desktop-div1">
                <h2>🪟<input disabled placeholder="🔍Rechercher"/>📅⚙️🗂️</h2>
            </div>
            
            <div className="desktop-div2">
                <h2>🛡️🖥️🔊</h2>
            </div>

        </>
    );
};

export default PcDesktop;