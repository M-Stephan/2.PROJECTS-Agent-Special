import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import Screen from "./Screen";
import Register from "./Register";
import Login from "./Login";
import Player from "./Player";
import "../styles/MainPage.css";
import "../styles/Mouse.css";
import "../styles/Form.css";
import mouse from "../assets/mouse1.png";

// size of the mouse image
const mouseSize = 200;

// MainPage component manages user authentication and displays appropriate forms or player info
const MainPage = forwardRef(({ userId: propUserId, setUserId }, ref) => {
    const userId = propUserId;
    const [statusAccount, setStatusAccount] = useState(null);
    const [fade, setFade] = useState(true);
    const [nextStatus, setNextStatus] = useState(null);
    const activeFormRef = useRef(null);

    // Handle click on "Register" button
    const handleClickRegister = () => {
        setFade(false);
        setNextStatus("Register");
    };

    // Effect to manage fade-in and fade-out transitions
    useEffect(() => {
        if (!fade && nextStatus) {
            const timeout = setTimeout(() => {
                setStatusAccount(nextStatus);
                setFade(true);
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [fade, nextStatus]);

    // Handle click on the mouse image
    const handleMouseClick = () => {
        if (activeFormRef.current) activeFormRef.current.requestSubmit();
        else alert("Bienvenue Agent Special! Connectez ou enregistrez votre profil");
    };

    // Handle return to main page from forms
    const handleReturn = () => setStatusAccount(null);

    // Expose handleLogoutReset method to parent components
    useImperativeHandle(ref, () => ({
        handleLogoutReset: () => setStatusAccount(null)
    }));

    // Render the main page with conditional forms and player info
    return (
        <Screen>
            <div className={`content-wrapper ${fade ? "fade-in" : "fade-out"}`}>
                {!userId && !statusAccount && (
                    <div className="main-page">
                        <h1>C.I.A</h1>
                        <p><i>Vous avez déjà un compte ?</i></p>
                        <button onClick={() => setStatusAccount("Login")}>Se connecter</button>
                        <p><i>Vous n'avez pas encore de compte ?</i></p>
                        <button onClick={handleClickRegister}>S'enregistrer</button>
                    </div>
                )}

                {!userId && statusAccount === "Login" && (
                    <div className="form">
                        <Login formRef={activeFormRef} onLogin={setUserId} />
                        <button className="button-return" onClick={handleReturn}>Retour</button>
                    </div>
                )}

                {!userId && statusAccount === "Register" && (
                    <div className="form">
                        <Register formRef={activeFormRef} onRegister={setUserId} />
                        <button className="button-return" onClick={handleReturn}>Retour</button>
                    </div>
                )}

                {userId && <Player userId={userId} formRef={activeFormRef} />}
            </div>

          <button className="mouse_wrap" onClick={handleMouseClick}>
            <img className="mouse" src={mouse} width={mouseSize} height={mouseSize} alt="mouse" />
          </button>
        </Screen>
    );
});

export default MainPage;
