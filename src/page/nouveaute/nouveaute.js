import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/contextPanier';
import { useFavorites } from '../../context/contextFavoris';
import './nouveaute.css';

const Nouveautes = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

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
      category: product.category || 'nouveautes',
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
        category: product.category || 'nouveautes',
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

  useEffect(() => {
const products = [
  {
    id: 201,
    name: "iPhone 15 Pro Max - Nouveau 📱",
    price: 1299900,
    originalPrice: 1399900,
    image: "/image/electronic/smartphone/6.jpeg",
    discount: 7,
    rating: 4.9,
    reviews: 89,
    inStock: true,
    features: ["Dynamic Island", "Titanium", "Camera 48MP"],
    category: "smartphone",
    releaseDate: "2024-01-15",
    isNew: true,
    badge: "Nouveauté",
    unitsSold: 15
  },
  {
    id: 202, 
    name: "Montre Connectée Pro 2024 ⌚",
    price: 299900,
    originalPrice: 399900,
    image: "/image/electronic/montre/1.jpeg",
    discount: 25,
    rating: 4.8,
    reviews: 45,
    inStock: true,
    features: ["Écran AMOLED", "7 jours batterie", "GPS"],
    category: "wearable", 
    releaseDate: "2024-01-10",
    isNew: true,
    badge: "Juste sorti",
    unitsSold: 8
  },
  {
    id: 203,
    name: "Robot Aspirateur AI 🤖",
    price: 499900,
    originalPrice: 599900,
    image: "/image/electronic/electromenager/1.jpeg",
    discount: 17,
    rating: 4.7,
    reviews: 23,
    inStock: true,
    features: ["Intelligence Artificielle", "Cartographie", "Auto-vidange"],
    category: "smart-home",
    releaseDate: "2024-01-08", 
    isNew: true,
    badge: "Innovation",
    unitsSold: 12
  },
  {
    id: 204,
    name: "Collection Printemps 2024 🌸",
    price: 45900,
    originalPrice: 65900,
    image: "/image/fashion/robe/2.jpeg",
    discount: 30,
    rating: 4.9,
    reviews: 34,
    inStock: true,
    features: ["Édition limitée", "Design exclusif", "Coton bio"],
    category: "fashion",
    releaseDate: "2024-01-12",
    isNew: true,
    badge: "Édition Limitée", 
    unitsLeft: 25
  },
  {
    id: 205,
    name: "Casque Audio Spatial Pro 🎧",
    price: 189900,
    originalPrice: 229900,
    image: "/image/electronic/audio/1.jpeg",
    discount: 17,
    rating: 4.8,
    reviews: 67,
    inStock: true,
    features: ["Audio Spatial", "Annulation bruit", "30h autonomie"],
    category: "audio",
    releaseDate: "2024-01-20",
    isNew: true,
    badge: "Nouveau",
    unitsSold: 28
  },
  {
    id: 206,
    name: "Drone 4K Pro Edition 🚁",
    price: 789900,
    originalPrice: 899900,
    image: "/image/electronic/drone/1.jpeg",
    discount: 12,
    rating: 4.9,
    reviews: 42,
    inStock: true,
    features: ["Caméra 4K", "Autonomie 40min", "Follow Me"],
    category: "drone",
    releaseDate: "2024-01-18",
    isNew: true,
    badge: "High-Tech",
    unitsSold: 18
  },
  {
    id: 207,
    name: "Tablette Graphique Pro ✏️",
    price: 349900,
    originalPrice: 399900,
    image: "/image/electronic/tablette/1.jpeg",
    discount: 13,
    rating: 4.7,
    reviews: 56,
    inStock: true,
    features: ["Écran 12.9\"", "Apple Pencil 2", "120Hz"],
    category: "tablette",
    releaseDate: "2024-01-22",
    isNew: true,
    badge: "Créatif",
    unitsSold: 22
  },
  {
    id: 208,
    name: "Console Gaming Next Gen 🎮",
    price: 459900,
    originalPrice: 499900,
    image: "/image/electronic/gaming/1.jpeg",
    discount: 8,
    rating: 4.9,
    reviews: 89,
    inStock: true,
    features: ["SSD 1TB", "4K 120fps", "Ray Tracing"],
    category: "gaming",
    releaseDate: "2024-01-25",
    isNew: true,
    badge: "Gaming",
    unitsSold: 45
  },
  {
    id: 209,
    name: "Parfum Signature 2024 🌹",
    price: 55000,
    originalPrice: 65000,
    image: "/image/beauty/parfums/1.jpeg",
    discount: 15,
    rating: 4.8,
    reviews: 34,
    inStock: true,
    features: ["Notes florales", "Longue tenue", "Flacon luxe"],
    category: "beauty",
    releaseDate: "2024-01-14",
    isNew: true,
    badge: "Signature",
    unitsSold: 31
  },
  {
    id: 210,
    name: "Smart TV 8K 75\" 📺",
    price: 1299900,
    originalPrice: 1499900,
    image: "/image/electronic/studio/1.jpeg",
    discount: 13,
    rating: 4.9,
    reviews: 23,
    inStock: true,
    features: ["Résolution 8K", "Smart TV", "Design bezel-less"],
    category: "tv",
    releaseDate: "2024-01-30",
    isNew: true,
    badge: "Ultra HD",
    unitsSold: 12
  },
  {
    id: 211,
    name: "Montre Sport Connectée 🏃‍♂️",
    price: 199900,
    originalPrice: 249900,
    image: "/image/sport/fitness/1.jpeg",
    discount: 20,
    rating: 4.6,
    reviews: 78,
    inStock: true,
    features: ["GPS intégré", "Résistance eau", "30 sports"],
    category: "sport",
    releaseDate: "2024-01-16",
    isNew: true,
    badge: "Sport",
    unitsSold: 56
  },
  {
    id: 212,
    name: "Sac Éco Responsable 🌱",
    price: 35000,
    originalPrice: 45000,
    image: "/image/fashion/sac/1.jpeg",
    discount: 22,
    rating: 4.7,
    reviews: 45,
    inStock: true,
    features: ["Matériaux recyclés", "Design moderne", "Spacieux"],
    category: "fashion",
    releaseDate: "2024-01-28",
    isNew: true,
    badge: "Éco-Friendly",
    unitsSold: 38
  }
];
    setNewProducts(products);
  }, []);

  const filteredProducts = activeFilter === 'all' 
    ? newProducts 
    : newProducts.filter(product => product.category === activeFilter);

  return (
    <div className="nouveautes-page">
      {/* Hero Section */}
      <section className="nouveautes-hero">
        <div className="hero-content">
          <h1>🌟 NOUVEAUTÉS</h1>
          <p>Découvrez les dernières innovations et produits fraîchement arrivés</p>
          <div className="hero-stats">
            <div className="stat">
              <strong>{newProducts.length}</strong>
              <span>Nouveaux produits</span>
            </div>
            <div className="stat">
              <strong>2024</strong>
              <span>Collection actuelle</span>
            </div>
            <div className="stat">
              <strong>🔥</strong>
              <span>Tendances</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres */}
      <section className="filters-section">
        <div className="container">
          <div className="filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Toutes les nouveautés
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'smartphone' ? 'active' : ''}`}
              onClick={() => setActiveFilter('smartphone')}
            >
              📱 High-Tech
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'wearable' ? 'active' : ''}`}
              onClick={() => setActiveFilter('wearable')}
            >
              ⌚ Wearables
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'smart-home' ? 'active' : ''}`}
              onClick={() => setActiveFilter('smart-home')}
            >
              🏠 Smart Home
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'fashion' ? 'active' : ''}`}
              onClick={() => setActiveFilter('fashion')}
            >
              👗 Mode
            </button>
          </div>
        </div>
      </section>

      {/* Grille des nouveautés */}
      <section className="nouveautes-grid-section">
        <div className="container">
          <h2>✨ DERNIERS ARRIVAGES</h2>
          <p className="section-subtitle">
            Soyez parmi les premiers à découvrir ces produits exclusifs
          </p>
          
          <div className="nouveautes-grid">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="new-product-card">
                <div className="new-badge">{product.badge}</div>
                <div className="release-info">
                  Sorti le {new Date(product.releaseDate).toLocaleDateString('fr-FR')}
                </div>
                
                <div className="product-card-simple">
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
                    
                    <div className="delivery-simple">Livraison gratuite</div>
                    
                    <div className="product-actions">
                      <button 
                        className="add-to-cart-btn-simple"
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        🛒 Ajouter au panier
                      </button>
                      
                      {/* BOUTON FAVORIS AJOUTÉ */}
                      <button 
                        className={`favorite-btn ${isFavorite(product.id) ? 'in-favorites' : ''}`}
                        onClick={(e) => handleAddToFavorites(product, e)}
                      >
                        {isFavorite(product.id) ? '❤️ Dans favoris' : '🤍 Favoris'}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="product-meta">
                  <span className="units-sold">
                    🔥 {product.unitsSold || 0} déjà vendus
                  </span>
                  {product.unitsLeft && (
                    <span className="units-left">
                      ⚠️ {product.unitsLeft} restants
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bannière innovation */}
      <section className="innovation-banner">
        <div className="container">
          <div className="innovation-content">
            <h3>🚀 L'AVENIR COMMENCE ICI</h3>
            <p>
              Revenez régulièrement pour découvrir les dernières innovations 
              et technologies avant-gardistes
            </p>
            <button className="btn-innovation">
              📧 M'alerter des nouvelles sorties
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nouveautes;