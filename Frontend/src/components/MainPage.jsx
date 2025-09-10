import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import Screen from "./Screen";
import Register from "./Register";
import Login from "./Login";
import Player from "./Player";
import "../styles/MainPage.css";
import "../styles/Mouse.css";
import "../styles/Form.css";
import mouse from "../assets/mouse1.png";

const mouseSize = 200;

const MainPage = forwardRef(({ userId: propUserId, setUserId }, ref) => {
  const userId = propUserId;
  const [statusAccount, setStatusAccount] = useState(null);
  const [fade, setFade] = useState(true);
  const [nextStatus, setNextStatus] = useState(null);
  const activeFormRef = useRef(null);

  const handleClickRegister = () => {
    setFade(false);
    setNextStatus("Register");
  };

  useEffect(() => {
    if (!fade && nextStatus) {
      const timeout = setTimeout(() => {
        setStatusAccount(nextStatus);
        setFade(true);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [fade, nextStatus]);

  const handleMouseClick = () => {
    if (activeFormRef.current) activeFormRef.current.requestSubmit();
    else alert("Bienvenue Agent Special! Connectez ou enregistrez votre profil");
  };

  const handleReturn = () => setStatusAccount(null);

  // Expose une fonction pour App afin de reset le statut (après logout)
  useImperativeHandle(ref, () => ({
    handleLogoutReset: () => setStatusAccount(null)
  }));
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
