import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Fonction d'inscription
  const register = async (userData) => {
    try {
      // Sauvegarder dans la liste des utilisateurs
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      savedUsers.push(userData);
      localStorage.setItem('users', JSON.stringify(savedUsers));

      // Créer la session
      const newUser = {
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', 'fake-jwt-token-' + Date.now());
      
      setUser(newUser);
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      // Récupérer tous les utilisateurs enregistrés
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Trouver l'utilisateur
      const user = savedUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return { success: false, error: 'Email ou mot de passe incorrect' };
      }

      // Sauvegarder la session
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'fake-jwt-token-' + Date.now());
      
      setUser(user);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    register,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};