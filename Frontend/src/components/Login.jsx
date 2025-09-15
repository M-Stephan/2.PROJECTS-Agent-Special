import React, { useState } from 'react';
import '../styles/Form.css';
import '../styles/Mouse.css';

// Login component with form validation and API interaction
function Login({ formRef, onLogin }) {
    const [formValues, setFormValues] = useState({
        mail: '',
        password: ''
    });

    // State to track validation errors
    const [errors, setErrors] = useState({
        password: ''
    });

    // Handle input changes and validate password length
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));

        if (name === 'password') {
            setErrors(prev => ({
                ...prev,
                password: value.length < 6 ? 'Le mot de passe doit faire au moins 6 caractères' : ''
            }));
        }
    };

    // Handle form submission and interact with the login API
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        // Prevent submission if there are validation errors
        if (errors.password) {
            alert('Veuillez corriger les erreurs avant de soumettre le formulaire');
            return;
        }

        // Prepare payload for API request
        const payload = {
            email: formValues.mail,
            password: formValues.password
        };

        // Call the login API
        try {
            const response = await fetch("https://as-backend.duckdns.org/api/User/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            // Handle non-200 responses
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Erreur API:", response.status, errorText);
                alert(`Échec de la connexion : ${response.status} ${errorText}`);
                return;
            }

            // On success, store userId and notify parent component
            const userId = await response.text();
            localStorage.setItem("userId", userId);
            if (typeof onLogin === 'function') onLogin(userId);
        } catch (err) {
          console.error("Erreur réseau/fetch:", err);
          alert("Échec de la connexion (erreur réseau)");
        }
    };

    // Determine border color based on validation state
    const getBorderColor = (field) => {
        if (field === 'password' && errors.password) return 'red';
        if (field === 'password' && !errors.password) return 'green';
        return '';
    };

    // Render the login form
    return (
        <form className='form' onSubmit={handleSubmit} ref={formRef}>
            <label>
              Adresse mail
              <input
                type="text"
                name="mail"
                value={formValues.mail}
                onChange={handleChange}
                placeholder="Requis*"
              />
            </label>

            <label>
              Mot de passe
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Requis*"
                style={{ borderColor: getBorderColor('password') }}
              />
            </label>
            {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}

            <button type="submit" style={{ display: 'none' }}></button>
        </form>
    );
}

export default Login;
