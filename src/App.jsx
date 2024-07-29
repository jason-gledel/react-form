import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from './store';

function App() {
  // État local pour le message d'erreur et les placeholders des champs de saisie
  const [errorMessage, setErrorMessage] = useState('');
  const [placeholders, setPlaceholders] = useState({
    name: 'Antoine',
    surname: 'Dupont',
    age: 'Entrez votre âge',
    email: 'antoine.dupont@gmail.com',
    password: 'Entrez votre mot de passe'
  });

  // Références pour les champs de formulaire
  const nameRef = useRef();
  const surnameRef = useRef();
  const ageRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  // Gestion de l'événement onFocus pour les champs de formulaire
  const handleFocus = (field) => {
    setPlaceholders((prev) => ({ ...prev, [field]: '' }));
  };

  // Gestion de l'événement onBlur pour les champs de formulaire
  const handleBlur = (field, placeholderText) => {
    if (!nameRef.current.value && field === 'name') setPlaceholders((prev) => ({ ...prev, name: placeholderText }));
    if (!surnameRef.current.value && field === 'surname') setPlaceholders((prev) => ({ ...prev, surname: placeholderText }));
    if (!ageRef.current.value && field === 'age') setPlaceholders((prev) => ({ ...prev, age: placeholderText }));
    if (!emailRef.current.value && field === 'email') setPlaceholders((prev) => ({ ...prev, email: placeholderText }));
    if (!passwordRef.current.value && field === 'password') setPlaceholders((prev) => ({ ...prev, password: placeholderText }));
  };

  // Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    const name = nameRef.current.value;
    const surname = surnameRef.current.value;
    const age = ageRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Validation de l'âge
    if (age < 18) {
      setErrorMessage('L\'âge doit être supérieur à 18 ans');
    } else {
      setErrorMessage('');
      const formData = {
        name,
        surname,
        age,
        email,
        password,
      };
      console.log(formData); // Affichage des données du formulaire dans la console
      dispatch(addUser(formData)); // Dispatch de l'action pour ajouter un utilisateur au store Redux
    }
  };

  return (
    <div className="container">
      <div className='formJason'>
        <h1>Formulaire d'inscription</h1>
        <form onSubmit={handleSubmit}>
        <div className='inputBloc'>
            <label>Nom</label>
            <input
              type="text"
              ref={surnameRef}
              placeholder={placeholders.surname}
              onFocus={() => handleFocus('surname')}
              onBlur={() => handleBlur('surname', 'Dupont')}
            />
          </div>
          <div className='inputBloc'>
            <label>Prénom</label>
            <input
              type="text"
              ref={nameRef}
              placeholder={placeholders.name}
              onFocus={() => handleFocus('name')}
              onBlur={() => handleBlur('name', 'Antoine')}
            />
          </div>
          <div className='inputBloc'>
            <label>Âge</label>
            <input
              type="number"
              ref={ageRef}
              placeholder={placeholders.age}
              onFocus={() => handleFocus('age')}
              onBlur={() => handleBlur('age', 'Entrez votre âge')}
            />
          </div>
          <div className='inputBloc'>
            <label>Email</label>
            <input
              type="email"
              ref={emailRef}
              placeholder={placeholders.email}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email', 'antoine.dupont@gmail.com')}
            />
          </div>
          <div className='inputBloc'>
            <label>Mot de passe</label>
            <input
              type="password"
              ref={passwordRef}
              placeholder={placeholders.password}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password', 'Entrez votre mot de passe')}
            />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default App;
