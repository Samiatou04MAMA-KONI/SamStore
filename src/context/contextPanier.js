import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';

const CartContext = createContext();

const initialState = {
  articles: [],
  total: 0,
  nombreArticles: 0
};

function cartReducer(state, action) {
  console.log('🔄 Action:', action.type, action.payload);
  
  switch (action.type) {
    case 'CHARGER_PANIER':
      console.log('📦 Chargement articles:', action.payload);
      return {
        articles: action.payload,
        total: calculerTotal(action.payload),
        nombreArticles: calculerNombreArticles(action.payload)
      };

    case 'AJOUTER_ARTICLE':
      const { produit, quantite = 1 } = action.payload;
      const articleExistant = state.articles.find(article => article.id === produit.id);

      let nouveauxArticles;
      
      if (articleExistant) {
        nouveauxArticles = state.articles.map(article =>
          article.id === produit.id
            ? { ...article, quantite: article.quantite + quantite }
            : article
        );
      } else {
        nouveauxArticles = [...state.articles, { 
          id: produit.id,
          name: produit.name,
          price: produit.price,
          image: produit.image,
          quantite: quantite
        }];
      }

      return {
        articles: nouveauxArticles,
        total: calculerTotal(nouveauxArticles),
        nombreArticles: calculerNombreArticles(nouveauxArticles)
      };

    case 'SUPPRIMER_ARTICLE':
      const articlesFiltres = state.articles.filter(article => article.id !== action.payload);
      return {
        articles: articlesFiltres,
        total: calculerTotal(articlesFiltres),
        nombreArticles: calculerNombreArticles(articlesFiltres)
      };

    case 'MODIFIER_QUANTITE':
      const articlesModifies = state.articles.map(article =>
        article.id === action.payload.id
          ? { ...article, quantite: action.payload.quantite }
          : article
      ).filter(article => article.quantite > 0);

      return {
        articles: articlesModifies,
        total: calculerTotal(articlesModifies),
        nombreArticles: calculerNombreArticles(articlesModifies)
      };

    case 'VIDER_PANIER':
      return {
        articles: [],
        total: 0,
        nombreArticles: 0
      };

    default:
      return state;
  }
}

function calculerTotal(articles) {
  const total = articles.reduce((total, article) => total + (article.price * article.quantite), 0);
  console.log('💰 Calcul total:', total, 'pour', articles.length, 'articles');
  return total;
}

function calculerNombreArticles(articles) {
  const nombre = articles.reduce((total, article) => total + article.quantite, 0);
  console.log('🔢 Calcul nombre articles:', nombre);
  return nombre;
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const isInitialLoad = useRef(true);

  // CHARGEMENT au démarrage - UNIQUEMENT au premier rendu
  useEffect(() => {
    console.log('🔍 Début chargement localStorage...');
    const panierStorage = localStorage.getItem('panier');
    console.log('📦 Données brutes localStorage:', panierStorage);
    
    if (panierStorage && panierStorage !== 'undefined' && panierStorage !== '[]') {
      try {
        const articles = JSON.parse(panierStorage);
        console.log('✅ Articles chargés:', articles);
        if (Array.isArray(articles) && articles.length > 0) {
          dispatch({ type: 'CHARGER_PANIER', payload: articles });
        }
      } catch (error) {
        console.error('❌ Erreur parsing JSON:', error);
        localStorage.removeItem('panier');
      }
    } else {
      console.log('ℹ️ Aucun panier dans localStorage ou panier vide');
    }
    
    isInitialLoad.current = false;
  }, []); // Vide = seulement au montage

  // SAUVEGARDE à chaque changement - SAUF pendant le chargement initial
  useEffect(() => {
    if (!isInitialLoad.current && state.articles.length > 0) {
      console.log('💾 Sauvegarde dans localStorage:', state.articles);
      localStorage.setItem('panier', JSON.stringify(state.articles));
    }
  }, [state.articles]);

  const addToCart = (produit, quantite = 1) => {
    console.log('➕ AJOUT PANIER - Produit:', produit);
    dispatch({ type: 'AJOUTER_ARTICLE', payload: { produit, quantite } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'SUPPRIMER_ARTICLE', payload: id });
  };

  const updateQuantity = (id, quantite) => {
    dispatch({ type: 'MODIFIER_QUANTITE', payload: { id, quantite } } );
  };

  const clearCart = () => {
    dispatch({ type: 'VIDER_PANIER' });
  };

  const value = {
    articles: state.articles,
    total: state.total,
    nombreArticles: state.nombreArticles,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé dans un CartProvider');
  }
  return context;
}