import React, { useState, useRef } from 'react';
import { useCart } from '../../context/contextPanier';

import { fashionCategories } from '../../data/fashiondata';

const Fashion = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const { addToCart } = useCart();
  
  // Référence pour la section produits
  const productsSectionRef = useRef(null);

  // Fonction pour gérer le clic sur une sous-catégorie
  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    
    // Scroll automatique vers les produits après un court délai
    setTimeout(() => {
      if (productsSectionRef.current) {
        productsSectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

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
      category: product.category || 'fashion',
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

  // Produits à afficher
  const productsToShow = selectedSubcategory 
    ? fashionCategories.subcategories.find(sub => sub.id === selectedSubcategory)?.products || []
    : fashionCategories.subcategories.flatMap(sub => sub.products);

  const sortedProducts = [...productsToShow].sort((a, b) => {
    switch(sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      default: return 0;
    }
  });

const featuredProducts = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      price: 899900,
      image: "/image/fashion/collan/4.jpeg"
    },
    {
      id: 2, 
      name: "Bracelets blanc",
      price: 759900,
      image: "/image/fashion/chouchou/1.jpeg"
    },
    {
      id: 3,
      name: "MacBook Air M2",
      price: 1299900,
      image: "/image/fashion/pantalon/4.jpeg"
    },
    {
      id: 4,
      name: "AirPods Pro",
      price: 299900,
      image: "/image/fashion/robe/9.jpeg"
    },
    {
      id: 5,
      name: "Apple Watch",
      price: 459900,
      image: "/image/fashion/chaussure/1.jpeg"
    },
    {
      id: 6,
      name: "iPad Pro",
      price: 899900,
      image: "/image/fashion/top/6.jpeg"
    }
  ];

  return (
    <div className="electronics-page">
      {/* Hero Section */}
            <section className="electronics-hero">
              <div className="hero-content">
                <h1>👗 {fashionCategories.name}</h1>
          <div className="carousel-track">
            {[...featuredProducts, ...featuredProducts].map((product, index) => (
              <div key={index} className="carousel-item">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="carousel-image"
                />
                <div className="carousel-product-name">{product.name}</div>
                <div className="carousel-product-price">
                  {(product.price / 100).toLocaleString()} FCFA
                </div>
              </div>
            ))}
          </div>
              </div>
            </section>
      
      {/* Navigation des Sous-Catégories */}
      <section className="subcategories-section">
        <div className="container">
          <h2>🔍 Parcourir par Catégorie</h2>
          <div className="subcategories-grid">
            <div 
              className={`subcategory-card ${!selectedSubcategory ? 'active' : ''}`}
              onClick={() => setSelectedSubcategory(null)}
            >
              <div className="subcategory-icon">⭐</div>
              <h3>Tous les Produits</h3>
              <p>{fashionCategories.subcategories.flatMap(sub => sub.products).length} produits</p>
            </div>

            {fashionCategories.subcategories.map(subcategory => (
  <div 
    key={subcategory.id}
    className={`subcategory-card ${selectedSubcategory === subcategory.id ? 'active' : ''}`}
    onClick={() => handleSubcategoryClick(subcategory.id)}
  >
    {/* AJOUT DE L'IMAGE */}
    <div className="subcategory-image-container">
      <img 
        src={subcategory.image} 
        alt={subcategory.name}
        className="subcategory-image"
      />
      <div className="subcategory-overlay"></div>
    </div>
    
    <div className="subcategory-icon">{subcategory.icon}</div>
    <h3>{subcategory.name}</h3>
    <p>{subcategory.products.length} produits</p>
    <span className="subcategory-description">{subcategory.description}</span>
  </div>
))}
          </div>
        </div>
      </section>

      {/* Section Produits avec référence pour le scroll */}
      <section ref={productsSectionRef} className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>
              {selectedSubcategory 
                ? `${fashionCategories.subcategories.find(sub => sub.id === selectedSubcategory)?.name}`
                : 'Tous les Produits Mode'
              }
              <span className="product-count"> ({sortedProducts.length} produits)</span>
            </h2>
            
            <div className="filters">
              <div className="sort-filter">
                <label>Trier par :</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">En vedette</option>
                  <option value="price-low">Prix croissant</option>
                  <option value="price-high">Prix décroissant</option>
                  <option value="rating">Meilleures notes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grille de Produits */}
          <div className="electronics-grid">
            {sortedProducts.map(product => (
              <div key={product.id} className="product-card-simple">
                {product.discount > 0 && (
                  <div className="discount-badge-simple">-{product.discount}%</div>
                )}
                
                <div className="product-image-simple">
                  <img src={product.image} alt={product.name} />
                </div>
                
                <div className="product-info-simple">
                  <h3 className="product-name-simple">{product.name}</h3>
                  
                  <div className="product-rating-simple">
                    <div className="stars-simple">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="rating-text-simple">({product.rating}) • {product.reviews} avis</span>
                  </div>

                  <div className="product-pricing-simple">
                    {product.originalPrice > product.price && (
                      <span className="original-price-simple">{product.originalPrice.toLocaleString()} FCFA</span>
                    )}
                    <span className="current-price-simple">{product.price.toLocaleString()} FCFA</span>
                  </div>
                  
                  <div className="delivery-simple">{product.delivery}</div>
                  
                  <button 
                    className="add-to-cart-btn-simple"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    🛒 Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="no-products">
              <h3>Aucun produit trouvé</h3>
              <p>Essayez de sélectionner une autre catégorie</p>
            </div>
          )}
        </div>
      </section>

      {/* Garanties */}
      <section className="guarantees-section">
        <div className="container">
          <h2>🛡️ Vos Garanties SamStore</h2>
          <div className="guarantees-grid">
            <div className="guarantee-card">
              <div className="guarantee-icon">🔧</div>
              <h3>Garantie 2 Ans</h3>
              <p>Garantie constructeur incluse sur tous nos produits électroniques</p>
            </div>
            <div className="guarantee-card">
              <div className="guarantee-icon">🚚</div>
              <h3>Livraison Rapide</h3>
              <p>Livraison en 24h à Cotonou, 48h dans tout le Bénin</p>
            </div>
            <div className="guarantee-card">
              <div className="guarantee-icon">💳</div>
              <h3>Paiement Sécurisé</h3>
              <p>Paiement par Mobile Money, carte bancaire ou à la livraison</p>
            </div>
            <div className="guarantee-card">
              <div className="guarantee-icon">↩️</div>
              <h3>Retours Faciles</h3>
              <p>14 jours pour changer d'avis, retours gratuits</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fashion;