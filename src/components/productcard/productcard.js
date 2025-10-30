import React, { useState } from 'react';
import { useCart } from '../../context/contextPanier';
import './productcard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [ajoutEnCours, setAjoutEnCours] = useState(false);
  const [afficherConfirmation, setAfficherConfirmation] = useState(false);

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (!product.inStock) return;

    // 1. Désactiver le bouton temporairement
    setAjoutEnCours(true);
    
    // 2. Ajouter au panier avec les bonnes propriétés
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price || product.currentPrice,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1,
      category: product.category,
      discount: product.discount || 0,
      inStock: product.inStock !== false // Par défaut true si non spécifié
    };
    
    addToCart(cartProduct);
    
    // 3. Notification visuelle
    setAfficherConfirmation(true);
    
    // 4. Réactiver le bouton
    setTimeout(() => {
      setAjoutEnCours(false);
    }, 500);
    
    // 5. Masquer la confirmation
    setTimeout(() => {
      setAfficherConfirmation(false);
    }, 2000);
  };

  const formaterPrix = (prix) => {
    if (!prix) return 'Prix non disponible';
    return prix.toLocaleString() + ' FCFA';
  };

  // Vérifier si le produit est en stock (par défaut true)
  const isInStock = product.inStock !== false;

  return (
    <div className="product-card">
      {/* Badges */}
      <div className="card-badges">
        {product.discount > 0 && (
          <span className="discount-badge">-{product.discount}%</span>
        )}
        {product.fastDelivery && (
          <span className="delivery-badge">🚚 Livraison express</span>
        )}
        {!isInStock && (
          <span className="stock-badge">Rupture de stock</span>
        )}
      </div>

      {/* Image */}
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Informations Produit */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        {/* Évaluation */}
        <div className="product-rating">
          <div className="stars">
            {'★'.repeat(Math.floor(product.rating || 0))}
            {'☆'.repeat(5 - Math.floor(product.rating || 0))}
          </div>
          <span className="rating-text">
            ({product.rating || 0}) • {product.reviews || 0} avis
          </span>
        </div>

        {/* Prix */}
        <div className="product-pricing">
          {product.originalPrice > (product.price || product.currentPrice) && (
            <span className="original-price">
              {formaterPrix(product.originalPrice)}
            </span>
          )}
          <span className="current-price">
            {formaterPrix(product.price || product.currentPrice)}
          </span>
        </div>

        {/* Caractéristiques */}
        {product.features && (
          <div className="product-features">
            {product.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="feature-tag">✓ {feature}</span>
            ))}
          </div>
        )}

        {/* Bouton Ajouter */}
        <button 
          className={`add-to-cart-btn ${!isInStock ? 'out-of-stock' : ''} ${ajoutEnCours ? 'loading' : ''}`}
          onClick={handleAddToCart}
          disabled={!isInStock || ajoutEnCours}
        >
          {ajoutEnCours ? 'Ajout...' : 
           !isInStock ? 'Rupture de stock' : '🛒 Ajouter au panier'}
        </button>
      </div>

      {/* Notification d'ajout */}
      {afficherConfirmation && (
        <div className="notification-ajout">
          ✓ {product.name} ajouté au panier !
        </div>
      )}
    </div>
  );
};

export default ProductCard;