import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { categorieData, categoriesOrder } from '../../data/categoriedata';
import { getRandomProducts } from '../../data/allproduits';
import { useCart } from '../../context/contextPanier'; 
import './home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart(); 
  
  // ÉTAT POUR GÉRER LES BOUTONS "AJOUTÉ"
  const [addedProducts, setAddedProducts] = useState({});

  const slides = [
    {
      id: 1,
      title: "🔥 Offre Flash",
      subtitle: "ÉLECTRONIQUE",
      description: "Smartphones haut de gamme à prix cassés",
      discount: "-50%",
      buttonText: "Acheter Maintenant",
      backgroundColor: "linear-gradient(135deg, #ffbf00ff 0%, #a56300ff 100%)",
      textColor: "#fff",
      sideImages: [
        { url: "/image/11.jpeg", alt: "Smartphone 1", category: "jeux" },
        { url: "/image/88.jpeg", alt: "Smartphone 2", category: "jeux" },
        { url: "/image/77.jpeg", alt: "Smartphone 3", category: "jeux" }
      ]
    },
    {
      id: 2,
      title: "🆕 Nouveautés",
      subtitle: "MODE & STYLE",
      description: "Découvrez la nouvelle collection printemps",
      discount: "NOUVEAU",
      buttonText: "Découvrir",
      backgroundColor: "linear-gradient(135deg, #ffd1d1ff 0%, #d96e7eff 100%)",
      textColor: "#fff",
      sideImages: [
        { url: "/image/4.jpeg", alt: "Vêtement 1", category: "electronics" },
        { url: "/image/55.jpeg", alt: "Vêtement 2", category: "electronics" },
        { url: "/image/44.jpeg", alt: "Vêtement 3", category: "electronics" }
      ]
    },
    {
      id: 4,
      title: "🚚 Livraison",
      subtitle: "SERVICE PREMIUM",
      description: "Livraison gratuite en 24h au Bénin",
      discount: "GRATUIT",
      buttonText: "En savoir plus",
      backgroundColor: "linear-gradient(135deg, #cbc8ffff 0%, #00026aff 100%)",
      textColor: "#fff",
      sideImages: [
        { url: "/image/22.jpeg", alt: "Livraison 1", category: "fashion" },
        { url: "/image/33.jpeg", alt: "Livraison 2", category: "fashion" },
        { url: "/image/66.jpeg", alt: "Livraison 3", category: "fashion" }
      ]
    },
    {
      id: 5,
      title: "📱 Paiement",
      subtitle: "FACILE & SÉCURISÉ",
      description: "Payez avec votre Mobile Money en 1 clic",
      discount: "SÉCURISÉ",
      buttonText: "Payer Maintenant",
      backgroundColor: "linear-gradient(135deg, #0f0f55ff 0%, #04023bff 100%)",
      textColor: "#fff",
      sideImages: [
        { url: "/image/100.jpeg", alt: "Paiement 1", category: "beauty" },
        { url: "/image/112.jpeg", alt: "Paiement 2", category: "beauty" },
        { url: "/image/110.jpeg", alt: "Paiement 3", category: "beauty" }
      ]
    }
  ];

  // Fonction pour passer au slide suivant (avec useCallback)
  const nextSlide = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setTransitioning(false), 800);
  }, [transitioning, slides.length]);

  // Fonction pour passer au slide précédent
  const prevSlide = () => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setTransitioning(false), 800);
  };

  // Fonction pour aller à un slide spécifique
  const goToSlide = (index) => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setTransitioning(false), 800);
  };

  // Gestion du clic sur les images latérales
  const handleSideImageClick = (category) => {
    switch(category) {
      case 'jeux':
        navigate('/jeux');
        break;
      case 'electronics':
        navigate('/electronic');
        break;
      case 'beauty':
        navigate('/beauty');
        break;
      case 'fashion':
        navigate('/fashion');
        break;
      default:
        navigate('/product');
    }
  };

  // Défilement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  const current = slides[currentSlide];

  // Fonction pour formater le prix
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  // Fonction pour générer les étoiles de notation
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    
    while (stars.length < 5) {
      stars.push('☆');
    }
    
    return stars.join('');
  };

  const [displayedProducts, setDisplayedProducts] = useState([]);

  // Initialiser les produits au chargement
  useEffect(() => {
    setDisplayedProducts(getRandomProducts(12)); // 12 produits mélangés
  }, []);

  // FONCTION MODIFIÉE POUR GÉRER L'AJOUT AU PANIER AVEC FEEDBACK VISUEL
  const handleAddToCart = (product, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Créer un objet produit complet pour le panier
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.currentPrice,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1,
      category: product.category,
      discount: product.discount || 0
    };
    
    addToCart(cartProduct);
    
    // Marquer le produit comme "ajouté" temporairement
    setAddedProducts(prev => ({
      ...prev,
      [product.id]: true
    }));
    
    // Réinitialiser après 1 seconde
    setTimeout(() => {
      setAddedProducts(prev => ({
        ...prev,
        [product.id]: false
      }));
    }, 1000);
  };

  return (
    <div className="home">
      {/* Carousel de Div Personnalisées */}
      <section className="hero-carousel">
        {/* SEULEMENT LA SLIDE ACTUELLE */}
          <div 
            className="custom-slide active"
            style={{ 
              background: current.backgroundColor,
              color: current.textColor
            }}
          >
            {/* Contenu Principal à Gauche */}
            <div className="slide-content">
              <div className="discount-badge">
                {current.discount}
              </div>
              <h1 className="slide-title">{current.title}</h1>
              <h2 className="slide-subtitle">{current.subtitle}</h2>
              <p className="slide-description">{current.description}</p>
              <button 
                className="cta-button"
                style={{ 
                  background: 'rgba(255,255,255,0.2)',
                  color: current.textColor,
                  border: `2px solid ${current.textColor}`
                }}
              >
                {current.buttonText}
              </button>
            </div>

            {/* Images Latérales à Droite */}
            <div className="side-images">
              {current.sideImages.map((image, imgIndex) => (
                <div 
                  key={imgIndex}
                  className="side-image-container"
                  onClick={() => handleSideImageClick(image.category)} // Passe la catégorie ici
                >
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    className="side-image"
                  />
                  <div className="image-overlay">
                    <span>👁️ Voir</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Boutons de Navigation */}
          <button className="carousel-btn prev" onClick={prevSlide}>
            ‹
          </button>
          <button className="carousel-btn next" onClick={nextSlide}>
            ›
          </button>

          {/* Indicateurs de Slide */}
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
      </section>

      {/* Section Produits par Catégorie */}
      <section className="featured-categories">
        <div className="container">
          {categoriesOrder.map(categoryKey => {
            const category = categorieData[categoryKey];
            
            return (
              <div key={categoryKey} className="category-row">
                <div className="category-header">
                  <h2>{category.title}</h2>
                  <button 
                    className="see-all-btn" 
                    onClick={() => navigate(category.route)}
                  >
                    Voir tout →
                  </button>
                </div>
                
                <div className="products-scroll">
                  {category.products.map(product => (
                    <div key={product.id} className="product-card">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                        {product.discount > 0 && (
                          <div className="discount-badge">-{product.discount}%</div>
                        )}
                        {product.badge && (
                          <div className={`badge ${product.badge.toLowerCase().replace(/ /g, '-')}`}>
                            {product.badge}
                          </div>
                        )}
                      </div>
                      
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        
                        <div className="rating">
                          <span className="stars">{renderStars(product.rating)}</span>
                          <span className="review-count">({product.reviews})</span>
                        </div>
                        
                        <div className="price">
                          <span className="current">{formatPrice(product.currentPrice)}</span>
                          {product.originalPrice && (
                            <span className="original">{formatPrice(product.originalPrice)}</span>
                          )}
                        </div>
                        
                        <div className="delivery">{product.delivery}</div>
                        
                        {/* BOUTON MODIFIÉ AVEC ÉTAT TEMPORAIRE */}
                        <button 
                          className={`add-to-cart ${addedProducts[product.id] ? 'added' : ''}`}
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={addedProducts[product.id]}
                        >
                          {addedProducts[product.id] ? '✓ Ajouté !' : 'Ajouter au panier'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section Tous les Produits (Mélangés) */}
      <section className="all-products-section">
        <div className="container">
          <div className="section-header">
            <h2>🎯 Produits Populaires</h2>
            <p>Découvrez notre sélection de produits tendance</p>
          </div>
          
          <div className="products-grid">
            {displayedProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.discount > 0 && (
                    <div className="discount-badge">-{product.discount}%</div>
                  )}
                  {product.badge && (
                    <div className={`badge ${product.badge.toLowerCase().replace(/ /g, '-')}`}>
                      {product.badge}
                    </div>
                  )}
                </div>
                
                <div className="product-info">
                  <h3>{product.name}</h3>
                  
                  <div className="rating">
                    <span className="stars">{renderStars(product.rating)}</span>
                    <span className="review-count">({product.reviews})</span>
                  </div>
                  
                  <div className="price">
                    <span className="current">{formatPrice(product.currentPrice)}</span>
                    {product.originalPrice && (
                      <span className="original">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  
                  <div className="delivery">{product.delivery}</div>
                  
                  {/* BOUTON MODIFIÉ AVEC ÉTAT TEMPORAIRE */}
                  <button 
                    className={`add-to-cart ${addedProducts[product.id] ? 'added' : ''}`}
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={addedProducts[product.id]}
                  >
                    {addedProducts[product.id] ? '✓ Ajouté !' : 'Ajouter au panier'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bouton Voir Plus */}
          <div className="load-more-container">
            <button 
              className="load-more-btn"
              onClick={() => setDisplayedProducts(getRandomProducts(12))}
            >
              🔄 Voir plus de produits
            </button>
          </div>
        </div>
      </section>

      {/* Contenu Supplémentaire de la Page */}
      <section className="home-content">
        <p>Votre boutique en ligne de confiance au Bénin</p>
        
        <div className="features">
          <div className="feature-card">
            <h3>📱 Produits Tech</h3>
            <p>Smartphones, accessoires et plus</p>
          </div>
          <div className="feature-card">
            <h3>🚚 Livraison Rapide</h3>
            <p>Partout au Bénin</p>
          </div>
          <div className="feature-card">
            <h3>💳 Paiement Sécurisé</h3>
            <p>Mobile Money & Cartes</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;