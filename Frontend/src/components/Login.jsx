import React, { useState } from 'react';
import '../styles/Form.css';
import '../styles/Mouse.css';

function Login({ formRef, onLogin }) {
  const [formValues, setFormValues] = useState({
    mail: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    password: ''
  });

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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (errors.password) {
      alert('Veuillez corriger les erreurs avant de soumettre le formulaire');
      return;
    }

    const payload = {
      email: formValues.mail,
      password: formValues.password
    };

    try {
      const response = await fetch("https://as-backend.duckdns.org/api/User/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erreur API:", response.status, errorText);
        alert(`Échec de la connexion : ${response.status} ${errorText}`);
        return;
      }

      const userId = await response.text();
      localStorage.setItem("userId", userId);
      if (typeof onLogin === 'function') onLogin(userId);

      
    } catch (err) {
      console.error("Erreur réseau/fetch:", err);
      alert("Échec de la connexion (erreur réseau)");
    }
  };

  const getBorderColor = (field) => {
    if (field === 'password' && errors.password) return 'red';
    if (field === 'password' && !errors.password) return 'green';
    return '';
  };

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
