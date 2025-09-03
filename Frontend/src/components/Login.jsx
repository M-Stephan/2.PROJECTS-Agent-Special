import React from 'react';
import '../styles/Form.css';

function Login({ formRef, onLogin }) {

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email: e.target.mail.value,
            password: e.target.password.value,
        };

        try {
            const response = await fetch("https://as-backend.duckdns.org/api/User/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("Échec de la connexion");

            const userId = await response.text();
            localStorage.setItem("userId", userId);
            onLogin(userId);

        } catch (error) {
            alert("Échec de la connexion");
        }
    };

    return (
        <form className='form' onSubmit={handleLoginSubmit} ref={formRef}>
            <label htmlFor="mail">Adresse mail 
                <input type="text" placeholder="Requis*" id='mail' name="mail"/>
            </label> 
            <label htmlFor="password">Mot de passe 
                <input type="password" placeholder="Requis*" id='password' name="password"/>
            </label>
            <button type="submit">Se connecter</button>
        </form>
    );
}

export default Login;
