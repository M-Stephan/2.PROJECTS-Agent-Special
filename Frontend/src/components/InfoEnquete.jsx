import '../styles/Enquete.css';

function InfoEnquete({ onBack }) {

    return (
        <div className="enquetebox">
            <div className="enquete-list">
                <h2>Informations de l'enquête:</h2>
                <button className={`enquete`}>Infos suspect</button>
                <button className={`enquete`}>Indices</button>
                <button className={`enquete`}>Découvertes</button>
                <br/>
                <br/>
            </div>
            <button type='button' className='letter-button-2' onClick={onBack}>⬅️ Retour</button>
        </div>
    );
    
                
};

export default InfoEnquete;