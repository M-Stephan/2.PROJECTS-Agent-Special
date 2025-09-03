import React, { useState } from 'react';
import '../styles/Form.css';
import '../styles/Mouse.css';

function Register({ formRef }) {
  const [formValues, setFormValues] = useState({
    mail: '',
    password: '',
    passwordConfirm: '',
    lastname: '',
    firstname: '',
    postal: '',
    phone: '',
    dob: ''
  });

  const [errors, setErrors] = useState({
    password: '',
    passwordConfirm: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));

    // Validation mot de passe
    if (name === 'password') {
      if (value.length < 6) {
        setErrors((prev) => ({ ...prev, password: 'Le mot de passe doit faire au moins 6 caractères' }));
      } else if (formValues.passwordConfirm && value !== formValues.passwordConfirm) {
        setErrors((prev) => ({ ...prev, passwordConfirm: 'Les mots de passe ne correspondent pas' }));
      } else {
        setErrors((prev) => ({ ...prev, password: '', passwordConfirm: '' }));
      }
    }

    // Validation confirmation mot de passe
    if (name === 'passwordConfirm') {
      if (value !== formValues.password) {
        setErrors((prev) => ({ ...prev, passwordConfirm: 'Les mots de passe ne correspondent pas' }));
      } else {
        setErrors((prev) => ({ ...prev, passwordConfirm: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    if (errors.password || errors.passwordConfirm) {
      alert('Veuillez corriger les erreurs avant de soumettre le formulaire');
      return;
    }

    const dobRaw = formValues.dob;
    const [year, month, day] = dobRaw.split("-");
    const dobWithTZ = new Date(Date.UTC(year, month - 1, day)).toISOString();

    const formData = {
      email: formValues.mail,
      password: formValues.password,
      firstName: formValues.firstname,
      lastName: formValues.lastname,
      address: formValues.postal || null,
      phone: formValues.phone || null,
      dateOfBirth: dobWithTZ
    };

    try {
      const response = await fetch("https://as-backend.duckdns.org/api/User/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur API ${response.status} : ${errorText}`);
      }

      alert("Inscription réussie");
    } catch (error) {
      alert("Échec de l’inscription");
    }
  };

  const getBorderColor = (field) => {
    if (field === 'password' && errors.password) return 'red';
    if (field === 'passwordConfirm' && errors.passwordConfirm) return 'red';
    if ((field === 'password' || field === 'passwordConfirm') && !errors[field]) return 'green';
    return '';
  };

  return (
    <form className='form' onSubmit={handleSubmit} ref={formRef}>
      <label>
        Adresse mail
        <input type="text" name="mail" value={formValues.mail} onChange={handleChange} placeholder="Requis*" />
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

      <label>
        Confirmer mot de passe
        <input
          type="password"
          name="passwordConfirm"
          value={formValues.passwordConfirm}
          onChange={handleChange}
          placeholder="Requis*"
          style={{ borderColor: getBorderColor('passwordConfirm') }}
        />
      </label>
      {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      {errors.passwordConfirm && <span style={{ color: 'red' }}>{errors.passwordConfirm}</span>}

      <label>
        Nom
        <input type="text" name="lastname" value={formValues.lastname} onChange={handleChange} placeholder="Requis*" />
      </label>

      <label>
        Prénom
        <input type="text" name="firstname" value={formValues.firstname} onChange={handleChange} placeholder="Requis*" />
      </label>

      <label>
        Adresse postale
        <input type="text" name="postal" value={formValues.postal} onChange={handleChange} placeholder="Optionnel*" />
      </label>

      <label>
        Numéro de téléphone
        <input type="text" name="phone" value={formValues.phone} onChange={handleChange} placeholder="Optionnel*" />
      </label>

      <label>
        Date de naissance
        <input type="date" name="dob" value={formValues.dob} onChange={handleChange} placeholder="Requis*" />
      </label>

      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default Register;
