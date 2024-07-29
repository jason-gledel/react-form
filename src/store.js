import { configureStore, createSlice } from '@reduxjs/toolkit';

// Configuration initiale de l'état avec un tableau d'utilisateurs vide
const initialState = {
  users: [],
};

// Création d'une slice pour les utilisateurs
const usersSlice = createSlice({
  name: 'users', // Nom de la slice
  initialState, // État initial
  reducers: {
    // Définit un reducer pour ajouter un utilisateur
    addUser: (state, action) => {
      state.users.push(action.payload); // Ajoute un nouvel utilisateur au tableau des utilisateurs
    },
  },
});

// Export des actions générées par createSlice
export const { addUser } = usersSlice.actions;

// Configuration du store avec le reducer des utilisateurs
const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});

export default store; // Export du store pour utilisation dans l'application
