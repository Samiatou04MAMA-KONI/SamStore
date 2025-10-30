import React, { useState } from 'react';
import { useCart } from '../../context/contextPanier';
import { useFavorites } from '../../context/contextFavoris';
import { useAuth } from '../../context/contextAuth';
import { useNavigate } from 'react-router-dom';
import './favoris.css';

const Favoris = () => {
  const [filter, setFilter] = useState('all');
  const { addToCart } = useCart();
  const { favorites, removeFromFavorites } = useFavorites();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Supprimer un produit des favoris
  const handleRemoveFromFavorites = (productId) => {
    removeFromFavorites(productId);
  };

  // Ajouter au panier depuis les favoris
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
      category: product.category || 'favorites',
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

  // Filtrer les favoris par catégorie
  const filteredFavorites = filter === 'all' 
    ? favorites 
    : favorites.filter(item => item.category === filter);

  // Obtenir les catégories uniques
  const categories = [...new Set(favorites.map(item => item.category))];

  // Vider tous les favoris
  const clearAllFavorites = () => {
    favorites.forEach(product => {
      removeFromFavorites(product.id);
    });
  };

  // Rediriger si non connecté
  if (!isAuthenticated) {
    return (
      <div className="favoris-page">
        <div className="auth-required">
          <div className="auth-message">
            <h2>🔐 Connexion requise</h2>
            <p>Connectez-vous pour accéder à vos favoris</p>
            <div className="auth-buttons">
              <button onClick={() => navigate('/login')} className="auth-btn primary">
                Se connecter
              </button>
              <button onClick={() => navigate('/register')} className="auth-btn secondary">
                Créer un compte
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favoris-page">
      {/* Hero Section */}
      <section className="favoris-hero">
        <div className="container">
          <h1>❤️ Mes Favoris</h1>
          <p>Retrouvez tous vos produits coup de cœur</p>
          <div className="favoris-stats">
            <div className="stat">
              <strong>{favorites.length}</strong>
              <span>Produits sauvegardés</span>
            </div>
            <div className="stat">
              <strong>{categories.length}</strong>
              <span>Catégories</span>
            </div>
            <div className="stat">
              <strong>💾</strong>
              <span>Sauvegardé automatiquement</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres et Actions */}
      {favorites.length > 0 && (
        <section className="favoris-actions">
          <div className="container">
            <div className="actions-bar">
              {/* Filtres par catégorie */}
              <div className="filters">
                <button 
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  Tous
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    className={`filter-btn ${filter === category ? 'active' : ''}`}
                    onClick={() => setFilter(category)}
                  >
                    {getCategoryIcon(category)} {category}
                  </button>
                ))}
              </div>

              {/* Actions globales */}
              <div className="global-actions">
                <button 
                  className="action-btn clear-btn"
                  onClick={clearAllFavorites}
                >
                  🗑️ Tout supprimer
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Liste des favoris */}
      <section className="favoris-list">
        <div className="container">
          {favorites.length === 0 ? (
            <div className="empty-favorites">
              <div className="empty-icon">❤️</div>
              <h2>Vos favoris sont vides</h2>
              <p>Ajoutez des produits à vos favoris pour les retrouver facilement plus tard</p>
              <div className="empty-actions">
                <button 
                  className="browse-btn"
                  onClick={() => navigate('/')}
                >
                  🛍️ Parcourir les produits
                </button>
                <button 
                  className="browse-btn secondary"
                  onClick={() => navigate('/nouveaute')}
                >
                  🌟 Voir les nouveautés
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="favorites-grid">
                {filteredFavorites.map((product) => (
                  <div key={product.id} className="favorite-card">
                    {/* Bouton supprimer */}
                    <button 
                      className="remove-favorite"
                      onClick={() => handleRemoveFromFavorites(product.id)}
                      title="Supprimer des favoris"
                    >
                      ❌
                    </button>

                    {/* Image du produit */}
                    <div 
                      className="favorite-image"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <img src={product.image} alt={product.name} />
                      {product.discount > 0 && (
                        <div className="discount-badge">-{product.discount}%</div>
                      )}
                    </div>

                    {/* Informations du produit */}
                    <div className="favorite-info">
                      <h3 
                        className="product-name"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        {product.name}
                      </h3>

                      {/* Catégorie */}
                      <div className="product-category">
                        {getCategoryIcon(product.category)} {product.category}
                      </div>

                      {/* Évaluation */}
                      {product.rating && (
                        <div className="product-rating">
                          <div className="stars">
                            {'★'.repeat(Math.floor(product.rating))}
                            {'☆'.repeat(5 - Math.floor(product.rating))}
                          </div>
                          <span>({product.rating})</span>
                        </div>
                      )}

                      {/* Prix */}
                      <div className="product-pricing">
                        {product.originalPrice > product.price && (
                          <span className="original-price">
                            {product.originalPrice.toLocaleString()} FCFA
                          </span>
                        )}
                        <span className="current-price">
                          {product.price.toLocaleString()} FCFA
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="favorite-actions">
                        <button 
                          className="add-to-cart-btn"
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          🛒 Ajouter au panier
                        </button>
                      </div>

                      {/* Date d'ajout */}
                      <div className="added-date">
                        Ajouté le {new Date(product.addedAt || Date.now()).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Résumé */}
              <div className="favorites-summary">
                <div className="summary-card">
                  <h3>📊 Résumé de vos favoris</h3>
                  <div className="summary-stats">
                    <div className="summary-item">
                      <span>Total des produits :</span>
                      <strong>{favorites.length}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Valeur totale :</span>
                      <strong>
                        {favorites.reduce((total, item) => total + (item.price || 0), 0).toLocaleString()} FCFA
                      </strong>
                    </div>
                    <div className="summary-item">
                      <span>Économies potentielles :</span>
                      <strong className="savings">
                        {favorites.reduce((total, item) => {
                          const saving = (item.originalPrice || 0) - (item.price || 0);
                          return total + (saving > 0 ? saving : 0);
                        }, 0).toLocaleString()} FCFA
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Suggestions si peu de favoris */}
      {favorites.length > 0 && favorites.length < 3 && (
        <section className="favorites-suggestions">
          <div className="container">
            <div className="suggestions-card">
              <h3>💡 Continuez à explorer</h3>
              <p>Découvrez d'autres produits qui pourraient vous plaire</p>
              <div className="suggestion-links">
                <button onClick={() => navigate('/nouveaute')}>🌟 Nouveautés</button>
                <button onClick={() => navigate('/offres-du-jour')}>🔥 Offres du jour</button>
                <button onClick={() => navigate('/electronic')}>📱 Électronique</button>
                <button onClick={() => navigate('/fashion')}>👗 Mode</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

// Helper function pour les icônes de catégories
const getCategoryIcon = (category) => {
  const icons = {
    'electronics': '📱',
    'fashion': '👗',
    'beauty': '💄',
    'jardin': '🏠',
    'jeux': '🎮',
    'sport': '⚽',
    'offres': '🔥',
    'nouveautes': '🌟',
    'general': '📦'
  };
  return icons[category] || '📦';
};

export default Favoris;