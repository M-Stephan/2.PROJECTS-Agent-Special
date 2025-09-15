function Mail1({ player, onBack }) {
    // Composant to display the first email content
    return(
            <>
                <h3 className='title-letter-1'>📧 Vous avez reçu un mail ! 📧</h3>
                <h4 className='game-letter-1'>Objet: ouverture d'une enquête d'importance gouvernementale</h4>
                <h4 className='game-letter-2'>Destinataire: {player.lastName}.{player.firstName[0]}@cia.gvn</h4>
                <p className='parag-letter-1'>
                    Bonjour, Agent {player.firstName} {player.lastName}.<br /><br />
                    Nous vous contactons pour une affaire des plus importantes au sein de la C.I.A, `directement commandé par le gouvernement.<br /><br />
                    Un hacker s'est infiltré dans un programme classé secret défense. Ce programme arrivait sur la fin de son développement, malheurement
                    le hacker a réussi à intercepter et voler une grande partie des données et du code source du programme..<br /><br />
                    Il est impératif de retrouver l'auteur de ces faits! Nous comptons sur vous pour nous aider à découvrir l'identité du coupable!
                    Si ce code se retrouve dans de mauvaises mains, l'avenir d'une bonne partie de la planète pourraît être en grand danger.<br /><br />
                    Nous avons tenté de retracer la piste grâce au réseau et le localisateur indique La ville de Jumet en Belgique C.P: 6040 -- Province: Hainaut. -- 
                    Latitude : 50.4412° N - Longitude : 4.4398° E<br /><br />
                    Vous trouverez, en pièce-jointe, les indices que nous avons pu récolter dans le cadre de cette enquête.<br /><br />
                    Les informations découvertes pourront être retrouvées dans la section "Information d'enquête" de votre ordinateur.<br /><br />
                    Cordialement, Commandant Jones.
                </p>
                <button type='button' className='letter-button-2' onClick={onBack}>⬅️ Retour</button>
            </>
    );
};

export default Mail1;