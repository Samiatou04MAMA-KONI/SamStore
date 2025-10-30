import React, { createContext, useContext, useState } from 'react';
import { allProducts } from '../data/allproduits';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fonction pour déterminer la catégorie d'un produit
  const getProductCategory = (product) => {
    // Si le produit a déjà une catégorie définie
    if (product.category) {
      return product.category;
    }
    
    // Déterminer la catégorie basée sur le nom ou d'autres critères
    const name = product.name.toLowerCase();
    
    if (name.includes('iphone') || name.includes('samsung') || name.includes('smartphone') || 
        name.includes('tablet') || name.includes('macbook') || name.includes('airpods') ||
        name.includes('tv') || name.includes('camera') || name.includes('playstation')) {
      return 'electronics';
    }
    else if (name.includes('robe') || name.includes('jeans') || name.includes('chaussure') || 
             name.includes('sac') || name.includes('veste') || name.includes('montre') ||
             name.includes('bijou') || name.includes('mode') || name.includes('fashion')) {
      return 'fashion';
    }
    else if (name.includes('parfum') || name.includes('maquillage') || name.includes('shampoing') || 
             name.includes('soin') || name.includes('beauté') || name.includes('sérum') ||
             name.includes('huile') || name.includes('tensiomètre')) {
      return 'beauty';
    }
    else if (name.includes('casserole') || name.includes('oreiller') || name.includes('machine à café') || 
             name.includes('aspirateur') || name.includes('literie') || name.includes('barbecue') ||
             name.includes('meuble') || name.includes('jardinage') || name.includes('décoration') ||
             name.includes('jardin')) {
      return 'jardin';
    }
    else if (name.includes('ballon') || name.includes('fitness') || name.includes('sport') || 
             name.includes('yoga') || name.includes('natation')) {
      return 'sport';
    }
    else if (name.includes('jeu') || name.includes('jouet') || name.includes('console')) {
      return 'jeux';
    }
    
    return 'general'; // Catégorie par défaut
  };

  // Fonction pour obtenir la route de la catégorie
  const getCategoryRoute = (category) => {
    const routes = {
      'electronics': '/electronic',
      'fashion': '/fashion',
      'beauty': '/beauty',
      'jardin': '/jardin',
      'sport': '/sport',
      'jeux': '/jeux',
      'general': '/'
    };
    return routes[category] || '/';
  };

  const searchProducts = (term) => {
    if (term.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    const lowerTerm = term.toLowerCase();
    
    const results = allProducts.map(product => ({
      ...product,
      // Ajouter la catégorie et la route manquantes
      category: product.category || getProductCategory(product),
      categoryRoute: getCategoryRoute(product.category || getProductCategory(product))
    })).filter(product => {
      return (
        product.name.toLowerCase().includes(lowerTerm) ||
        (product.description && product.description.toLowerCase().includes(lowerTerm)) ||
        (product.category && product.category.toLowerCase().includes(lowerTerm)) ||
        (product.badge && product.badge.toLowerCase().includes(lowerTerm)) ||
        product.currentPrice.toString().includes(term) ||
        product.rating.toString().includes(term)
      );
    });

    setSearchResults(results);
    setIsSearching(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <SearchContext.Provider value={{
      searchTerm,
      setSearchTerm,
      searchResults,
      isSearching,
      searchProducts,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};