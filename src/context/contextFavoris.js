import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './contextAuth';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { isAuthenticated, user } = useAuth();

  // Charger les favoris depuis localStorage
  useEffect(() => {
    if (isAuthenticated && user) {
      const userFavorites = JSON.parse(localStorage.getItem(`samstore_favorites_${user.id}`) || '[]');
      setFavorites(userFavorites);
    } else {
      const guestFavorites = JSON.parse(localStorage.getItem('samstore_favorites') || '[]');
      setFavorites(guestFavorites);
    }
  }, [isAuthenticated, user]);

  // Ajouter aux favoris
  const addToFavorites = (product) => {
    const favoriteProduct = {
      ...product,
      addedAt: new Date().toISOString()
    };

    const updatedFavorites = [...favorites, favoriteProduct];
    setFavorites(updatedFavorites);

    if (isAuthenticated && user) {
      localStorage.setItem(`samstore_favorites_${user.id}`, JSON.stringify(updatedFavorites));
    } else {
      localStorage.setItem('samstore_favorites', JSON.stringify(updatedFavorites));
    }
  };

  // Supprimer des favoris
  const removeFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter(item => item.id !== productId);
    setFavorites(updatedFavorites);

    if (isAuthenticated && user) {
      localStorage.setItem(`samstore_favorites_${user.id}`, JSON.stringify(updatedFavorites));
    } else {
      localStorage.setItem('samstore_favorites', JSON.stringify(updatedFavorites));
    }
  };

  // Vérifier si un produit est dans les favoris
  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};