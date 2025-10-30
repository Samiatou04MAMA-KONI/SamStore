import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/contextPanier';
import { useAuth } from '../../context/contextAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb as faLightbulbSolid } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb as faLightbulbRegular } from '@fortawesome/free-regular-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { useSearch } from '../../context/contextSearch';
import './header.css';

function Header() {
  // Fonction appelée quand on clique sur "Aide"
  const handleHelpClick = () => {
    // Créer un événement personnalisé appelé 'openChatbot'
    const event = new CustomEvent('openChatbot');
    
    // Envoyer cet événement à la fenêtre globale
    window.dispatchEvent(event);
  };

  const { searchTerm, setSearchTerm, searchResults, isSearching, searchProducts, clearSearch } = useSearch();
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // USEEFFECT POUR FERMER LE DROPDOWN EN CLIQUANT DEHORS
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 1) {
      searchProducts(value);
      setShowSearchDropdown(true);
    } else {
      setShowSearchDropdown(false);
    }
  };

  const handleProductClick = (product) => {
    // Navigation vers la catégorie du produit
    if (product.categoryRoute) {
      navigate(product.categoryRoute);
    } else {
      // Fallback vers la page d'accueil
      navigate('/');
    }
    setShowSearchDropdown(false);
    clearSearch();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowSearchDropdown(false);
    }
  };

  const handleSeeAllResults = () => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    setShowSearchDropdown(false);
  };

  const { nombreArticles } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // États pour les dropdowns mobile
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [isMobileAccountOpen, setIsMobileAccountOpen] = useState(false);

  const handleQuickActionClick = (categoryPage, subcategoryId) => {
    // Stocke l'ID de la sous-catégorie pour la page de destination
    localStorage.setItem('selectedSubcategory', subcategoryId.toString());
    localStorage.setItem('shouldScrollToProducts', 'true');
    
    // La navigation se fait via le <Link to={categoryPage}>
  };

  // Fonction pour gérer le clic sur les catégories
  const handleCategoriesClick = () => {
    if (window.innerWidth <= 768) {
      setIsMobileCategoriesOpen(!isMobileCategoriesOpen);
      setIsMobileAccountOpen(false); // Fermer l'autre dropdown
    }
  };

  // Fonction pour gérer le clic sur le compte
  const handleAccountClick = () => {
    if (window.innerWidth <= 768) {
      setIsMobileAccountOpen(!isMobileAccountOpen);
      setIsMobileCategoriesOpen(false); // Fermer l'autre dropdown
    }
  };

  // Fonction pour fermer tous les dropdowns
  const handleCloseAllDropdowns = () => {
    setIsMobileCategoriesOpen(false);
    setIsMobileAccountOpen(false);
  };

  // Fermer les dropdowns en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((isMobileCategoriesOpen || isMobileAccountOpen) && 
          !event.target.closest('.navbar__categories') && 
          !event.target.closest('.navbar__account')) {
        handleCloseAllDropdowns();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileCategoriesOpen, isMobileAccountOpen]);

  // Fermer les dropdowns quand la fenêtre est redimensionnée au-dessus de 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        handleCloseAllDropdowns();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Charger le thème depuis localStorage au démarrage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Basculer entre thème clair et sombre
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header className="navbar">
      {/* Overlay pour fermer les dropdowns */}
      <div 
        className={`dropdown-overlay ${(isMobileCategoriesOpen || isMobileAccountOpen) ? 'active' : ''}`}
        onClick={handleCloseAllDropdowns}
      ></div>

      {/* Section principale : Logo, Recherche, Panier, Compte */}
      <div className="navbar__primary">
        {/* Logo */}
        <div className="navbar__logo">
          <Link to="/" aria-label="Retour à l'accueil">
            <img 
              src="/logoSamStore.png" 
              alt="Sam Store Logo" 
              className="navbar__logo-img"
            />
          </Link>
        </div>

        {/* Barre de recherche */}
        <div className="navbar__search" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input 
              type="search" 
              placeholder="🔍 Rechercher des produits..." 
              className="navbar__search-input"
              aria-label="Rechercher des produits"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit" className="navbar__search-btn" aria-label="Lancer la recherche">
              Rechercher
            </button>
          </form>

          {/* DROPDOWN DES RÉSULTATS */}
          {showSearchDropdown && (
            <div className="search-results-dropdown">
              {isSearching ? (
                <div className="search-loading">Recherche en cours...</div>
              ) : searchResults.length > 0 ? (
                <>
                  <div className="search-results-list">
                    {searchResults.slice(0, 5).map(product => (
                      <div
                        key={product.id}
                        className="search-result-item"
                        onClick={() => handleProductClick(product)}
                      >
                        <img src={product.image} alt={product.name} className="result-image" />
                        <div className="result-info">
                          <h4>{product.name}</h4>
                          <p className="result-price">{product.currentPrice.toLocaleString()} FCFA</p>
                          <p className="result-category">
                            Catégorie: {product.category === 'jardin' ? 'Maison & Jardin' : 
                                      product.category === 'electronics' ? 'Électronique' :
                                      product.category === 'fashion' ? 'Mode' :
                                      product.category === 'beauty' ? 'Beauté' :
                                      product.category === 'sport' ? 'Sport' :
                                      product.category === 'jeux' ? 'Jeux' : 'Général'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {searchResults.length > 5 && (
                    <div className="see-all-results" onClick={handleSeeAllResults}>
                      Voir tous les résultats ({searchResults.length})
                    </div>
                  )}
                </>
              ) : searchTerm.length > 1 ? (
                <div className="no-results">Aucun produit trouvé</div>
              ) : null}
            </div>
          )}
        </div>

        {/* Panier */}
        <Link to="/cart" className="navbar__cart" aria-label={`Panier avec ${nombreArticles} article${nombreArticles > 1 ? 's' : ''}`}>
          <span className="navbar__cart-icon">🛒</span>
          <span className="navbar__cart-text">Panier</span>
          <span className={`navbar__cart-badge ${nombreArticles === 0 ? 'navbar__cart-badge--empty' : ''}`}>
            {nombreArticles}
          </span>
        </Link>

        {/* Compte utilisateur */}
        <div className="navbar__account">
          <button 
            className="navbar__account-btn" 
            aria-label="Menu compte utilisateur"
            onClick={handleAccountClick}
          >
            <span className="navbar__account-icon">👤</span>
            <span className="navbar__account-text">
              {isAuthenticated ? (user?.firstName || 'Mon Compte') : 'Mon Compte'}
            </span>
          </button>
          <div className={`navbar__dropdown ${isMobileAccountOpen ? 'mobile-open' : ''}`}>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="navbar__dropdown-item" onClick={handleCloseAllDropdowns}>
                  <span className="navbar__dropdown-icon">👤</span>
                  Mon Profil
                </Link>
                <Link to="/commande" className="navbar__dropdown-item" onClick={handleCloseAllDropdowns}>
                  <span className="navbar__dropdown-icon">📦</span>
                  Mes Commandes
                </Link>
                <Link to="/favoris" className="navbar__dropdown-item" onClick={handleCloseAllDropdowns}>
                  <span className="navbar__dropdown-icon">❤️</span>
                  Favoris
                </Link>
                <hr className="navbar__dropdown-divider" />
                <button 
                  onClick={() => {
                    handleLogout();
                    handleCloseAllDropdowns();
                  }}
                  className="navbar__dropdown-item navbar__dropdown-item--logout"
                >
                  <span className="navbar__dropdown-icon">🚪</span>
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar__dropdown-item" onClick={handleCloseAllDropdowns}>
                  <span className="navbar__dropdown-icon">🔐</span>
                  Connexion
                </Link>
                <Link to="/register" className="navbar__dropdown-item" onClick={handleCloseAllDropdowns}>
                  <span className="navbar__dropdown-icon">📝</span>
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="locale-selector">
          <select className="language-select">
            <option>🇫🇷 FR</option>
            <option>🇺🇸 EN</option>
          </select>
          
          {/* Bouton Thème Sombre/Clair avec Font Awesome */}
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Activer le mode clair" : "Activer le mode sombre"}
          >
            <span className="theme-icon">
              <FontAwesomeIcon 
                icon={isDarkMode ? faLightbulbSolid : faLightbulbRegular} 
                className={isDarkMode ? "theme-icon-dark" : "theme-icon-light"}
              />
            </span>
            <span className="theme-text">
              {isDarkMode ? '' : ''}
            </span>
          </button>
        </div>
      </div>

      {/* Quick Actions Produits */}
      <div className="quick-actions">
        <Link to="/fashion" className="quick-action product electronic" onClick={() => handleQuickActionClick('/fashion', 11)}>
          <span className="action-icon">👗</span>
          <span className="action-text">Robes chic</span>
          <span className="action-price">Dès 80.000 FCFA</span>
        </Link>

        <Link to="/smartphones" className="quick-action product electronic" onClick={() => handleQuickActionClick('/electronic', 11)}>
          <span className="action-icon">⌚</span>
          <span className="action-text">Montres Connectées</span>
          <span className="action-badge">Nouveau</span>
        </Link>

        <Link to="/beauty" className="quick-action product beauty" onClick={() => handleQuickActionClick('/beauty', 41)}>
          <span className="action-icon">🌸</span>
          <span className="action-text">Parfums</span>
          <span className="action-price">Dès 25.000 FCFA</span>
        </Link>
        
        <Link to="/jeux" className="quick-action product auto" onClick={() => handleQuickActionClick('/electronic', 11)}>
          <span className="action-icon">🚗</span>
          <span className="action-text">Jeux electronique</span>
          <span className="action-badge">-15%</span>
        </Link>

        <Link to="/jardin" className="quick-action product electronic" onClick={() => handleQuickActionClick('/jardin', 31)}>
          <span className="action-icon">🎀</span>
          <span className="action-text">Decoration</span>
          <span className="action-price">Dès 200.000 FCFA</span>
        </Link>

        <Link to="/sport" className="quick-action product electronic" onClick={() => handleQuickActionClick('/sport', 51)}>
          <span className="action-icon">🏋️‍♀️</span>
          <span className="action-text">Fitness, natation</span>
          <span className="action-badge">Tendance</span>
        </Link>
      </div>

      <div className="promo-bar">
        <div className="promo-scroll">
          <span className="promo-item">🚚 Livraison gratuite dès 50.000 FCFA</span>
          <span className="promo-item">🎉 Black Friday - Jusqu'à -70%</span>
          <span className="promo-item">🔐 Paiement 100% sécurisé</span>
          <span className="promo-item">💯 Satisfait ou remboursé</span>
          <span className="promo-item">⭐ 4.9/5 - 2000+ avis clients</span>
        </div>
      </div>

      <hr className="navbar__divider" />

      {/* Section secondaire : Navigation et services */}
      <div className="navbar__secondary">
        {/* Menu de navigation */}
        <nav className="navbar__nav" aria-label="Navigation principale">
          {/* Catégories avec dropdown */}
          <div className="navbar__categories">
            <button 
              className="navbar__categories-btn" 
              aria-label="Toutes les catégories"
              onClick={handleCategoriesClick}
            >
              <span className="navbar__categories-icon">
                <FontAwesomeIcon icon={faList} />
              </span>
              <span className="navbar__categories-text">Toutes les catégories</span>
            </button>
            <div className={`navbar__dropdown navbar__dropdown--categories ${isMobileCategoriesOpen ? 'mobile-open' : ''}`}>
              <Link to="/jardin" className="navbar__dropdown-item" onClick={handleCloseAllDropdowns}>
                <span className="navbar__dropdown-icon">🏠</span>
                Maison & Jardin
              </Link>
              <Link to="/beauty" className="navbar__dropdown-item" onClick={handleCloseAllDropdowns}>
                <span className="navbar__dropdown-icon">💄</span>
                Beauté & Santé
              </Link>
              <Link to="/fashion" className="navbar__dropdown-item" onClick={handleCloseAllDropdowns}>
                <span className="navbar__dropdown-icon">👗</span>
                Mode & Vêtements
              </Link>
              <Link to="/sport" className="navbar__dropdown-item" onClick={handleCloseAllDropdowns}>
                <span className="navbar__dropdown-icon">⚽</span>
                Sports & Loisirs
              </Link>
              <Link to="/electronic" className="navbar__dropdown-item" onClick={handleCloseAllDropdowns}>
                <span className="navbar__dropdown-icon">📱</span>
                Électronique
              </Link>
              <Link to="/jeux" className="navbar__dropdown-item" onClick={handleCloseAllDropdowns}>
                <span className="navbar__dropdown-icon">🧸</span>
                Jeux & Jouets
              </Link>
            </div>
          </div>

          {/* Promotions */}
          <Link to="/deals" className="navbar__nav-link navbar__nav-link--hot">
            <span className="navbar__nav-icon">🎁</span>
            Offres du jour
          </Link>

          {/* Nouveautés */}
          <Link to="/nouveaute" className="navbar__nav-link navbar__nav-link--new">
            <span className="navbar__nav-icon">🤩</span>
            Nouveautés
          </Link>
          <Link to="/favoris" className="navbar__nav-link navbar__nav-link--new">
            <span className="navbar__nav-icon">❤️</span>
            Favoris
          </Link>
        </nav>

        {/* Services client */}
        <div className="navbar__services">
          <button 
            className="navbar__service-link"
            onClick={handleHelpClick}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              font: 'inherit',
              color: 'inherit',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span className="navbar__service-icon">❓</span>
            Assistant SamStore
          </button>
          <Link to="/commande" className="navbar__service-link">
            <span className="navbar__service-icon">📦</span>
            Suivre ma commande
          </Link>
          <Link to="/service" className="navbar__service-link">
            <span className="navbar__service-icon">📞</span>
            Service client
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;