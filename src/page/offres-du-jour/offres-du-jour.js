import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/contextPanier';
import { useFavorites } from '../../context/contextFavoris';
import { useNavigate } from 'react-router-dom';
import './offres-du-jour.css';

const OffresDuJour = () => {
  const [dailyOffers, setDailyOffers] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 10
  });
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const navigate = useNavigate();

  // Compte à rebours global
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds < 0) {
          const newMinutes = prev.minutes - 1;
          if (newMinutes < 0) {
            const newHours = prev.hours - 1;
            if (newHours < 0) {
              return { hours: 23, minutes: 59, seconds: 59 };
            }
            return { hours: newHours, minutes: 59, seconds: 59 };
          }
          return { ...prev, minutes: newMinutes, seconds: 59 };
        }
        return { ...prev, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fonction pour gérer l'ajout au panier
  const handleAddToCart = (product, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price || product.currentPrice,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1,
      category: product.category || 'offres',
      discount: product.discount || 0,
    };
    
    addToCart(cartProduct);
    
    // Feedback visuel
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = '✓ Ajouté !';
    button.style.background = '#10b981';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
    }, 2000);
  };

  // Fonction pour gérer l'ajout aux favoris
  const handleAddToFavorites = (product, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (isFavorite(product.id)) {
      // Si déjà en favoris, le supprimer
      removeFromFavorites(product.id);
      
      // Feedback visuel
      const button = event.target.closest('button') || event.target;
      button.textContent = '💔 Retiré';
      button.style.background = '#ef4444';
      
      setTimeout(() => {
        button.textContent = '🤍 Favoris';
        button.style.background = '';
      }, 2000);
    } else {
      // Ajouter aux favoris avec toutes les données nécessaires
      const favoriteProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: 'offres',
        discount: product.discount,
        rating: product.rating,
        reviews: product.reviews,
        inStock: product.inStock,
      };
      
      addToFavorites(favoriteProduct);
      
      // Feedback visuel
      const button = event.target.closest('button') || event.target;
      button.textContent = '❤️ Ajouté !';
      button.style.background = '#ec4899';
      
      setTimeout(() => {
        button.textContent = '🤍 Favoris';
        button.style.background = '';
      }, 2000);
    }
  };

  // Fonction pour "Acheter maintenant" - redirection vers paiement
  const handleQuickBuy = (productId, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const product = dailyOffers.find(offer => offer.id === productId);
    
    if (product) {
      // Ajouter au panier
      const cartProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        quantity: 1,
        category: 'offres',
        discount: product.discount,
      };
      
      addToCart(cartProduct);
      
      // Feedback visuel avant redirection
      const button = event.target;
      button.textContent = '✓ Redirection...';
      button.style.background = '#10b981';
      
      // Rediriger vers la page de paiement après un court délai
      setTimeout(() => {
        navigate('/paiement');
      }, 1000);
    }
  };

  // Données des offres
  useEffect(() => {
    const offers = [
      {
        id: 101,
        name: "iPhone 14 Pro - Offre Flash ⚡",
        price: 799900,
        originalPrice: 999900,
        image: "/image/electronic/smartphone/1.jpeg",
        discount: 20,
        rating: 4.9,
        reviews: 342,
        inStock: true,
        features: ["Livraison express gratuite", "Garantie 2 ans", "Cadeau surprise"],
        timeLeft: "04:32:15",
        unitsLeft: 15
      },
      {
        id: 102,
        name: "Robot Cuiseur Intelligent 🤖",
        price: 29900,
        originalPrice: 59900,
        image: "/image/jardin/cuisine-accessoires/2.jpeg",
        discount: 50,
        rating: 4.7,
        reviews: 189,
        inStock: true,
        features: ["Offre éclair", "Stock limité", "Programmes automatiques"],
        timeLeft: "02:15:22",
        unitsLeft: 8
      },
      {
        id: 103,
        name: "Parfum Luxury Edition 🌸",
        price: 45900,
        originalPrice: 65900,
        image: "/image/beauty/parfums/1.jpeg",
        discount: 30,
        rating: 4.8,
        reviews: 267,
        inStock: true,
        features: ["Édition limitée", "Cadeau coffret", "Tenue 24h"],
        timeLeft: "06:45:10",
        unitsLeft: 12
      },
      {
        id: 104,
        name: "Tapis Yoga Pro+ 🧘‍♀️",
        price: 15900,
        originalPrice: 29900,
        image: "/image/sport/yoga/1.jpeg",
        discount: 47,
        rating: 4.6,
        reviews: 156,
        inStock: true,
        features: ["Antidérapant premium", "Eco-friendly", "Guide inclus"],
        timeLeft: "08:20:45",
        unitsLeft: 20
      }
    ];
    setDailyOffers(offers);
  }, []);

  return (
    <div className="offres-du-jour-page">
      {/* Hero Section */}
      <section className="offres-hero">
        <div className="hero-content">
          <h1>🎁 OFFRES DU JOUR</h1>
          <p>Promotions exclusives • Durée limitée • Stocks restreints</p>
          <div className="hero-stats">
            <div className="stat">
              <strong>{dailyOffers.length}</strong>
              <span>Offres actives</span>
            </div>
            <div className="stat">
              <strong>24h</strong>
              <span>Durée limitée</span>
            </div>
            <div className="stat">
              <strong>🔥</strong>
              <span>Promos flash</span>
            </div>
          </div>
        </div>
      </section>

      {/* Compte à rebours */}
      <section className="countdown-section">
        <div className="container">
          <div className="countdown-banner">
            <h3>⏰ CES OFFRES DISPARAISSENT DANS :</h3>
            <div className="countdown-timer">
              <div className="countdown-item">
                <span className="countdown-number">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                <span className="countdown-label">HEURES</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                <span className="countdown-label">MINUTES</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
                <span className="countdown-label">SECONDES</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grille des offres */}
      <section className="offres-grid-section">
        <div className="container">
          <h2 style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem'}}>
            🔥 PROMOTIONS FLASH
          </h2>
          <p style={{textAlign: 'center', fontSize: '1.2rem', opacity: '0.8', marginBottom: '3rem'}}>
            Ne laissez pas passer ces opportunités exceptionnelles
          </p>
          
          <div className="offres-grid">
            {dailyOffers.map((offer) => (
              <div key={offer.id} className="offer-card">
                <div className="offer-badge">-{offer.discount}%</div>
                <div className="offer-countdown">
                  ⏳ {offer.timeLeft} • {offer.unitsLeft} unités
                </div>
                
                <div className="product-card-simple">
                  {offer.discount > 0 && (
                    <div className="discount-badge-simple">-{offer.discount}%</div>
                  )}
                  
                  <div className="product-image-simple">
                    <img src={offer.image} alt={offer.name} />
                  </div>
                  
                  <div className="product-info-simple">
                    <h3 className="product-name-simple">{offer.name}</h3>
                    
                    <div className="product-rating-simple">
                      <div className="stars-simple">
                        {'★'.repeat(Math.floor(offer.rating))}
                        {'☆'.repeat(5 - Math.floor(offer.rating))}
                      </div>
                      <span className="rating-text-simple">({offer.rating}) • {offer.reviews} avis</span>
                    </div>

                    <div className="product-pricing-simple">
                      {offer.originalPrice > offer.price && (
                        <span className="original-price-simple">{offer.originalPrice.toLocaleString()} FCFA</span>
                      )}
                      <span className="current-price-simple">{offer.price.toLocaleString()} FCFA</span>
                    </div>
                    
                    <div className="delivery-simple">Livraison express gratuite</div>
                    
                    <button 
                      className="add-to-cart-btn-simple"
                      onClick={(e) => handleAddToCart(offer, e)}
                    >
                      🛒 Ajouter au panier
                    </button>
                  </div>
                </div>
                
                <div className="offer-actions">
                  <button 
                    className="btn-primary"
                    data-product={offer.id}
                    onClick={(e) => handleQuickBuy(offer.id, e)}
                  >
                    ⚡ Acheter maintenant
                  </button>
                  
                  <button 
                    className={`btn-secondary ${isFavorite(offer.id) ? 'in-favorites' : ''}`}
                    onClick={(e) => handleAddToFavorites(offer, e)}
                  >
                    {isFavorite(offer.id) ? '❤️ Dans favoris' : '🤍 Favoris'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bannière d'urgence */}
      <section className="promo-banner">
        <div className="container">
          <div className="promo-content">
            <h3>🚨 URGENT : OFFRES BIENTÔT TERMINÉES !</h3>
            <p>Les prix remontent demain à minuit - Commandez maintenant pour économiser jusqu'à 50%</p>
            <button className="btn-large">
              🎯 VOIR TOUTES LES OFFRES
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OffresDuJour;